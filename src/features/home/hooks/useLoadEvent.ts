import { useCallback, useState } from "react";
import type { MassResponse } from "../../../data/mass/MassResponse";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { PresenceUserSummary } from "../../../data/presence/PresenceUserSummaryByMass";
import usePresenceService from "../../../hooks/usePresenceService";

type UseLoadEventProps = {
	masses: MassResponse[],
}

export type Event = {
	massId?: number,
	massDate?: string,
	massDateTime?: string,
	massLocation?: string,
	title?: string,
	isEvent: boolean,
	summary?: PresenceUserSummary[]
}

const year = new Date().getFullYear();
const month = String(new Date().getMonth()+1).padStart(2,'0');
const dayNum = String(new Date().getDate()).padStart(2,'0');
const dateString = `${year}-${month}-${dayNum}`;

function formatDateLabel(date: string): string {
  const day = date.slice(8, 10).replace(/^0/, '');
  const month = date.slice(5, 7);
  return `${day} de ${UtilsDate.returnsMonthAsAString(month)}`;
}

function useLoadEvent({ masses }: UseLoadEventProps){
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(false);

	const presenceService = usePresenceService();

	const loadEvent = useCallback(async (date: string) => {
		const foundEvents: Event[] = [];
		let isMassToday: boolean = false;

		setLoading(true);

		await Promise.all(
			masses.map(async (mass) => {
				const summary = await presenceService.getSummaryByMass({ massId: mass.id });
				if (UtilsDate.formatDateTimeThisMissaForDate(mass.dateTime) === date) {
					isMassToday = true;

					foundEvents.push({
						massId: mass.id,
						title: mass.title,
						massDate: dateMontage(mass),
						massDateTime: mass.dateTime,
						massLocation: locationMontage(mass),
						isEvent: true,
						summary: summary
					});
				}
			})
		).finally(() => {
			setLoading(false);
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
					title: `Não há missa no dia ${formatDateLabel(date)}`,
					isEvent: false
				}]);
			}
		}
	}, [masses, presenceService]);

	return {
		events,
		loadEvent,
		loading
	}
}

function dateMontage(mass: MassResponse): string {
	let day = mass.dateTime.slice(8, 10);
	let month = mass.dateTime.slice(5, 7);
	return `${day} de ${UtilsDate.returnsMonthAsAString(month)}`;
}

function locationMontage(mass: MassResponse) {
	if (mass.location === 'MATRIZ') {
		return 'Matriz Paróquia São Sebastião';
	} else {
		return 'Capela do Divino Espírito Santo';
	}
}

export default useLoadEvent;