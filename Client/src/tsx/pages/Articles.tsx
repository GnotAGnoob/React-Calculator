import {
	FunctionComponent,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { ButtonFilter } from "../components/buttons/ButtonFilter";
import { CardArticle } from "../components/cards/CardArticle";
import { DataArticles, DataArticlesContext } from "../data/DataArticles";

type inputCheck = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface filterArticles {
	category: string;
	articles: DataArticles[];
}

//PRELOAD FUNCTION
const preload = (articles: DataArticles[]): filterArticles[] => {
	const filteredArticles: filterArticles[] = [];

	articles.forEach((article) => {
		if (!article.category) article.category = "other";

		const categoryArray = filteredArticles.find(
			(e) => e.category == article.category
		);

		if (!categoryArray) {
			let category = article.category;
			if (!category) category = "other";

			filteredArticles.push({ category: category, articles: [article] });
			return;
		}

		categoryArray.articles.push(article);
	});

	return filteredArticles;
};

//START OF COMPONENT
export const Articles: FunctionComponent = () => {
	const [showArticles, setShowArticles] = useState<filterArticles>();
	const filteredArticles = useRef<filterArticles[]>([]);

	const { articles, loadingError } = useContext(DataArticlesContext);

	useEffect(() => {
		if (showArticles || !articles.length) return;

		const unsortedArticles: filterArticles = {
			category: "unsorted",
			articles: articles,
		};

		filteredArticles.current = preload(articles);
		setShowArticles(unsortedArticles);
		document.title = "Articles";
	}, [articles]);

	if (showArticles) {
		document.title = `Articles${
			showArticles?.category !== "unsorted"
				? ` sorted by ${showArticles?.category}`
				: ""
		}`;
	}

	//ONCLICK
	const filterArticles = (e: inputCheck) => {
		const unsortedArticles = { category: "unsorted", articles: articles };

		if (e.currentTarget.value == showArticles?.category) {
			return setShowArticles(unsortedArticles);
		}

		const foundFilteredArticle = filteredArticles.current.find(
			(el) => e.currentTarget.value == el.category
		);

		if (!foundFilteredArticle) return setShowArticles(unsortedArticles);

		setShowArticles(foundFilteredArticle);
	};

	if (loadingError != "") {
		return <h1>{loadingError}</h1>;
	}

	if (typeof showArticles === "undefined") {
		return <></>;
	}

	return (
		<section className="flex gap-10 flex-col px-24 w-full">
			<header className="flex gap-5 items-center">
				<p>filter by:</p>
				<form className="flex flex-wrap gap-5" role="tablist">
					{filteredArticles.current.map((filteredArticle) => {
						return (
							<ButtonFilter
								key={filteredArticle.category}
								id={filteredArticle.category}
								onClick={filterArticles}
								active={showArticles.category}
							>
								{filteredArticle.category}
							</ButtonFilter>
						);
					})}
				</form>
			</header>

			<div
				id={showArticles.category}
				role="tabpanel"
				aria-labelledby={showArticles.category + "-tab"}
				className="grid grid-cols-[repeat(auto-fit,minmax(25ch,40ch))] gap-20 mt-16"
			>
				{showArticles.articles.map((article) => {
					return (
						<CardArticle
							key={article.databaseId + article.id}
							id={article.id}
							img={article.img}
							alt={article.alt}
							title={article.title}
							category={article.category}
							description={article.description}
						/>
					);
				})}
			</div>
		</section>
	);
};
