'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const { data: session } = useSession();

  const features = [
    {
      title: "Timeless Beauty Protocol™",
      description: "Our revolutionary quantum-aligned beauty enhancement system works at the cellular level to maintain your peak attractiveness indefinitely."
    },
    {
      title: "Eternal Radiance Technology™",
      description: "Advanced bio-resonance techniques keep your skin glowing and youthful, defying the conventional laws of aging."
    },
    {
      title: "Magnetic Attraction Field™",
      description: "Our proprietary energy field enhancement naturally draws attention and admiration wherever you go."
    }
  ];

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
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-gold-400 to-purple-500 text-transparent bg-clip-text">
            Look Sexy Forever
          </Link>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-purple-200">Welcome, {session.user?.name}</span>
                <Link
                  href="/profile"
                  className="text-purple-200 hover:text-purple-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-pink-400 hover:text-pink-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-purple-200 hover:text-purple-100">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:opacity-90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-pink-500 via-gold-400 to-purple-500 text-transparent bg-clip-text">
            LOOK SEXY FOREVER
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-8 font-light">
            Unlock the Secret to Eternal Attraction
          </p>
          <div className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            <p className="mb-4">
              Experience the revolutionary breakthrough in quantum beauty enhancement. 
              Our patented technology harnesses the power of bio-resonance fields 
              to maintain your peak attractiveness... forever.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105"
              onMouseEnter={() => setActiveFeature(index)}
            >
              <h3 className="text-xl font-bold mb-4 text-purple-200">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-200">
            What You'll Experience
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="flex items-start space-x-3">
              <span className="text-pink-500 text-2xl">✨</span>
              <p className="text-gray-300">Enhanced natural magnetism and charisma</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-pink-500 text-2xl">🌟</span>
              <p className="text-gray-300">Timeless beauty that defies aging</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-pink-500 text-2xl">💫</span>
              <p className="text-gray-300">Increased confidence and self-assurance</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-pink-500 text-2xl">⭐</span>
              <p className="text-gray-300">Magnetic attraction that draws others to you</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8">
          <div className="animate-pulse inline-block">
            <h3 className="text-2xl md:text-3xl font-bold text-purple-200 mb-4">
              Limited Time Offer
            </h3>
            <p className="text-xl text-pink-400 mb-8">
              One-time payment for lifetime access
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-6 px-12 rounded-full text-xl md:text-2xl transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-pulse"
          >
            CLAIM YOUR ETERNAL BEAUTY - $39.99 ✨
          </button>
          <p className="text-sm text-gray-400 mt-4">
            *Results may vary. Our quantum beauty enhancement technology works best for those who believe in the power of eternal attraction.
          </p>
        </div>
      </div>
    </main>
  );
}
