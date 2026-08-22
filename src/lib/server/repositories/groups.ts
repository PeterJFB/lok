import { Temporal } from '@js-temporal/polyfill';
import { db } from '../db';
import { err, ok, type Result } from '$lib/std/result';
import * as schema from '../db/schema';
import type { DbUser } from './users';

export type DbCreateJoinCode = {
  joinCode: string;
};

export type DbCreateJoinCodeError =
  | {
      type: 'not-found';
    }
  | { type: 'database-error' };

export type DbGroupByJoinCode = {
  createdBy: DbUser | null;
  group: {
    id: string;
    name: string;
  };
  expiresAtMilliseconds: number;
};

export type DbGroupByJoinCodeError =
  | {
      type: 'database-error';
    }
  | {
      type: 'join-code-not-found';
    }
  | {
      type: 'group-not-found';
    };
export type DbAddUser = {
  group: {
    id: string;
    name: string;
  };
};

export type DbAddUserError =
  | {
      type: 'database-error';
    }
  | {
      type: 'join-code-not-found';
    }
  | {
      type: 'join-code-expired';
    }
  | {
      type: 'group-not-found';
    };

export const groups = {
  addUser: async (userId: string, joinCode: string): Promise<Result<DbAddUser, DbAddUserError>> => {
    try {
      const getRes = await groups.getByJoinCode(joinCode);

      if (!getRes.isOk) {
        return getRes;
      }

      if (getRes.obj.expiresAtMilliseconds < Temporal.Now.instant().epochMilliseconds) {
        return err({ type: 'join-code-expired' });
      }

      const joinRes = await db
        .insert(schema.usersToGroups)
        .values({ userId, groupId: getRes.obj.group.id })
        .returning();

      if (joinRes.length != 1) {
        return err({ type: 'database-error' });
      }

      return ok({ group: getRes.obj.group });
    } catch (error) {
      return err({ type: 'database-error' });
    }
  },
  getByJoinCode: async (
    joinCode: string
  ): Promise<Result<DbGroupByJoinCode, DbGroupByJoinCodeError>> => {
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

    return ok({
      createdBy: getRes.createdBy,
      expiresAtMilliseconds: getRes.expiresAtMilliseconds,
      group: getRes.group
    });
  },
  createJoinCode: async (
    userId: string,
    groupId: string,
    expiresAt: Temporal.Instant
  ): Promise<Result<DbCreateJoinCode, DbCreateJoinCodeError>> => {
    try {
      const res = await db.query.groups.findFirst({
        where: { id: groupId },
        with: { members: { where: { id: userId } } }
      });
      if (!res || !res.members.some((m) => m.id === userId)) {
        return err({ type: 'not-found' });
      }
      const createRes = await db
        .insert(schema.joinCodes)
        .values({
          createdById: userId,
          groupId,
          expiresAtMilliseconds: expiresAt.epochMilliseconds
        })
        .returning();

      if (createRes.length != 1) {
        return err({ type: 'database-error' });
      }

      return ok({ joinCode: createRes[1].joinCode });
    } catch (error) {
      console.error(error);
      return err({ type: 'database-error' });
    }
  }
};
