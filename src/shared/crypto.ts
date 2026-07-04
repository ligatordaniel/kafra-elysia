import { createHash, pbkdf2Sync, timingSafeEqual } from 'node:crypto';
import { config } from './config';

export function sha256(input: string) {
  return createHash('sha256').update(`${config.app.sessionSecret}:${input}`).digest('hex');
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, iterationsRaw, salt, digestB64] = storedHash.split(':');
  if (scheme !== 'pbkdf2' || !iterationsRaw || !salt || !digestB64) return false;
  const iterations = Number(iterationsRaw);
  const expected = Buffer.from(digestB64, 'base64');
  const actual = pbkdf2Sync(password, salt, iterations, expected.length, 'sha256');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
