import type { PresenceStatus } from "../../enums/PresenceStatus";
import type { CatechumenByPresenceResponse } from "../catechumen/CatechumenByPresenceResponse";
import type { MassResponse } from "../mass/MassResponse";
import type { UserSummary } from "../user/UserSummary";

export interface PresenceResponse {
	id: number,
	user: UserSummary,
	catechumen: CatechumenByPresenceResponse,
	mass: MassResponse,
	status: PresenceStatus | null,
	justification: string | null
}