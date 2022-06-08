import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface ButtonProps {
	className?: string;
	children?: React.ReactNode;
	to: string;
}

export const ButtonNavLink: FunctionComponent<ButtonProps> = (props) => {
	const style = `block px-7 py-7 bg-transparent hover:text-inherit hover:bg-teal-200/50 ${
		props.className || ""
	}`;
	const activeStyle = `${style} bg-teal-200/25`;

	return (
		<NavLink
			to={props.to}
			className={({ isActive }) => (isActive ? activeStyle : style)}
		>
			{props.children}
		</NavLink>
	);
};
