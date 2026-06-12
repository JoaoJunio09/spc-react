import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import type { NotificationDTO } from "../../../data/notification/NotificationDTO";
import useNotificationService from "../../../hooks/useNotificationService";
import useWebSocket from "../../../hooks/useWebSocket";

function useNotifications() {
	const { auth } = useAuthContext();
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const notificationService = useNotificationService();

	const fetchHistory = useCallback(async () => {
		if (!auth) return;
		try {
			const data = await notificationService.getHistory();
			setNotifications(data);
		}
		catch (err) {
			console.error("Erro ao buscar notificações:", err);
		}
	}, [auth, notificationService]);

	useEffect(() => {
		fetchHistory();
	}, [fetchHistory]);

	const handleNewMessage = useCallback((body: string) => {
		try {
			const notification: NotificationDTO = JSON.parse(body);
			setNotifications((prev) => {
				const exists = prev.some((n) => n.id === notification.id);
				if (exists) return prev;
				return [notification, ...prev];
			});
		}
		catch (err) {
			console.error("Erro ao parsear notificação:", body);
		}
	}, [notificationService]);

	useWebSocket(handleNewMessage);

	const markAsRead = useCallback(async (id: number) => {
		try {
			await notificationService.markAsRead(id);
			setNotifications((prev) =>
				prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
			);
		}
		catch (error) {
			console.error("Erro ao marcar como lida:", error);
		}
	}, [notificationService]);

	const markAllAsRead = useCallback(async () => {
		try {
			await notificationService.markAllAsRead();
			setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
		}
		catch (error) {
			console.error("Erro ao marcar todas como lidas:", error);
		}
	}, [notificationService]);

	return {
		notifications,
		unreadCount,
		markAsRead,
		markAllAsRead,
	};
}

export default useNotifications;