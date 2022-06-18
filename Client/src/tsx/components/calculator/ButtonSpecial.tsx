import { FunctionComponent } from "react";
import { ACTIONS } from "../../pages/Calculator";
import { Button, ButtonPropsInherit } from "../buttons/Button";

interface ButtonPropsSpecial extends ButtonPropsInherit {
	type: Exclude<ACTIONS, ACTIONS.ADD_DIGIT | ACTIONS.CHOOSE_OPERATION>;
}

export const ButtonSpecial: FunctionComponent<ButtonPropsSpecial> = ({
	dispatch,
	digit,
	type,
	className,
}) => {
	return (
		<Button
			className={`${className}`}
			onClick={() => {
				dispatch({ type: type, payload: { digit } });
			}}
		>
			{digit}
		</Button>
	);
};
