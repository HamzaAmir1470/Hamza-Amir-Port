/* global process */
import { NextResponse } from 'next/server';

const MAX_MESSAGE_LENGTH = 1000;

export async function POST(request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === 'string' ? body.message.trim() : '';

    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 },
      );
    }

    const serviceUrl = process.env.RAG_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${serviceUrl}/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message }),
      cache: 'no-store',
      signal: AbortSignal.timeout(30000),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        { error: data.detail || 'The knowledge service could not answer right now.' },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json(
      { error: 'The chatbot is temporarily unavailable. Please try again shortly.' },
      { status: 503 },
    );
  }
}
