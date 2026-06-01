import type { StepName } from "../../enums/StepName";
import type { CatechistSummary } from "../catechist/CatechistSummary";

export interface CatechumenByPresenceResponse {
	id: number,
	fullName: string,
	step: StepName,
	catechists: CatechistSummary[]
}