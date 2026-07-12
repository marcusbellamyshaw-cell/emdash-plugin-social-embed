import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { detectPlatform, fetchEmbed } from "../src/platforms.js";
import type { RouteContext } from "emdash";

describe("detectPlatform", () => {
	it("matches youtube watch URLs", () => {
		expect(detectPlatform("https://www.youtube.com/watch?v=abc123")).toBe("youtube");
	});

	it("matches youtube shorts URLs", () => {
		expect(detectPlatform("https://youtube.com/shorts/abc123")).toBe("youtube");
	});

	it("matches youtu.be short links", () => {
		expect(detectPlatform("https://youtu.be/abc123")).toBe("youtube");
	});

	it("matches vimeo numeric video URLs", () => {
		expect(detectPlatform("https://vimeo.com/123456789")).toBe("vimeo");
	});

	it("rejects vimeo URLs without a numeric path", () => {
		expect(detectPlatform("https://vimeo.com/about")).toBeNull();
	});

	it("matches twitter status URLs", () => {
		expect(detectPlatform("https://twitter.com/user/status/12345")).toBe("twitter");
	});

	it("matches x.com status URLs", () => {
		expect(detectPlatform("https://x.com/user/status/12345")).toBe("twitter");
	});

	it("matches spotify URLs", () => {
		expect(detectPlatform("https://open.spotify.com/track/abc123")).toBe("spotify");
	});

	it("matches tiktok video URLs", () => {
		expect(detectPlatform("https://www.tiktok.com/@someuser/video/1234567890")).toBe("tiktok");
	});

	it("rejects tiktok profile URLs without /video/", () => {
		expect(detectPlatform("https://www.tiktok.com/@someuser")).toBeNull();
	});

	it("returns null for unrecognized hosts", () => {
		expect(detectPlatform("https://example.com/watch?v=abc123")).toBeNull();
	});

	it("returns null for malformed URLs", () => {
		expect(detectPlatform("not a url")).toBeNull();
	});

	it("rejects non-http(s) protocols", () => {
		expect(detectPlatform("javascript:alert(1)")).toBeNull();
		expect(detectPlatform("file:///etc/passwd")).toBeNull();
	});

	it("does not misclassify a spoofed host in query/fragment as a real platform host", () => {
		// substring-testing the raw string would wrongly match "youtube.com" here
		expect(detectPlatform("https://evil.test/?redirect=youtube.com/watch")).toBeNull();
		expect(detectPlatform("https://evil.test/#open.spotify.com/track/abc")).toBeNull();
	});

	it("matches subdomains of the base host but not unrelated hosts sharing a suffix", () => {
		expect(detectPlatform("https://m.vimeo.com/123456")).toBe("vimeo");
		expect(detectPlatform("https://notvimeo.com/123456")).toBeNull();
	});
});

describe("fetchEmbed", () => {
	const ctx = {} as RouteContext;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	it("strips <script> tags from the returned HTML and attaches the platform script separately", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => ({
					html: '<blockquote>tweet</blockquote><script>document.write("x")</script>',
					title: "A tweet",
					author_name: "Someone",
				}),
			}),
		);

		const result = await fetchEmbed(ctx, "https://twitter.com/user/status/1", "twitter");

		expect(result).not.toBeNull();
		expect(result?.html).toBe("<blockquote>tweet</blockquote>");
		expect(result?.scriptSrc).toBe("https://platform.twitter.com/widgets.js");
		expect(result?.title).toBe("A tweet");
		expect(result?.authorName).toBe("Someone");
	});

	it("returns null when the oEmbed response is not ok", async () => {
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

		const result = await fetchEmbed(ctx, "https://vimeo.com/123", "vimeo");

		expect(result).toBeNull();
	});

	it("returns null when the response has no html field", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({ ok: true, json: async () => ({ title: "no html" }) }),
		);

		const result = await fetchEmbed(ctx, "https://vimeo.com/123", "vimeo");

		expect(result).toBeNull();
	});

	it("returns null when the underlying fetch throws", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockRejectedValue(new Error("network down")),
		);

		const result = await fetchEmbed(ctx, "https://open.spotify.com/track/1", "spotify");

		expect(result).toBeNull();
	});

	it("prefers ctx.http.fetch over the global fetch when available", async () => {
		const globalFetch = vi.fn().mockResolvedValue({ ok: false });
		vi.stubGlobal("fetch", globalFetch);

		const httpFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ html: "<div>embed</div>" }),
		});
		const ctxWithHttp = { http: { fetch: httpFetch } } as unknown as RouteContext;

		const result = await fetchEmbed(ctxWithHttp, "https://open.spotify.com/track/1", "spotify");

		expect(httpFetch).toHaveBeenCalledOnce();
		expect(globalFetch).not.toHaveBeenCalled();
		expect(result?.html).toBe("<div>embed</div>");
	});

	it("times out and returns null if the request takes too long", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockImplementation(() => new Promise(() => {})), // never resolves
		);

		const promise = fetchEmbed(ctx, "https://vimeo.com/123", "vimeo");
		await vi.advanceTimersByTimeAsync(5001);

		expect(await promise).toBeNull();
	});
});
