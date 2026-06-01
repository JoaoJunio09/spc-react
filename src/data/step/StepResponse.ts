import type { CommunityOrParish } from "../../enums/CommunityOrParish";
import type { StepName } from "../../enums/StepName";
import type { CatechistSummary } from "../catechist/CatechistSummary";
import type { CatechumenByPresenceResponse } from "../catechumen/CatechumenByPresenceResponse";

export interface StepResponse {
	id: number,
	stepName: StepName,
	communityOrParish: CommunityOrParish,
	catechists: CatechistSummary[],
	catechumes: CatechumenByPresenceResponse[]
}