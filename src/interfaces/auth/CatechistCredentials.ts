import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface CatechistCredentials {
	catechistId: number,
	communityOrParish: CommunityOrParish | null,
}