import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import CatechistService from "../services/CatechistService";

function useCatechistService() {
	const { auth } = useAuthContext();

	const catechistService = useMemo(
		() => new CatechistService(),
		[auth?.accessToken]
	);

	return catechistService;
}

export default useCatechistService;