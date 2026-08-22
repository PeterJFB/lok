import { Temporal } from '@js-temporal/polyfill';
import { db } from '../db';
import { err, ok, type Result } from '$lib/std/result';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { getStackTrace } from '$lib/std/stack-trace';
import type { DbDeleteError, DbGetError } from '.';

export type DbCreateCookieToken = {
  token: string;
  expiresAt: Temporal.Instant;
};

export type DbCreateCookieTokenError =
  | {
      type: 'database-error';
    }
  | {
      type: 'user-not-found';
    };

export type DbCookieTokenWithUser = {
  cookieToken: string;
  expiresAt: Temporal.Instant;
  userId: string;
  user: null | {
    id: string;
    name: string;
  };
};

export type DeviceIdentifier = {
  type: 'LOCAL_STORAGE';
  value: string;
};

export const cookieTokens = {
  create: async ({
    type,
    value
  }: DeviceIdentifier): Promise<Result<DbCreateCookieToken, DbCreateCookieTokenError>> => {
    try {
      const getRes = await db.query.deviceIdentifiers.findFirst({
        where: { type, value },
        with: { user: true }
      });
      if (getRes?.user) {
        const createRes = await db
          .insert(schema.cookieTokens)
          .values({
            userId: getRes.userId,
            expiresAtMilliseconds: Temporal.Now.instant().add({ hours: 24 }).epochMilliseconds
          })
          .returning();

        if (createRes.length != 1) {
          return err({ type: 'database-error' });
        }

        return ok({
          token: createRes[0].cookieToken,
          expiresAt: Temporal.Instant.fromEpochMilliseconds(createRes[0].expiresAtMilliseconds)
        });
      } else {
        return err({ type: 'user-not-found' });
      }
    } catch (error) {
      console.error(error);
      return err({ type: 'database-error' });
    }
  },
  getWithUser: async (cookieToken: string): Promise<Result<DbCookieTokenWithUser, DbGetError>> => {
    try {
      const res = await db.query.cookieTokens.findFirst({
        where: { cookieToken },
        with: {
          user: true
        }
      });

      if (res !== undefined) {
        const cookieTokenWithUser = {
          ...res,
          expiresAt: Temporal.Instant.fromEpochMilliseconds(res.expiresAtMilliseconds)
        };
        return ok({ ...cookieTokenWithUser });
      } else {
        return err({ type: 'not-found' });
      }
    } catch (error) {
      console.error(error);
      return err({ type: 'database-error' });
    }
  },
  delete: async (cookieToken: string): Promise<Result<null, DbDeleteError>> => {
    try {
      const res = await db
        .delete(schema.cookieTokens)
        .where(eq(schema.cookieTokens.cookieToken, cookieToken));

      if (res.rowsAffected === 1) {
        return ok(null);
      }

      if (res.rowsAffected === 0) {
        return err({ type: 'not-found' });
      }

      console.error('Unexpected!\nStack Trace:', getStackTrace());
      return err({ type: 'database-error' });
    } catch (error) {
      console.error(error);
      return err({ type: 'database-error' });
    }
  }
};
