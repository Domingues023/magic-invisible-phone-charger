'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    date: '',
  });

  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    if (paymentIntent) {
      setStatus('success');
      setOrderDetails({
        orderId: paymentIntent.slice(-6).toUpperCase(), // Last 6 characters as order ID
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
        {status === 'loading' ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        ) : status === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-600 mb-4">
                Thank you for purchasing the Magic Invisible Phone Charger.
                Your order has been confirmed and will be shipped shortly.
              </p>
              <div className="text-left space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Order ID:</span> #{orderDetails.orderId}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Date:</span> {orderDetails.date}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Amount:</span> $39.99
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                A confirmation email will be sent to your email address.
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity w-full"
              >
                Return Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Payment Error</h1>
            <p className="text-gray-600 mb-8">
              Something went wrong with your payment. Please try again.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity w-full"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </main>
  );
} 