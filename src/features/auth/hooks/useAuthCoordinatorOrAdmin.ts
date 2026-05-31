import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import AuthenticationError from "../../../exceptions/auth/AuthenticationError";
import InvalidOrEmptyFields from "../../../exceptions/form/InvalidOrEmptyFields";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import type { AccountCredentials } from "../../../interfaces/auth/AccountCredentials";

type FormDataType = {
	username: string,
	password: string
}

function useAuthCoordinatorOrAdmin() {
	const [formData, setFormData] = useState<FormDataType>({
		username: '',
		password: ''
	});
	const [error, setError] = useState<string | null>(null);

	const { signIn } = useAuthContext();

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	}

	async function auth() {
		const credentials: AccountCredentials = {
			username: formData.username,
			password: formData.password
		}

		try {
			setError(null);

			if (!credentials.username || !credentials.password) {
				throw new InvalidOrEmptyFields('Preencha todos os campos');
			}
			
			await signIn(credentials);
		}
		catch (err) {
			if (err instanceof AuthenticationError) {
				setError(err.message);
			}
			if (err instanceof InternalServerError) {
				setError(err.message);
			}
			if (err instanceof InvalidOrEmptyFields) {
				setError(err.message);
			}
			throw err;
		}
	}

	return {
		handleOnChange,
		error,
		auth
	}
}

export default useAuthCoordinatorOrAdmin;