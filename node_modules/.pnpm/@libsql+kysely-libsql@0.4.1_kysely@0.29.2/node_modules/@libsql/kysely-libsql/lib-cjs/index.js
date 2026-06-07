"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibsqlConnection = exports.LibsqlDriver = exports.LibsqlDialect = exports.libsql = void 0;
const libsql = __importStar(require("@libsql/client"));
const kysely = __importStar(require("kysely"));
exports.libsql = __importStar(require("@libsql/client"));
class LibsqlDialect {
    #config;
    constructor(config) {
        this.#config = config;
    }
    createAdapter() {
        return new kysely.SqliteAdapter();
    }
    createDriver() {
        let client;
        let closeClient;
        if ("client" in this.#config) {
            client = this.#config.client;
            closeClient = false;
        }
        else if (this.#config.url !== undefined) {
            client = libsql.createClient(this.#config);
            closeClient = true;
        }
        else {
            throw new Error("Please specify either `client` or `url` in the LibsqlDialect config");
        }
        return new LibsqlDriver(client, closeClient);
    }
    createIntrospector(db) {
        return new kysely.SqliteIntrospector(db);
    }
    createQueryCompiler() {
        return new kysely.SqliteQueryCompiler();
    }
}
exports.LibsqlDialect = LibsqlDialect;
class LibsqlDriver {
    client;
    #closeClient;
    constructor(client, closeClient) {
        this.client = client;
        this.#closeClient = closeClient;
    }
    async init() { }
    async acquireConnection() {
        return new LibsqlConnection(this.client);
    }
    async beginTransaction(connection, _settings) {
        await connection.beginTransaction();
    }
    async commitTransaction(connection) {
        await connection.commitTransaction();
    }
    async rollbackTransaction(connection) {
        await connection.rollbackTransaction();
    }
    async releaseConnection(_conn) { }
    async destroy() {
        if (this.#closeClient) {
            this.client.close();
        }
    }
}
exports.LibsqlDriver = LibsqlDriver;
class LibsqlConnection {
    client;
    #transaction;
    constructor(client) {
        this.client = client;
    }
    async executeQuery(compiledQuery) {
        const target = this.#transaction ?? this.client;
        const result = await target.execute({
            sql: compiledQuery.sql,
            args: compiledQuery.parameters,
        });
        return {
            insertId: result.lastInsertRowid,
            numAffectedRows: BigInt(result.rowsAffected),
            rows: result.rows,
        };
    }
    async beginTransaction() {
        if (this.#transaction) {
            throw new Error("Transaction already in progress");
        }
        this.#transaction = await this.client.transaction();
    }
    async commitTransaction() {
        if (!this.#transaction) {
            throw new Error("No transaction to commit");
        }
        await this.#transaction.commit();
        this.#transaction = undefined;
    }
    async rollbackTransaction() {
        if (!this.#transaction) {
            throw new Error("No transaction to rollback");
        }
        await this.#transaction.rollback();
        this.#transaction = undefined;
    }
    async *streamQuery(_compiledQuery, _chunkSize) {
        throw new Error("Libsql Driver does not support streaming yet");
    }
}
exports.LibsqlConnection = LibsqlConnection;
