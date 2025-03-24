'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TextField } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // Check if user just registered successfully
    const registered = searchParams?.get('registered');
    if (registered === 'true') {
      setRegistrationSuccess(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await signIn("credentials", {
        redirect: true, // Change this to true
        email,
        password,
        callbackUrl, // Make sure to include this
      });
      console.log('Login successful');
      
      // Store token in localStorage or cookies

      
      // Redirect to dashboard or home page
      router.push('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-gray-800 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>
        
        {registrationSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Registration successful! Please sign in with your credentials.</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 rounded-md shadow-sm">
              <TextField 
                label="Email"
                name="Email" 
                variant="outlined" 
                fullWidth 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
            <TextField 
                label="password"
                name="password" 
                type='password'
                variant="outlined" 
                autoComplete="current-password"
                fullWidth 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                Remember me
              </label>
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className='text-gray-800'>
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
