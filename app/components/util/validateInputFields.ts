import { z } from "zod";

const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numberFormat = /^[0-9]*$/;

function validateCardNumber({ cardNumber }: { cardNumber: string }) {
  if (cardNumber === "") return "Card number is required";
  if (!numberFormat.test(cardNumber)) return "Must be a number";
  if (cardNumber.length !== 16) return "Must be 16 characters";

  return "";
}

function validateCardPin({ cardPin }: { cardPin: string }) {
  if (cardPin === "") return "Card number is required";
  if (!numberFormat.test(cardPin)) return "Must be a number";
  if (cardPin.length !== 4) return "Must be 4 characters";

  return "";
}

export const inputFieldSchema = z
  .object({
    name: z.string().min(1, "Cannot be emtpy").min(2, "Name is required"),
    emailAddress: z.string().min(1, "Email is required").email("Email not valid").regex(mailFormat, "Email not valid"),
    address: z.string().min(1, "Address is required"),
    zipCode: z.string().min(1, "Zip Code is required").min(4, "Min. 4 characters"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required").min(4, "Min. 4 characters"),
    paymentMethod: z.literal("online").or(z.literal("cash")),
    phoneNumber: z.string().min(4, "Min. 4 characters").regex(numberFormat, "Must be a number"),
    cardNumber: z.string(),
    cardPin: z.string()
  })
  .superRefine(({ cardNumber, cardPin, paymentMethod }, ctx) => {
    if (paymentMethod === "online" && !!validateCardNumber({ cardNumber })) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validateCardNumber({ cardNumber }),
        path: ["cardNumber"]
      });
    }

    if (paymentMethod === "online" && !!validateCardPin({ cardPin })) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: validateCardPin({ cardPin }),
        path: ["cardPin"]
      });
    }
  });

export type FormInputSchema = z.infer<typeof inputFieldSchema>;
