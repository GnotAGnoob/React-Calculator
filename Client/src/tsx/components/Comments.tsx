export interface DataComments {
	commentId: string;
	userId: string;
	date: string;
	comment: string;
}

export const Comments = (props: { comments: DataComments[] }) => {
	if (!props.comments) return <p>No comments yet!</p>;

	return (
		<>
			{props.comments
				.slice(0)
				.reverse()
				.map((comment) => {
					const elapsedTime =
						(new Date().getTime() - Date.parse(comment.date)) / 36e5;
					const time =
						elapsedTime < 1
							? Math.floor(elapsedTime * 60) + " minutes ago"
							: elapsedTime < 2
							? "1 hour ago"
							: elapsedTime < 24
							? Math.floor(elapsedTime) + " hours ago"
							: elapsedTime < 48
							? "yesterday"
							: Math.floor(elapsedTime / 7) + " weeks ago";

					//console.log(elapsedTime);
					return (
						<article
							key={comment.commentId}
							className="py-7 border-b border-emerald-400/70 last:border-0"
						>
							<header className="flex gap-5 place-items-center">
								<p className="font-bold">{comment.userId}</p>
								<span>-</span>
								<p className="text-sm">
									<time dateTime="2021-11-11T04:30">{time}</time>
								</p>
							</header>
							<p className="mt-4">{comment.comment}</p>
							{/*<footer>
				<p>
					<label>
						<input type="checkbox" /> Likes
					</label>
				</p>

				<button aria-label="Odpovědět na komentář" type="button">
					Odpovědět
				</button>
	</footer>*/}
						</article>
					);
				})}
		</>
	);
};
