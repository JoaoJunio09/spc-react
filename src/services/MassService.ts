import type { MassResponse } from "../interfaces/mass/MassResponse";
import type { ParamsMassAPI } from "../interfaces/mass/ParamsMassAPI";
import type { MassRequest } from "../interfaces/mass/MassRequest";

import api from "./api";
import InternalServerError from "../exceptions/server/InternalServerError";
import ConflictInTheDatabaseException from "../exceptions/database/ConflicInTheDatabaseException";

class MassService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/masses/v1';
	}

	public async getAll(params: ParamsMassAPI) {
		try {
			const response = await api.get<MassResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao carregar as Missas');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}

	public async getMassesDatesByCommunityOrParish(params: ParamsMassAPI) {
		const URL = `${this.BASE_URL}/massesDates`;
		try {
			const response = await api.get(URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao carregar as datas das Missas');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}

	public async create(mass: MassRequest) {
		try {
			const response = await api.post(this.BASE_URL, mass, {
				headers: {
					'Content-Type': 'application/json'
				},
			
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao registrar Missa');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}

	public async update(mass: MassRequest) {
		try {
			const response = await api.put(this.BASE_URL, mass, {
				headers: {
					'Content-Type': 'application/json'
				},
			
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao atualizar Missa');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}

	public async delete(id: number) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			await api.delete(URL, {});
		}
		catch (err: any) {
			if (err?.response?.status === 409) {
				throw new ConflictInTheDatabaseException('Existem presenças registradas nessa Missa');
			} 

			if (err?.response?.status === 500) {
      	throw new InternalServerError("Erro ao remover Missa");
    	}

			throw err;
		}
	}
}

export default MassService;