import { err, ok, type Result } from '$lib/std/result';
import { Temporal } from '@js-temporal/polyfill';
import { db } from '../db';
import * as schema from '../db/schema';

export type DbCreateUser = {
  name: string;
  userId: string;
};

export type DbCreateUserError =
  | { type: 'database-error' }
  | {
      type: 'join-code-expired';
    }
  | {
      type: 'join-code-not-found';
    }
  | {
      type: 'group-not-found';
    };

export type DbUser = {
  name: string;
};

export const users = {
  create: async (
    name: string,
    joinCode: string
  ): Promise<Result<DbCreateUser, DbCreateUserError>> => {
    try {
      const getRes = await db.query.joinCodes.findFirst({
        where: {
          joinCode: joinCode
        },
        with: { createdBy: true, group: true }
      });

      if (!getRes) {
        return err({ type: 'join-code-not-found' });
      }

      if (!getRes.group) {
        return err({ type: 'group-not-found' });
      }

      if (getRes.expiresAtMilliseconds < Temporal.Now.instant().epochMilliseconds) {
        return err({ type: 'join-code-expired' });
      }

      const createRes = await db.insert(schema.users).values({ name }).returning();

      if (createRes.length != 1) {
        return err({ type: 'database-error' });
      }

      const joinRes = await db
        .insert(schema.usersToGroups)
        .values({ userId: createRes[0].id, groupId: getRes.groupId })
        .returning();

      if (joinRes.length != 1) {
        return err({ type: 'database-error' });
      }

      return ok({ userId: createRes[0].id, name: createRes[0].name });
    } catch (error) {
      console.error(error);
      return err({ type: 'database-error' });
    }
  }
};
