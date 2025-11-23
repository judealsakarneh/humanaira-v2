import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createRouteClient } from '@/lib/supabaseRouteClient';

export async function POST(req: Request) {
  const supabase = createRouteClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { serviceId, amount, currency = 'usd' } = await req.json();

  if (!serviceId || !amount) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('freelancer_id')
    .eq('id', serviceId)
    .single();

  if (serviceError || !service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  const buyerId = session.user.id;
  const freelancerId = service.freelancer_id;

  const platformFeePercent = parseFloat(process.env.PLATFORM_FEE_PERCENT || '10');
  const feeAmount = Math.round((amount * platformFeePercent) / 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    application_fee_amount: feeAmount,
    metadata: { buyerId, freelancerId, serviceId }
  });

  const { error } = await supabase.from('orders').insert({
    buyer_id: buyerId,
    freelancer_id: freelancerId,
    service_id: serviceId,
    status: 'pending',
    amount,
    currency,
    stripe_payment_intent_id: paymentIntent.id
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
