'use client';

import Link from 'next/link';

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-gold-400 to-purple-500 text-transparent bg-clip-text animate-fade-in">
            Welcome to Eternal Beauty
          </h1>
          <div className="space-y-6 text-gray-300 text-lg md:text-xl">
            <p>
              Congratulations on taking the first step towards eternal attraction. 
              Your quantum beauty enhancement journey begins now.
            </p>
            <p>
              Within the next 24 hours, you'll begin to notice the subtle activation 
              of your Timeless Beauty Protocol™. The full effects of your 
              Magnetic Attraction Field™ will manifest over the coming days.
            </p>
            <div className="py-8">
              <h2 className="text-2xl font-bold text-purple-200 mb-4">
                What to Expect Next
              </h2>
              <ul className="space-y-4 text-left max-w-2xl mx-auto">
                <li className="flex items-start space-x-3">
                  <span className="text-pink-500 text-xl">✨</span>
                  <span>Enhanced natural glow within 24 hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-pink-500 text-xl">🌟</span>
                  <span>Increased magnetic presence in 3-5 days</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-pink-500 text-xl">💫</span>
                  <span>Full quantum beauty activation within 2 weeks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
        >
          Return to Homepage
        </Link>
        <p className="text-sm text-gray-400 mt-8">
          For optimal results, maintain a positive mindset and visualize your enhanced attraction daily.
        </p>
      </div>
    </main>
  );
} 