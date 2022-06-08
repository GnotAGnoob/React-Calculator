import { FunctionComponent, useState } from "react";

interface ButtonProps {
	active: string;
	id: string;
	onClick: React.MouseEventHandler<HTMLElement>;
	className?: string;
	children: string;
}

export const ButtonFilter: FunctionComponent<ButtonProps> = (props) => {
	const [isActive, setIsActive] = useState();
	return (
		<button
			id={props.children + "-tab"}
			type="button"
			role="tab"
			aria-selected={isActive}
			aria-controls={props.children}
			className={`px-4 py-2 rounded-md   transition-colors ${
				props.active == props.children
					? "bg-sky-300/60"
					: "bg-teal-400/50 hover:bg-teal-200/60"
			}`}
			onClick={props.onClick}
			value={props.children}
		>
			{props.children}
		</button>
	);
};
