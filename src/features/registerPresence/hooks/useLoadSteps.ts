import { useEffect, useState } from "react";
import type { StepResponse } from "../../../interfaces/step/StepResponse";
import StepService from "../../../services/StepService";

function useLoadSteps() {
	const [steps, setSteps] = useState<StepResponse[]>([]);
	const [error, setError] = useState<string | null>(null);

	const stepService: StepService = new StepService();

	useEffect(() => {
		loadSteps();
	}, []);

	async function loadSteps() {
		try {
			setError(null);
			const data = await stepService.getAll({});
			setSteps(data);
		}
		catch (err) {
			setError('Erro ao carregar as Etapas');
		}
	}

	return {
		steps,
		error
	}
}

export default useLoadSteps;