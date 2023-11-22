import type { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Cart } from "@/store/cart/cart.reducer";
import { onlinePaymentReceiptEmail } from "./online-payment-receipt";
import { cashPaymentConfirmationEmail } from "./cash-payment-confirmation";

export interface BodyRequest extends Cart {
  email: string;
  clientName: string;
  paymentMethod: "cash" | "online";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;
  const bodyRequest = JSON.parse(req.body) as BodyRequest;
  const { cart, total, grandTotal, clientName, paymentMethod } = bodyRequest;

  const transporter = createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  const isOnline = paymentMethod === "online";

  const mailOptions: MailOptions = {
    from: `Audiophile <${user}>`,
    to: bodyRequest.email,
    subject: isOnline ? "Receipt for your purchase on Audiophile" : "Order confirmation for cash payment",
    html: isOnline
      ? onlinePaymentReceiptEmail({ cart, total, grandTotal, clientName })
      : cashPaymentConfirmationEmail({ cart, clientName })
  };

  transporter.sendMail(mailOptions, (error, _) => {
    if (!error) return res.status(200).json({ status: "success" });

    return res.status(400).json({ status: "failed" });
  });
}

export const config = {
  api: {
    externalResolver: true
  }
};
