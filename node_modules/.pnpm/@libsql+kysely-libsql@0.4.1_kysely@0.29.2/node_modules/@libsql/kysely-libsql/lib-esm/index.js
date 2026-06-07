import * as libsql from "@libsql/client";
import * as kysely from "kysely";
export * as libsql from "@libsql/client";
export class LibsqlDialect {
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
export class LibsqlDriver {
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
export class LibsqlConnection {
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
