import type { AuthenticatorData } from "./auth.js";
export declare function parseAttestationObject(encoded: Uint8Array): AttestationObject;
export declare class AttestationObjectParseError extends Error {
    constructor(message: string);
}
export interface AttestationObject {
    attestationStatement: AttestationStatement;
    authenticatorData: AuthenticatorData;
}
export declare class AttestationStatement {
    format: AttestationStatementFormat;
    decoded: object;
    constructor(format: AttestationStatementFormat, decoded: object);
    packed(): PackedAttestationStatement;
    tpm(): TPMAttestationStatement;
    androidKey(): AndroidKeyAttestationStatement;
    androidSafetyNet(): AndroidSafetyNetAttestationStatement;
    fidoU2F(): FIDOU2FAttestationStatement;
    appleAnonymous(): AppleAnonymousAttestationStatement;
}
export interface PackedAttestationStatement {
    algorithm: number;
    signature: Uint8Array;
    certificates: Uint8Array[] | null;
}
export interface TPMAttestationStatement {
    algorithm: number;
    signature: Uint8Array;
    certificates: Uint8Array[];
    attestation: Uint8Array;
    publicKey: Uint8Array;
}
export interface AndroidKeyAttestationStatement {
    algorithm: number;
    signature: Uint8Array;
    certificates: Uint8Array[];
}
export interface AndroidSafetyNetAttestationStatement {
    version: string;
    response: Uint8Array;
}
export interface FIDOU2FAttestationStatement {
    signature: Uint8Array;
    certificate: Uint8Array;
}
export interface AppleAnonymousAttestationStatement {
    certificates: Uint8Array[];
}
export declare enum AttestationStatementFormat {
    Packed = 0,
    TPM = 1,
    AndroidKey = 2,
    AndroidSafetyNet = 3,
    FIDOU2F = 4,
    AppleAnonymous = 5,
    None = 6
}
