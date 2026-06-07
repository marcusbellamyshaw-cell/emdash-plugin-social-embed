//#region src/types.d.ts
/**
 * Core types for @emdash-cms/auth
 */
declare const Role: {
  readonly SUBSCRIBER: 10;
  readonly CONTRIBUTOR: 20;
  readonly AUTHOR: 30;
  readonly EDITOR: 40;
  readonly ADMIN: 50;
};
type RoleLevel = (typeof Role)[keyof typeof Role];
type RoleName = keyof typeof Role;
declare function roleFromLevel(level: number): RoleName | undefined;
declare function toRoleLevel(value: number): RoleLevel;
declare function toDeviceType(value: string): DeviceType;
declare function toTokenType(value: string): TokenType;
declare function roleToLevel(name: RoleName): RoleLevel;
interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: RoleLevel;
  emailVerified: boolean;
  disabled: boolean;
  data: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
interface NewUser {
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  role?: RoleLevel;
  emailVerified?: boolean;
  data?: Record<string, unknown> | null;
}
interface UpdateUser {
  email?: string;
  name?: string | null;
  avatarUrl?: string | null;
  role?: RoleLevel;
  emailVerified?: boolean;
  disabled?: boolean;
  data?: Record<string, unknown> | null;
}
type AuthenticatorTransport = "usb" | "nfc" | "ble" | "internal" | "hybrid";
type DeviceType = "singleDevice" | "multiDevice";
interface Credential {
  id: string;
  userId: string;
  publicKey: Uint8Array;
  algorithm: number;
  counter: number;
  deviceType: DeviceType;
  backedUp: boolean;
  transports: AuthenticatorTransport[];
  name: string | null;
  createdAt: Date;
  lastUsedAt: Date;
}
interface NewCredential {
  id: string;
  userId: string;
  publicKey: Uint8Array;
  algorithm: number;
  counter: number;
  deviceType: DeviceType;
  backedUp: boolean;
  transports: AuthenticatorTransport[];
  name?: string | null;
}
interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}
interface SessionData {
  userId: string;
  expiresAt: number;
}
type TokenType = "magic_link" | "email_verify" | "invite" | "recovery";
interface AuthToken {
  hash: string;
  userId: string | null;
  email: string | null;
  type: TokenType;
  role: RoleLevel | null;
  invitedBy: string | null;
  expiresAt: Date;
  createdAt: Date;
}
interface NewAuthToken {
  hash: string;
  userId?: string | null;
  email?: string | null;
  type: TokenType;
  role?: RoleLevel | null;
  invitedBy?: string | null;
  expiresAt: Date;
}
interface OAuthAccount {
  provider: string;
  providerAccountId: string;
  userId: string;
  createdAt: Date;
}
interface NewOAuthAccount {
  provider: string;
  providerAccountId: string;
  userId: string;
}
interface OAuthConnection {
  id: string;
  name: string;
  provider: "oidc" | "github" | "google";
  clientId: string;
  clientSecretEnc: string;
  issuerUrl: string | null;
  config: Record<string, unknown> | null;
  enabled: boolean;
  createdAt: Date;
}
interface OAuthClient {
  id: string;
  name: string;
  secretHash: string;
  redirectUris: string[];
  scopes: string[];
  createdAt: Date;
}
interface AllowedDomain {
  domain: string;
  defaultRole: RoleLevel;
  enabled: boolean;
  createdAt: Date;
}
/** Extended user with list view computed fields */
interface UserListItem extends User {
  lastLogin: Date | null;
  credentialCount: number;
  oauthProviders: string[];
}
/** User with full details including related data */
interface UserWithDetails {
  user: User;
  credentials: Credential[];
  oauthAccounts: OAuthAccount[];
  lastLogin: Date | null;
}
interface AuthAdapter {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: NewUser): Promise<User>;
  updateUser(id: string, data: UpdateUser): Promise<void>;
  deleteUser(id: string): Promise<void>;
  countUsers(): Promise<number>;
  getUsers(options?: {
    search?: string;
    role?: number;
    cursor?: string;
    limit?: number;
  }): Promise<{
    items: UserListItem[];
    nextCursor?: string;
  }>;
  getUserWithDetails(id: string): Promise<UserWithDetails | null>;
  countAdmins(): Promise<number>;
  getCredentialById(id: string): Promise<Credential | null>;
  getCredentialsByUserId(userId: string): Promise<Credential[]>;
  createCredential(credential: NewCredential): Promise<Credential>;
  updateCredentialCounter(id: string, counter: number): Promise<void>;
  updateCredentialName(id: string, name: string | null): Promise<void>;
  deleteCredential(id: string): Promise<void>;
  countCredentialsByUserId(userId: string): Promise<number>;
  createToken(token: NewAuthToken): Promise<void>;
  getToken(hash: string, type: TokenType): Promise<AuthToken | null>;
  deleteToken(hash: string): Promise<void>;
  deleteExpiredTokens(): Promise<void>;
  getOAuthAccount(provider: string, providerAccountId: string): Promise<OAuthAccount | null>;
  getOAuthAccountsByUserId(userId: string): Promise<OAuthAccount[]>;
  createOAuthAccount(account: NewOAuthAccount): Promise<OAuthAccount>;
  deleteOAuthAccount(provider: string, providerAccountId: string): Promise<void>;
  getAllowedDomain(domain: string): Promise<AllowedDomain | null>;
  getAllowedDomains(): Promise<AllowedDomain[]>;
  createAllowedDomain(domain: string, defaultRole: RoleLevel): Promise<AllowedDomain>;
  updateAllowedDomain(domain: string, enabled: boolean, defaultRole?: RoleLevel): Promise<void>;
  deleteAllowedDomain(domain: string): Promise<void>;
}
interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}
interface EmailAdapter {
  send(message: EmailMessage): Promise<void>;
}
declare class AuthError extends Error {
  code: AuthErrorCode;
  constructor(code: AuthErrorCode, message?: string);
}
type AuthErrorCode = "invalid_credentials" | "invalid_token" | "token_expired" | "user_not_found" | "user_exists" | "credential_exists" | "max_credentials" | "email_not_verified" | "signup_not_allowed" | "domain_not_allowed" | "forbidden" | "unauthorized" | "rate_limited" | "invalid_request" | "internal_error";
//#endregion
export { toDeviceType as A, TokenType as C, UserWithDetails as D, UserListItem as E, toTokenType as M, roleFromLevel as O, SessionData as S, User as T, OAuthConnection as _, AuthToken as a, RoleName as b, DeviceType as c, NewAuthToken as d, NewCredential as f, OAuthClient as g, OAuthAccount as h, AuthErrorCode as i, toRoleLevel as j, roleToLevel as k, EmailAdapter as l, NewUser as m, AuthAdapter as n, AuthenticatorTransport as o, NewOAuthAccount as p, AuthError as r, Credential as s, AllowedDomain as t, EmailMessage as u, Role as v, UpdateUser as w, Session as x, RoleLevel as y };
//# sourceMappingURL=types-DZ0waGOT.d.mts.map