import { useMutation, useQueryClient } from "@tanstack/react-query";
import PresenceService from "../../../services/PresenceService";

const presenceService: PresenceService = new PresenceService();

function useConfirmPresense() {
	const queryClient = useQueryClient();

	const mutate = useMutation({
		mutationFn: presenceService.register,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presences'] });
		}
	});

}

export default useConfirmPresense;