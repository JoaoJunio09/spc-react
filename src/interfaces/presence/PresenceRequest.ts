import type { PresenceStatus } from "../../enums/PresenceStatus";

export interface PresenceRequest {
	id: number | null,
	username: string,
	catechumenId: number,
	massId: number,
	status: PresenceStatus,
	justification: string | null
}