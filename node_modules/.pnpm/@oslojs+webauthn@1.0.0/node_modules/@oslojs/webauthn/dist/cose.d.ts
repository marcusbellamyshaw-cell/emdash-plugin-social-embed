export declare function decodeCOSEPublicKey(data: Uint8Array): [publicKey: COSEPublicKey, size: number];
export declare class COSEPublicKey {
    decoded: object;
    constructor(decoded: object);
    type(): COSEKeyType;
    isAlgorithmDefined(): boolean;
    algorithm(): number;
    ec2(): COSEEC2PublicKey;
    rsa(): COSERSAPublicKey;
    okp(): COSEOKPPublicKey;
    symmetric(): Uint8Array;
}
export interface COSEEC2PublicKey {
    curve: number;
    x: bigint;
    y: bigint;
}
export interface COSERSAPublicKey {
    n: bigint;
    e: bigint;
}
export interface COSEOKPPublicKey {
    curve: number;
    x: Uint8Array;
}
export declare const coseAlgorithmES256 = -7;
export declare const coseAlgorithmRS256 = -257;
export declare const coseAlgorithmEdDSA = -8;
export declare const coseEllipticCurveP256 = 1;
export declare const coseEllipticCurveEd25519 = 6;
export declare enum COSEKeyType {
    OKP = 0,
    EC2 = 1,
    RSA = 2,
    Symmetric = 3,
    HSSLMS = 4,
    WalnutDSA = 5
}
