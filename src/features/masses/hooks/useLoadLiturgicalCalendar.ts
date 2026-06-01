import { useEffect, useState } from "react";
import type { liturgicalCalendarResponse } from "../../../data/liturgicalCalendar/LiturgicalCalendarResponse";
import LirtugicalCalendarService from "../../../services/LiturgicalCalendarService";

function useLoadLiturgicalCalendar() {
	const [liturgicalCalendars, setLiturgicalCalendars] = useState<liturgicalCalendarResponse[]>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadLiturgicalCalendar();
	}, []);

	const liturgicalCalendarService: LirtugicalCalendarService = new LirtugicalCalendarService();

	async function loadLiturgicalCalendar() {
		try {
			setError(null);
			const data: liturgicalCalendarResponse[] = await liturgicalCalendarService.getAll({});
			setLiturgicalCalendars(data);
		}
		catch (err) {
			setError('Erro ao carregar o Calendário Litúrgico');
		}
	}

	return {
		liturgicalCalendars,
		error
	}
}

export default useLoadLiturgicalCalendar;