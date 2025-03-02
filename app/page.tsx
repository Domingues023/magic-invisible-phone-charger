'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 1,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });
        if (error) {
          console.error('Error:', error);
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-pink-800">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            UNLEASH YOUR INNER GODDESS 👑
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8">
            The secret to eternal beauty is just one click away ✨
          </p>
          <button
            onClick={handleCheckout}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 hover:shadow-lg animate-pulse"
          >
            CLAIM YOUR DESTINY - $39.99 ✨
          </button>
        </div>
      </div>
    </main>
  );
}
