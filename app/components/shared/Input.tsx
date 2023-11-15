import React, { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";
import type { UseFormRegister, Path, FieldErrors } from "react-hook-form";
import type { FormInputSchema } from "../util/validateInputFields";

interface Props extends ComponentPropsWithoutRef<"input"> {
  control: "radio" | "text";
  label: string;
  register: UseFormRegister<FormInputSchema>;
  name: Path<FormInputSchema>;
  addedStyle?: string;
  error?: FieldErrors<FormInputSchema>;
}

const Input = ({ control, label, addedStyle, error, name, register, ...props }: Props) => {
  const inputError = {
    inputFieldError: error && error[`${name}`] ? "[ input-error ]" : null,
    inputLabelError: error && error[`${name}`] ? "[ input-label-error ]" : null
  };
  return (
    <>
      {control === "text" && (
        <div className={clsx("flex flex-col gap-[9px] relative", addedStyle && addedStyle)}>
          <label
            className={clsx("text-[12px] text-black font-bold leading-4 capitalize", inputError.inputLabelError)}
            htmlFor={props.id}
          >
            {label}
          </label>
          <input
            autoComplete="off"
            className={clsx("[ input ]", inputError.inputFieldError)}
            {...props}
            {...register(name)}
          />
          {error && error[`${name}`] ? (
            <p
              className={clsx(
                "font-medium capitalize leading-4 absolute top-0 right-0",
                inputError.inputLabelError ? [inputError.inputLabelError, "font-bold"] : null
              )}
            >
              {error[`${name}`]?.message}
            </p>
          ) : null}
        </div>
      )}

      {control === "radio" && (
        <label
          className={clsx(
            addedStyle && addedStyle,
            "[ payment-method ] border hover:cursor-pointer hover:border-primary",
            props.checked && "border-primary"
          )}
          htmlFor={props.id}
        >
          <input className="accent-primary" {...props} {...register(name)} />
          <span className="ml-[16px] text-[12px] text-black font-bold leading-4 capitalize">{label}</span>
        </label>
      )}
    </>
  );
};

export default Input;
