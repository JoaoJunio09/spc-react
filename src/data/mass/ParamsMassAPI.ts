import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface ParamsMassAPI {
	communityOrParish?: CommunityOrParish,
	title?: string,
	occurredUntil?: string,
	occurredUntilByMassTitle?: string
}