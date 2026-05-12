import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface ParamsMassAPI {
	communityOrParish?: CommunityOrParish,
	occurredUntil?: string
}