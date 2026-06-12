import axios from "axios";
import type { Token } from "../data/auth/Token";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL_DEV
});

api.interceptors.request.use((config) => {
	let auth: Token | null = null;
	const authStorage = sessionStorage.getItem('auth');
	if (authStorage) {
		auth = JSON.parse(authStorage);
	}
	const token = auth?.accessToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

let isRedirecting = false;

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;

		switch (status) {
			case 401:
				if (status && !isRedirecting) {
					isRedirecting = true;
					sessionStorage.removeItem('auth');
					window.location.replace('/');
					break;
				}
				break;
			case 403:
				window.location.replace('/unauthorized');
				break;
			case 404:
				window.location.replace('/notfound');
				break;
		}

		return Promise.reject(error);
	}
)

export default api;