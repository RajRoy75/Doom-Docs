import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, currentUser } from '@clerk/nextjs/server';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(req: Request) {
  const { orgId, sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response('Unauthorized1', { status: 401 });
  }
  const user = await currentUser();
  if (!user) {
    return new Response('Unauthorized2', { status: 401 });
  }
  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });
  if (!document) {
    return new Response('Unauthorized3', { status: 401 });
  }

  const isOwner = document.ownerId === user.id;
  const isOrgaizationMember = !!(document.organizationId && document.organizationId === orgId);
  // console.log(sessionClaims?.o.id, document.organizationId);
  // console.log(isOwner, isOrgaizationMember);
  console.log('sessionClaims:', orgId);

  if (!isOwner && !isOrgaizationMember) {
    return new Response('Unauthorized4', { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
      avatar: user.imageUrl,
    }
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
