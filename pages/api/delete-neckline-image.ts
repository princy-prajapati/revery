import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { filename } = req.body;
  if (!filename) {
    return res.status(400).json({ error: 'No filename provided.' });
  }
  const filePath = path.join(process.cwd(), 'public', 'necklines', filename);
  try {
    fs.unlinkSync(filePath);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete image.' });
  }
}
