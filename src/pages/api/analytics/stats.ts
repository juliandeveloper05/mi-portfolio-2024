import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = req.query.secret || req.headers["x-analytics-secret"];
  if (!process.env.ANALYTICS_SECRET || secret !== process.env.ANALYTICS_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const days = parseInt((req.query.days as string) || "30", 10);
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [totalEvents, eventsByType, projectClicks, dailyTrends, recentEvents, formFunnel] =
      await Promise.all([
        pool.query(
          `SELECT COUNT(*) as total FROM analytics_events WHERE created_at >= $1`,
          [since]
        ),
        pool.query(
          `SELECT event_type, COUNT(*) as count FROM analytics_events
           WHERE created_at >= $1 GROUP BY event_type ORDER BY count DESC`,
          [since]
        ),
        pool.query(
          `SELECT event_data->>'projectName' as project, event_data->>'linkType' as link_type, COUNT(*) as count
           FROM analytics_events WHERE event_type = 'project_click' AND created_at >= $1
           GROUP BY event_data->>'projectName', event_data->>'linkType' ORDER BY count DESC`,
          [since]
        ),
        pool.query(
          `SELECT DATE(created_at) as date, event_type, COUNT(*) as count
           FROM analytics_events WHERE created_at >= $1
           GROUP BY DATE(created_at), event_type ORDER BY date ASC`,
          [since]
        ),
        pool.query(
          `SELECT id, event_type, event_data, locale, theme, created_at
           FROM analytics_events ORDER BY created_at DESC LIMIT 20`
        ),
        pool.query(
          `SELECT event_type, COUNT(*) as count FROM analytics_events
           WHERE event_type IN ('form_view', 'form_submit') AND created_at >= $1
           GROUP BY event_type`,
          [since]
        ),
      ]);

    const formViews = formFunnel.rows.find((r: { event_type: string }) => r.event_type === "form_view")?.count || 0;
    const formSubmits = formFunnel.rows.find((r: { event_type: string }) => r.event_type === "form_submit")?.count || 0;
    const conversionRate = formViews > 0 ? ((formSubmits / formViews) * 100).toFixed(1) : "0";

    return res.status(200).json({
      totalEvents: totalEvents.rows[0].total,
      eventsByType: eventsByType.rows,
      projectClicks: projectClicks.rows,
      dailyTrends: dailyTrends.rows,
      recentEvents: recentEvents.rows,
      formFunnel: {
        views: parseInt(formViews),
        submissions: parseInt(formSubmits),
        conversionRate: parseFloat(conversionRate),
      },
      period: { days, since: since.toISOString() },
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
}
