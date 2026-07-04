import { useEffect, useState } from 'react';
import { getCurrentUser } from './features/auth/authApi';
import { LoginView } from './features/auth/LoginView';
import { StorageView } from './features/storage/StorageView';

type SessionState =
  | { status: 'loading' }
  | { status: 'guest' }
  | { status: 'authenticated'; username: string };

export function App() {
  const [session, setSession] = useState<SessionState>({ status: 'loading' });

  async function refreshSession() {
    try {
      const user = await getCurrentUser();
      setSession(user.authenticated && user.username
        ? { status: 'authenticated', username: user.username }
        : { status: 'guest' });
    } catch {
      setSession({ status: 'guest' });
    }
  }

  useEffect(() => {
    void refreshSession();
  }, []);

  if (session.status === 'loading') {
    return <main className="loading-screen"><h1>Kafra</h1><p>Cargando…</p></main>;
  }

  if (session.status === 'guest') {
    return <LoginView onLogin={() => void refreshSession()} />;
  }

  return <StorageView username={session.username} onLogout={() => setSession({ status: 'guest' })} />;
}
