class InvalidOrEmptyFields extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidOrEmptyFields';
		Object.setPrototypeOf(this, InvalidOrEmptyFields.prototype);
	}
}

export default InvalidOrEmptyFields;