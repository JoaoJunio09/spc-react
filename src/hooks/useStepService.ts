import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import StepService from "../services/StepService";

function useStepService() {
	const { auth } = useAuthContext();

	const stepService = useMemo(
		() => new StepService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return stepService;
}

export default useStepService;