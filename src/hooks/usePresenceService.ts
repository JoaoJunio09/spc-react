import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import PresenceService from "../services/PresenceService";

function usePresenceService() {
	const { auth } = useAuthContext();

	const presenceService = useMemo(
		() => new PresenceService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return presenceService;
}

export default usePresenceService;