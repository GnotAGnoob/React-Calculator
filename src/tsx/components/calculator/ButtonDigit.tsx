import { FunctionComponent } from "react";
import { ACTIONS } from "../../pages/Calculator";
import { Button, ButtonPropsInherit } from "../buttons/Button";

export const ButtonDigit: FunctionComponent<ButtonPropsInherit> = ({
	dispatch,
	digit,
	className,
}) => {
	return (
		<Button
			className={`${className}`}
			onClick={() => {
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
			}}
		>
			{digit}
		</Button>
	);
};
