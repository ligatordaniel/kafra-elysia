import { FormEvent, useState } from 'react';
import { login } from './authApi';

type LoginViewProps = {
  onLogin: () => void;
};

export function LoginView({ onLogin }: LoginViewProps) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const form = new FormData(event.currentTarget);
      await login(String(form.get('username') ?? ''), String(form.get('password') ?? ''));
      onLogin();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'No se pudo entrar');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="eyebrow">Kafra</p>
        <h1>Tu bóveda de archivos</h1>
        <p className="muted">Entra para administrar tus archivos en la VPS.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario
            <input name="username" autoComplete="username" required />
          </label>
          <label>
            Contraseña
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button disabled={isLoading}>{isLoading ? 'Entrando…' : 'Entrar'}</button>
          <p className="error" role="alert">{error}</p>
        </form>
      </section>
    </main>
  );
}
