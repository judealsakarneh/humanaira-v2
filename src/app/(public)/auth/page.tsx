import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Humanaira | Auth',
  description: 'Sign in or sign up to hire or sell AI expertise.'
};

export default function AuthLanding() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-white">Welcome to Humanaira</h1>
      <p className="text-gray-300">Choose whether you want to hire AI freelancers or offer your AI skills.</p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/auth/sign-in" className="btn-primary justify-center">
          Sign in
        </Link>
        <Link
          href="/auth/sign-up"
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-gray-100 hover:border-brand hover:text-brand"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
