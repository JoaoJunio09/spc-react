import type { LiturgicalCalendarResponse } from "../interfaces/liturgicalCalendar/LiturgicalCalendarResponse";
import type { ParamsLiturgicalCalendarAPI } from "../interfaces/liturgicalCalendar/ParamsLiturgicalCalendarAPI";
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
			const response = api.get<LiturgicalCalendarResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			if ((await response).status === 500) {
				// throw new Exceptions.InternalServerError('Erro ao carregar as Missas');
			}

			return (await response).data;
		}
		catch (err) {
			throw err;
		}
	}
}

export default LiturgicalCalendarService;