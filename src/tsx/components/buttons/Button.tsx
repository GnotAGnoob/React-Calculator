import { FunctionComponent } from "react";
import { CalculatorAction } from "../../pages/Calculator";

export interface ButtonPropsInherit {
	dispatch: React.Dispatch<CalculatorAction>;
	digit: string;
	className?: string;
}

interface ButtonProps {
	onClick?: React.MouseEventHandler<HTMLElement>;
	className?: string;
	children?: React.ReactNode;
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
	return (
		<button
			type="button"
			className={`bg-slate-200/60 hover:bg-cyan-400/60 transition ${
				props.className || ""
			}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
