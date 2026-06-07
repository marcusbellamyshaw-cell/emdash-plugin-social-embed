import { COSEPublicKey } from "./cose.js";
export declare function parseClientDataJSON(encoded: Uint8Array): ClientData;
export interface ClientData {
    type: ClientDataType;
    challenge: Uint8Array;
    origin: string;
    crossOrigin: boolean | null;
    tokenBinding: TokenBinding | null;
}
export declare enum ClientDataType {
    Get = 0,
    Create = 1
}
export interface TokenBinding {
    id: Uint8Array;
    status: TokenBindingStatus;
}
export declare enum TokenBindingStatus {
    Supported = 0,
    Present = 1
}
export declare class ClientDataParseError extends Error {
    constructor(message: string);
}
export declare function parseAuthenticatorData(encoded: Uint8Array): AuthenticatorData;
export interface AuthenticatorDataFlags {
    userPresent: boolean;
    userVerified: boolean;
}
export declare class AuthenticatorData {
    relyingPartyIdHash: Uint8Array;
    userPresent: boolean;
    userVerified: boolean;
    signatureCounter: number;
    credential: WebAuthnCredential | null;
    extensions: null;
    constructor(relyingPartyIdHash: Uint8Array, flags: AuthenticatorDataFlags, signatureCounter: number, credential: WebAuthnCredential | null, extensions: null);
    verifyRelyingPartyIdHash(relyingPartyId: string): boolean;
}
export declare class AuthenticatorDataParseError extends Error {
    constructor(message: string);
}
export interface WebAuthnCredential {
    authenticatorAAGUID: Uint8Array;
    id: Uint8Array;
    publicKey: COSEPublicKey;
}
