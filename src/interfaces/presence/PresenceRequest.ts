import type { PresenceStatus } from "../../enums/PresenceStatus";

export interface PresenceRequest {
	id: number | null,
	catechistId: number,
	catechumenId: number,
	massId: number,
	status: PresenceStatus,
	justification: string | null
}