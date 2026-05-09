import type { MassLocation } from "../../enums/MassLocation";
import type { LiturgicalCalendarSummary } from "../liturgicalCalendar/LiturgicalCalendarSummary";

export interface MassResponse {
	id: number,
	title: string,
	dateTime: string,
	location: MassLocation,
	massOfLiturgicalCalendar: LiturgicalCalendarSummary,
	registeredAttendance: boolean
}