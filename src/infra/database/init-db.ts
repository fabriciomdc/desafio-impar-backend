import { sql } from './database.provider';

export async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS attendances (
      id UUID PRIMARY KEY,
      description TEXT NOT NULL,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      createdAt TIMESTAMP NOT NULL
    );
  `;
}
