class InvalidClientRequestException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AuthenticationError';
		Object.setPrototypeOf(this, InvalidClientRequestException.prototype);
	}
}

export default InvalidClientRequestException;