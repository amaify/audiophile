import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { NextResponse } from "next/server";
import { Cart } from "@/store/cart/CartReducer";
import { onlinePaymentReceiptEmail } from "./online-payment-receipt";
import { cashPaymentConfirmationEmail } from "./cash-payment-confirmation";

export interface BodyRequest extends Cart {
  email: string;
  clientName: string;
  paymentMethod: "cash" | "online";
}

export async function POST(req: Request) {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;
  const bodyRequest = (await req.json()) as BodyRequest;
  const { cart, total, grandTotal, clientName, paymentMethod } = bodyRequest;

  const transporter = createTransport({
    service: "gmail",
    auth: { user, pass }
  });

  const isOnline = paymentMethod === "online";
  const payerName = clientName.split(" ")[0];

  const mailOptions: MailOptions = {
    from: `Audiophile <${user}>`,
    to: bodyRequest.email,
    subject: isOnline ? "Receipt for your purchase on Audiophile" : "Order confirmation for cash payment",
    html: isOnline
      ? onlinePaymentReceiptEmail({ cart, total, grandTotal, clientName: payerName })
      : cashPaymentConfirmationEmail({ cart, clientName: payerName })
  };

  transporter.sendMail(mailOptions, (error, _) => {
    if (!error) return "success";

    return "failed";
  });

  try {
    return NextResponse.json({ data: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: "Unable to send email" }, { status: 400 });
  }
}
