import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import type { NotificationDTO } from "../../data/notification/NotificationDTO";
import api from "../../services/api";
import useWebSocket from "./useWebSocket";

function useNotifications() {
	const { auth } = useAuthContext();
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);

	const fetchHistory = useCallback(async () => {
		if (!auth) return;
		try {
			const response = await api.get<NotificationDTO[]>(
				'/api/notifications/v1'
			);
			setNotifications(response.data);
			setUnreadCount(response.data.filter((n) => !n.isRead).length);
		}
		catch (err) {
			console.error("Erro ao buscar notificações:", err);
		}
	}, [auth]);

	useEffect(() => {
		fetchHistory();
	}, [fetchHistory]);

	const handleNewMessage = useCallback((body: string) => {
		try {
			const notification: NotificationDTO = JSON.parse(body);
			setNotifications((prev) => [notification, ...prev]);
			setUnreadCount((prev) => prev + 1);
		}
		catch (err) {
			console.error("Erro ao parsear notificação:", body);
		}
	}, []);

	useWebSocket(handleNewMessage);

	const markAsRead = useCallback(async (id: number) => {
		try {
			await api.patch(`/api/notifications/v1/${id}/read`);
			setNotifications((prev) =>
				prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
			);
			setUnreadCount((prev) => Math.max(0, prev - 1));
		}
		catch (error) {
			console.error("Erro ao marcar como lida:", error);
		}
	}, []);

	const markAllAsRead = useCallback(async () => {
		try {
			await api.patch("/api/notifications/v1/read-all");
			setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
			setUnreadCount(0);
		}
		catch (error) {
			console.error("Erro ao marcar todas como lidas:", error);
		}
	}, []);

	return {
		notifications,
		unreadCount,
		markAsRead,
		markAllAsRead,
	};
}

export default useNotifications;