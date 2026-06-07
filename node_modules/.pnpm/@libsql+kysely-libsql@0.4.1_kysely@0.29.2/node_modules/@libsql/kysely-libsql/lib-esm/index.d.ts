import * as libsql from "@libsql/client";
import * as kysely from "kysely";
export * as libsql from "@libsql/client";
export type LibsqlDialectConfig = {
    client: libsql.Client;
} | libsql.Config;
export declare class LibsqlDialect implements kysely.Dialect {
    #private;
    constructor(config: LibsqlDialectConfig);
    createAdapter(): kysely.DialectAdapter;
    createDriver(): kysely.Driver;
    createIntrospector(db: kysely.Kysely<any>): kysely.DatabaseIntrospector;
    createQueryCompiler(): kysely.QueryCompiler;
}
export declare class LibsqlDriver implements kysely.Driver {
    #private;
    client: libsql.Client;
    constructor(client: libsql.Client, closeClient: boolean);
    init(): Promise<void>;
    acquireConnection(): Promise<LibsqlConnection>;
    beginTransaction(connection: LibsqlConnection, _settings: kysely.TransactionSettings): Promise<void>;
    commitTransaction(connection: LibsqlConnection): Promise<void>;
    rollbackTransaction(connection: LibsqlConnection): Promise<void>;
    releaseConnection(_conn: LibsqlConnection): Promise<void>;
    destroy(): Promise<void>;
}
export declare class LibsqlConnection implements kysely.DatabaseConnection {
    #private;
    client: libsql.Client;
    constructor(client: libsql.Client);
    executeQuery<R>(compiledQuery: kysely.CompiledQuery): Promise<kysely.QueryResult<R>>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    streamQuery<R>(_compiledQuery: kysely.CompiledQuery, _chunkSize: number): AsyncIterableIterator<kysely.QueryResult<R>>;
}
