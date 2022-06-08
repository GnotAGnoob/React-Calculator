import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataArticlesContext } from "../data/DataArticles";

export const Article: FunctionComponent = () => {
	const [userId, setUserId] = useState<number | undefined>();
	const { id } = useParams();
	const { articles, loadingError } = useContext(DataArticlesContext);

	useEffect(() => {
		if (!id) return;
		setUserId(parseInt(id));
	}, []);

	if (loadingError != "") {
		return <h1>{loadingError}</h1>;
	}

	if (typeof userId === "undefined") {
		return <></>;
	}

	return (
		<article className="flex flex-col flex-wrap max-w-2xl h-full">
			<section>
				<img
					className="max-h-96 object-cover"
					src={articles[userId].img}
					alt={articles[userId].alt}
				/>
				<div className="flex flex-col flex-1 pt-10 pb-10 px-8">
					<h2 className="leading-tight">{articles[userId].title}</h2>
					<h3 className="text-base">{articles[userId].category || "other"}</h3>
					<p className="mt-6">{`${articles[userId].description}`}</p>
				</div>
				<footer>
					<p>
						<label>
							<input type="checkbox" name="liked" /> Likes
						</label>
					</p>
					<p>
						<a href="#comments">35 komentaru</a>
					</p>
				</footer>
			</section>

			<section id="comments">
				<h2>Komentáře</h2>
				<form>
					<label htmlFor="comments_input">Zanechte komentář</label>
					<textarea
						id="comments_input"
						name="comment"
						rows={4}
						placeholder="Komentář..."
					></textarea>
					<input type="submit" value="Odeslat" />
				</form>
				<article>
					<header>
						<p>Miroslav Steiner</p>
						<span>-</span>
						<p>
							<time dateTime="2021-11-11T04:30">55 minutes ago</time>
						</p>
					</header>
					<p>
						Velmi podobný stroj vyráběli Ukrajinci ještě snad 40 roků po českém A38.
						Antonov 2 byl ideální dopravní prostředek v zemi s velmi řídkou dopravní
						strukturou. V ČR by se uplatnil i dnes a u nás, jeho malá cestovní
						rychlost je výhodou při přistávání třeba na venkovských letištích, na
						každé louce. Při požárech nebo velkých nehodách může také nahradit
						vrtulník, zejména při dopravě zraněných nebo lékařských zařízení. Vozit
						pacienty by zvládl po několika najednou, náklady by byly nepochybně nižší.
					</p>
					<footer>
						<p>
							<label>
								<input type="checkbox" />
							</label>
						</p>

						<button aria-label="Odpovědět na komentář" type="button">
							Odpovědět
						</button>
					</footer>
				</article>
			</section>
		</article>
	);
};
