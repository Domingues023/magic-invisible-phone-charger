'use client';

import React, { useState } from 'react';
import PaymentModal from './components/PaymentModal';

export default function Page() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <main>
      {/* Payment Modal */}
      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}

      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold">Magic Invisible Phone Charger</h1>
          <p className="text-gray-600">
            Experience the future of wireless charging with our revolutionary invisible charger!
          </p>
          <div className="text-2xl font-bold text-purple-600">$39.99</div>
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}
