'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-gold-400 to-purple-500 text-transparent bg-clip-text">
            Welcome Back
          </h1>
          <p className="text-purple-200">
            Sign in to access your eternal beauty journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-500/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-purple-200 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-500/20 text-white placeholder-purple-300 focus:outline-none focus:border-pink-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-pink-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-purple-200">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-pink-400 hover:text-pink-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
} 