'use client';

import React, { useState } from 'react';
import PaymentModal from './components/PaymentModal';
import StripeProvider from './components/StripeProvider';

export default function Page() {
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>();

  const handleBuyNow = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 3999, // $39.99
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <main>
      {/* Payment Modal */}
      {showPayment && clientSecret && (
        <StripeProvider clientSecret={clientSecret}>
          <PaymentModal onClose={() => setShowPayment(false)} />
        </StripeProvider>
      )}

      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold">Magic Invisible Phone Charger</h1>
          <p className="text-gray-600">
            Experience the future of wireless charging with our revolutionary invisible charger!
          </p>
          <div className="text-2xl font-bold text-purple-600">$39.99</div>
          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}
