import type { CommunityOrParish } from "../../enums/CommunityOrParish";
import type { PageableParamsAPI } from "../pageable/PageableParamsAPI";

export interface ParamsCatechumenAPI {
	pageable?: PageableParamsAPI,
	fullName?: string,
	stepId?: number,
	catechistId?: number,
	communityOrParish?: CommunityOrParish,
	signal?: AbortSignal
}