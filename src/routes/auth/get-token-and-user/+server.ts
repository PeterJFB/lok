import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieTokens } from '$lib/server/repositories/cookie-tokens';
import { unreachable } from '$lib/std/unreachable';
import { dev } from '$app/env';
import { LOK_AUTH_COOKIE_NAME } from '$lib/client/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = (await request.json()) as unknown;

  if (!isDeviceIdBody(body)) {
    return error(400);
  }

  const tokenResult = await cookieTokens.create({
    type: body.deviceIdType,
    value: body.deviceIdValue
  });

  if (!tokenResult.isOk) {
    if (tokenResult.err.type === 'database-error') {
      return error(500);
    } else if (tokenResult.err.type === 'user-not-found') {
      return error(401);
    }
    unreachable();
    return error(500);
  }

  const userResult = await cookieTokens.getWithUser(tokenResult.obj.token);

  if (!userResult.isOk || !userResult.obj.user) {
    return error(500);
  }

  cookies.set(LOK_AUTH_COOKIE_NAME, tokenResult.obj.token, {
    httpOnly: true,
    secure: !dev,
    sameSite: true,
    expires: new Date(tokenResult.obj.expiresAt.epochMilliseconds),
    path: '/'
  });
  return json({ user: userResult.obj.user }, { status: 201 });
};

export type GetTokenReqBody = {
  deviceIdType: 'LOCAL_STORAGE';
  deviceIdValue: string;
};

export type GetTokenResBody = {
  id: string;
  name: string;
};

const isDeviceIdBody = (body: unknown): body is GetTokenReqBody => {
  if (typeof body !== 'object' || !body) {
    return false;
  }
  if (!('deviceIdValue' in body) || !('deviceIdType' in body)) {
    return false;
  }
  if (typeof body.deviceIdValue !== 'string' || body.deviceIdType !== 'LOCAL_STORAGE') {
    return false;
  }
  return true;
};
