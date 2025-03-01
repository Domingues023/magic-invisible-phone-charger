'use client';

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

interface PaymentModalProps {
  onClose: () => void;
}

export default function PaymentModal({ onClose }: PaymentModalProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? 'An unexpected error occurred.');
    }
  };

  // Monitor payment element state
  const handlePaymentElementChange = (event: any) => {
    setIsComplete(event.complete);
    if (event.error) {
      setErrorMessage(event.error.message || '');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement 
            options={paymentElementOptions}
            onChange={handlePaymentElementChange}
          />
          <AddressElement 
            options={{
              mode: 'shipping',
              defaultValues: {
                address: {
                  country: 'CA',
                },
              },
              fields: {
                phone: 'never',
              },
            }} 
          />
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={!stripe || !isComplete}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Pay Now
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 