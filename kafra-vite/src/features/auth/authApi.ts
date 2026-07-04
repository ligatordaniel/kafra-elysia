export type AuthUser = {
  authenticated: boolean;
  username?: string;
};

export async function getCurrentUser() {
  const response = await fetch('/api/auth/me');
  if (response.status === 401) return { authenticated: false } satisfies AuthUser;
  if (!response.ok) throw new Error('No se pudo verificar sesión');

  return response.json() as Promise<AuthUser>;
}

export async function login(username: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: 'No se pudo entrar' }));
    throw new Error(body.error ?? 'No se pudo entrar');
  }
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
}
