import { LibsqlDialect } from "@libsql/kysely-libsql";

//#region src/db/libsql.ts
/**
* libSQL runtime adapter
*
* Creates a Kysely dialect for libSQL/Turso.
* Loaded at runtime via virtual module.
*/
/**
* Create a libSQL dialect from config
*/
function createDialect(config) {
	return new LibsqlDialect({
		url: config.url,
		authToken: config.authToken
	});
}

//#endregion
export { createDialect };
//# sourceMappingURL=libsql.mjs.map