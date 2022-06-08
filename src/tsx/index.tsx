import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";
import "../scss/style.scss";
import { DataArticlesContextProvider } from "./data/DataArticles";

const container = document.getElementById("root");

if (container) {
	// Create a root.
	const root = ReactDOMClient.createRoot(container);

	root.render(
		<DataArticlesContextProvider>
			<App />
		</DataArticlesContextProvider>
	);
}
