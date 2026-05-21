import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePresenceContext } from "../../../context/PresenceContext";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import type { PresenceRequest } from "../../../interfaces/presence/PresenceRequest";
import PresenceService from "../../../services/PresenceService";

const presenceService: PresenceService = new PresenceService();

function useConfirmPresense() {
	const [catechumensConfirm, setCatechumensConfirm] = useState<CatechumenResponse[] | null>([]);
	const [catechistId, setCatechistId]								= useState<number>(0);

	const { clearPresenceFlow } = usePresenceContext();

	const { massId } = useParams();

	const queryClient = useQueryClient();

	const confirmPresenceMutation = useMutation({
		mutationFn: (data: PresenceRequest) => presenceService.register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presences'] });
		}
	});

	useEffect(() => {
		loadCatechumensPresent();
		obtainCatechistId();
	}, []);	
	
	function loadCatechumensPresent() {
		const catechumensStorage = sessionStorage.getItem('@catechumensPresent');
		if (!catechumensStorage) return;

		const catechumensParsed = JSON.parse(catechumensStorage);
		setCatechumensConfirm(catechumensParsed);
	}

	function obtainCatechistId() {
		const catechistStorage = sessionStorage.getItem('catechist');
		if (!catechistStorage) return;

		const catechist: CatechistResponse = JSON.parse(catechistStorage);

		setCatechistId(catechist.id);
	}

	return {
		catechumensConfirm,
		confirmPresenceMutation,
		massId,
		catechistId,
		clearPresenceFlow
	}
}

export default useConfirmPresense;