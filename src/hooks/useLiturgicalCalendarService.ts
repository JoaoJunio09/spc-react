import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import LiturgicalCalendarService from "../services/LiturgicalCalendarService";

function useLiturgicalCalendarService() {
	const { auth } = useAuthContext();

	const liturgicalCalendarService = useMemo(
		() => new LiturgicalCalendarService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return liturgicalCalendarService;
}

export default useLiturgicalCalendarService;