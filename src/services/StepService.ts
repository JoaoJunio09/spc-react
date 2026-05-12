import InternalServerError from "../exceptions/server/InternalServerError";
import type { ParamsStepAPI } from "../interfaces/step/ParamsStepAPI";
import type { StepResponse } from "../interfaces/step/StepResponse";
import api from "./api";

class StepService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/steps/v1';
	}

	public async getAll(params: ParamsStepAPI) {
		try {
			const response = api.get<StepResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
				},
				params
			});

			return (await response).data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Etapas');
			}

			throw err;
		}
	}
}

export default StepService;