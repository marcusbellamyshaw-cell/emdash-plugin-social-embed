import { decodeCBORToNativeValueNoLeftoverBytes } from "@oslojs/cbor";
import { parseAuthenticatorData } from "./auth.js";
export function parseAttestationObject(encoded) {
    let decoded;
    try {
        decoded = decodeCBORToNativeValueNoLeftoverBytes(encoded, 4);
    }
    catch {
        throw new AttestationObjectParseError("Invalid CBOR data");
    }
    if (typeof decoded !== "object" || decoded === null) {
        throw new AttestationObjectParseError("Invalid CBOR data");
    }
    if (!("fmt" in decoded) || typeof decoded.fmt !== "string") {
        throw new AttestationObjectParseError("Invalid or missing property 'fmt'");
    }
    if (!("attStmt" in decoded) || typeof decoded.attStmt !== "object" || decoded.attStmt === null) {
        throw new AttestationObjectParseError("Invalid or missing property 'attStmt'");
    }
    if (!("authData" in decoded) || !(decoded.authData instanceof Uint8Array)) {
        throw new AttestationObjectParseError("Invalid or missing property 'authData'");
    }
    let attestationFormat;
    if (decoded.fmt === "packed") {
        attestationFormat = AttestationStatementFormat.Packed;
    }
    else if (decoded.fmt === "tpm") {
        attestationFormat = AttestationStatementFormat.TPM;
    }
    else if (decoded.fmt === "android-key") {
        attestationFormat = AttestationStatementFormat.AndroidKey;
    }
    else if (decoded.fmt === "android-safetynet") {
        attestationFormat = AttestationStatementFormat.AndroidSafetyNet;
    }
    else if (decoded.fmt === "fido-u2f") {
        attestationFormat = AttestationStatementFormat.FIDOU2F;
    }
    else if (decoded.fmt === "none") {
        attestationFormat = AttestationStatementFormat.None;
    }
    else if (decoded.fmt === "apple") {
        attestationFormat = AttestationStatementFormat.AppleAnonymous;
    }
    else {
        throw new AttestationObjectParseError(`Unsupported attestation statement format '${decoded.fmt}'`);
    }
    const attestationObject = {
        authenticatorData: parseAuthenticatorData(decoded.authData),
        attestationStatement: new AttestationStatement(attestationFormat, decoded.attStmt)
    };
    return attestationObject;
}
export class AttestationObjectParseError extends Error {
    constructor(message) {
        super(`Failed to parse attestation object: ${message}`);
    }
}
export class AttestationStatement {
    format;
    decoded;
    constructor(format, decoded) {
        this.format = format;
        this.decoded = decoded;
    }
    packed() {
        if (this.format !== AttestationStatementFormat.Packed) {
            throw new Error("Invalid format");
        }
        if (!("alg" in this.decoded) || typeof this.decoded.alg !== "number") {
            throw new Error("Invalid or missing property 'alg'");
        }
        if (!("sig" in this.decoded) || !(this.decoded.sig instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'sig'");
        }
        let certificates = null;
        if ("x5c" in this.decoded) {
            if (!Array.isArray(this.decoded.x5c)) {
                throw new Error("Invalid property 'x5c'");
            }
            if (this.decoded.x5c.length < 1) {
                throw new Error("Invalid property 'x5c'");
            }
            certificates = [];
            for (const certificate of this.decoded.x5c) {
                if (!(certificate instanceof Uint8Array)) {
                    throw new Error("Invalid property 'x5c'");
                }
                certificates.push(certificate);
            }
        }
        const statement = {
            algorithm: this.decoded.alg,
            signature: this.decoded.sig,
            certificates
        };
        return statement;
    }
    tpm() {
        if (this.format !== AttestationStatementFormat.TPM) {
            throw new Error("Invalid format");
        }
        if (!("alg" in this.decoded) || typeof this.decoded.alg !== "number") {
            throw new Error("Invalid or missing property 'alg'");
        }
        if (!("sig" in this.decoded) || !(this.decoded.sig instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'sig'");
        }
        if (!("x5c" in this.decoded) || !Array.isArray(this.decoded.x5c)) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        if (this.decoded.x5c.length < 1) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        const certificates = [];
        for (const certificate of this.decoded.x5c) {
            if (!(certificate instanceof Uint8Array)) {
                throw new Error("Invalid or missing property 'x5c'");
            }
            certificates.push(certificate);
        }
        if (!("certInfo" in this.decoded) || !(this.decoded.certInfo instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'certInfo'");
        }
        if (!("pubArea" in this.decoded) || !(this.decoded.pubArea instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'pubArea'");
        }
        const statement = {
            algorithm: this.decoded.alg,
            signature: this.decoded.sig,
            certificates,
            attestation: this.decoded.certInfo,
            publicKey: this.decoded.pubArea
        };
        return statement;
    }
    androidKey() {
        if (this.format !== AttestationStatementFormat.AndroidKey) {
            throw new Error("Invalid format");
        }
        if (!("alg" in this.decoded) || typeof this.decoded.alg !== "number") {
            throw new Error("Invalid or missing property 'alg'");
        }
        if (!("sig" in this.decoded) || !(this.decoded.sig instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'sig'");
        }
        if (!("x5c" in this.decoded) || !Array.isArray(this.decoded.x5c)) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        if (this.decoded.x5c.length < 1) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        const certificates = [];
        for (const certificate of this.decoded.x5c) {
            if (!(certificate instanceof Uint8Array)) {
                throw new Error("Invalid or missing property 'x5c'");
            }
            certificates.push(certificate);
        }
        const statement = {
            algorithm: this.decoded.alg,
            signature: this.decoded.sig,
            certificates
        };
        return statement;
    }
    androidSafetyNet() {
        if (this.format !== AttestationStatementFormat.AndroidKey) {
            throw new Error("Invalid format");
        }
        if (!("ver" in this.decoded) || typeof this.decoded.ver !== "string") {
            throw new Error("Invalid or missing property 'ver'");
        }
        if (!("response" in this.decoded) || !(this.decoded.response instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'response'");
        }
        const statement = {
            version: this.decoded.ver,
            response: this.decoded.response
        };
        return statement;
    }
    fidoU2F() {
        if (this.format !== AttestationStatementFormat.FIDOU2F) {
            throw new Error("Invalid format");
        }
        if (!("sig" in this.decoded) || !(this.decoded.sig instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'sig'");
        }
        if (!("x5c" in this.decoded) || !Array.isArray(this.decoded.x5c)) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        if (this.decoded.x5c.length !== 1) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        const certificate = this.decoded.x5c[0];
        if (!(certificate instanceof Uint8Array)) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        const statement = {
            signature: this.decoded.sig,
            certificate
        };
        return statement;
    }
    appleAnonymous() {
        if (this.format !== AttestationStatementFormat.AppleAnonymous) {
            throw new Error("Invalid format");
        }
        if (!("x5c" in this.decoded) || !Array.isArray(this.decoded.x5c)) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        if (this.decoded.x5c.length < 1) {
            throw new Error("Invalid or missing property 'x5c'");
        }
        const certificates = [];
        for (const certificate of this.decoded.x5c) {
            if (!(certificate instanceof Uint8Array)) {
                throw new Error("Invalid or missing property 'x5c'");
            }
            certificates.push(certificate);
        }
        const statement = { certificates };
        return statement;
    }
}
export var AttestationStatementFormat;
(function (AttestationStatementFormat) {
    AttestationStatementFormat[AttestationStatementFormat["Packed"] = 0] = "Packed";
    AttestationStatementFormat[AttestationStatementFormat["TPM"] = 1] = "TPM";
    AttestationStatementFormat[AttestationStatementFormat["AndroidKey"] = 2] = "AndroidKey";
    AttestationStatementFormat[AttestationStatementFormat["AndroidSafetyNet"] = 3] = "AndroidSafetyNet";
    AttestationStatementFormat[AttestationStatementFormat["FIDOU2F"] = 4] = "FIDOU2F";
    AttestationStatementFormat[AttestationStatementFormat["AppleAnonymous"] = 5] = "AppleAnonymous";
    AttestationStatementFormat[AttestationStatementFormat["None"] = 6] = "None";
})(AttestationStatementFormat || (AttestationStatementFormat = {}));
