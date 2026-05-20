import { useMutation, useQueryClient } from "@tanstack/react-query";
import PresenceService from "../../../services/PresenceService";
import type { PresenceRequest } from "../../../interfaces/presence/PresenceRequest";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import type { CatechumenResponse } from "../../../interfaces/catechumen/CatechumenResponse";
import { useParams } from "react-router-dom";

const presenceService: PresenceService = new PresenceService();

function useConfirmPresense() {
	const [catechumensConfirm, setCatechumensConfirm] = useState<CatechumenResponse[] | null>([]);

	const { titleMass } = useParams();

	const queryClient = useQueryClient();

	const confirmPresenceMutation = useMutation({
		mutationFn: (data: PresenceRequest) => presenceService.register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presences'] });
		},
		onError: () => {
			toast.error('Erro ao registrar presenças');
		}
	});

	useEffect(() => {
		loadCatechumensPresent();
	}, []);

	function loadCatechumensPresent() {
		const catechumensStorage = sessionStorage.getItem('@catechumensPresent');
		if (!catechumensStorage) return;

		const catechumensParsed = JSON.parse(catechumensStorage);
		setCatechumensConfirm(catechumensParsed);
	}

	return {
		catechumensConfirm,
		confirmPresenceMutation,
		titleMass
	}
}

export default useConfirmPresense;