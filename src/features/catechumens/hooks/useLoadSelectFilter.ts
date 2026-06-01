import { useEffect, useState } from "react";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import type { StepResponse } from "../../../data/step/StepResponse";
import StepService from "../../../services/StepService";

function useLoadSelectFilter() {
	const [steps, setSteps] = useState<StepResponse[]>([]);
	const [error, setError] = useState<string | null>(null);

	const stepService: StepService = new StepService();

	useEffect(() => {
		loadStepsAndCatechists();
	}, []);

	async function loadStepsAndCatechists() {
		try {
			const data = await stepService.getAll({});
			setSteps(data);
		}
		catch (err) {
			if (err instanceof InternalServerError) {
				setError(err.message)
			}
			else {
				setError('Erro inesperado - Servidor Indísponivel')
			}
		}
	}

	return {
		steps,
		error
	}
}

export default useLoadSelectFilter;