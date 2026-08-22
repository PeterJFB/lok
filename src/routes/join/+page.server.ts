import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { users } from '$lib/server/repositories/users';
import { groups } from '$lib/server/repositories/groups';
import { Temporal } from '@js-temporal/polyfill';
import { cookieTokens } from '$lib/server/repositories/cookie-tokens';
import { dev } from '$app/environment';
import { LOK_AUTH_COOKIE_NAME } from '$lib/client/auth';

export const load: PageServerLoad = async ({ url, locals }) => {
  const joinCode = url.searchParams.get('code');
  if (!joinCode) {
    return redirect(307, '/');
  }

  const joinCodeResult = await groups.getByJoinCode(joinCode);
  if (joinCodeResult.isOk) {
    if (joinCodeResult.obj.expiresAtMilliseconds < Temporal.Now.instant().epochMilliseconds) {
      return { expired: true };
    }
    return { group: joinCodeResult.obj.group, user: locals.user };
  }
};

export const actions = {
  register: async ({ cookies, request, locals }) => {
    const data = await request.formData();
    const name = data.get('name');
    const joinCode = data.get('joinCode');

    if (!name) {
      return fail(400, { name: { missing: true } });
    }

    if (!joinCode) {
      return fail(400, { joinCode: { missing: true } });
    }

    if (locals.user) {
      const addUserResult = await groups.addUser(locals.user.id, joinCode.toString());
      if (addUserResult.isOk) {
        // TODO: Redirect correctly
        return redirect(303, '/');
      }
    }

    const deviceIdentifierType = data.get('deviceIdentifierType')?.toString();
    const deviceIdentifierValue = data.get('deviceIdentifierValue')?.toString();
    if (deviceIdentifierType !== 'LOCAL_STORAGE' || !deviceIdentifierValue) {
      return fail(400, { deviceIdentifier: { missing: true } });
    }

    const registerUserResult = await users.create(name.toString(), joinCode.toString());
    if (registerUserResult.isOk) {
      const tokenResult = await cookieTokens.create({
        type: deviceIdentifierType,
        value: deviceIdentifierValue
      });
      if (tokenResult.isOk) {
        cookies.set(LOK_AUTH_COOKIE_NAME, tokenResult.obj.token, {
          httpOnly: true,
          secure: !dev,
          sameSite: true,
          expires: new Date(tokenResult.obj.expiresAt.epochMilliseconds),
          path: '/'
        });

        // TODO: Redirect correctly
        return redirect(303, '/');
      }
    }
  }
} satisfies Actions;
