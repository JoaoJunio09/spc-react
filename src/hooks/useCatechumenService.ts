import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import CatechumenService from "../services/CatechumenService";

function useCatechumenService() {
	const { auth } = useAuthContext();

	const catechumenService = useMemo(
		() => new CatechumenService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return catechumenService;
}

export default useCatechumenService;