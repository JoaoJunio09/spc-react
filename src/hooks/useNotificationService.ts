import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import NotificationService from "../services/NotificationService";

function useNotificationService() {
	const { auth } = useAuthContext();

	const notificationService = useMemo(
		() => new NotificationService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return notificationService;
}

export default useNotificationService;