import type { liturgicalCalendarResponse } from "../interfaces/liturgicalCalendar/LiturgicalCalendarResponse";
import type { ParamsLiturgicalCalendarAPI } from "../interfaces/liturgicalCalendar/ParamsLiturgicalCalendarAPI";
import api from "./api";

class LiturgicalCalendarService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/liturgicalCalendars/v1';
	}

	public async getAll(params: ParamsLiturgicalCalendarAPI) {
		try {
			const response = api.get<liturgicalCalendarResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
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