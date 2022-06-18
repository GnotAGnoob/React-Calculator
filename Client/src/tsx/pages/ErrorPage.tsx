import { FunctionComponent, useEffect } from "react";

export const ErrorPage: FunctionComponent = () => {
	//effect that changes page title
	useEffect(() => {
		document.title = "Oops! Page not found";
	}, []);

	return <h1>THIS IS ERROR 404</h1>;
};
