import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface ParamsCatechumenAPI {
	fullName?: string,
	stepId?: number,
	catechistId?: number,
	communityOrParish?: CommunityOrParish,
	signal?: AbortSignal
}