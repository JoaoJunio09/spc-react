import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Masses from "../features/masses/components/Masses";

function MassesPage() {
	return (
		<>
			<Header active="masses" />
			<Masses />
			<Footer />
		</>
	)
}

export default MassesPage;