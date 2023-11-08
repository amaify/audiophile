import React, { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

interface Props extends ComponentPropsWithoutRef<"input"> {
  control: "radio" | "text";
  label: string;
  name: string;
  value: string | number;
  addedStyle?: string;
  error?: Record<string, string>;
}

const Input = ({
  control,
  label,
  type,
  name,
  id,
  value,
  placeholder,
  addedStyle,
  checked,
  error,
  onBlur,
  onChange
}: Props) => {
  return (
    <>
      {control === "text" && (
        <div className={clsx("flex flex-col gap-[9px] relative", addedStyle && addedStyle)}>
          <label
            className={clsx(
              "text-[12px] text-black font-bold leading-4 capitalize",
              error && error[`${name}`] ? "text-red-600" : null
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
            className={clsx("[ input ]", error && error[`${name}`] ? "[ input-error ]" : null)}
          />
          {error && error[`${name}`] ? (
            <p className="text-red-600 font-medium text-base capitalize leading-4 absolute top-0 right-0">
              {error[`${name}`]}
            </p>
          ) : null}
        </div>
      )}

      {control === "radio" && (
        <label
          className={clsx(
            addedStyle && addedStyle,
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
          <span className="ml-[16px] text-[12px] text-black font-bold leading-4 capitalize">{label}</span>
        </label>
      )}
    </>
  );
};

export default Input;
