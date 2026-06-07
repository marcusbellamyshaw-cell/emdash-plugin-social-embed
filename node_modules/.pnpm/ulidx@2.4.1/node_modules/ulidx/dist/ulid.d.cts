import { PRNG, ULID, ULIDFactory, UUID } from "./types.js";
/**
 * Decode time from a ULID
 * @param id The ULID
 * @returns The decoded timestamp
 */
export declare function decodeTime(id: string): number;
/**
 * Detect the best PRNG (pseudo-random number generator)
 * @param root The root to check from (global/window)
 * @returns The PRNG function
 */
export declare function detectPRNG(root?: any): PRNG;
export declare function encodeRandom(len: number, prng: PRNG): string;
/**
 * Encode the time portion of a ULID
 * @param now The current timestamp
 * @param len Length to generate
 * @returns The encoded time
 */
export declare function encodeTime(now: number, len: number): string;
/**
 * Fix a ULID's Base32 encoding -
 * i and l (case-insensitive) will be treated as 1 and o (case-insensitive) will be treated as 0.
 * hyphens are ignored during decoding.
 * @param id The ULID
 * @returns The cleaned up ULID
 */
export declare function fixULIDBase32(id: string): string;
export declare function incrementBase32(str: string): string;
/**
 * Check if a ULID is valid
 * @param id The ULID to test
 * @returns True if valid, false otherwise
 * @example
 *   isValid("01HNZX8JGFACFA36RBXDHEQN6E"); // true
 *   isValid(""); // false
 */
export declare function isValid(id: string): boolean;
/**
 * Create a ULID factory to generate monotonically-increasing
 *  ULIDs
 * @param prng The PRNG to use
 * @returns A ulid factory
 * @example
 *  const ulid = monotonicFactory();
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
export declare function monotonicFactory(prng?: PRNG): ULIDFactory;
export declare function randomChar(prng: PRNG): string;
export declare function replaceCharAt(str: string, index: number, char: string): string;
/**
 * Generate a ULID
 * @param seedTime Optional time seed
 * @param prng Optional PRNG function
 * @returns A ULID string
 * @example
 *  ulid(); // "01HNZXD07M5CEN5XA66EMZSRZW"
 */
export declare function ulid(seedTime?: number, prng?: PRNG): ULID;
/**
 * Convert a ULID to a UUID
 * @param ulid The ULID to convert
 * @returns A UUID string
 */
export declare function ulidToUUID(ulid: string): UUID;
/**
 * Convert a UUID to a ULID
 * @param uuid The UUID to convert
 * @returns A ULID string
 */
export declare function uuidToULID(uuid: string): ULID;
