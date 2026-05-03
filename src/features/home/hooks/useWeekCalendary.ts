import { useMemo } from "react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";

type DayOfWeek = {
	dayOfWeek: string,
	dayNum: string,
	dateString: string,
	isToday: boolean,
	isMass: boolean
}

type UseWeekCalendaryProps = {
  massesDates?: string[] | null,
	// presences?: [] | null
};

function useWeekCalendary({ massesDates = [] }: UseWeekCalendaryProps) {
	const safeMassesDates = massesDates ?? [];

	const today = new Date();

	const day = today.getDay();
	const diffToMonday = day === 0 ? -6 : 1 - day;

	const monday = new Date(today);
	monday.setDate(today.getDate() + diffToMonday);
	
	const abbreviatedDaysOfTheWeek = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];

	const daysOfWeek = useMemo(() => {
		let arrayDays = [];

		for (let i = 0; i < 7; i++) {
			const current = new Date(monday);
			current.setDate(monday.getDate() + i);

			const { dateString, dayNum } = assembleTheDateAsString(current);

			const dayOfWeekObject:DayOfWeek = {
				dayOfWeek: abbreviatedDaysOfTheWeek[i],
				dayNum: dayNum,
				dateString: dateString,
				isToday: toMarkToday(dateString),
				isMass: safeMassesDates.includes(dateString)
			}

			arrayDays.push(dayOfWeekObject);
		}

		console.log(arrayDays)

		return arrayDays;
	}, [today, day, diffToMonday]);

	return {
		daysOfWeek
	}
}

function toMarkToday(dateString: string): boolean {
	const now = new Date();
	const todayString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;

	return dateString === todayString ? true : false;
}

function assembleTheDateAsString(current: Date): any {
	const year = current.getFullYear();
	const month = String(current.getMonth()+1).padStart(2,'0');
	const dayNum = String(current.getDate()).padStart(2,'0');

	return { dateString: `${year}-${month}-${dayNum}`, dayNum: dayNum };
}

export default useWeekCalendary;