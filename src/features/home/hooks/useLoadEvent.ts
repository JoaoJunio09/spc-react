import { useState } from "react";
import type { MassResponse } from "../../../data/mass/MassResponse";
import type { PresenceResponse } from "../../../data/presence/PresenceResponse";
import { UtilsDate } from "../../../utils/UtilsDate";

type UseLoadEventProps = {
	masses: MassResponse[],
	presences: PresenceResponse[],
}

export type Event = {
	massId?: number,
	massDate?: string,
	massDateTime?: string,
	massLocation?: string,
	title?: string,
	isEvent: boolean
}

const year = new Date().getFullYear();
const month = String(new Date().getMonth()+1).padStart(2,'0');
const dayNum = String(new Date().getDate()).padStart(2,'0');
const dateString = `${year}-${month}-${dayNum}`;

function useLoadEvent({ masses, presences }: UseLoadEventProps){
	const [events, setEvents] = useState<Event[]>([]);

	function loadEvent(date: string) {
		const foundEvents: Event[] = [];
		let isMassToday: boolean = false;

		masses.forEach(mass => {
			if (UtilsDate.formatDateTimeThisMissaForDate(mass.dateTime) === date) {
				isMassToday = true;

				foundEvents.push({
					massId: mass.id,
					title: mass.title,
					massDate: dateMontage(mass),
					massDateTime: mass.dateTime,
					massLocation: locationMontage(mass),
					isEvent: true
				});
			}
		});

		if (foundEvents.length > 0) {
			setEvents(foundEvents);
			return;
		}

		if (!isMassToday) {
			if (date === dateString) {
				setEvents([{
					title: 'Não há missa hoje',
					isEvent: false
				}]);
			}
			else {
				setEvents([{
					title: `Não há missa na data ${date}`,
					isEvent: false
				}]);
			}
		}
	}

	return {
		events,
		loadEvent
	}
}

function dateMontage(mass: MassResponse): string {
	let day = mass.dateTime.slice(8, 10);
	let month = mass.dateTime.slice(5, 7);
	return `${day} de ${UtilsDate.returnsMonthAsAString(month)}`;
}

function locationMontage(mass: MassResponse) {
	return `${UtilsDate.formatDateTimeThisMissaForTime(mass.dateTime)}h, na ${mass.location === "MATRIZ" ? "Matriz" : "Capela do Divino"}`;
}

export default useLoadEvent;