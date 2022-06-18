import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { DataArticles } from "../../data/DataArticles";
import { ArticleImage } from "../ArticleImage";

type CardArticleProps = Omit<DataArticles, "comments" | "databaseId">;

export const CardArticle: FunctionComponent<CardArticleProps> = (props) => {
	return (
		<Link className="hover:scale-105 transition-transform" to={"./" + props.id}>
			<Card className="h-full">
				<article className="flex flex-col flex-wrap max-w-sm h-full">
					<ArticleImage src={props.img} alt={props.alt}></ArticleImage>
					<div className="flex flex-col flex-1 pt-4 pb-10 px-8">
						<h2 className="leading-tight">{props.title}</h2>
						<h2 className="text-base lowercase">{props.category || "other"}</h2>
						<p className="mt-6">{`${props.description.substring(0, 90)} ...`}</p>
						<div className="self-start mt-auto">
							<p className="hover:text-teal-200 text-sm transition-colors mt-8">
								See more
							</p>
						</div>
					</div>
				</article>
			</Card>
		</Link>
	);
};
