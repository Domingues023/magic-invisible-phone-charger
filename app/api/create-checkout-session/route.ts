import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';
    const basePath = '/magic-invisible-phone-charger';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Magic Invisible Phone Charger',
              description: 'Experience the future of wireless charging with our revolutionary invisible charger!',
            },
            unit_amount: 3999, // $39.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}${basePath}/success`,
      cancel_url: `${origin}${basePath}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 