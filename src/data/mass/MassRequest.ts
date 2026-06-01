import type { CommunityOrParish } from "../../enums/CommunityOrParish";

export interface MassRequest {
	id?: number | null,
	massOfLiturgicalCalendarId: number | null,
	dateTime: string,
	location: string,
	communityOrParish: CommunityOrParish
}