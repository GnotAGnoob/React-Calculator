import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./common/Header";
import { Calculator } from "./pages/Calculator";
import { FunctionComponent } from "react";
import { Index } from "./pages/Index";
import { ErrorPage } from "./pages/ErrorPage";
import { Article } from "./pages/Article";
import { Articles } from "./pages/Articles";
import { Footer } from "./common/Footer";

export const App: FunctionComponent = () => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Header />
				<main className="flex flex-column justify-center mt-36 mb-40 ">
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/calculator" element={<Calculator />} />
						<Route path="/articles" element={<Articles />} />
						<Route path="/articles/:id" element={<Article />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</React.StrictMode>
	);
};
