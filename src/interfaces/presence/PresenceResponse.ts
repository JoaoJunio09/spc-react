import type { PresenceStatus } from "../../types/PresenceStatus";
import type { CatechistSummary } from "../catechist/CatechistSummary";
import type { CatechumenByPresenceResponse } from "../catechumen/CatechumenByPresenceResponse";
import type { MassResponse } from "../mass/MassResponse";

export interface PresenceResponse {
	id: number,
	catechumen: CatechumenByPresenceResponse,
	mass: MassResponse,
	catechist: CatechistSummary,
	status: PresenceStatus | null,
	justification: string | null
}