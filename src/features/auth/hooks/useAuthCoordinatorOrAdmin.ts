import { useState } from "react";

type FormType = {
	username: string,
	password: string
}

function useAuthCoordinatorOrAdmin() {
	const [form, setForm] = useState<FormType>({
		username: '',
		password: ''
	});

	
}

export default useAuthCoordinatorOrAdmin;