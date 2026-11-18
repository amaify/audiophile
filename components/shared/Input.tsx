import type { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";
import type { UseFormRegister, Path, FieldErrors } from "react-hook-form";
import { FormInputSchema } from "../../app/checkout/components";

interface Props extends ComponentPropsWithoutRef<"input"> {
  control: "radio" | "text";
  label: string;
  register: UseFormRegister<FormInputSchema>;
  name: Path<FormInputSchema>;
  addedStyle?: string;
  error?: FieldErrors<FormInputSchema>;
}

const Input = ({ control, label, addedStyle, error, name, register, ...props }: Props) => {
  const hasError = Boolean(error && error[`${name}`]);
  return (
    <>
      {control === "text" && (
        <div className={clsx("flex flex-col gap-[9px] relative", addedStyle && addedStyle)}>
          <label
            className={clsx("text-[12px] font-bold leading-4 capitalize", hasError ? "text-error" : "text-black")}
            htmlFor={props.id}
          >
            {label}
          </label>
          <input
            autoComplete="off"
            className={clsx(
              "w-full rounded-[8px] border-none px-[24px] py-[18px] text-[16px] leading-[19px] font-bold tracking-[-0.25px] text-black caret-primary",
              "placeholder:text-[14px] placeholder:leading-[19px] placeholder:font-bold placeholder:text-black/40",
              hasError ? "outline-2 outline-error" : "outline outline-silver focus:outline-primary"
            )}
            {...props}
            {...register(name)}
          />
          {hasError ? (
            <p className="absolute top-0 right-0 font-bold capitalize leading-4 text-error">
              {error?.[`${name}`]?.message}
            </p>
          ) : null}
        </div>
      )}

      {control === "radio" && (
        <label
          className={clsx(
            addedStyle && addedStyle,
            "rounded-[8px] border border-gray-200 px-[24px] py-[18px] hover:cursor-pointer hover:border-primary",
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
