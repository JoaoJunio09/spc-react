import type { StepName } from "../../enums/StepName";
import type { CatechistSummary } from "../catechist/CatechistSummary";

export interface StepByCatechumenResponse {
	id: number,
	stepName: StepName,
	catechists: CatechistSummary[]
}