import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/auth/components/Login";
import Home from "./features/home/components/Home";

function RoutesApp() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/inicio" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RoutesApp;