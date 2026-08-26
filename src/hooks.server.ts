import { db } from '$lib/server/db';
import { cookieTokens } from '$lib/server/repositories/cookie-tokens';
import { LOK_AUTH_COOKIE_NAME } from '$lib/std/auth';
import { Temporal } from '@js-temporal/polyfill';
import { type Handle } from '@sveltejs/kit';
import { migrate } from 'drizzle-orm/libsql/migrator';

// Export a function to run migrations
await migrate(db, { migrationsFolder: './drizzle' });

const handleBetterAuth: Handle = async ({ event, resolve }) => {
  const authCookie = event.cookies.get(LOK_AUTH_COOKIE_NAME);
  if (!authCookie) {
    return resolve(event);
  }

  console.debug('Received cookie at', event.url.href);

  const cookieResult = await cookieTokens.getWithUser(authCookie);
  if (!cookieResult.isOk) {
    return resolve(event);
  }

  const expiresAt = cookieResult.obj.expiresAt;
  console.debug(
    'Resolved user from cookie, expires at',
    expiresAt.epochMilliseconds,
    'current time is',
    Temporal.Now.instant().epochMilliseconds
  );
  if (expiresAt.epochMilliseconds < Temporal.Now.instant().epochMilliseconds) {
    cookieTokens.delete(authCookie);
    return resolve(event);
  }
  const user = cookieResult.obj.user;
  if (!user) {
    cookieTokens.delete(authCookie);
    return resolve(event);
  }

  event.locals.session = cookieResult.obj;
  event.locals.user = user;

  const response = await resolve(event);
  return response;
};

export const handle: Handle = handleBetterAuth;
