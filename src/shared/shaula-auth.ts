export type ShaulaUser = {
  username: string;
};

const validateUrl = process.env.SHAULA_INTERNAL_VALIDATE_URL ?? 'http://shaula-sprintboot:8000/internal/validate';

export async function requireShaulaUser(request: Request): Promise<ShaulaUser | null> {
  const headers = new Headers();
  const cookie = request.headers.get('cookie');
  const authorization = request.headers.get('authorization');

  if (cookie) headers.set('cookie', cookie);
  if (authorization) headers.set('authorization', authorization);

  try {
    const response = await fetch(validateUrl, { headers });
    if (!response.ok) return null;

    const body = await response.json().catch(() => ({})) as { authenticated?: boolean; username?: string };
    if (!body.authenticated || !body.username) return null;

    return { username: body.username };
  } catch {
    return null;
  }
}
