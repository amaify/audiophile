import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

interface BodyRequest {
  amount: string;
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const request: BodyRequest = JSON.parse(req.body);
  const { amount } = request;

  if (!amount) return res.status(400).json({ data: "Did not receive the total amount" });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "GBP"
    });
    return res.status(200).json({ data: paymentIntent.client_secret });
  } catch (err) {
    console.info(JSON.stringify(err, undefined, 4));
    return res.status(400).json({ data: "Unable to create payment intent" });
  }
}
