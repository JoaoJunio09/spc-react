import { useEffect, useState } from "react";
import useStepService from "../../../hooks/useStepService";
import type { StepResponse } from "../../../interfaces/step/StepResponse";

function useLoadSteps() {
	const [steps, setSteps] 		= useState<StepResponse[]>([]);
	const [error, setError] 		= useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const stepService = useStepService();

	useEffect(() => {
		loadSteps();
	}, []);

	async function loadSteps() {
		try {
			setLoading(true);
			setError(null);
			const data = await stepService.getAll({});
			setSteps(data);
		}
		catch (err) {
			setError('Erro ao carregar as Etapas');
		}
		finally {
			setLoading(false);
		}
	}

	return {
		steps,
		error,
		loading
	}
}

export default useLoadSteps;