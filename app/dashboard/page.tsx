'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-purple-900/30 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-gold-400 to-purple-500 text-transparent bg-clip-text">
            Welcome to Your Dashboard
          </h1>
          
          <div className="space-y-6">
            <div className="bg-purple-900/50 rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-2xl font-semibold mb-4 text-purple-200">Your Profile</h2>
              <div className="space-y-3">
                <p className="text-purple-100">
                  <span className="text-pink-400">Name:</span> {session.user?.name}
                </p>
                <p className="text-purple-100">
                  <span className="text-pink-400">Email:</span> {session.user?.email}
                </p>
              </div>
            </div>

            <div className="bg-purple-900/50 rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-2xl font-semibold mb-4 text-purple-200">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  View Products
                </button>
                <button 
                  onClick={() => router.push('/profile')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 