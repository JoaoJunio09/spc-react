import { useEffect, useState } from "react";
import type { CatechistSummary } from "../../../data/catechist/CatechistSummary";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import type { StepResponse } from "../../../data/step/StepResponse";
import useCatechumenService from "../../../hooks/useCatechumenService";

type UseCatechumensProps = {
	catechists: CatechistSummary[],
	step: StepResponse
}

function useCatechumens({ catechists, step }: UseCatechumensProps) {
	const [catechumens, setCatechumens] = useState<CatechumenResponse[]>([]);
	const [error, setError]							= useState<string | null>(null);

	const catechumenService = useCatechumenService();

	useEffect(() => {
		loadCatechumens();
	}, []);

	async function loadCatechumens() {
		try {
			setError(null);

			await catechumenService.getAll({ stepId: step.id, catechistId: catechists[0].id });
			setCatechumens([])
		}
		catch (err) {
			setError('Erro ao carregar os Catequizandos');
		}
	}

	return {
		catechumens,
		error
	}
}

export default useCatechumens;