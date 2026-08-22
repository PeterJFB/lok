import { Temporal } from '@js-temporal/polyfill';
import { defineRelations } from 'drizzle-orm';
import * as p from 'drizzle-orm/sqlite-core';

export const task = p.sqliteTable('task', {
  id: p
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: p.text('title').notNull(),
  priority: p.integer('priority').notNull().default(1)
});

export const users = p.sqliteTable('users', {
  id: p
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: p.text('name').notNull()
});

export const groups = p.sqliteTable('groups', {
  id: p
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: p.text('name').notNull()
});

export const usersToGroups = p.sqliteTable(
  'users_to_groups',
  {
    userId: p
      .text('user_id')
      .notNull()
      .references(() => users.id),
    groupId: p
      .text('group_id')
      .notNull()
      .references(() => groups.id),
    role: p.text('role'),
    joinedMilliseconds: p
      .integer('joined_ms')
      .notNull()
      .$defaultFn(() => Temporal.Now.instant().epochMilliseconds)
  },
  (t) => [p.primaryKey({ columns: [t.userId, t.groupId] })]
);

export const cookieTokens = p.sqliteTable('cookie_tokens', {
  cookieToken: p
    .text('cookie_token')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: p.text('user_id').notNull(),
  expiresAtMilliseconds: p.integer('expires_at_ms').notNull()
});

export const deviceIdentifiers = p.sqliteTable('device_identifiers', {
  id: p
    .text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  value: p.text('value').notNull(),
  type: p.text('type').notNull(),
  userId: p.text('user_id').notNull()
});

export const joinCodes = p.sqliteTable('join_codes', {
  joinCode: p
    .text('join_code')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdById: p.text('created_by_id').notNull(),
  groupId: p.text('group_id').notNull(),
  expiresAtMilliseconds: p.integer('expires_at_ms').notNull(),
  active: p.integer('active').$default(() => 1),
  createdAtMilliseconds: p
    .integer('created_at_ms')
    .notNull()
    .$defaultFn(() => Temporal.Now.instant().epochMilliseconds)
});

export const relations = defineRelations(
  { users, cookieTokens, groups, usersToGroups, joinCodes, deviceIdentifiers },
  (r) => ({
    cookieTokens: {
      user: r.one.users({ from: r.cookieTokens.userId, to: r.users.id })
    },
    users: {
      groups: r.many.groups({
        from: r.users.id.through(r.usersToGroups.userId),
        to: r.groups.id.through(r.usersToGroups.groupId)
      })
    },
    groups: {
      members: r.many.users()
    },
    joinCodes: {
      createdBy: r.one.users({ from: r.joinCodes.createdById, to: r.users.id }),
      group: r.one.groups({ from: r.joinCodes.groupId, to: r.groups.id })
    },
    deviceIdentifiers: {
      user: r.one.users({ from: r.deviceIdentifiers.userId, to: r.users.id })
    }
  })
);

// export *  from './auth.schema';

// DeviceIdentifier
// type
// device_id
// user_id

// User
// id
// shortname
// created_at
//
