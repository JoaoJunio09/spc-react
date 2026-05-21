import Header from "../components/layout/header";
import StepsAndCatechists from "../features/steps_and_catechists/components/StepsAndCatechists";

function StepsAndCatechistsPage() {
	return (
		<>
			<Header active="steps-and-catechists" />
			<StepsAndCatechists />
		</>
	)
}

export default StepsAndCatechistsPage;