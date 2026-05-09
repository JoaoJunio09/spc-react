import type { CommunityOrParish } from "../../enums/CommunityOrParish";
import type { StepOfCatechistResponse } from "../step/StepOfCatechistResponse";

export interface CatechistResponse {
	id: number,
	firstName: string,
	lastName: string,
	communityOrParish: CommunityOrParish,
	step: StepOfCatechistResponse
}