import {
	createContext,
	FunctionComponent,
	useContext,
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import { Comments, DataComments } from "../components/Comments";
import { FormComment } from "../components/forms/FormComment";
import { DataArticles, DataArticlesContext } from "../data/DataArticles";

export const Article: FunctionComponent = () => {
	const [userId, setUserId] = useState<number | undefined>();

	const { id } = useParams();
	const { articles, setArticles, loadingError } =
		useContext(DataArticlesContext);

	useEffect(() => {
		console.log("useEffect");
		if (!id) return;
		const parsedId = parseInt(id);
		setUserId(parsedId);
		if (!articles[parsedId]) return;
		document.title = "Article - " + articles[parsedId].title;
	}, [articles]);

	if (loadingError != "") {
		return <h1>{loadingError}</h1>;
	}

	if (typeof userId === "undefined") {
		return <></>;
	}

	const updateArticles = (comment: DataComments): void => {
		const newArticles = [...articles];
		newArticles[userId].comments.push(comment);
		setArticles(newArticles);
	};

	return (
		<article className="flex flex-col flex-wrap max-w-2xl h-full">
			<section>
				<img
					loading="lazy"
					className="max-h-96 object-cover"
					src={articles[userId].img}
					alt={articles[userId].alt}
				/>
				<div className="flex flex-col flex-1 pt-10 pb-10 px-8">
					<h2 className="leading-tight">{articles[userId].title}</h2>
					<h3 className="text-base">{articles[userId].category || "other"}</h3>
					<p className="mt-6">{`${articles[userId].description}`}</p>
				</div>
				{/*<footer className="flex gap-7">
					<p>
						<label>
							<input className="text-sm" type="checkbox" name="liked" /> Likes
						</label>
					</p>
					<a className="font-bold text-sm" href="./#comments">
						35 comments
					</a>
	</footer>*/}
			</section>

			<section id="comments" className="mt-10">
				<h2 className="my-5">Comments</h2>
				<FormComment article={articles[userId]} updateArticles={updateArticles} />
				<div className="pt-4">
					<Comments comments={articles[userId].comments} />
				</div>
			</section>
		</article>
	);
};
