import { n as AuthAdapter } from "../types-DZ0waGOT.mjs";
import { Kysely } from "kysely";

//#region src/adapters/kysely.d.ts
interface AuthTables {
  users: UserTable;
  credentials: CredentialTable;
  auth_tokens: AuthTokenTable;
  oauth_accounts: OAuthAccountTable;
  allowed_domains: AllowedDomainTable;
}
interface UserTable {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: number;
  email_verified: number;
  disabled: number;
  data: string | null;
  created_at: string;
  updated_at: string;
}
interface CredentialTable {
  id: string;
  user_id: string;
  public_key: Uint8Array;
  algorithm: number;
  counter: number;
  device_type: string;
  backed_up: number;
  transports: string | null;
  name: string | null;
  created_at: string;
  last_used_at: string;
}
interface AuthTokenTable {
  hash: string;
  user_id: string | null;
  email: string | null;
  type: string;
  role: number | null;
  invited_by: string | null;
  expires_at: string;
  created_at: string;
}
interface OAuthAccountTable {
  provider: string;
  provider_account_id: string;
  user_id: string;
  created_at: string;
}
interface AllowedDomainTable {
  domain: string;
  default_role: number;
  enabled: number;
  created_at: string;
}
declare function createKyselyAdapter<T extends AuthTables>(db: Kysely<T>): AuthAdapter;
declare const AUTH_TABLES_SQL = "\n-- Users (no password_hash)\nCREATE TABLE IF NOT EXISTS users (\n  id TEXT PRIMARY KEY,\n  email TEXT UNIQUE NOT NULL,\n  name TEXT,\n  avatar_url TEXT,\n  role INTEGER NOT NULL DEFAULT 10,\n  email_verified INTEGER NOT NULL DEFAULT 0,\n  disabled INTEGER NOT NULL DEFAULT 0,\n  data TEXT,\n  created_at TEXT NOT NULL,\n  updated_at TEXT NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS idx_users_email ON users(email);\n\n-- Passkey credentials\nCREATE TABLE IF NOT EXISTS credentials (\n  id TEXT PRIMARY KEY,\n  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  public_key BLOB NOT NULL,\n  algorithm INTEGER NOT NULL DEFAULT -7,\n  counter INTEGER NOT NULL DEFAULT 0,\n  device_type TEXT NOT NULL,\n  backed_up INTEGER NOT NULL DEFAULT 0,\n  transports TEXT,\n  name TEXT,\n  created_at TEXT NOT NULL,\n  last_used_at TEXT NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS idx_credentials_user ON credentials(user_id);\n\n-- Auth tokens (magic links, email verification, invites)\nCREATE TABLE IF NOT EXISTS auth_tokens (\n  hash TEXT PRIMARY KEY,\n  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,\n  email TEXT,\n  type TEXT NOT NULL,\n  role INTEGER,\n  invited_by TEXT REFERENCES users(id),\n  expires_at TEXT NOT NULL,\n  created_at TEXT NOT NULL\n);\n\nCREATE INDEX IF NOT EXISTS idx_auth_tokens_email ON auth_tokens(email);\n\n-- OAuth accounts (external provider links)\nCREATE TABLE IF NOT EXISTS oauth_accounts (\n  provider TEXT NOT NULL,\n  provider_account_id TEXT NOT NULL,\n  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  created_at TEXT NOT NULL,\n  PRIMARY KEY (provider, provider_account_id)\n);\n\nCREATE INDEX IF NOT EXISTS idx_oauth_accounts_user ON oauth_accounts(user_id);\n\n-- Allowed domains for self-signup\nCREATE TABLE IF NOT EXISTS allowed_domains (\n  domain TEXT PRIMARY KEY,\n  default_role INTEGER NOT NULL DEFAULT 20,\n  enabled INTEGER NOT NULL DEFAULT 1,\n  created_at TEXT NOT NULL\n);\n";
//#endregion
export { AUTH_TABLES_SQL, AuthTables, createKyselyAdapter };
//# sourceMappingURL=kysely.d.mts.map