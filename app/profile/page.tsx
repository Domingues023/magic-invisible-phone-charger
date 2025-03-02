'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [status, router, session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      await update(); // Update the session
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      await signOut({ callbackUrl: '/' });
    } catch (error) {
      setMessage('Failed to delete account');
    }
  };

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
            Your Profile
          </h1>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-purple-900/50 rounded-lg p-6 border border-purple-500/20">
              {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-500/20 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border border-purple-500/20 text-white"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-purple-900/50 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-purple-200">Name</p>
                    <p className="text-white text-lg">{name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-200">Email</p>
                    <p className="text-white text-lg">{email}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => router.push('/')}
                      className="bg-purple-900/50 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-purple-900/50 rounded-lg p-6 border border-purple-500/20">
              <h2 className="text-2xl font-semibold mb-4 text-red-300">Danger Zone</h2>
              <div className="space-y-4">
                <p className="text-purple-200">
                  Deleting your account is permanent. All your data will be permanently removed.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-200 font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 