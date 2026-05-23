import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import type { PresenceRequest } from "../../../interfaces/presence/PresenceRequest";
import PresenceService from "../../../services/PresenceService";
import type { InfoDialogState } from "../../../types/InfoDialogState";

const presenceService: PresenceService = new PresenceService();

function useRetroactivePresenceModal() {
	const [catechistId, setCatechistId]			= useState<number>(0);
	const [justification, setJustification] = useState('');
	const [proofImage, setProofImage] 			= useState<File | null>(null);
	const [proofPreview, setProofPreview] 	= useState<string | null>(null);

	const [infoDialog, setInfoDialog] = useState<InfoDialogState>({
		open: false,
		variant: 'info',
		title: '',
		description: '',
		buttonText: '',
		path: undefined
	});

	const { massId } = useParams();
	const queryClient = useQueryClient();

	useEffect(() => {
		obtainCatechistId();
	}, []);

	const registerPresenceMutation = useMutation({
		mutationFn: (data: PresenceRequest) => presenceService.register(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presences'] });
		}
	});

	function openInfoDialog(data: Omit<InfoDialogState, 'open'>) {
		setInfoDialog({
			open: true,
			...data
		});
	}

	function closeInfoDialog() {
		setInfoDialog((prev) => ({
			...prev,
			open: false
		}));
	}

	function obtainCatechistId() {
		const catechistStorage = sessionStorage.getItem('catechist');
		if (!catechistStorage) return;

		const catechist: CatechistResponse = JSON.parse(catechistStorage);

		setCatechistId(catechist.id);
	}

	return {
		justification,
		setJustification,
		setProofImage,
		proofImage,
		setProofPreview,
		proofPreview,
		catechistId,
		massId,
		registerPresenceMutation,
		infoDialog,
		openInfoDialog,
		closeInfoDialog
	}
}

export default useRetroactivePresenceModal;