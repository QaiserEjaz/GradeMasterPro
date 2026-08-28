import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise<void>((resolve) => {
    app(req, res);
    res.on('finish', () => resolve());
  });
}
