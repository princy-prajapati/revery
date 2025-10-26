import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const form = new formidable.IncomingForm();
  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload error.' });
    }
    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const data = fs.readFileSync(file.filepath);
    const savePath = path.join(process.cwd(), 'public', 'necklines', file.originalFilename || 'uploaded.png');
    fs.writeFileSync(savePath, data);
    return res.status(200).json({ success: true });
  });
}
