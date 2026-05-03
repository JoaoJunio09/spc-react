import type { ParamsCatechistAPI } from "../interfaces/catechist/ParamsCatechistAPI";
import type { PresenceResponse } from "../interfaces/presence/PresenceResponse";
import api from "./api";

class PresenceService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/presences/v1';
	}

	public async getAll(params: ParamsCatechistAPI) {
		try {
			const response = api.get<PresenceResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});

			if ((await response).status === 500) {
				// throw new Exceptions.InternalServerError('Erro ao carregar as datas das Missas');
			}

			return (await response).data;
		}
		catch(err) {
			throw err;
		}
	}
}

export default PresenceService;