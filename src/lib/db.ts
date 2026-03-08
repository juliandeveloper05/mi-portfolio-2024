import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
  max: 5,
});

export default pool;

export const INIT_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    locale VARCHAR(5),
    theme VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
  );
`;
