import Stripe from "stripe";
import { NextResponse } from "next/server";

interface BodyRequest {
  amount: string;
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const request: BodyRequest = await req.json();
  const { amount } = request;

  if (!amount) return NextResponse.json({ data: "Did not receive the total amount" }, { status: 400 });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "GBP"
    });
    return NextResponse.json({ data: paymentIntent.client_secret }, { status: 200 });
  } catch (err) {
    console.info(JSON.stringify(err, undefined, 4));
    return NextResponse.json({ data: "Unable to create payment intent" }, { status: 400 });
  }
}
