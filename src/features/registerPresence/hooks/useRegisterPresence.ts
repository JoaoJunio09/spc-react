import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePresenceContext } from "../../../context/PresenceContext";
import useDebounce from "../../../hooks/useDebounce";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import CatechumenService from "../../../services/CatechumenService";
import MassService from "../../../services/MassService";
import PresenceService from "../../../services/PresenceService";

const catechumenService: CatechumenService = new CatechumenService();
const presenceService: PresenceService = new PresenceService();
const massService: MassService = new MassService();

function useRegisterPresence() {
	const [fullName, setFullName]						= useState<string>('');
	const [stepId, setStepId]								= useState<number | null>(null);
	const [countSelected, setCountSelected] = useState(0);
	const [titleMass, setTitleMass] 				= useState<string>('');

	const {
		catechumensPresent,
		setCatechumensPresent,
		presencesOfCatechumensSavedInDatabase,
		setPresencesOfCatechumensSavedInDatabase
	} = usePresenceContext();

	const navigate = useNavigate();

	const { massId } = useParams();
	const [searchParams] = useSearchParams();

	const isRetroactive = searchParams.get('retroativo') === 'true';

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
		setCountSelected(catechumensPresent.length);
	}, [fullName]);

	async function checkExistingsPresences() {
		if (titleMass === '') {
			const mass: MassResponse = await massService.getById(Number(massId));
			setTitleMass(mass.title);
		}

		if (!titleMass) return;

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
		navigate(`/presencas/confirmar/${massId}`);
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
		sessionStorage.removeItem('@catechumensPresent');

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
		isRetroactive,
		clear,
	}
}

export default useRegisterPresence;