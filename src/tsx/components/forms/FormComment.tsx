import React, { FunctionComponent, useContext, useState } from "react";
import { DataArticles } from "../../data/DataArticles";
import { firebaseURL as databaseURL } from "../../data/DataURL";
import { Button } from "../buttons/Button";
import { DataComments } from "../Comments";

interface FormCommentProps {
	article: DataArticles;
	updateArticles: (comment: DataComments) => void;
}

export const FormComment: FunctionComponent<FormCommentProps> = (props) => {
	const [commentInfo, setCommentInfo] = useState({ userId: "", comment: "" });
	const [isSent, setIsSent] = useState<boolean | null>(null);

	const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = { ...commentInfo, date: Date() };

		const sentComment = await fetch(
			`${databaseURL}/${props.article.databaseId}/${props.article.id}/comments.json`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([comment]),
			}
		);
		if (sentComment.ok) {
			props.updateArticles({
				...comment,
				commentId: comment.userId + comment.date,
			});

			setIsSent(true);
		} else {
			setIsSent(false);
		}
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		switch (e.target.name) {
			case "user":
				setCommentInfo({ ...commentInfo, userId: e.target.value });
				break;
			case "comment":
				setCommentInfo({ ...commentInfo, comment: e.target.value });
				break;
			default:
				break;
		}
	};

	if (isSent) {
		return <p className="py-5">Comment sent successfully!</p>;
	} else if (isSent === false) {
		return <p className="py-5">Error sending comment!</p>;
	}

	return (
		<form
			className="flex flex-col gap-3 border-b border-emerald-400/70 pb-10"
			onSubmit={(e) => postComment(e)}
		>
			<label htmlFor="user_input">User name:</label>
			<input
				type="text"
				id="user_input"
				className="w-full placeholder:text-slate-300 border-solid border-0 border-b border-slate-100 py-3 px-4 focus-visible:outline-green-400 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-[-1px]"
				onChange={handleChange}
				name="user"
				placeholder="User name..."
				required
			></input>
			<label className="mt-5" htmlFor="comments_input">
				Leave a comment
			</label>
			<textarea
				id="comments_input"
				className="w-full placeholder:text-slate-200 border-solid rounded-none border border-slate-100 py-3 px-4 focus-visible:outline-green-400 focus-visible:outline-2 focus-visible:outline focus-visible:outline-offset-[-1px]
				bg-transparent"
				onChange={handleChange}
				name="comment"
				rows={4}
				placeholder="Comment..."
				required
			></textarea>
			<Button className="self-end py-4 px-7" type="submit">
				Sent
			</Button>
		</form>
	);
};
