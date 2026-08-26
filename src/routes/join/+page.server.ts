import { setAuthCookie } from '$lib/client/auth';
import { cookieTokens } from '$lib/server/repositories/cookie-tokens';
import { groups } from '$lib/server/repositories/groups';
import { users } from '$lib/server/repositories/users';
import { unreachable } from '$lib/std/unreachable';
import { Temporal } from '@js-temporal/polyfill';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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

    if (locals.user) {
      // Check if user is already in group
      const groupsRes = await users.getGroups(locals.user.id);
      if (!groupsRes.isOk) {
        unreachable();
        return error(500);
      }
      if (groupsRes.obj.groups.map((g) => g.id).includes(joinCodeResult.obj.group.id)) {
        return redirect(303, `/?g=${joinCodeResult.obj.group.id}`);
      }
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
      return fail(400, {
        name: { value: undefined, missing: true },
        joinCode: { value: joinCode }
      });
    }

    if (!joinCode) {
      return fail(400, {
        name: { value: name },
        joinCode: { value: undefined, missing: true }
      });
    }

    // Case 1: Authenticated User joins new group
    if (locals.user) {
      const addUserResult = await groups.addUser(locals.user.id, joinCode.toString());
      if (addUserResult.isOk) {
        // TODO: Redirect correctly
        return redirect(303, `/?g=${addUserResult.obj.group.id}`);
      } else {
        unreachable();
        return error(500);
      }
    }

    // Case 2: Anonymous user joins new group
    const deviceIdentifierType = data.get('deviceIdentifierType')?.toString();
    const deviceIdentifierValue = data.get('deviceIdentifierValue')?.toString();
    if (deviceIdentifierType !== 'LOCAL_STORAGE' || !deviceIdentifierValue) {
      return fail(400, {
        name: { value: name },
        joinCode: { value: joinCode },
        deviceIdentifier: { missing: true }
      });
    }

    const registerUserResult = await users.create(
      name.toString(),
      joinCode.toString(),
      deviceIdentifierType.toString(),
      deviceIdentifierValue.toString()
    );
    if (!registerUserResult.isOk) {
      return fail(400, {
        name: { value: name, joinCode: { value: joinCode } }
      });
    }
    const tokenResult = await cookieTokens.create({
      type: deviceIdentifierType,
      value: deviceIdentifierValue
    });
    if (!tokenResult.isOk) {
      return fail(500, {
        name: { value: name, joinCode: { value: joinCode } }
      });
    }
    setAuthCookie(cookies, tokenResult.obj.token, tokenResult.obj.expiresAt);

    // TODO: Redirect correctly
    return redirect(303, '/');
  }
} satisfies Actions;
