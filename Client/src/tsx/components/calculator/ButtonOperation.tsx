import { FunctionComponent } from "react";
import { ACTIONS } from "../../pages/Calculator";
import { Button, ButtonPropsInherit } from "../buttons/Button";

interface ButtonPropsOperation extends ButtonPropsInherit {
	digit: "*" | "/" | "-" | "+";
}

export const ButtonOperation: FunctionComponent<ButtonPropsInherit> = ({
	dispatch,
	digit,
	className,
}) => {
	return (
		<Button
			className={`${className}`}
			onClick={() => {
				dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { digit } });
			}}
		>
			{digit}
		</Button>
	);
};
