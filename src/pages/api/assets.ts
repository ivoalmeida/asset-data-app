import { NextApiRequest, NextApiResponse } from 'next';
import { findAll, create } from '@/lib/services/assets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const assets = await findAll();
      res.status(200).json(assets);
    } catch {
      res.status(500).json({ error: 'Failed to fetch assets' });
    }
  } else if (req.method === 'POST') {
    try {
      console.log('body', req.body);
      const asset = await create(req.body);
      res.status(201).json(asset);
    } catch {
      res.status(500).json({ error: 'Failed to create asset' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}