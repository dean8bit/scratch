import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import "./scratch.css";
import * as esbuild from "esbuild-wasm";
import { useEffect, useState } from "react";

const Scratch = () => {
	const [loaded, setLoaded] = useState(false);
	const startService = async () => {
		await esbuild.initialize({ wasmURL: "https://unpkg.com/esbuild-wasm@0.14.2/esbuild.wasm" });
		setLoaded(true);
	};
	useEffect(() => {
		startService();
	}, []);

	if (!loaded)
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					minHeight: "100vh",
				}}
			>
				<h1>
					<p>Loading... </p>
					<progress></progress>
				</h1>
			</div>
		);
	return (
		<Provider store={store}>
			<div className="scratch">
				<CellList />
			</div>
		</Provider>
	);
};

export default Scratch;
