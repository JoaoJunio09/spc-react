import { useEffect, useState } from "react";
import type { LiturgicalCalendarResponse } from "../../../data/liturgicalCalendar/LiturgicalCalendarResponse";
import useLiturgicalCalendarService from "../../../hooks/useLiturgicalCalendarService";

function useLoadLiturgicalCalendar() {
	const [liturgicalCalendars, setLiturgicalCalendars] = useState<LiturgicalCalendarResponse[]>();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadLiturgicalCalendar();
	}, []);

	const liturgicalCalendarService = useLiturgicalCalendarService();

	async function loadLiturgicalCalendar() {
		try {
			setError(null);
			const data: LiturgicalCalendarResponse[] = await liturgicalCalendarService.getAll({});
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