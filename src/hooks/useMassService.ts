import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import MassService from "../services/MassService";

function useMassService() {
	const { auth } = useAuthContext();

	const massService = useMemo(
		() => new MassService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return massService;
}

export default useMassService;