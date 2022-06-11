import { createContext, FunctionComponent, useEffect, useState } from "react";
import { DataComments } from "../components/Comments";
import { firebaseURL as databaseURL } from "./DataURL";

export interface DataArticles {
	id: string;
	databaseId: string;
	img: string;
	category?: string;
	alt: string;
	title: string;
	description: string;
	comments: DataComments[];
}

interface DataArticlesProps {
	children?: React.ReactNode;
}

export const DataArticlesContext = createContext({
	articles: [] as DataArticles[],
	setArticles: function () {} as React.Dispatch<
		React.SetStateAction<DataArticles[]>
	>,
	loadingError: "",
});

interface LoadArticles {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsError: React.Dispatch<React.SetStateAction<boolean>>;
	setArticles: React.Dispatch<React.SetStateAction<DataArticles[]>>;
}

const loadArticles = async ({
	setIsLoading,
	setIsError,
	setArticles,
}: LoadArticles): Promise<void> => {
	const getData = await fetch(databaseURL + ".json", {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	const data = await getData.json();
	const transformedData: DataArticles[] = [];

	for (const key in data) {
		for (const key2 in data[key]) {
			const dataComments = data[key][key2].comments;
			const transformedComments: DataComments[] = [];

			for (const key in dataComments) {
				for (const key2 in dataComments[key]) {
					const comment = {
						...dataComments[key][key2],
						commentId: key + dataComments[key].id,
						date: new Date(dataComments[key][key2].date),
					};

					transformedComments.push(comment);
				}
			}

			const article = {
				...data[key][key2],
				databaseId: key,
				id: key2,
				comments: transformedComments,
			};

			transformedData.push(article);
		}
	}

	setIsLoading(false);
	if (transformedData.length == 0) return setIsError(true);
	setArticles(transformedData);
};

const loadingError = (isLoading: boolean, isError: boolean) => {
	if (isLoading) {
		return "Loading...";
	}

	if (isError) {
		return "Error while loading articles...";
	}

	return "";
};

export const DataArticlesContextProvider: FunctionComponent<
	DataArticlesProps
> = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [articles, setArticles] = useState<DataArticles[]>([]);

	useEffect(() => {
		setIsLoading(true);
		loadArticles({ setIsLoading, setIsError, setArticles });
	}, []);

	const articlesContext = {
		articles: articles,
		setArticles: setArticles,
		loadingError: loadingError(isLoading, isError),
	};

	return (
		<DataArticlesContext.Provider value={articlesContext}>
			{props.children}
		</DataArticlesContext.Provider>
	);
};
