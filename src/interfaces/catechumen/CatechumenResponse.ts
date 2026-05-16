import type { CommunityOrParish } from "../../enums/CommunityOrParish";
import type { StepByCatechumenResponse } from "../step/StepByCatechumenResponse";

export interface CatechumenResponse {
	id: number,
	firstName: string,
	lastName: string,
	birthDate: string,
	communityOrParish: CommunityOrParish,
	step: StepByCatechumenResponse,
	currentFrequency: number,
	totalFrequency: number
}