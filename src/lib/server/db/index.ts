import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/libsql';
import * as schemaAndRelations from './schema';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

const { relations } = schemaAndRelations;

// const client = createClient({ url: env.DATABASE_URL });

export const db = drizzle(env.DATABASE_URL, { relations });
