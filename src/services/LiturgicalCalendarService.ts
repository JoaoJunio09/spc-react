import type { LiturgicalCalendarResponse } from "../data/liturgicalCalendar/LiturgicalCalendarResponse";
import type { ParamsLiturgicalCalendarAPI } from "../data/liturgicalCalendar/ParamsLiturgicalCalendarAPI";
import InternalServerError from "../exceptions/server/InternalServerError";
import api from "./api";

class LiturgicalCalendarService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/liturgicalCalendars/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsLiturgicalCalendarAPI) {
		try {
			const response = await api.get<LiturgicalCalendarResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao carregar calendário litúrgico');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}

	public async previous() {
		const URL = `${this.BASE_URL}/previous`;
		try {
			const response = await api.get<LiturgicalCalendarResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao carregar última data do calendário litúrgico');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}
}

export default LiturgicalCalendarService;