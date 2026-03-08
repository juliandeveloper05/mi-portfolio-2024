import type { NextApiRequest, NextApiResponse } from "next";
import pool, { INIT_TABLE_SQL } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = req.query.secret || req.headers["x-analytics-secret"];
  if (!process.env.ANALYTICS_SECRET || secret !== process.env.ANALYTICS_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await pool.query(INIT_TABLE_SQL);
    return res.status(200).json({ ok: true, message: "Table created successfully" });
  } catch (error) {
    console.error("Init DB error:", error);
    return res.status(500).json({ error: "Failed to initialize database" });
  }
}
