import type { StepOfCatechistResponse } from "../step/StepOfCatechistResponse";

export interface CatechistResponse {
	id: number,
	firstName: string,
	lastName: string,
	communityOrParish: string,
	step: StepOfCatechistResponse
}