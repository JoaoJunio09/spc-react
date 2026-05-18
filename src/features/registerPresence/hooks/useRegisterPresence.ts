import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import CatechumenService from "../../../services/CatechumenService";

const catechumenService: CatechumenService = new CatechumenService();

function useRegisterPresence() {
	const [fullName, setFullName]				= useState<string>('');
	const [stepId, setStepId]						= useState<number | null>(null);

	const [catechumensPresent, setCatechumensPresent] = useState<CatechumenResponse[]>([]);
	const [catechumensWithBlockAbsenceButton, setCatechumensWithBlockAbsenceButton] = useState([]);

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

	function markPresence(catechumen: CatechumenResponse) {
		if (!isPresent(catechumen)) {
			setCatechumensPresent([...catechumensPresent, catechumen]);
		}
	}

	function markAbsence(catechumen: CatechumenResponse) {
		if (isPresent(catechumen)) {
			setCatechumensPresent(prev => prev.filter(
				catechumenPresent => catechumenPresent.id !== catechumen.id
			));
		}
	}

	function isPresent(catechumen: CatechumenResponse): boolean {
		return catechumensPresent.some(catechumenPresent => catechumenPresent.id === catechumen.id);
	}

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
		markPresence,
		markAbsence,
		isPresent,
		search,
		listCatechumens,
		clear
	}
}

export default useRegisterPresence;