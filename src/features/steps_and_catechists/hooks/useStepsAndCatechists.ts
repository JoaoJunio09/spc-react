import { useEffect, useState } from "react";
import type { CatechistResponse } from "../../../data/catechist/CatechistResponse";
import type { StepResponse } from "../../../data/step/StepResponse";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import useCatechistService from "../../../hooks/useCatechistService";
import useStepService from "../../../hooks/useStepService";

function useStepsAndCatechists() {
	const [catechists, setCatechists] = useState<CatechistResponse[] | []>();
	const [steps, setSteps] 				 	= useState<StepResponse[] | []>([]);
	const [error, setError] 				 	= useState<string | null>(null);

	const catechistService = useCatechistService();
	const stepService = useStepService();

	useEffect(() => {
		loadStepsAndCatechists();
	}, []);

	async function loadStepsAndCatechists() {
		try {
			setError(null);

			const dataCatechists = await catechistService.getAll({});
			const dataSteps = await stepService.getAll({});

			setCatechists(dataCatechists);
			setSteps(dataSteps);
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
		catechists,
		steps,
		error
	}
}

export default useStepsAndCatechists;