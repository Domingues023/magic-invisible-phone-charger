'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Use Vercel deployment URL
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold">Magic Invisible Phone Charger</h1>
          <p className="text-gray-600">
            Experience the future of wireless charging with our revolutionary invisible charger!
          </p>
          <div className="text-2xl font-bold text-purple-600">$39.99</div>
          <button
            onClick={handleBuyNow}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </main>
  );
}
