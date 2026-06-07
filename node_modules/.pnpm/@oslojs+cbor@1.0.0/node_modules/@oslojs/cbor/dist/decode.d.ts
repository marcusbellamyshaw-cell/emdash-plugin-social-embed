import type { CBORValue } from "./cbor.js";
export declare function decodeCBORToNativeValueNoLeftoverBytes(data: Uint8Array, maxDepth: number): unknown;
export declare function decodeCBORToNativeValue(data: Uint8Array, maxDepth: number): [value: unknown, size: number];
export declare function decodeCBORNoLeftoverBytes(data: Uint8Array, maxDepth: number): CBORValue;
export declare function decodeCBOR(data: Uint8Array, maxDepth: number): [data: CBORValue, size: number];
