
import InternalServerError from "../exceptions/server/InternalServerError";
import type { CatechumenResponse } from "../interfaces/catechumen/CatechumenResponse";
import type { ParamsCatechumenAPI } from "../interfaces/catechumen/ParamsCatechumenAPI";
import api from "./api";

class CatechumenService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/catechumens/v1';
	}

	public async getAll(params: ParamsCatechumenAPI) {
		try {
			const response = api.get<CatechumenResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});
			return (await response).data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
      	throw new InternalServerError("Erro ao remover Missa");
    	}

			throw err;
		}
	}
}

export default CatechumenService;