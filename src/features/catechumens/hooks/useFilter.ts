import { useEffect, useState } from "react";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import CatechumenService from "../../../services/CatechumenService";

function useFilter() {
	const [catechumens, setCatechumens] = useState<CatechumenResponse[]>([]);
	const [stepId, setStepId] 					= useState<number>();
	const [catechistId, setCatechistId] = useState<number>();
	const [loading, setLoading] 				= useState<boolean>(false);
	const [error, setError] 						= useState<string | null>(null);

	const catechumenService: CatechumenService = new CatechumenService();

	useEffect(() => {
		if (!stepId || !catechistId) return;
		
		filter();
	}, [stepId, catechistId]);

	async function filter() {
		try {
			setLoading(true);
			setError(null);

			const data = await catechumenService.getAll({ stepId: stepId, catechistId: catechistId });
			setCatechumens(data);
		}
		catch (err) {
			if (err instanceof InternalServerError) {
				setError(err.message)
			}
			else {
				setError('Erro inesperado - Servidor Indísponivel')
			}
		}
		finally {
			setLoading(false);
		}
	}

	return {
		filter,
		setStepId,
		setCatechistId,
		catechumens,
		loading,
		error
	}
}

export default useFilter;