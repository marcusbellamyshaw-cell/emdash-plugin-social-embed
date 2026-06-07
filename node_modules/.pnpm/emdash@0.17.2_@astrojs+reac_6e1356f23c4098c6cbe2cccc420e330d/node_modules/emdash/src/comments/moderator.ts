/**
 * Built-in Default Comment Moderator
 *
 * Registers comment:moderate as an exclusive hook.
 * Implements the 4-step decision logic:
 *   1. Auto-approve authenticated CMS users (if configured)
 *   2. If moderation is "none" → approved
 *   3. If moderation is "first_time" and returning commenter → approved
 *   4. Otherwise → pending
 *
 * This moderator does not read `metadata` — it only uses collection settings
 * and prior approval count. Plugin moderators (AI, Akismet) replace this.
 */

import type { CommentModerateEvent, ModerationDecision, PluginContext } from "../plugins/types.js";

/** Plugin ID for the built-in default comment moderator */
export const DEFAULT_COMMENT_MODERATOR_PLUGIN_ID = "emdash-default-comment-moderator";

/**
 * The comment:moderate handler for the built-in default moderator.
 */
export async function defaultCommentModerate(
	event: CommentModerateEvent,
	_ctx: PluginContext,
): Promise<ModerationDecision> {
	const { comment, collectionSettings, priorApprovedCount } = event;

	// 1. Auto-approve authenticated CMS users if configured
	if (collectionSettings.commentsAutoApproveUsers && comment.authorUserId) {
		return { status: "approved", reason: "Authenticated CMS user" };
	}

	// 2. If moderation is "none" → approved
	if (collectionSettings.commentsModeration === "none") {
		return { status: "approved", reason: "Moderation disabled" };
	}

	// 3. If moderation is "first_time" and returning commenter → approved
	if (collectionSettings.commentsModeration === "first_time" && priorApprovedCount > 0) {
		return { status: "approved", reason: "Returning commenter" };
	}

	// 4. Otherwise → pending
	return { status: "pending", reason: "Held for review" };
}
