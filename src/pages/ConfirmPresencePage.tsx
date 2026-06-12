import ConfirmPresence from "../features/confirmPresence/components/ConfirmPresence";
import useBlockNavigation from "../routes/useBlockNavigation";

function ConfirmPresencePage() {
	useBlockNavigation();
	
	return (
		<>
			<ConfirmPresence />
		</>
	)
}

export default ConfirmPresencePage;