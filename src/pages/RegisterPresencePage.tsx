import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import RegisterPresence from "../features/registerPresence/components/RegisterPresence";
import useBlockNavigation from "../routes/useBlockNavigation";

function RegisterPresencePage() {
	useBlockNavigation();

	return (
		<>
			<Header active="none" />
			<ErrorBoundary>
				<RegisterPresence />
			</ErrorBoundary>	
			<Footer />
		</>
	)
}

export default RegisterPresencePage;