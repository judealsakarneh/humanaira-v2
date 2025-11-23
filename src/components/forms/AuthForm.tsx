'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

export function AuthForm({ mode }: AuthFormProps) {
  const supabase = supabaseBrowserClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get('role') as 'buyer' | 'freelancer' | null) || 'buyer';

  const [role, setRole] = useState<'buyer' | 'freelancer'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setRole(defaultRole);
  }, [defaultRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === 'signUp') {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage('Check your email for a magic link to verify your account.');
      }
    } else {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
      } else if (data.session) {
        router.push(role === 'freelancer' ? '/freelancer' : '/buyer');
      }
    }

    setLoading(false);
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      {mode === 'signUp' && (
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100">
            <input type="radio" name="role" value="buyer" checked={role === 'buyer'} onChange={() => setRole('buyer')} /> Buyer
          </label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100">
            <input
              type="radio"
              name="role"
              value="freelancer"
              checked={role === 'freelancer'}
              onChange={() => setRole('freelancer')}
            />{' '}
            Freelancer
          </label>
        </div>
      )}
      <div>
        <label className="text-sm text-gray-300">Email</label>
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm text-gray-300">Password</label>
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-dark px-3 py-2"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
      {message && <div className="rounded-lg border border-brand/40 bg-brand/10 p-3 text-sm text-brand">{message}</div>}
      <button className="btn-primary w-full justify-center" type="submit" disabled={loading}>
        {loading ? 'Please wait...' : mode === 'signUp' ? 'Create account' : 'Sign in'}
      </button>
    </form>
  );
}
