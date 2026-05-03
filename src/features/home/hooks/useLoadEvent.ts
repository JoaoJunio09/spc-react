import { useState } from "react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import type { PresenceResponse } from "../../../interfaces/presence/PresenceResponse";
import { UtilsDate } from "../../../utils/UtilsDate";

type UseLoadEventProps = {
	masses: MassResponse[],
	presences: PresenceResponse[],
}

type Event = {
	massId?: number,
	massDate?: string,
	massLocation?: string,
	title?: string,
	isRegisteredPresence?: boolean | undefined,
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
					massLocation: locationMontage(mass),
					isRegisteredPresence: catechistRegisteredPresence(presences, mass.id),
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

function catechistRegisteredPresence(presences: PresenceResponse[], massId: number): boolean | undefined {
	const catechistStorage = sessionStorage.getItem('catechist');
	if (!catechistStorage) return;

	const catechist = JSON.parse(catechistStorage);

	if (!presences) return;
	
	return presences.some(p => 
		p.mass.id === massId &&
		p.catechist.id === catechist.id
	);
}

export default useLoadEvent;