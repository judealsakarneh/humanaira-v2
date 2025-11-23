import { NextResponse } from 'next/server';
import { createRouteClient } from '@/lib/supabaseRouteClient';
import { twilioClient } from '@/lib/twilio';

export async function POST(req: Request) {
  const supabase = createRouteClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { conversationSid, body } = await req.json();

  if (!conversationSid || !body) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const { data: conversation, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('twilio_conversation_sid', conversationSid)
    .maybeSingle();

  if (error || !conversation) {
    return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
  }

  if (![conversation.buyer_id, conversation.freelancer_id].includes(session.user.id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await twilioClient.conversations.v1.conversations(conversationSid).messages.create({
    author: session.user.id,
    body
  });
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const supabase = createRouteClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const conversationSid = searchParams.get('conversationSid');
  if (!conversationSid) return NextResponse.json({ error: 'Missing sid' }, { status: 400 });

  const { data: conversation } = await supabase
    .from('conversations')
    .select('*')
    .eq('twilio_conversation_sid', conversationSid)
    .maybeSingle();

  if (!conversation || ![conversation.buyer_id, conversation.freelancer_id].includes(session.user.id)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const messages = await twilioClient.conversations.v1.conversations(conversationSid).messages.list({ limit: 50 });
  return NextResponse.json({ messages });
}
