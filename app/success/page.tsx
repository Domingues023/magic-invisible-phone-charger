'use client';

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
        <p className="text-gray-600">
          Your payment was successful. You will receive an email confirmation shortly.
        </p>
        <div className="text-sm text-gray-500">
          Order status: Processing
        </div>
        <Link 
          href="/"
          className="block w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 