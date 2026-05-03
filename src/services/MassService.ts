import type { MassResponse } from "../interfaces/mass/MassResponse";
import type { ParamsMassAPI } from "../interfaces/mass/ParamsMassAPI";
import type { CommunityOrParish } from "../types/CommunityOrParish";
import api from "./api";

class MassService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/masses/v1';
	}

	public async getAll(params: ParamsMassAPI) {
		try {
			const response = api.get<MassResponse[]>(this.BASE_URL, {
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

	public async getMassesDatesByCommunityOrParish(params: ParamsMassAPI) {
		const URL = `${this.BASE_URL}/massesDates`;
		try {
			const response = api.get(URL, {
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
		catch (err) {
			throw err;
		}
	}
}

export default MassService;