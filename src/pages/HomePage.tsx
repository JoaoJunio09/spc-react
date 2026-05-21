import Header from "../components/layout/header";
import Home from "../features/home/components/Home";

function HomePage() {
	return (
		<>
			<Header active="home" />
			<Home />
		</>
	)
}

export default HomePage;