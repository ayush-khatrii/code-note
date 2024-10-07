import prisma from '@/prisma/client'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

async function validateRequest(request: NextRequest) {
  const payloadString = await request.text()
  const headerPayload = headers()

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export async function POST(request: NextRequest) {
  try {
    const payload = await validateRequest(request)
    console.log(payload);

    let user = null;

    const clerkId = payload.data?.id;
    console.log(clerkId);
    if (!clerkId)
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 },
      );


    // process the event
    if (payload.type === 'user.created') {
      user = await prisma.user.upsert({
        where: {
          clerkId,
        },
        update: {
          clerkId,
        },
        create: {
          clerkId,
        },
      });
    }

    if (payload.type === 'user.deleted') {
      user = await prisma.user.delete({
        where: {
          clerkId,
        },
      });
    }

    return NextResponse.json({ message: 'Received' }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: 'Hello clerk Route!' })
}