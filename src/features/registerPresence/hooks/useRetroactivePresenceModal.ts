import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import usePresenceService from "../../../hooks/usePresenceService";
import type { PresenceRequest } from "../../../data/presence/PresenceRequest";
import type { InfoDialogState } from "../../../types/InfoDialogState";

function useRetroactivePresenceModal() {
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

	const presenceService = usePresenceService();

	const { massId } = useParams();
	const queryClient = useQueryClient();

	const registerPresenceMutation = useMutation({
			mutationFn: (data: PresenceRequest) => presenceService.registerRetroactive(data),
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

	return {
		justification,
		setJustification,
		setProofImage,
		proofImage,
		setProofPreview,
		proofPreview,
		massId,
		registerPresenceMutation,
		infoDialog,
		openInfoDialog,
		closeInfoDialog
	}
}

export default useRetroactivePresenceModal;