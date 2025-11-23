import { Metadata } from 'next';
import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Sign in | Humanaira',
  description: 'Access your Humanaira account.'
};

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
      <p className="text-gray-400">Sign in to continue building with elite AI talent.</p>
      <AuthForm mode="signIn" />
      <p className="mt-4 text-sm text-gray-400">
        New to Humanaira?{' '}
        <Link href="/auth/sign-up" className="text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
