import { createContext, useContext, useState, type ReactNode } from "react";
import type { CatechumenResponse } from "../interfaces/catechumen/CatechumenResponse";
import type { PresenceResponse } from "../interfaces/presence/PresenceResponse";

type PresenceContextType = {
	catechumensPresent: CatechumenResponse[];
	setCatechumensPresent: React.Dispatch<React.SetStateAction<CatechumenResponse[]>>;

	presencesOfCatechumensSavedInDatabase: PresenceResponse[];
	setPresencesOfCatechumensSavedInDatabase: React.Dispatch<React.SetStateAction<PresenceResponse[]>>;

	clearPresenceFlow: () => void;
}

const PresenceContext = createContext<PresenceContextType | null>(null);

type PresenceProviderProps = {
	children: ReactNode
}

export function PresenceProvider({ children } : PresenceProviderProps) {
	const [catechumensPresent, setCatechumensPresent] = useState<CatechumenResponse[]>([]);
	const [presencesOfCatechumensSavedInDatabase, setPresencesOfCatechumensSavedInDatabase] = useState<PresenceResponse[]>([]);

	function clearPresenceFlow() {
		setCatechumensPresent([]);
		setPresencesOfCatechumensSavedInDatabase([]);
		sessionStorage.removeItem('@catechumensPresent');
	}

	return (
		<PresenceContext.Provider
			value={{
				catechumensPresent,
				setCatechumensPresent,
				presencesOfCatechumensSavedInDatabase,
				setPresencesOfCatechumensSavedInDatabase,
				clearPresenceFlow
			}}
		>
			{children}
		</PresenceContext.Provider>
	)
}

export function usePresenceContext() {
	const context = useContext(PresenceContext);

	if (!context) {
		throw new Error("usePresenceContext deve ser usado dentro de PresenceProvider");
	}

	return context;
}