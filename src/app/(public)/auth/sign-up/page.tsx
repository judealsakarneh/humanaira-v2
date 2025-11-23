import { Metadata } from 'next';
import { AuthForm } from '@/components/forms/AuthForm';

export const metadata: Metadata = {
  title: 'Create account | Humanaira',
  description: 'Create a buyer or freelancer account on Humanaira.'
};

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold text-white">Create your account</h1>
      <p className="text-gray-400">Pick a role to personalize your experience.</p>
      <AuthForm mode="signUp" />
    </div>
  );
}
