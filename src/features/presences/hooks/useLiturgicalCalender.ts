import { useQuery } from "@tanstack/react-query";
import useLiturgicalCalendarService from "../../../hooks/useLiturgicalCalendarService";

function useLiturgicalCalendar() {

	const liturgicalCalendarService = useLiturgicalCalendarService();

	const query = useQuery({
		queryKey: ['liturgicalCalendars'],
		queryFn: () => liturgicalCalendarService.getAll({}),
		retry: 3
	});

	return {
		liturgicalCalendars: query.data ?? [],
		loading: query.isLoading,
		error: query.isError
	}
}

export default useLiturgicalCalendar;