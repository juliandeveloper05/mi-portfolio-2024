import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

const VALID_EVENTS = ["project_click", "form_view", "form_submit", "section_view", "filter_use"];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { eventType, eventData, locale, theme } = body;

    if (!eventType || !VALID_EVENTS.includes(eventType)) {
      return res.status(400).json({ error: "Invalid event type" });
    }

    await pool.query(
      `INSERT INTO analytics_events (event_type, event_data, page_url, referrer, user_agent, locale, theme)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        eventType,
        JSON.stringify(eventData || {}),
        req.headers.referer || null,
        req.headers.referer || null,
        req.headers["user-agent"] || null,
        locale || null,
        theme || null,
      ]
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return res.status(500).json({ error: "Failed to track event" });
  }
}
