import { useEffect, useState } from 'react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { StripePaymentElementOptions, StripePaymentElementChangeEvent } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!elements) return;

    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) return;

    // Monitor payment element state
    paymentElement.on('change', (event) => {
      setIsComplete(event.complete);
      if (event.error) {
        setErrorMessage(event.error.message || '');
      } else {
        setErrorMessage('');
      }
    });
  }, [elements]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An error occurred.');
      setIsProcessing(false);
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs'
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PaymentElement options={paymentElementOptions} />
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing || !isComplete}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Processing Payment...
            </div>
          ) : (
            'Pay $39.99'
          )}
        </button>
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
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
  );
}

export default function PaymentModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to initialize payment. Please try again.');
      });
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
        {error ? (
          <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
            {error}
            <button
              onClick={onClose}
              className="mt-4 w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        ) : clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe'
              }
            }}
          >
            <CheckoutForm onClose={onClose} />
          </Elements>
        ) : (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}
      </div>
    </div>
  );
} 