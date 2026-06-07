//#region src/database/errors.ts
/**
* Database error types. Kept in their own module (no driver imports) so the
* public package barrel can re-export them without dragging native database
* drivers into the module graph of consumers that picked a different dialect.
*/
var EmDashDatabaseError = class extends Error {
	constructor(message, cause) {
		super(message);
		this.cause = cause;
		this.name = "EmDashDatabaseError";
	}
};

//#endregion
export { EmDashDatabaseError as t };
//# sourceMappingURL=errors-9P_FDrJ_.mjs.map