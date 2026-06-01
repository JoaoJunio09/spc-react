import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface ParamsCatechistAPI {
	stepId?: number,
	fullName?: string,
	communityOrParish?: CommunityOrParish
}