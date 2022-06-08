import { createContext, FunctionComponent, useEffect, useState } from "react";

export interface DataArticles {
	id: string;
	img: string;
	category?: string;
	alt: string;
	title: string;
	description: string;
}

interface DataArticlesProps {
	children?: React.ReactNode;
}

export const DataArticlesContext = createContext({
	articles: [] as DataArticles[],
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
	const getData = await fetch(
		"https://reactpractice-5fc65-default-rtdb.europe-west1.firebasedatabase.app/articles.json",
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}
	);

	const data = await getData.json();
	const transformedData: DataArticles[] = [];

	for (const key in data) {
		for (const key2 in data[key]) {
			const article = {
				id: key2,
				...data[key][key2],
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
		loadingError: loadingError(isLoading, isError),
	};

	return (
		<DataArticlesContext.Provider value={articlesContext}>
			{props.children}
		</DataArticlesContext.Provider>
	);
};
