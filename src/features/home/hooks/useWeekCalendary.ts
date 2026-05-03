import { useMemo } from "react";

type DayOfWeek = {
	dayOfWeek: string,
	dayNum: string,
	dateString: string,
	isToday: boolean,
	isMass: boolean
}

type UseWeekCalendaryProps = {
  massesDates?: string[] | null,
};

function useWeekCalendary({ massesDates = [] }: UseWeekCalendaryProps) {
	const safeMassesDates = massesDates ?? [];
	const abbreviatedDaysOfTheWeek = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];

	const daysOfWeek = useMemo(() => {
		const today = new Date();

		const day = today.getDay();
		const diffToMonday = day === 0 ? -6 : 1 - day;

		const monday = new Date(today);
		monday.setDate(today.getDate() + diffToMonday);

		const todayString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

		let arrayDays: DayOfWeek[] = [];

		for (let i = 0; i < 7; i++) {
			const current = new Date(monday);
			current.setDate(monday.getDate() + i);

			const { dateString, dayNum } = assembleTheDateAsString(current);

			arrayDays.push({
				dayOfWeek: abbreviatedDaysOfTheWeek[i],
				dayNum: dayNum,
				dateString: dateString,
				isToday: dateString === todayString,
				isMass: safeMassesDates.includes(dateString)
			});
		}

		return arrayDays;
	}, [safeMassesDates]);

	return {
		daysOfWeek
	}
}

function assembleTheDateAsString(current: Date): any {
	const year = current.getFullYear();
	const month = String(current.getMonth()+1).padStart(2,'0');
	const dayNum = String(current.getDate()).padStart(2,'0');

	return { dateString: `${year}-${month}-${dayNum}`, dayNum: dayNum };
}

export default useWeekCalendary;