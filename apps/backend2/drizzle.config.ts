import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/backend2/src/**/schema.ts',
  out: './apps/backend2/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgres://postgres:postgres@localhost:5432/fright_rate`,
    // url: `${process.env.DATABASE_URL}`,
  },
});