import { FunctionComponent, Reducer, useEffect, useReducer } from "react";
import { ButtonSpecial } from "../components/calculator/ButtonSpecial";
import { ButtonDigit } from "../components/calculator/ButtonDigit";
import { ButtonOperation } from "../components/calculator/ButtonOperation";
import { Output } from "../components/Output";

export const enum ACTIONS {
	ADD_DIGIT,
	CHOOSE_OPERATION,
	CLEAR,
	DELETE_DIGIT,
	EVALUATE,
}

interface CalculatorPayload {
	digit: string;
}

export interface CalculatorAction {
	type: ACTIONS;
	payload: CalculatorPayload;
}

interface CalculatorState {
	current: string | null;
	previous: string | null;
	operation: "*" | "/" | "-" | "+" | null;
	overwrite?: boolean;
}

const emptyState = {
	current: null,
	previous: null,
	operation: null,
	overwrite: false,
};

//function that executes different methods based on action and state
const reducer = (
	state: CalculatorState,
	action: CalculatorAction
): CalculatorState => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					current: payload.digit,
				};
			}
			if (state.current === "0") {
				if (payload.digit === "0") return state;
				state.current = null;
			}
			if (payload.digit === "." && state.current?.includes(".")) return state;

			return {
				...state,
				current: `${state.current || ""}${payload.digit}`,
			};

		case ACTIONS.CHOOSE_OPERATION:
			if (!state.current && !state.previous) return state;

			if (
				payload.digit != "*" &&
				payload.digit != "/" &&
				payload.digit != "-" &&
				payload.digit != "+"
			)
				return state;

			if (!state.previous) {
				return {
					...state,
					operation: payload.digit,
					previous: state.current,
					current: null,
				};
			}

			if (!state.current) {
				return {
					...state,
					operation: payload.digit,
				};
			}

			return {
				...state,
				previous: calculate(state),
				operation: payload.digit,
				current: null,
			};

		case ACTIONS.CLEAR:
			return emptyState;
		case ACTIONS.DELETE_DIGIT:
			if (!state.current) return state;
			if (state.overwrite) return emptyState;
			if (state.current.length == 1) {
				return { ...state, current: null };
			}

			return { ...state, current: state.current.slice(0, -1) };
		case ACTIONS.EVALUATE:
			if (!(state.current && state.operation && state.previous)) return state;
			return {
				...state,
				overwrite: true,
				previous: null,
				operation: null,
				current: calculate(state),
			};
	}
};

const calculate = (state: CalculatorState): string => {
	const result = eval(`${state.previous}${state.operation}${state.current}`);
	if (!result) return "";
	return result.toString();
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
	maximumFractionDigits: 0,
});

const formatNumber = (number: string | number | null): string | null => {
	if (!number) return null;
	number = number + "";

	const [integer, decimal] = number.split(".");
	if (!decimal && !integer) return "0.";
	if (!decimal) return INTEGER_FORMATTER.format(parseFloat(integer + ""));
	if (!integer) return `0.${decimal}`;

	return `${INTEGER_FORMATTER.format(parseFloat(integer + ""))}.${decimal}`;
};

//START OF CALCULATOR
export const Calculator: FunctionComponent = () => {
	//cuz of typescript, it is needed to define default state
	const [{ current, previous, operation }, dispatch] = useReducer(
		reducer,
		emptyState
	);

	//effect that changes page title
	useEffect(() => {
		document.title = "Calculator - dont do math!";
	}, []);

	return (
		<div className="grid grid-cols-[repeat(4,6rem)] grid-rows-[minmax(8rem,auto)_repeat(5,6rem)] gap-1 text-slate-200 text-3xl bg-slate-400/80">
			<Output
				previous={`${formatNumber(previous) || ""} ${operation || ""}`}
				current={`${formatNumber(current) || ""}`}
			></Output>
			<ButtonSpecial
				digit="AC"
				type={ACTIONS.CLEAR}
				className="col-span-2"
				dispatch={dispatch}
			></ButtonSpecial>
			<ButtonSpecial
				digit="DEL"
				type={ACTIONS.DELETE_DIGIT}
				dispatch={dispatch}
			></ButtonSpecial>
			<ButtonOperation digit="/" dispatch={dispatch}></ButtonOperation>
			<ButtonDigit digit={"1"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"2"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"3"} dispatch={dispatch}></ButtonDigit>
			<ButtonOperation digit="*" dispatch={dispatch}></ButtonOperation>
			<ButtonDigit digit={"4"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"5"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"6"} dispatch={dispatch}></ButtonDigit>
			<ButtonOperation digit="+" dispatch={dispatch}></ButtonOperation>
			<ButtonDigit digit={"7"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"8"} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"9"} dispatch={dispatch}></ButtonDigit>
			<ButtonOperation digit="-" dispatch={dispatch}></ButtonOperation>
			<ButtonDigit digit={"."} dispatch={dispatch}></ButtonDigit>
			<ButtonDigit digit={"0"} dispatch={dispatch}></ButtonDigit>
			<ButtonSpecial
				digit="="
				type={ACTIONS.EVALUATE}
				className="col-span-2"
				dispatch={dispatch}
			></ButtonSpecial>
		</div>
	);
};
