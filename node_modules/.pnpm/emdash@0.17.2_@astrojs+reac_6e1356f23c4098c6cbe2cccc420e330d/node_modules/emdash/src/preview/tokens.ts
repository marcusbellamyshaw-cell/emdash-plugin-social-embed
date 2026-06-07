/**
 * Preview token generation and verification
 *
 * Tokens are compact, URL-safe, and HMAC-signed.
 * Format: base64url(JSON payload).base64url(HMAC signature)
 *
 * Payload: { cid: contentId, exp: expiryTimestamp, iat: issuedAt }
 */

import { encodeBase64url, decodeBase64url } from "../utils/base64.js";

// Regex pattern for duration parsing
const DURATION_PATTERN = /^(\d+)([smhdw])$/;

/**
 * Preview token payload
 */
export interface PreviewTokenPayload {
	/** Content ID in format "collection:id" (e.g., "posts:abc123") */
	cid: string;
	/** Expiry timestamp (seconds since epoch) */
	exp: number;
	/** Issued at timestamp (seconds since epoch) */
	iat: number;
}

/**
 * Options for generating a preview token
 */
export interface GeneratePreviewTokenOptions {
	/** Content ID in format "collection:id" */
	contentId: string;
	/** How long the token is valid. Accepts "1h", "30m", "1d", or seconds as number. Default: "1h" */
	expiresIn?: string | number;
	/** Secret key for signing. Should be from environment variable. */
	secret: string;
}

/**
 * Parse duration string to seconds
 * Supports: "1h", "30m", "1d", "2w", or raw seconds
 */
function parseDuration(duration: string | number): number {
	if (typeof duration === "number") {
		return duration;
	}

	const match = duration.match(DURATION_PATTERN);
	if (!match) {
		throw new Error(
			`Invalid duration format: "${duration}". Use "1h", "30m", "1d", "2w", or seconds.`,
		);
	}

	const value = parseInt(match[1], 10);
	const unit = match[2];

	switch (unit) {
		case "s":
			return value;
		case "m":
			return value * 60;
		case "h":
			return value * 60 * 60;
		case "d":
			return value * 60 * 60 * 24;
		case "w":
			return value * 60 * 60 * 24 * 7;
		default:
			throw new Error(`Unknown duration unit: ${unit}`);
	}
}

/**
 * Create HMAC-SHA256 signature using Web Crypto API
 */
async function createSignature(data: string, secret: string): Promise<Uint8Array> {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
	return new Uint8Array(signature);
}

/**
 * Verify HMAC-SHA256 signature
 */
async function verifySignature(
	data: string,
	signature: Uint8Array,
	secret: string,
): Promise<boolean> {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["verify"],
	);
	// Create a new ArrayBuffer from the signature to satisfy BufferSource typing
	// (Uint8Array.buffer is ArrayBufferLike which includes SharedArrayBuffer)
	const sigBuffer: ArrayBuffer = new ArrayBuffer(signature.byteLength);
	new Uint8Array(sigBuffer).set(signature);
	return crypto.subtle.verify("HMAC", key, sigBuffer, encoder.encode(data));
}

/**
 * Generate a preview token for content
 *
 * @example
 * ```ts
 * const token = await generatePreviewToken({
 *   contentId: "posts:abc123",
 *   expiresIn: "1h",
 *   secret: process.env.PREVIEW_SECRET!,
 * });
 * ```
 */
export async function generatePreviewToken(options: GeneratePreviewTokenOptions): Promise<string> {
	const { contentId, expiresIn = "1h", secret } = options;

	if (!secret) {
		throw new Error("Preview secret is required");
	}

	if (!contentId || !contentId.includes(":")) {
		throw new Error('Content ID must be in format "collection:id"');
	}

	const now = Math.floor(Date.now() / 1000);
	const duration = parseDuration(expiresIn);

	const payload: PreviewTokenPayload = {
		cid: contentId,
		exp: now + duration,
		iat: now,
	};

	// Encode payload
	const payloadJson = JSON.stringify(payload);
	const encodedPayload = encodeBase64url(new TextEncoder().encode(payloadJson));

	// Sign it
	const signature = await createSignature(encodedPayload, secret);
	const encodedSignature = encodeBase64url(signature);

	return `${encodedPayload}.${encodedSignature}`;
}

/**
 * Result of verifying a preview token
 */
export type VerifyPreviewTokenResult =
	| { valid: true; payload: PreviewTokenPayload }
	| { valid: false; error: "invalid" | "expired" | "malformed" | "none" };

/**
 * Options for verifyPreviewToken
 */
export type VerifyPreviewTokenOptions = {
	/** Secret key for verifying tokens */
	secret: string;
} & (
	| { /** URL to extract _preview token from */ url: URL }
	| {
			/** Preview token string (can be null) */ token: string | null | undefined;
	  }
);

/**
 * Verify a preview token and return the payload
 *
 * @example
 * ```ts
 * // With URL (extracts _preview query param)
 * const result = await verifyPreviewToken({
 *   url: Astro.url,
 *   secret: import.meta.env.PREVIEW_SECRET,
 * });
 *
 * // With token directly
 * const result = await verifyPreviewToken({
 *   token: someToken,
 *   secret: import.meta.env.PREVIEW_SECRET,
 * });
 *
 * if (result.valid) {
 *   console.log(result.payload.cid); // "posts:abc123"
 * }
 * ```
 */
export async function verifyPreviewToken(
	options: VerifyPreviewTokenOptions,
): Promise<VerifyPreviewTokenResult> {
	const { secret } = options;

	if (!secret) {
		throw new Error("Preview secret is required");
	}

	// Extract token from URL or use provided token
	const token = "url" in options ? options.url.searchParams.get("_preview") : options.token;

	// Handle null/undefined token
	if (!token) {
		return { valid: false, error: "none" };
	}

	// Split token into payload and signature
	const parts = token.split(".");
	if (parts.length !== 2) {
		return { valid: false, error: "malformed" };
	}

	const [encodedPayload, encodedSignature] = parts;

	// Verify signature
	let signature: Uint8Array;
	try {
		signature = decodeBase64url(encodedSignature);
	} catch {
		return { valid: false, error: "malformed" };
	}

	const isValid = await verifySignature(encodedPayload, signature, secret);
	if (!isValid) {
		return { valid: false, error: "invalid" };
	}

	// Decode and parse payload
	let payload: PreviewTokenPayload;
	try {
		const payloadBytes = decodeBase64url(encodedPayload);
		const payloadJson = new TextDecoder().decode(payloadBytes);
		payload = JSON.parse(payloadJson);
	} catch {
		return { valid: false, error: "malformed" };
	}

	// Check required fields
	if (
		typeof payload.cid !== "string" ||
		typeof payload.exp !== "number" ||
		typeof payload.iat !== "number"
	) {
		return { valid: false, error: "malformed" };
	}

	// Check expiry
	const now = Math.floor(Date.now() / 1000);
	if (payload.exp < now) {
		return { valid: false, error: "expired" };
	}

	return { valid: true, payload };
}

/**
 * Parse a content ID into collection and id
 */
export function parseContentId(contentId: string): {
	collection: string;
	id: string;
} {
	const colonIndex = contentId.indexOf(":");
	if (colonIndex === -1) {
		throw new Error('Content ID must be in format "collection:id"');
	}
	return {
		collection: contentId.slice(0, colonIndex),
		id: contentId.slice(colonIndex + 1),
	};
}
