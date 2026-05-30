export interface Token {
	username: string,
	authenticated: boolean,
	created: Date,
	expiration: Date,
	accessToken: string,
	refreshToken: string
}