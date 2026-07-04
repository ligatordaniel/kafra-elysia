export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

export function html(markup: string, status = 200) {
  return new Response(markup, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' }
  });
}

export function parseCookies(header = '') {
  const cookies = new Map<string, string>();
  for (const part of header.split(';')) {
    const [rawKey, ...rawValue] = part.trim().split('=');
    if (!rawKey) continue;
    cookies.set(rawKey, decodeURIComponent(rawValue.join('=')));
  }
  return cookies;
}

export function sessionCookie(token: string, maxAgeSeconds: number) {
  return `session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export function clearSessionCookie() {
  return 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
}
