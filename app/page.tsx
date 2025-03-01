'use client';

import Image from 'next/image';
import { useState } from 'react';
import PaymentModal from './components/PaymentModal';

export default function Home() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Magic Invisible Phone Charger
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of wireless charging with our revolutionary invisible charger.
              No more messy cables, just pure charging magic.
            </p>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Buy Now - $39.99
            </button>
          </div>
          <div className="lg:w-1/2 relative h-[400px]">
            {/* Placeholder for product image - we'll add this later */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-2xl opacity-50 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 italic">Invisible charger visualization coming soon...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Truly Invisible',
                description: 'Seamlessly blends with any surface',
              },
              {
                title: 'Fast Charging',
                description: 'Delivers optimal power to your device',
              },
              {
                title: 'Universal Compatibility',
                description: 'Works with all Qi-enabled devices',
              },
              {
                title: 'Easy Setup',
                description: 'Ready to use in seconds',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </main>
  );
}
