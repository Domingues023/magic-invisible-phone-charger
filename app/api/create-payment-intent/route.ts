import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing Stripe secret key');
    return NextResponse.json(
      { error: 'Stripe is not properly configured' },
      { status: 500 }
    );
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3999, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product: 'Magic Invisible Phone Charger',
      },
      shipping: {
        name: 'Magic Charger Customer',
        address: {
          country: 'CA',
          line1: '123 Shipping Street', // Required placeholder
          city: 'Toronto', // Required placeholder
          postal_code: 'M5V 2T6', // Required placeholder
          state: 'ON', // Required placeholder
        },
      },
    });

    console.log('Payment Intent created:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error creating payment intent',
        details: error instanceof Stripe.errors.StripeError ? error.type : undefined
      },
      { status: 500 }
    );
  }
} 