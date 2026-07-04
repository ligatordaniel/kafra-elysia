import { Elysia } from 'elysia';
import path from 'node:path';
import { config } from './shared/config';
import { initDb } from './shared/db';
import { html } from './shared/http';
import { authRoutes } from './features/auth/auth.routes';
import { publicStorageRoutes } from './features/storage/public.routes';
import { storageRoutes } from './features/storage/storage.routes';
import { ensureStorageRoot } from './features/storage/storage.service';

const staticRoot = path.resolve(process.env.STATIC_ROOT ?? 'kafra-vite/dist');

const mimeTypes: Record<string, string> = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp'
};

await initDb();
await ensureStorageRoot();

function safeStaticPath(relativePath: string) {
  const cleanPath = relativePath.replace(/^\/+/, '').replace(/\0/g, '');
  const absolutePath = path.resolve(staticRoot, cleanPath);

  if (absolutePath !== staticRoot && !absolutePath.startsWith(staticRoot + path.sep)) {
    return null;
  }

  return absolutePath;
}

async function staticFile(relativePath: string) {
  const absolutePath = safeStaticPath(relativePath);
  if (!absolutePath) return null;

  const file = Bun.file(absolutePath);
  if (!(await file.exists())) return null;

  return new Response(file, {
    headers: {
      'content-type': mimeTypes[path.extname(absolutePath)] ?? 'application/octet-stream'
    }
  });
}

async function reactApp() {
  const response = await staticFile('index.html');
  if (response) return response;

  return html(`<!doctype html><html lang="es"><body><h1>Kafra</h1><p>Frontend no compilado. Ejecuta <code>cd kafra-vite && bun run build</code>.</p></body></html>`, 503);
}

const app = new Elysia()
  .use(authRoutes)
  .use(publicStorageRoutes)
  .use(storageRoutes)
  .get('/health', () => ({ ok: true, name: 'kafra-elysia' }))
  .get('/assets/*', async ({ params, set }) => {
    const response = await staticFile(`assets/${params['*']}`);
    if (response) return response;

    set.status = 404;
    return 'Not found';
  })
  .get('/favicon.svg', async ({ set }) => {
    const response = await staticFile('favicon.svg');
    if (response) return response;

    set.status = 404;
    return 'Not found';
  })
  .get('/', reactApp)
  .get('/login', reactApp)
  .listen({
    hostname: '0.0.0.0',
    port: config.app.port,
    maxRequestBodySize: config.storage.maxUploadBytes
  });

console.log(`Kafra Elysia running at http://${app.server?.hostname}:${app.server?.port}`);
