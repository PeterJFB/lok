import { execSync } from 'child_process';

import { Temporal } from '@js-temporal/polyfill';
import { drizzle } from 'drizzle-orm/libsql';
import * as schemaAndRelations from '../src/lib/server/db/schema';

const DATABASE_URL = 'file:local.db';

console.log(`⏳ Preparing ${DATABASE_URL} database...`);

// 1. Push or migrate schema using Drizzle Kit CLI
execSync('npx drizzle-kit push', { stdio: 'inherit', env: { ...process.env, DATABASE_URL } });

// 2. Clear existing data to ensure test isolation
// Replace with your actual table cleaning logic
const { relations, ...schema } = schemaAndRelations;
const db = drizzle(DATABASE_URL, { relations });

// 3. Seed required initial global data if needed

// Group owner
await db.insert(schema.users).values({ id: 'smith', name: 'smith' });
await db
  .insert(schema.deviceIdentifiers)
  .values({ type: 'LOCAL_STORAGE', userId: 'smith', value: 'smiths_device' });

await db.insert(schema.users).values({ id: 'alice', name: 'alice' });
await db
  .insert(schema.deviceIdentifiers)
  .values({ type: 'LOCAL_STORAGE', userId: 'alice', value: 'alices_device' });

await db.insert(schema.groups).values({ id: 'lighthouse', name: 'lighthouse' });
await db
  .insert(schema.usersToGroups)
  .values({ groupId: 'lighthouse', userId: 'smith', role: 'owner' });
await db.insert(schema.joinCodes).values({
  createdById: 'smith',
  groupId: 'lighthouse',
  expiresAtMilliseconds: Temporal.Now.instant().add({ hours: 24 }).epochMilliseconds,
  joinCode: 'join_lighthouse'
});
await db.insert(schema.joinCodes).values({
  createdById: 'smith',
  groupId: 'lighthouse',
  expiresAtMilliseconds: Temporal.Now.instant().subtract({ hours: 24 }).epochMilliseconds,
  joinCode: 'expired_lighthouse'
});

console.log('✅ Dev database is ready.');
