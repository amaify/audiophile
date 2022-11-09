import React, { ChangeEvent, FocusEvent } from "react";
import { clsx } from "clsx";
import { InputError } from "../../Types/FormInput";

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
	error?: Record<string, InputError>;
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
	error,
	onBlur,
	onChange,
}: Props) => {
	return (
		<>
			{control === "text" && (
				<div
					className={clsx("flex flex-col gap-[9px] relative", style && style)}
				>
					<label
						className={clsx(
							"text-[12px] text-black font-bold leading-4 capitalize",
							error && error[`${name}`]?.errorState ? "text-red-600" : null
						)}
						htmlFor={id}
					>
						{label}
					</label>
					<input
						type={type}
						id={id}
						name={name}
						value={value}
						onBlur={onBlur}
						onChange={onChange}
						placeholder={placeholder}
						autoComplete="off"
						className={clsx(
							"[ input ]",
							error && error[`${name}`]?.errorState ? "[ input-error ]" : null
						)}
					/>
					{error && error[`${name}`]?.errorState ? (
						<p className="text-red-600 font-medium text-base capitalize leading-4 absolute top-0 right-0">
							{error[`${name}`]?.errorMessage}
						</p>
					) : null}
				</div>
			)}

			{control === "radio" && (
				<label
					className={clsx(
						style && style,
						"[ payment-method ] border hover:cursor-pointer hover:border-primary",
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
