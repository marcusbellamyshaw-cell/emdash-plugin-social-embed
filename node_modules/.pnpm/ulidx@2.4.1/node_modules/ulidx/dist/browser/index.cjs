'use strict';

function assertError(err) {
    if (!isError(err)) {
        throw new Error("Parameter was not an error");
    }
}
function isError(err) {
    return ((!!err &&
        typeof err === "object" &&
        objectToString(err) === "[object Error]") ||
        err instanceof Error);
}
function objectToString(obj) {
    return Object.prototype.toString.call(obj);
}

const NAME = "Layerr";
let __name = NAME;
function getGlobalName() {
    return __name;
}

function parseArguments(args) {
    let options, shortMessage = "";
    if (args.length === 0) {
        options = {};
    }
    else if (isError(args[0])) {
        options = {
            cause: args[0],
        };
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (args[0] && typeof args[0] === "object") {
        options = Object.assign({}, args[0]);
        shortMessage = args.slice(1).join(" ") || "";
    }
    else if (typeof args[0] === "string") {
        options = {};
        shortMessage = shortMessage = args.join(" ") || "";
    }
    else {
        throw new Error("Invalid arguments passed to Layerr");
    }
    return {
        options,
        shortMessage,
    };
}

class Layerr extends Error {
    constructor(errorOptionsOrMessage, messageText) {
        const args = [...arguments];
        const { options, shortMessage } = parseArguments(args);
        let message = shortMessage;
        if (options.cause) {
            message = `${message}: ${options.cause.message}`;
        }
        super(message);
        this.message = message;
        if (options.name && typeof options.name === "string") {
            this.name = options.name;
        }
        else {
            this.name = getGlobalName();
        }
        if (options.cause) {
            Object.defineProperty(this, "_cause", { value: options.cause });
        }
        Object.defineProperty(this, "_info", { value: {} });
        if (options.info && typeof options.info === "object") {
            Object.assign(this._info, options.info);
        }
        if (Error.captureStackTrace) {
            const ctor = options.constructorOpt || this.constructor;
            Error.captureStackTrace(this, ctor);
        }
    }
    static cause(err) {
        assertError(err);
        if (!err._cause)
            return null;
        return isError(err._cause)
            ? err._cause
            : null;
    }
    static fullStack(err) {
        assertError(err);
        const cause = Layerr.cause(err);
        if (cause) {
            return `${err.stack}\ncaused by: ${Layerr.fullStack(cause)}`;
        }
        return err.stack ?? "";
    }
    static info(err) {
        assertError(err);
        const output = {};
        const cause = Layerr.cause(err);
        if (cause) {
            Object.assign(output, Layerr.info(cause));
        }
        if (err._info) {
            Object.assign(output, err._info);
        }
        return output;
    }
    toString() {
        let output = this.name ||
            this.constructor.name ||
            this.constructor.prototype.name;
        if (this.message) {
            output = `${output}: ${this.message}`;
        }
        return output;
    }
}

const B32_CHARACTERS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const MAX_ULID = "7ZZZZZZZZZZZZZZZZZZZZZZZZZ";
const MIN_ULID = "00000000000000000000000000";
const ULID_REGEX = /^[0-7][0-9a-hjkmnp-tv-zA-HJKMNP-TV-Z]{25}$/;
const UUID_REGEX = /^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;

// Code from https://github.com/devbanana/crockford-base32/blob/develop/src/index.ts
function crockfordEncode(input) {
    const output = [];
    let bitsRead = 0;
    let buffer = 0;
    const reversedInput = new Uint8Array(input.slice().reverse());
    for (const byte of reversedInput) {
        buffer |= byte << bitsRead;
        bitsRead += 8;
        while (bitsRead >= 5) {
            output.unshift(buffer & 0x1f);
            buffer >>>= 5;
            bitsRead -= 5;
        }
    }
    if (bitsRead > 0) {
        output.unshift(buffer & 0x1f);
    }
    return output.map(byte => B32_CHARACTERS.charAt(byte)).join("");
}
function crockfordDecode(input) {
    const sanitizedInput = input.toUpperCase().split("").reverse().join("");
    const output = [];
    let bitsRead = 0;
    let buffer = 0;
    for (const character of sanitizedInput) {
        const byte = B32_CHARACTERS.indexOf(character);
        if (byte === -1) {
            throw new Error(`Invalid base 32 character found in string: ${character}`);
        }
        buffer |= byte << bitsRead;
        bitsRead += 5;
        while (bitsRead >= 8) {
            output.unshift(buffer & 0xff);
            buffer >>>= 8;
            bitsRead -= 8;
        }
    }
    if (bitsRead >= 5 || buffer > 0) {
        output.unshift(buffer & 0xff);
    }
    return new Uint8Array(output);
}

// These values should NEVER change. The values are precisely for
// generating ULIDs.
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // Crockford's Base32
const ENCODING_LEN = 32; // from ENCODING.length;
const TIME_MAX = 281474976710655; // from Math.pow(2, 48) - 1;
const TIME_LEN = 10;
const RANDOM_LEN = 16;
const ERROR_INFO = Object.freeze({
    source: "ulid"
});
/**
 * Decode time from a ULID
 * @param id The ULID
 * @returns The decoded timestamp
 */
function decodeTime(id) {
    if (id.length !== TIME_LEN + RANDOM_LEN) {
        throw new Layerr({
            info: {
                code: "DEC_TIME_MALFORMED",
                ...ERROR_INFO
            }
        }, "Malformed ULID");
    }
    const time = id
        .substr(0, TIME_LEN)
        .toUpperCase()
        .split("")
        .reverse()
        .reduce((carry, char, index) => {
        const encodingIndex = ENCODING.indexOf(char);
        if (encodingIndex === -1) {
            throw new Layerr({
                info: {
                    code: "DEC_TIME_CHAR",
                    ...ERROR_INFO
                }
            }, `Time decode error: Invalid character: ${char}`);
        }
        return (carry += encodingIndex * Math.pow(ENCODING_LEN, index));
    }, 0);
    if (time > TIME_MAX) {
        throw new Layerr({
            info: {
                code: "DEC_TIME_CHAR",
                ...ERROR_INFO
            }
        }, `Malformed ULID: timestamp too large: ${time}`);
    }
    return time;
}
/**
 * Detect the best PRNG (pseudo-random number generator)
 * @param root The root to check from (global/window)
 * @returns The PRNG function
 */
function detectPRNG(root) {
    const rootLookup = root || detectRoot();
    const globalCrypto = (rootLookup && (rootLookup.crypto || rootLookup.msCrypto)) ||
        (null);
    if (typeof globalCrypto?.getRandomValues === "function") {
        return () => {
            const buffer = new Uint8Array(1);
            globalCrypto.getRandomValues(buffer);
            return buffer[0] / 0xff;
        };
    }
    else if (typeof globalCrypto?.randomBytes === "function") {
        return () => globalCrypto.randomBytes(1).readUInt8() / 0xff;
    }
    else ;
    throw new Layerr({
        info: {
            code: "PRNG_DETECT",
            ...ERROR_INFO
        }
    }, "Failed to find a reliable PRNG");
}
function detectRoot() {
    if (inWebWorker())
        return self;
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    return null;
}
function encodeRandom(len, prng) {
    let str = "";
    for (; len > 0; len--) {
        str = randomChar(prng) + str;
    }
    return str;
}
/**
 * Encode the time portion of a ULID
 * @param now The current timestamp
 * @param len Length to generate
 * @returns The encoded time
 */
function encodeTime(now, len) {
    if (isNaN(now)) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_NAN",
                ...ERROR_INFO
            }
        }, `Time must be a number: ${now}`);
    }
    else if (now > TIME_MAX) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_SIZE_EXCEED",
                ...ERROR_INFO
            }
        }, `Cannot encode a time larger than ${TIME_MAX}: ${now}`);
    }
    else if (now < 0) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_NEG",
                ...ERROR_INFO
            }
        }, `Time must be positive: ${now}`);
    }
    else if (Number.isInteger(now) === false) {
        throw new Layerr({
            info: {
                code: "ENC_TIME_TYPE",
                ...ERROR_INFO
            }
        }, `Time must be an integer: ${now}`);
    }
    let mod, str = "";
    for (let currentLen = len; currentLen > 0; currentLen--) {
        mod = now % ENCODING_LEN;
        str = ENCODING.charAt(mod) + str;
        now = (now - mod) / ENCODING_LEN;
    }
    return str;
}
/**
 * Fix a ULID's Base32 encoding -
 * i and l (case-insensitive) will be treated as 1 and o (case-insensitive) will be treated as 0.
 * hyphens are ignored during decoding.
 * @param id The ULID
 * @returns The cleaned up ULID
 */
