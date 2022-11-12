import React from "react";
import {
	ExclamationCircleIcon,
	CheckCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";

export enum AlertType {
	Success,
	Warning,
	Error,
}

interface Props {
	message: string;
	type: AlertType;
}

const color = (type: AlertType) => {
	if (type === AlertType.Success) return "success";
	if (type === AlertType.Warning) return "warning";
	if (type === AlertType.Error) return "error";
};

const icon = (type: AlertType) => {
	if (type === AlertType.Success)
		return <CheckCircleIcon className="w-8 h-8 " aria-hidden="true" />;
	if (type === AlertType.Warning)
		return <ExclamationCircleIcon className="w-8 h-8 " aria-hidden="true" />;
	if (type === AlertType.Error)
		return <XCircleIcon className="w-8 h-8 " aria-hidden="true" />;
};

export const Alert = ({ message, type }: Props) => {
	return (
		<div
			className={`relative bg-white shadow rounded-md overflow-hidden border border-${color(
				type
			)} mb-[20px] p-6`}
		>
			<div
				className={`absolute top-0 -left-[-40%] w-[100%] h-[250%] -translate-x-24 bg-gradient-to-r from-${color(
					type
				)} to-transparent mix-blend-multiply opacity-20 rotate-12 blur-3xl`}
			></div>
			<div className="flex items-center gap-3">
				<p className={`text-${color(type)} [ phile-icon ]`}>{icon(type)}</p>
				<p className="[ body-text ]">{message}</p>
			</div>
		</div>
	);
};
