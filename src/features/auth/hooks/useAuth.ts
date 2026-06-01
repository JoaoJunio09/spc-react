import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext";
import type { AccountCredentials } from "../../../data/auth/AccountCredentials";
import type { CatechistCredentials } from "../../../data/auth/CatechistCredentials";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import AuthenticationError from "../../../exceptions/auth/AuthenticationError";
import InternalServerError from "../../../exceptions/server/InternalServerError";

function assingsCommunityOrParish(selectedCode: string): CommunityOrParish | null {
	if (selectedCode === '0') return 'SAO_SEBASTIAO';
	else if (selectedCode === '1') return 'DIVINO_ESPIRITO_SANTO';
	return null;
}

type AuthCatechistData = {
	catechistId: string,
	code: string
}

type AuthCoordinatorOrAdminData = {
	username: string,
	password: string
}

function useAuth() {
	const [authCatechistData, setAuthCatechistData] = useState<AuthCatechistData>({
		catechistId: '',
		code: ''
	});
	const [authCoordinatorOrAdminData, setAuthCoordinatorOrAdminData] = useState<AuthCoordinatorOrAdminData>({
		username: '',
		password: ''
	});
	const [error, setError]				= useState<string | null>(null);

	const { signIn: login, signInCatechist: loginCatechist } = useAuthContext();

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setAuthCoordinatorOrAdminData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	function handleOnSelect(e: React.ChangeEvent<HTMLSelectElement>) {
		const { name, value } = e.target;
		setAuthCatechistData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	async function signIn() {
		if (authCoordinatorOrAdminData.username) {
			setError('Preencha o usuário');
			return;
		}
		if (authCoordinatorOrAdminData.password) {
			setError('Informe a sua senha');
			return;
		}

		const credentials: AccountCredentials = {
			username: authCoordinatorOrAdminData.username,
			password: authCoordinatorOrAdminData.password
		}

		try {
			await login(credentials);
			toast.dismiss();
		}
		catch (err) {
			if (err instanceof AuthenticationError) {
				setError(err.message);
			} else if (err instanceof InternalServerError) {
				setError(err.message);
			} else {
				setError('Erro inesperado. Tente novamente.');
			}
		}
	}

	async function signInCatechist() {
		if (!authCatechistData.catechistId) {
			setError('Selecione quem é você');
			return;
		}
		if (!authCatechistData.code) {
			setError('Selecione um código');
			return;
		}

		const credentials: CatechistCredentials = {
			catechistId: Number(authCatechistData.catechistId),
			communityOrParish: assingsCommunityOrParish(authCatechistData.code)
		}

		try {
			await loginCatechist(credentials);
			toast.dismiss();
		}
		catch (err) {
			if (err instanceof AuthenticationError) {
				setError(err.message);
			} else if (err instanceof InternalServerError) {
				setError(err.message);
			} else {
				setError('Erro inesperado. Tente novamente.');
			}
		}
	}

	return {
		signIn,
		signInCatechist,
		handleOnChange,
		handleOnSelect,
		authCatechistData,
		authCoordinatorOrAdminData,
		error
	}
}

export default useAuth;