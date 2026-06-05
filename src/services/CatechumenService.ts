
import type { CatechumenDashboardResponse } from "../data/catechumen/CatechumenDashboardResponse";
import type { CatechumenPage } from "../data/catechumen/CatechumenPage";
import type { ParamsCatechumenAPI } from "../data/catechumen/ParamsCatechumenAPI";
import InternalServerError from "../exceptions/server/InternalServerError";
import api from "./api";

class CatechumenService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/catechumens/v1';
		this.accessToken = accessToken;
	}

	public async getAll({
		signal,
		pageable,
		...params
	}: ParamsCatechumenAPI) {
		try {
			const response = await api.get<CatechumenPage>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params: {
					...params,
					page: pageable?.page,
					size: pageable?.size,
					direction: pageable?.direction
				},
				signal
			});
			const data = response.data;
			return data;
		}
		catch (err: any) {
			if (err.name === 'CanceledError') {
				// return emptyPageable<CatechumenResponse>();
			}
			
			if (err?.response?.status === 500) {
      	throw new InternalServerError("Erro ao remover Missa");
    	}

			throw err;
		}
	}

	public async retrieveDashboard() {
		const URL = `${this.BASE_URL}/dashboard`;
		try {
			const response = await api.get<CatechumenDashboardResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err.name === 'CanceledError') {
				// return emptyPageable<CatechumenResponse>();
			}
			
			if (err?.response?.status === 500) {
      	throw new InternalServerError("Erro ao remover Missa");
    	}

			throw err;
		}
	}
}

export default CatechumenService;