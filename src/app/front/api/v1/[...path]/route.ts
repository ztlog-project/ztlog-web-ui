import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8086';

async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetUrl = `${BACKEND_URL}/front/api/v1/${path.join('/')}${request.nextUrl.search}`;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: { 'Content-Type': 'application/json' },
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
