import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/dashboard";
import Wallets from "./pages/wallets";

function App() {
	return (
		// <div className="App">
			<Sidebar>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/wallets" element={<Wallets />} />
				</Routes>
			</Sidebar>
		// </div>
	);
}

export default App;
