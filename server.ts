import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  hostname: 'localhost',
  port: 3000,
  dir: __dirname,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(3000, () => {
      console.log(`> Ready on http://localhost:3000`);
    });
});