import { useState } from "react";

function useCalendaryModal() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return { isOpen, setIsOpen };
}

export default useCalendaryModal;