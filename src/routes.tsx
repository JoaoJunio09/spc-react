import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MassesPage from "./pages/MassesPage";
import StepsAndCatechistsPage from "./pages/StepsAndCatechistsPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/inicio" element={<HomePage />} />
				<Route path="/missas" element={<MassesPage />} />
				<Route path="/etapas-e-catequistas" element={<StepsAndCatechistsPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp;