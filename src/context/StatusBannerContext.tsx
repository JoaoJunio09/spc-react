import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { type StatusBannerVariant } from "../components/feedback/StatusBanner";

type StatusBannerContextType = {
	openStatusBanner: boolean;
	variant: StatusBannerVariant;
	message: string;
	showStatusBanner: (variant: StatusBannerVariant, message: string) => void;
	clearStatusFlow: () => void;
};

const StatusBannerContext = createContext<StatusBannerContextType | null>(null);

type StatusBannerProviderProps = {
	children: ReactNode;
};

export function StatusBannerProvider({ children }: StatusBannerProviderProps) {
	const [openStatusBanner, setOpenStatusBanner] = useState(false);
	const [variant, setVariant] = useState<StatusBannerVariant>('info');
	const [message, setMessage] = useState('');

	const showStatusBanner = useCallback((variant: StatusBannerVariant, message: string) => {
		setOpenStatusBanner(true);
		setVariant(variant);
		setMessage(message);
	}, []);

	const clearStatusFlow = useCallback(() => {
		setOpenStatusBanner(false);
		setVariant('info');
		setMessage('');
	}, []);

	return (
		<StatusBannerContext.Provider
			value={{
				openStatusBanner,
				variant,
				message,
				showStatusBanner,
				clearStatusFlow
			}}
		>
			{children}
		</StatusBannerContext.Provider>
	);
}

export function useStatusBannerContext() {
	const context = useContext(StatusBannerContext);

	if (!context) {
		throw new Error("useStatusBannerContext deve ser usado dentro de StatusBannerContext");
	}

	return context;
}