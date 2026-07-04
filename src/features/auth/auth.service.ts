import { randomBytes } from 'node:crypto';
import { pool } from '../../shared/db';
import { config } from '../../shared/config';
import { parseCookies } from '../../shared/http';
import { sha256, verifyPassword } from '../../shared/crypto';

export async function login(username: string, password: string) {
  if (username !== config.app.username || !verifyPassword(password, config.app.passwordHash)) {
    return null;
  }

  const token = randomBytes(32).toString('base64url');
  const tokenHash = sha256(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await pool.query(
    'insert into sessions(token_hash, username, expires_at) values ($1, $2, $3)',
    [tokenHash, username, expiresAt]
  );

  return { token, maxAgeSeconds: 60 * 60 * 24 * 7 };
}

export async function logoutFromRequest(request: Request) {
  const token = parseCookies(request.headers.get('cookie') ?? '').get('session');
  if (token) await pool.query('delete from sessions where token_hash = $1', [sha256(token)]);
}

export async function requireUser(request: Request) {
  const token = parseCookies(request.headers.get('cookie') ?? '').get('session');
  if (!token) return null;

  const result = await pool.query(
    'select username from sessions where token_hash = $1 and expires_at > now()',
    [sha256(token)]
  );

  return result.rows[0]?.username as string | null;
}
