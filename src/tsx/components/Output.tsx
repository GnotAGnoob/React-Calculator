import { FunctionComponent } from "react";

interface propsType {
	previous?: string;
	current?: string;
}

export const Output: FunctionComponent<propsType> = (props) => {
	return (
		<output className="flex flex-col place-items-end place-content-between col-span-full p-3 bg-slate-900/70 break-words break-all">
			<div className="text-2xl text-slate-300/70">{props.previous}</div>
			<div className="text-5xl">{props.current}</div>
		</output>
	);
};
