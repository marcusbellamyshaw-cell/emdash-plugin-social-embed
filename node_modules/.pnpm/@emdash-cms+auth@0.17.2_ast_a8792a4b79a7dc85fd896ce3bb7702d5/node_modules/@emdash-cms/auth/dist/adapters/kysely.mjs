import { a as toDeviceType, n as Role, o as toRoleLevel, s as toTokenType } from "../types-ndj-bYfi.mjs";
import { ulid } from "ulidx";

//#region src/adapters/kysely.ts
function createKyselyAdapter(db) {
	const kdb = db;
	return {
		async getUserById(id) {
			const row = await kdb.selectFrom("users").selectAll().where("id", "=", id).executeTakeFirst();
			return row ? rowToUser(row) : null;
		},
		async getUserByEmail(email) {
			const row = await kdb.selectFrom("users").selectAll().where("email", "=", email.toLowerCase()).executeTakeFirst();
			return row ? rowToUser(row) : null;
		},
		async createUser(user) {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const id = ulid();
			const row = {
				id,
				email: user.email.toLowerCase(),
				name: user.name ?? null,
				avatar_url: user.avatarUrl ?? null,
				role: user.role ?? Role.SUBSCRIBER,
				email_verified: user.emailVerified ? 1 : 0,
				disabled: 0,
				data: user.data ? JSON.stringify(user.data) : null,
				created_at: now,
				updated_at: now
			};
			await kdb.insertInto("users").values(row).execute();
			return {
				id,
				email: row.email,
				name: user.name ?? null,
				avatarUrl: user.avatarUrl ?? null,
				role: toRoleLevel(row.role),
				emailVerified: row.email_verified === 1,
				disabled: false,
				data: user.data ?? null,
				createdAt: new Date(now),
				updatedAt: new Date(now)
			};
		},
		async updateUser(id, data) {
			const update = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
			if (data.email !== void 0) update.email = data.email.toLowerCase();
			if (data.name !== void 0) update.name = data.name;
			if (data.avatarUrl !== void 0) update.avatar_url = data.avatarUrl;
			if (data.role !== void 0) update.role = data.role;
			if (data.emailVerified !== void 0) update.email_verified = data.emailVerified ? 1 : 0;
			if (data.disabled !== void 0) update.disabled = data.disabled ? 1 : 0;
			if (data.data !== void 0) update.data = data.data ? JSON.stringify(data.data) : null;
			await kdb.updateTable("users").set(update).where("id", "=", id).execute();
		},
		async deleteUser(id) {
			await kdb.deleteFrom("users").where("id", "=", id).execute();
		},
		async countUsers() {
			return (await kdb.selectFrom("users").select((eb) => eb.fn.countAll().as("count")).executeTakeFirstOrThrow()).count;
		},
		async getUsers(options) {
			const limit = Math.min(options?.limit ?? 20, 100);
			let query = kdb.selectFrom("users").leftJoin("credentials", "users.id", "credentials.user_id").selectAll("users").select((eb) => [eb.fn.count("credentials.id").as("credential_count"), eb.fn.max("credentials.last_used_at").as("last_login")]).groupBy("users.id").orderBy("users.created_at", "desc").limit(limit + 1);
			if (options?.search) {
				const searchPattern = `%${options.search}%`;
				query = query.where((eb) => eb.or([eb("users.email", "like", searchPattern), eb("users.name", "like", searchPattern)]));
			}
			if (options?.role !== void 0) query = query.where("users.role", "=", options.role);
			if (options?.cursor) {
				const cursorUser = await kdb.selectFrom("users").select("created_at").where("id", "=", options.cursor).executeTakeFirst();
				if (cursorUser) query = query.where("users.created_at", "<", cursorUser.created_at);
			}
			const rows = await query.execute();
			const userIds = rows.slice(0, limit).map((r) => r.id);
			const oauthAccounts = userIds.length > 0 ? await kdb.selectFrom("oauth_accounts").select(["user_id", "provider"]).where("user_id", "in", userIds).execute() : [];
			const oauthByUser = /* @__PURE__ */ new Map();
			for (const account of oauthAccounts) {
				const providers = oauthByUser.get(account.user_id) ?? [];
				providers.push(account.provider);
				oauthByUser.set(account.user_id, providers);
			}
			const hasMore = rows.length > limit;
			const items = rows.slice(0, limit).map((row) => ({
				id: row.id,
				email: row.email,
				name: row.name,
				avatarUrl: row.avatar_url,
				role: toRoleLevel(row.role),
				emailVerified: row.email_verified === 1,
				disabled: row.disabled === 1,
				data: row.data ? JSON.parse(row.data) : null,
				createdAt: new Date(row.created_at),
				updatedAt: new Date(row.updated_at),
				lastLogin: row.last_login ? new Date(row.last_login) : null,
				credentialCount: row.credential_count ?? 0,
				oauthProviders: oauthByUser.get(row.id) ?? []
			}));
			return {
				items,
				nextCursor: hasMore ? items.at(-1)?.id : void 0
			};
		},
		async getUserWithDetails(id) {
			const user = await kdb.selectFrom("users").selectAll().where("id", "=", id).executeTakeFirst();
			if (!user) return null;
			const [credentials, oauthAccounts] = await Promise.all([kdb.selectFrom("credentials").selectAll().where("user_id", "=", id).orderBy("created_at", "desc").execute(), kdb.selectFrom("oauth_accounts").selectAll().where("user_id", "=", id).execute()]);
			const lastLogin = credentials.reduce((latest, cred) => {
				const lastUsed = new Date(cred.last_used_at);
				return !latest || lastUsed > latest ? lastUsed : latest;
			}, null);
			return {
				user: rowToUser(user),
				credentials: credentials.map(rowToCredential),
				oauthAccounts: oauthAccounts.map(rowToOAuthAccount),
				lastLogin
			};
		},
		async countAdmins() {
			return (await kdb.selectFrom("users").select((eb) => eb.fn.countAll().as("count")).where("role", "=", Role.ADMIN).where("disabled", "=", 0).executeTakeFirstOrThrow()).count;
		},
		async getCredentialById(id) {
			const row = await kdb.selectFrom("credentials").selectAll().where("id", "=", id).executeTakeFirst();
			return row ? rowToCredential(row) : null;
		},
		async getCredentialsByUserId(userId) {
			return (await kdb.selectFrom("credentials").selectAll().where("user_id", "=", userId).execute()).map(rowToCredential);
		},
		async createCredential(credential) {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const row = {
				id: credential.id,
				user_id: credential.userId,
				public_key: credential.publicKey,
				algorithm: credential.algorithm,
				counter: credential.counter,
				device_type: credential.deviceType,
				backed_up: credential.backedUp ? 1 : 0,
				transports: credential.transports.length > 0 ? JSON.stringify(credential.transports) : null,
				name: credential.name ?? null,
				created_at: now,
				last_used_at: now
			};
			await kdb.insertInto("credentials").values(row).execute();
			return {
				id: credential.id,
				userId: credential.userId,
				publicKey: credential.publicKey,
				algorithm: credential.algorithm,
				counter: credential.counter,
				deviceType: credential.deviceType,
				backedUp: credential.backedUp,
				transports: credential.transports,
				name: credential.name ?? null,
				createdAt: new Date(now),
				lastUsedAt: new Date(now)
			};
		},
		async updateCredentialCounter(id, counter) {
			await kdb.updateTable("credentials").set({
				counter,
				last_used_at: (/* @__PURE__ */ new Date()).toISOString()
			}).where("id", "=", id).execute();
		},
		async updateCredentialName(id, name) {
			await kdb.updateTable("credentials").set({ name }).where("id", "=", id).execute();
		},
		async deleteCredential(id) {
			await kdb.deleteFrom("credentials").where("id", "=", id).execute();
		},
		async countCredentialsByUserId(userId) {
			return (await kdb.selectFrom("credentials").select((eb) => eb.fn.countAll().as("count")).where("user_id", "=", userId).executeTakeFirstOrThrow()).count;
		},
		async createToken(token) {
			const row = {
				hash: token.hash,
				user_id: token.userId ?? null,
				email: token.email ?? null,
				type: token.type,
				role: token.role ?? null,
				invited_by: token.invitedBy ?? null,
				expires_at: token.expiresAt.toISOString(),
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			await kdb.insertInto("auth_tokens").values(row).execute();
		},
		async getToken(hash, type) {
			const row = await kdb.selectFrom("auth_tokens").selectAll().where("hash", "=", hash).where("type", "=", type).executeTakeFirst();
			return row ? rowToAuthToken(row) : null;
		},
		async deleteToken(hash) {
			await kdb.deleteFrom("auth_tokens").where("hash", "=", hash).execute();
		},
		async deleteExpiredTokens() {
			await kdb.deleteFrom("auth_tokens").where("expires_at", "<", (/* @__PURE__ */ new Date()).toISOString()).execute();
		},
		async getOAuthAccount(provider, providerAccountId) {
			const row = await kdb.selectFrom("oauth_accounts").selectAll().where("provider", "=", provider).where("provider_account_id", "=", providerAccountId).executeTakeFirst();
			return row ? rowToOAuthAccount(row) : null;
		},
		async getOAuthAccountsByUserId(userId) {
			return (await kdb.selectFrom("oauth_accounts").selectAll().where("user_id", "=", userId).execute()).map(rowToOAuthAccount);
		},
		async createOAuthAccount(account) {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const row = {
				provider: account.provider,
				provider_account_id: account.providerAccountId,
				user_id: account.userId,
				created_at: now
			};
			await kdb.insertInto("oauth_accounts").values(row).execute();
			return {
				provider: account.provider,
				providerAccountId: account.providerAccountId,
				userId: account.userId,
				createdAt: new Date(now)
			};
		},
		async deleteOAuthAccount(provider, providerAccountId) {
			await kdb.deleteFrom("oauth_accounts").where("provider", "=", provider).where("provider_account_id", "=", providerAccountId).execute();
		},
		async getAllowedDomain(domain) {
			const row = await kdb.selectFrom("allowed_domains").selectAll().where("domain", "=", domain.toLowerCase()).executeTakeFirst();
			return row ? rowToAllowedDomain(row) : null;
		},
		async getAllowedDomains() {
			return (await kdb.selectFrom("allowed_domains").selectAll().execute()).map(rowToAllowedDomain);
		},
		async createAllowedDomain(domain, defaultRole) {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const row = {
				domain: domain.toLowerCase(),
				default_role: defaultRole,
				enabled: 1,
				created_at: now
			};
			await kdb.insertInto("allowed_domains").values(row).execute();
			return {
				domain: row.domain,
				defaultRole,
				enabled: true,
				createdAt: new Date(now)
			};
		},
		async updateAllowedDomain(domain, enabled, defaultRole) {
			const update = { enabled: enabled ? 1 : 0 };
			if (defaultRole !== void 0) update.default_role = defaultRole;
			await kdb.updateTable("allowed_domains").set(update).where("domain", "=", domain.toLowerCase()).execute();
		},
		async deleteAllowedDomain(domain) {
			await kdb.deleteFrom("allowed_domains").where("domain", "=", domain.toLowerCase()).execute();
		}
	};
}
function rowToUser(row) {
	return {
		id: row.id,
		email: row.email,
		name: row.name,
		avatarUrl: row.avatar_url,
		role: toRoleLevel(row.role),
		emailVerified: row.email_verified === 1,
		disabled: row.disabled === 1,
		data: row.data ? JSON.parse(row.data) : null,
		createdAt: new Date(row.created_at),
		updatedAt: new Date(row.updated_at)
	};
}
function rowToCredential(row) {
	return {
		id: row.id,
		userId: row.user_id,
		publicKey: row.public_key,
		algorithm: row.algorithm,
		counter: row.counter,
		deviceType: toDeviceType(row.device_type),
		backedUp: row.backed_up === 1,
		transports: row.transports ? JSON.parse(row.transports) : [],
		name: row.name,
		createdAt: new Date(row.created_at),
		lastUsedAt: new Date(row.last_used_at)
	};
}
function rowToAuthToken(row) {
	return {
		hash: row.hash,
		userId: row.user_id,
		email: row.email,
		type: toTokenType(row.type),
		role: row.role != null ? toRoleLevel(row.role) : null,
		invitedBy: row.invited_by,
		expiresAt: new Date(row.expires_at),
		createdAt: new Date(row.created_at)
	};
}
function rowToOAuthAccount(row) {
	return {
		provider: row.provider,
		providerAccountId: row.provider_account_id,
		userId: row.user_id,
		createdAt: new Date(row.created_at)
	};
}
function rowToAllowedDomain(row) {
	return {
		domain: row.domain,
		defaultRole: toRoleLevel(row.default_role),
		enabled: row.enabled === 1,
		createdAt: new Date(row.created_at)
	};
}
const AUTH_TABLES_SQL = `
-- Users (no password_hash)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  role INTEGER NOT NULL DEFAULT 10,
  email_verified INTEGER NOT NULL DEFAULT 0,
  disabled INTEGER NOT NULL DEFAULT 0,
  data TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Passkey credentials
CREATE TABLE IF NOT EXISTS credentials (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  public_key BLOB NOT NULL,
  algorithm INTEGER NOT NULL DEFAULT -7,
  counter INTEGER NOT NULL DEFAULT 0,
  device_type TEXT NOT NULL,
  backed_up INTEGER NOT NULL DEFAULT 0,
  transports TEXT,
  name TEXT,
  created_at TEXT NOT NULL,
  last_used_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_credentials_user ON credentials(user_id);

-- Auth tokens (magic links, email verification, invites)
CREATE TABLE IF NOT EXISTS auth_tokens (
  hash TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  email TEXT,
  type TEXT NOT NULL,
  role INTEGER,
  invited_by TEXT REFERENCES users(id),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auth_tokens_email ON auth_tokens(email);

-- OAuth accounts (external provider links)
CREATE TABLE IF NOT EXISTS oauth_accounts (
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (provider, provider_account_id)
);

CREATE INDEX IF NOT EXISTS idx_oauth_accounts_user ON oauth_accounts(user_id);

-- Allowed domains for self-signup
CREATE TABLE IF NOT EXISTS allowed_domains (
  domain TEXT PRIMARY KEY,
  default_role INTEGER NOT NULL DEFAULT 20,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);
`;

//#endregion
export { AUTH_TABLES_SQL, createKyselyAdapter };
//# sourceMappingURL=kysely.mjs.map