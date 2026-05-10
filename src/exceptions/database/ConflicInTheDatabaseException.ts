class ConflictInTheDatabaseException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ConflictInTheDatabaseException';
		Object.setPrototypeOf(this, ConflictInTheDatabaseException.prototype);
	}
}

export default ConflictInTheDatabaseException;