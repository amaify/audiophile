import React from "react";
import { clsx } from "clsx";

interface Props {
	control: string;
	label: string;
	type: string;
	name: string;
	id: string;
	value: string | number;
	placeholder?: string;
	style?: string;
	checked?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
	control,
	label,
	type,
	name,
	id,
	value,
	placeholder,
	style,
	checked,
	onChange,
}: Props) => {
	return (
		<>
			{control === "text" && (
				<div className={clsx("flex flex-col gap-[9px]", style && style)}>
					<label
						className="text-[12px] text-black font-bold leading-4 capitalize"
						htmlFor={id}
					>
						{label}
					</label>
					<input
						type={type}
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						autoComplete="off"
						className="[ input ]"
					/>
				</div>
			)}

			{control === "radio" && (
				<label
					className={clsx(
						style && style,
						"[ payment-method ] border hover:cursor-pointer",
						checked && "border-primary"
					)}
					htmlFor={id}
				>
					<input
						type={type}
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						checked={checked}
						className="accent-primary"
					/>
					<span className="ml-[16px] text-[12px] text-black font-bold leading-4 capitalize">
						{label}
					</span>
				</label>
			)}
		</>
	);
};

export default Input;
