import type { NotificationDTO } from "../data/notification/NotificationDTO";
import InternalServerError from "../exceptions/server/InternalServerError";
import api from "./api";

class NotificationService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/notifications/v1';
		this.accessToken = accessToken;
	}

	public async getHistory() {
		try {
			const response = await api.get<NotificationDTO[]>(this.BASE_URL, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro inesperado ao buscar notificações');
			}

			throw err;
		}
	}

	public async markAsRead(id: number) {
		const URL = `${this.BASE_URL}/${id}/read`;
		try {
			const response = await api.patch<NotificationDTO[]>(URL, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro inesperado ao buscar notificações');
			}

			throw err;
		}
	}

	public async markAllAsRead() {
		const URL = `${this.BASE_URL}/read-all`;
		try {
			const response = await api.patch<NotificationDTO[]>(URL, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro inesperado ao buscar notificações');
			}

			throw err;
		}
	}
}

export default NotificationService;