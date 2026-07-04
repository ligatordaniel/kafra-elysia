const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
};

export const config = {
  app: {
    port: Number(process.env.APP_PORT ?? 3000),
    username: required('APP_USERNAME'),
    passwordHash: required('APP_PASSWORD_HASH'),
    sessionSecret: required('SESSION_SECRET'),
    publicUrl: process.env.APP_PUBLIC_URL ?? 'http://localhost:8089'
  },
  db: {
    url: required('DATABASE_URL')
  },
  storage: {
    root: process.env.STORAGE_ROOT ?? '/data/storage',
    maxBytes: Number(process.env.MAX_STORAGE_BYTES ?? 53687091200),
    maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES ?? 16106127360)
  }
};
