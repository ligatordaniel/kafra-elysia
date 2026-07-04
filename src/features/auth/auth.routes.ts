import { Elysia } from 'elysia';
import { json } from '../../shared/http';
import { requireShaulaUser } from '../../shared/shaula-auth';

export const authRoutes = new Elysia()
  .get('/api/auth/me', async ({ request }) => {
    const user = await requireShaulaUser(request);
    if (!user) return json({ authenticated: false }, 401);

    return json({ authenticated: true, username: user.username, provider: 'shaula-sprintboot' });
  })
  .post('/api/auth/login', () => json({ error: 'Login Kafra eliminado. Usa shaula-sprintboot.' }, 410))
  .post('/api/auth/logout', () => json({ ok: true, provider: 'shaula-sprintboot' }));
