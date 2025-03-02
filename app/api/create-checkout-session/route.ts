import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Look Sexy Forever - Lifetime Subscription',
              description: 'Unlock eternal attraction with our revolutionary quantum beauty enhancement technology. Includes Timeless Beauty Protocol™, Eternal Radiance Technology™, and Magnetic Attraction Field™.',
              images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4187&q=80'],
            },
            unit_amount: 3999, // $39.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      custom_text: {
        submit: {
          message: 'Your journey to eternal attraction begins now...',
        },
      },
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