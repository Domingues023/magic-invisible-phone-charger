import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';

export default function PaymentModal() {
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
    <form onSubmit={handleSubmit} className="payment-form">
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
      <button disabled={!stripe || !isComplete} className="payment-button">
        Pay Now
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
} 