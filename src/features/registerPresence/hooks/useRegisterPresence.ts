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
	const [countSelected, setCountSelected] = useState(0);

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
		loadCatechumensPresentSessionStorage();
		checkExistingsPresences();
	}, [fullName]);

	function loadCatechumensPresentSessionStorage() {
		const catechumensPresentStorage = sessionStorage.getItem('@catechumensPresent');
		if (!catechumensPresentStorage) return;

		if (catechumensPresentStorage.length > 0) {
			setCatechumensPresent(JSON.parse(catechumensPresentStorage));
			setCountSelected(catechumensPresent.length);
		}
	}

	async function checkExistingsPresences() {
		const catechumensIsPresent = await presenceService.getAll({ titleMass: titleMass });
		if (catechumensIsPresent) {
			setPresencesOfCatechumensSavedInDatabase(catechumensIsPresent);
		}
	}

	function markPresence(catechumen: CatechumenResponse) {
		if (!isPresent(catechumen)) {
			setCatechumensPresent([...catechumensPresent, catechumen]);
			setCountSelected(countSelected+1);
		}
	}

	function markAbsence(catechumen: CatechumenResponse) {
		if (isPresent(catechumen)) {
			setCatechumensPresent(prev => prev.filter(
				catechumenPresent => catechumenPresent.id !== catechumen.id
			));
			setCountSelected(countSelected-1);
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
		setCountSelected(0);
		sessionStorage.setItem('@catechumensPresent', '');

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
		countSelected,
		clear,
	}
}

export default useRegisterPresence;