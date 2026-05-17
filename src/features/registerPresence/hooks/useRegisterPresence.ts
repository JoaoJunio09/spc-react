import { useEffect, useState } from "react";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import CatechumenService from "../../../services/CatechumenService";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import useDebounce from "../../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

type loadCatechumensProps = {
	stepId?: number,
	fullName?: string,
}

const catechumenService: CatechumenService = new CatechumenService();

function useRegisterPresence() {
	const [fullName, setFullName]				= useState<string>('');
	const [stepId, setStepId]						= useState<number | null>(null);

	const debouncedName = useDebounce(fullName, 400);

	const query = useQuery({
		queryKey: [
			'catechumens',
			debouncedName,
			stepId
		],

		queryFn: ({ signal }) =>
			catechumenService.getAll({
				fullName: debouncedName ?? undefined,
				stepId: stepId ?? undefined,
				signal
			}),

		enabled: !!debouncedName || !!stepId,

		staleTime: 1000 * 60 * 5
	});

	function search(value: string) {
		setStepId(null);
		setFullName(value);
	}

	function listCatechumens(stepId: number) {
		setFullName('');
		setStepId(stepId);
	}

	function clear() {
		setFullName('');
		setStepId(null);
	}

	return {
		catechumens: query.data ?? [],
		loading: query.isPending,
		error: query.error,
		fullName,
		stepId,
		search,
		listCatechumens,
		clear
	}
}

export default useRegisterPresence;