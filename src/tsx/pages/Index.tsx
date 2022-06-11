import { FunctionComponent, useEffect } from "react";

export const Index: FunctionComponent = () => {
	//effect that changes page title
	useEffect(() => {
		document.title = "Home Page";
	}, []);
	return (
		<>
			<h1>This is HOME page</h1>
		</>
	);
};