function fixULIDBase32(id) {
    return id.replace(/i/gi, "1").replace(/l/gi, "1").replace(/o/gi, "0").replace(/-/g, "");
}
function incrementBase32(str) {
    let done = undefined, index = str.length, char, charIndex, output = str;
    const maxCharIndex = ENCODING_LEN - 1;
    while (!done && index-- >= 0) {
        char = output[index];
        charIndex = ENCODING.indexOf(char);
        if (charIndex === -1) {
            throw new Layerr({
                info: {
                    code: "B32_INC_ENC",
                    ...ERROR_INFO
                }
            }, "Incorrectly encoded string");
        }
        if (charIndex === maxCharIndex) {
            output = replaceCharAt(output, index, ENCODING[0]);
            continue;
        }
        done = replaceCharAt(output, index, ENCODING[charIndex + 1]);
    }
    if (typeof done === "string") {
        return done;
    }
    throw new Layerr({
        info: {
            code: "B32_INC_INVALID",
            ...ERROR_INFO
        }
    }, "Failed incrementing string");
}
function inWebWorker() {
    // @ts-ignore
    return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
}
/**
 * Check if a ULID is valid
 * @param id The ULID to test
 * @returns True if valid, false otherwise
 * @example
 *   isValid("01HNZX8JGFACFA36RBXDHEQN6E"); // true
 *   isValid(""); // false
 */
