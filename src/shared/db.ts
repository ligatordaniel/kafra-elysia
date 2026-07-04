import pg from 'pg';
import { config } from './config';

export const pool = new pg.Pool({ connectionString: config.db.url });

export async function initDb() {
  await pool.query(`
    create table if not exists sessions (
      token_hash text primary key,
      username text not null,
      created_at timestamptz not null default now(),
      expires_at timestamptz not null
    );

    create table if not exists files (
      path text primary key,
      kind text not null check (kind in ('file', 'directory')),
      size_bytes bigint not null default 0,
      is_public boolean not null default false,
      updated_at timestamptz not null default now()
    );

    alter table files add column if not exists is_public boolean not null default false;
  `);
}
