import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface ParamsCatechistAPI {
	stepId?: number,
	username?: string,
	fullName?: string,
	communityOrParish?: CommunityOrParish
}