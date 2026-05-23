import { useQuery } from "@tanstack/react-query";
import LiturgicalCalendarService from "../../../services/LiturgicalCalendarService";

const liturgicalService: LiturgicalCalendarService = new LiturgicalCalendarService();

function useLiturgicalCalendar() {
	const query = useQuery({
		queryKey: ['liturgicalCalendars'],
		queryFn: () => liturgicalService.getAll({}),
		retry: 5
	});

	return {
		liturgicalCalendars: query.data ?? [],
		loading: query.isLoading,
		error: query.isError
	}
}

export default useLiturgicalCalendar;