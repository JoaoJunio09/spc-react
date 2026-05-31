import type { CommunityOrParish } from "../../enums/CommunityOrParish"

export interface Token {
	username: string,
	fullName: string,
	communityOrParish?: CommunityOrParish,
	roles: string[],
	authenticated: boolean,
	created: Date,
	expiration: Date,
	accessToken: string,
	refreshToken: string
}