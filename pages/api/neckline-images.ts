import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dir = path.join(process.cwd(), 'public', 'necklines');
  if (req.method === 'GET') {
    try {
      const files = fs.readdirSync(dir).filter(f => f.match(/\.(png|jpg|jpeg|svg)$/i));
      res.status(200).json({ images: files });
    } catch (e) {
      res.status(500).json({ error: 'Failed to list images.' });
    }
  } else {
    res.status(405).end();
  }
}
