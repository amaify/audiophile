import type { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { Cart } from "@/store/cart/cart.reducer";
import { emailBody } from "./email-service.util";

export interface BodyRequest extends Cart {
  email: string;
  clientName: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;
  const bodyRequest = JSON.parse(req.body) as BodyRequest;

  const transporter = createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  const mailOptions: MailOptions = {
    from: user,
    to: bodyRequest.email,
    subject: "Receipt for your purchase on Audiophile",
    html: emailBody({
      cart: bodyRequest.cart,
      total: bodyRequest.total,
      grandTotal: bodyRequest.grandTotal,
      clientName: bodyRequest.clientName
    })
  };

  transporter.sendMail(mailOptions, (error, _) => {
    if (!error) return res.status(200).json({ status: "success" });

    return res.status(400).json({ status: "failed" });
  });
}
