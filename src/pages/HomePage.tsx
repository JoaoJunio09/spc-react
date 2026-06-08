import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Home from "../features/home/components/Home";

function HomePage() {
	return (
		<>
			<Header active="home" />
			<Home />
			<Footer />
		</>
	)
}

export default HomePage;