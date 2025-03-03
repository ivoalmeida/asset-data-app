import { NextApiRequest, NextApiResponse } from "next";
import { findAll, create, findByCompanyId } from "@/lib/services/assets";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyId } = req.query;
  if (req.method === "GET") {
    try {
      const assets = companyId
        ? findByCompanyId(companyId as string)
        : findAll();
      res.status(200).json(assets);
    } catch {
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  } else if (req.method === "POST") {
    try {
      const asset = create(req.body);
      res.status(201).json(asset);
    } catch {
      res.status(500).json({ error: "Failed to create asset" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
