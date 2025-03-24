'use client';

import { useState } from 'react';
import { userRegister } from '@/libs/userRegister';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField } from '@mui/material';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !telephone || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await userRegister(name, telephone, email, password);
      console.log('Registration successful', result);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-gray-800 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-3 rounded-md shadow-sm">
            <TextField 
              label="Full Name"
              name="name" 
              variant="outlined" 
              fullWidth 
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            
            <TextField 
              label="Telephone Number"
              name="telephone" 
              type="tel"
              variant="outlined" 
              fullWidth 
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              margin="normal"
              required
              placeholder="000-000-0000"
              inputProps={{
                pattern: "\\d{3}-\\d{3}-\\d{4}",
                maxLength: 12
              }}
            />
            
            <TextField 
              label="Email address"
              name="email" 
              type="email"
              variant="outlined" 
              fullWidth 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            
            <TextField 
              label="Password"
              name="password" 
              type="password"
              variant="outlined" 
              fullWidth 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
            />
            
            <TextField 
              label="Confirm Password"
              name="confirmPassword" 
              type="password"
              variant="outlined" 
              fullWidth 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="new-password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-800">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
