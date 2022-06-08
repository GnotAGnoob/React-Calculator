import { FunctionComponent } from "react";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export const Card: FunctionComponent<Props> = (props) => {
	return (
		<div
			className={`bg-slate-100/70 shadow-lg rounded-xl overflow-hidden ${
				props.className || ""
			}`}
		>
			{props.children}
		</div>
	);
};
