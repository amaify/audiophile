import { z } from "zod";

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberFormat = /^[0-9]*$/;

export const CheckoutFormValidtion = z.object({
  name: z.string().min(2, "Name is required"),
  email: z
    .string()
    .email("Email is required")
    .refine((value) => mailFormat.test(value), {
      message: "Email not valid"
    }),
  phoneNumber: z
    .string()
    .min(4, "Min. 4 characters")
    .refine((mobilePhoneNumber) => numberFormat.test(mobilePhoneNumber), { message: "Must be a number" })
});

export type CheckoutFormSchema = z.infer<typeof CheckoutFormValidtion>;

function validateText(inputValue: string) {
  if (inputValue.length <= 4 && inputValue) return "Min. 5 Characters";
  return "";
}

function validateEmail(inputValue: string) {
  if (!mailFormat.test(inputValue) && inputValue) return "Wrong Format";
  return "";
}

function validateNumber(inputValue: string) {
  if (inputValue.length <= 3 && inputValue) return "Min. 4 Characters";
  if (!numberFormat.test(inputValue) && inputValue) return "Must be a number";
  return "";
}

export function validateInputField(inputValue: string, inputType: string): string {
  if (inputType === "text") return validateText(inputValue);
  if (inputType === "email") return validateEmail(inputValue);
  if (inputType === "tel") return validateNumber(inputValue);

  return "";
}
