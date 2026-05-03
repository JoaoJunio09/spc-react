import type { MassLocation } from "../../types/MassLocation";

export interface MassResponse {
	id: number,
	title: string,
	dateTime: string,
	location: MassLocation,
	massOfLicaturgicalCalendarId: number,
	registeredAttendance: boolean
};