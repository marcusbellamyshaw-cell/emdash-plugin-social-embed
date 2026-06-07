/**
 * Piggyback cron scheduler — request-driven fallback.
 *
 * Checks for overdue tasks on each incoming request, debounced to at most
 * once per 60 seconds. Fire-and-forget (does not block the request).
 *
 * Used on Cloudflare when no Durable Object binding is available, or
 * during development when DO bindings aren't configured.
 *
 */

import type { CronExecutor } from "../cron.js";
import type { CronScheduler, SystemCleanupFn } from "./types.js";

/** Minimum interval between tick attempts (ms) */
const DEBOUNCE_MS = 60 * 1000;

export class PiggybackScheduler implements CronScheduler {
	private lastTickAt = 0;
	private running = false;
	private systemCleanup: SystemCleanupFn | null = null;

	constructor(private executor: CronExecutor) {}

	setSystemCleanup(fn: SystemCleanupFn): void {
		this.systemCleanup = fn;
	}

	start(): void {
		this.running = true;
	}

	stop(): void {
		this.running = false;
	}

	/**
	 * No-op for piggyback — tick happens on next request.
	 */
	reschedule(): void {
		// Nothing to do — next request will check
	}

	/**
	 * Call this from middleware on each request.
	 * Debounced: only actually ticks if enough time has passed.
	 */
	onRequest(): void {
		if (!this.running) return;

		const now = Date.now();
		if (now - this.lastTickAt < DEBOUNCE_MS) return;

		this.lastTickAt = now;

		// Fire-and-forget — don't block the request
		const tasks: Promise<unknown>[] = [this.executor.tick(), this.executor.recoverStaleLocks()];
		if (this.systemCleanup) {
			tasks.push(this.systemCleanup());
		}

		void Promise.allSettled(tasks).then((results) => {
			for (const r of results) {
				if (r.status === "rejected") {
					console.error("[cron:piggyback] Tick task failed:", r.reason);
				}
			}
			return undefined;
		});
	}
}
