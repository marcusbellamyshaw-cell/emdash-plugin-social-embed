export type CBORValue = CBORPositiveInteger | CBORNegativeInteger | CBORByteString | CBORTextString | CBORArray | CBORMap | CBORFloat16 | CBORFloat32 | CBORFloat64 | CBORTagged | CBORSimple | CBORBreak;
export declare class CBORPositiveInteger {
    value: bigint;
    constructor(value: bigint);
    isNumber(): boolean;
}
export declare class CBORNegativeInteger {
    value: bigint;
    constructor(value: bigint);
    isNumber(): boolean;
}
export declare class CBORByteString {
    value: Uint8Array;
    constructor(value: Uint8Array);
}
export declare class CBORTextString {
    value: Uint8Array;
    constructor(value: Uint8Array);
    decodeText(): string;
}
export declare class CBORArray {
    elements: CBORValue[];
    constructor(elements: CBORValue[]);
}
export declare class CBORMap {
    entries: [CBORValue, CBORValue][];
    constructor(entries: [CBORValue, CBORValue][]);
    has(key: CBORValue): boolean;
    get(key: CBORValue): CBORValue | null;
    getAll(key: CBORValue): CBORValue[];
    hasDuplicateKeys(): boolean;
}
export declare class CBORFloat16 {
    value: Uint8Array;
    constructor(value: Uint8Array);
    toNumber(): number;
}
export declare class CBORFloat32 {
    value: Uint8Array;
    constructor(value: Uint8Array);
    toNumber(): number;
}
export declare class CBORFloat64 {
    value: Uint8Array;
    constructor(value: Uint8Array);
    toNumber(): number;
}
export declare class CBORTagged {
    tagNumber: bigint;
    value: CBORValue;
    constructor(tagNumber: bigint, value: CBORValue);
}
export declare class CBORSimple {
    value: number;
    constructor(value: number);
}
export declare class CBORBreak {
    value: null;
}
export declare function compareCBORValues(a: CBORValue, b: CBORValue): boolean;
export declare class CBORNotWellFormedError extends Error {
    constructor();
}
export declare class CBORLeftoverBytesError extends Error {
    constructor(count: number);
}
export declare class CBORTooDeepError extends Error {
    constructor();
}
export declare class CBORInvalidError extends Error {
    constructor();
}
