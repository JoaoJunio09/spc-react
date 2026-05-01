
import type { CatechistResponse } from "../interfaces/catechist/CatechistResponse";
import type { ParamsCatechistAPI } from "../interfaces/catechist/ParamsCatechistAPI";
import api from "./api";

class CatechistService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/catechists/v1';
	}

	public async getAll(params: ParamsCatechistAPI) {
		try {
			const response = api.get<CatechistResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});

			if ((await response).status === 500) {
				// throw new Exceptions.InternalServerError('Erro ao carregar os Catequistas');
			}

			return (await response).data;
		}
		catch (err) {
			throw err;
		}
	}
}

export default CatechistService;