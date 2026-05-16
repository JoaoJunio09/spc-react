import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MassesPage from "./pages/MassesPage";
import StepsAndCatechistsPage from "./pages/StepsAndCatechistsPage";
import CatechumensPage from "./pages/CatechumensPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/inicio" element={<HomePage />} />
				<Route path="/etapas-e-catequistas" element={<StepsAndCatechistsPage />} />
				<Route path="/catequizandos" element={<CatechumensPage />} />
				<Route path="/missas" element={<MassesPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp;