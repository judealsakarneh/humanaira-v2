import { NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabaseRouteClient';
import { twilioClient, twilioChatServiceSid } from '@/lib/twilio';

export async function POST(req: Request) {
  const supabase = createRouteClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { freelancerId } = await req.json();
  const buyerId = session.user.id;

  if (!freelancerId) return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
  if (!twilioChatServiceSid) return NextResponse.json({ error: 'Missing chat service' }, { status: 500 });

  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('buyer_id', buyerId)
    .eq('freelancer_id', freelancerId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ conversationSid: existing.twilio_conversation_sid });
  }

  const conversation = await twilioClient.conversations.v1.conversations.create({ serviceSid: twilioChatServiceSid });

  const { error } = await supabase.from('conversations').insert({
    buyer_id: buyerId,
    freelancer_id: freelancerId,
    twilio_conversation_sid: conversation.sid
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ conversationSid: conversation.sid });
}
