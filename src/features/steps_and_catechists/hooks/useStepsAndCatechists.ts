import { useEffect, useState } from "react";
import type { StepResponse } from "../../../interfaces/step/StepResponse";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import CatechistService from "../../../services/CatechistService";
import StepService from "../../../services/StepService";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import { ObtainCommunityOrParish } from "../../../utils/ObtainCommunityOrParish";

function useStepsAndCatechists() {
	const [catechists, setCatechists] = useState<CatechistResponse[] | []>();
	const [steps, setSteps] 				 	= useState<StepResponse[] | []>([]);
	const [error, setError] 				 	= useState<string | null>(null);

	const catechistService: CatechistService = new CatechistService();
	const stepService: StepService = new StepService();

	useEffect(() => {
		loadStepsAndCatechists();
	}, []);

	async function loadStepsAndCatechists() {
		let communityOrParish: CommunityOrParish | null = ObtainCommunityOrParish.obtain();

		if (!communityOrParish) {
			setError('Comunidade ou Paróquia indefinido');
			return;
		}

		try {
			setError(null);

			const dataCatechists = await catechistService.getAll({ communityOrParish: communityOrParish });
			const dataSteps = await stepService.getAll({ communityOrParish: communityOrParish });

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