function isValid(id) {
    return (typeof id === "string" &&
        id.length === TIME_LEN + RANDOM_LEN &&
        id
            .toUpperCase()
            .split("")
            .every(char => ENCODING.indexOf(char) !== -1));
}
/**
 * Create a ULID factory to generate monotonically-increasing
 *  ULIDs
 * @param prng The PRNG to use
 * @returns A ulid factory
 * @example
 *  const ulid = monotonicFactory();
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
function monotonicFactory(prng) {
    const currentPRNG = prng || detectPRNG();
    let lastTime = 0, lastRandom;
    return function _ulid(seedTime) {
        const seed = isNaN(seedTime) ? Date.now() : seedTime;
        if (seed <= lastTime) {
            const incrementedRandom = (lastRandom = incrementBase32(lastRandom));
            return encodeTime(lastTime, TIME_LEN) + incrementedRandom;
        }
        lastTime = seed;
        const newRandom = (lastRandom = encodeRandom(RANDOM_LEN, currentPRNG));
        return encodeTime(seed, TIME_LEN) + newRandom;
    };
}
function randomChar(prng) {
    let rand = Math.floor(prng() * ENCODING_LEN);
    if (rand === ENCODING_LEN) {
        rand = ENCODING_LEN - 1;
    }
    return ENCODING.charAt(rand);
}
function replaceCharAt(str, index, char) {
    if (index > str.length - 1) {
        return str;
    }
    return str.substr(0, index) + char + str.substr(index + 1);
}
/**
 * Generate a ULID
 * @param seedTime Optional time seed
 * @param prng Optional PRNG function
 * @returns A ULID string
 * @example
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
function ulid(seedTime, prng) {
    const currentPRNG = prng || detectPRNG();
    const seed = isNaN(seedTime) ? Date.now() : seedTime;
    return encodeTime(seed, TIME_LEN) + encodeRandom(RANDOM_LEN, currentPRNG);
}
/**
 * Convert a ULID to a UUID
 * @param ulid The ULID to convert
 * @returns A UUID string
 */
function ulidToUUID(ulid) {
    const isValid = ULID_REGEX.test(ulid);
    if (!isValid) {
        throw new Layerr({ info: { code: "INVALID_ULID", ...ERROR_INFO } }, "Invalid ULID");
    }
    const uint8Array = crockfordDecode(ulid);
    let uuid = Array.from(uint8Array)
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
    uuid =
        uuid.substring(0, 8) +
            "-" +
            uuid.substring(8, 12) +
            "-" +
            uuid.substring(12, 16) +
            "-" +
            uuid.substring(16, 20) +
            "-" +
            uuid.substring(20);
    return uuid;
}
/**
 * Convert a UUID to a ULID
 * @param uuid The UUID to convert
 * @returns A ULID string
 */
function uuidToULID(uuid) {
    const isValid = UUID_REGEX.test(uuid);
    if (!isValid) {
        throw new Layerr({ info: { code: "INVALID_UUID", ...ERROR_INFO } }, "Invalid UUID");
    }
    const uint8Array = new Uint8Array(uuid
        .replace(/-/g, "")
        .match(/.{1,2}/g)
        .map(byte => parseInt(byte, 16)));
    return crockfordEncode(uint8Array);
}

exports.B32_CHARACTERS = B32_CHARACTERS;
exports.MAX_ULID = MAX_ULID;
exports.MIN_ULID = MIN_ULID;
exports.ULID_REGEX = ULID_REGEX;
exports.UUID_REGEX = UUID_REGEX;
exports.decodeTime = decodeTime;
exports.detectPRNG = detectPRNG;
exports.encodeTime = encodeTime;
exports.fixULIDBase32 = fixULIDBase32;
exports.isValid = isValid;
exports.monotonicFactory = monotonicFactory;
exports.ulid = ulid;
exports.ulidToUUID = ulidToUUID;
exports.uuidToULID = uuidToULID;
