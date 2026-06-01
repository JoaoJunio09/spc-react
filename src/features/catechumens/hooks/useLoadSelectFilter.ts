import { useEffect, useState } from "react";
import type { StepResponse } from "../../../data/step/StepResponse";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import useStepService from "../../../hooks/useStepService";

function useLoadSelectFilter() {
	const [steps, setSteps] = useState<StepResponse[]>([]);
	const [error, setError] = useState<string | null>(null);

	const stepService = useStepService();

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