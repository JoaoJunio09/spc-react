import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/layout/header";
import RegisterPresence from "../features/registerPresence/components/RegisterPresence";

function RegisterPresencePage() {
	return (
		<>
			<Header active="none" />
			<ErrorBoundary>
				<RegisterPresence />
			</ErrorBoundary>
			
		</>
	)
}

export default RegisterPresencePage;