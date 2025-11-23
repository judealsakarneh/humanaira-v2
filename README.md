# Humanaira

Humanaira is a dark, AI-themed freelance marketplace built with Next.js 14, Supabase, Stripe, and Twilio Conversations. It helps buyers hire elite AI freelancers while empowering freelancers to monetize AI skills.

## Features
- Supabase-powered auth with buyer/freelancer roles and automatic profile bootstrap trigger
- Dark glassmorphism UI with TailwindCSS
- Stripe checkout/payment intent scaffold with platform fees
- Twilio Conversations messaging guarded by RLS-aware API routes
- Blog, search, and category pages hydrated from Supabase data when present

## Tech stack
- Next.js 14 (App Router, TypeScript)
- TailwindCSS for styling
- Supabase for auth, database, and storage
- Stripe for payments with platform fees
- Twilio Conversations for real-time chat

## Environment variables
Copy `.env.example` to `.env.local` and fill values:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- PLATFORM_FEE_PERCENT
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_API_KEY
- TWILIO_API_SECRET
- TWILIO_CHAT_SERVICE_SID
- NEXT_PUBLIC_APP_URL

## Local development
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Ensure Supabase project exists and apply SQL schema from `supabase-schema.sql`.
4. Configure Stripe webhook to `http://localhost:3000/api/stripe/webhook`.
5. Provide Twilio credentials for conversation APIs.

## Deployment (Vercel)
- Add all environment variables in Vercel project settings.
- Deploy the Next.js app; API routes handle Stripe webhooks and Twilio orchestration.

## Supabase schema
The `supabase-schema.sql` file defines tables for profiles, services, service packages, blog posts, orders, payouts, and conversations along with RLS policies to keep data secure.
