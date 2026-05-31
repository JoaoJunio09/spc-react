import type { MassRequest } from "../interfaces/mass/MassRequest";
import type { MassResponse } from "../interfaces/mass/MassResponse";
import type { ParamsMassAPI } from "../interfaces/mass/ParamsMassAPI";

import ConflictInTheDatabaseException from "../exceptions/database/ConflicInTheDatabaseException";
import InternalServerError from "../exceptions/server/InternalServerError";
import api from "./api";

class MassService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/masses/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsMassAPI) {
		try {
			const response = await api.get<MassResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Missas');
			}

			throw err;
		}
	}

	public async getById(id: number) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			const response = await api.get<MassResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Missas');
			}

			throw err;
		}
	}

	public async getMassesDatesByCommunityOrParish(params: ParamsMassAPI) {
		const URL = `${this.BASE_URL}/massesDates`;
		try {
			const response = await api.get(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao tentar obter data das Missas');
			}

			throw err;
		}
	}

	public async create(mass: MassRequest) {
		try {
			const response = await api.post(this.BASE_URL, mass, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},			
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao registrar Missa');
			}

			throw err;
		}
	}

	public async update(mass: MassRequest) {
		try {
			const response = await api.put(this.BASE_URL, mass, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao atualizar Missa');
			}

			throw err;
		}
	}

	public async delete(id: number) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			await api.delete(URL, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
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