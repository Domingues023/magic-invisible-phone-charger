'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#6366f1',
  },
};

export default function StripeProvider({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret: string;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      {children}
    </Elements>
  );
} 