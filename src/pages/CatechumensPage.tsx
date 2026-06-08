import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import { useAuthContext } from "../context/AuthContext";
import Catechumens from "../features/catechumens/components/Catechumens";

function CatechumensPage() {
	const { auth } = useAuthContext();

	const isCatechist = auth?.roles.includes("ROLE_CATECHIST");

	return (
		<>
			<Header active="catechumens" />
			<Catechumens scope={isCatechist ? 'mine' : 'all'} />
			<Footer />
		</>
	)
}

export default CatechumensPage;