import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import CatechumenService from "../../../services/CatechumenService";
import { useNavigate, useParams } from "react-router-dom";
import PresenceService from "../../../services/PresenceService";
import type { PresenceResponse } from "../../../interfaces/presence/PresenceResponse";

const catechumenService: CatechumenService = new CatechumenService();
const presenceService: PresenceService = new PresenceService();

function useRegisterPresence() {
	const [fullName, setFullName]				= useState<string>('');
	const [stepId, setStepId]						= useState<number | null>(null);

	const [catechumensPresent, setCatechumensPresent] = useState<CatechumenResponse[]>([]);
	const [presencesOfCatechumensSavedInDatabase, setPresencesOfCatechumensSavedInDatabase] = useState<PresenceResponse[]>([]);

	const navigate = useNavigate();

	const { titleMass } = useParams();

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

	useEffect(() => {
		checkExistingsPresences();
	}, [fullName]);

	async function checkExistingsPresences() {
		const catechumensIsPresent = await presenceService.getAll({ titleMass: titleMass });
		if (catechumensIsPresent) {
			setPresencesOfCatechumensSavedInDatabase(catechumensIsPresent);
		}
	}

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

	function review() {
		sessionStorage.setItem('@catechumensPresent', JSON.stringify(catechumensPresent));
		navigate(`/presencas/confirmar/${titleMass}`);
	}

	function isPresent(catechumen: CatechumenResponse): boolean {
		return catechumensPresent.some(catechumenPresent => catechumenPresent.id === catechumen.id);
	}

	function isBlockButtonPresence(catechumen: CatechumenResponse): boolean {
		return presencesOfCatechumensSavedInDatabase.some(catechumensPresent => catechumensPresent.catechumen.id === catechumen.id);
	}

	function search(value: string) {
		setStepId(null);
		setFullName(value);
	}

	function listCatechumens(stepId: number) {
		setFullName('');
		setStepId(stepId);
	}

	function clear(): boolean {
		setFullName('');
		setStepId(null);
		setCatechumensPresent([]);

		if (catechumensPresent.length === 0) return true;
		
		return false;
	}

	return {
		catechumens: query.data ?? [],
		loading: query.isPending,
		error: query.error,
		fullName,
		stepId,
		markPresence,
		markAbsence,
		review,
		isPresent,
		isBlockButtonPresence,
		search,
		listCatechumens,
		clear,
	}
}

export default useRegisterPresence;