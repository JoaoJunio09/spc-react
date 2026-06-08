import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Presences from "../features/presences/components/Presences";

function PresencesPage() {
	return (
		<>
			<Header active="presences" />
			<Presences />
			<Footer />
		</>
	)
}

export default PresencesPage;