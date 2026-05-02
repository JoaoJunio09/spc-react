import Header from "../components/header";
import Home from "../features/home/components/Home";
import type { CommunityOrParish } from "../types/CommunityOrParish";

function loadProps() {
	const communityOrParishForStorage: string | null = sessionStorage.getItem('communityOrParish');

	let communityOrParish: CommunityOrParish | null = null;

	communityOrParishForStorage === 'SAO_SEBASTIAO'
		? communityOrParish = 'SAO_SEBASTIAO'
		: communityOrParish = 'DIVINO_ESPIRITO_SANTO';

	const userName: string | null = sessionStorage.getItem('userName');

	return {
		communityOrParish,
		userName
	};
}

function HomePage() {
	const { communityOrParish, userName } = loadProps();

	return (
		<>
			<Header communityOrParish={communityOrParish} />
			<Home userName={userName} />
		</>
	)
}

export default HomePage;