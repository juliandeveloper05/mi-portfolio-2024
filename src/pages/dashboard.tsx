import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AnalyticsData {
  totalEvents: string;
  eventsByType: { event_type: string; count: string }[];
  projectClicks: { project: string; link_type: string; count: string }[];
  dailyTrends: { date: string; event_type: string; count: string }[];
  recentEvents: {
    id: number;
    event_type: string;
    event_data: Record<string, string>;
    locale: string;
    theme: string;
    created_at: string;
  }[];
  formFunnel: { views: number; submissions: number; conversionRate: number };
  period: { days: number; since: string };
}

const COLORS = ["#12b886", "#20c997", "#38d9a9", "#63e6be", "#96f2d7", "#c3fae8"];

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="glass rounded-xl p-5 flex flex-col gap-1">
      <span className="text-sm text-[var(--theme-text-secondary)]">{label}</span>
      <span className="text-3xl font-bold text-[var(--theme-text)]">{value}</span>
      {sub && <span className="text-xs text-[var(--theme-text-muted)]">{sub}</span>}
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secret = params.get("secret");
    if (!secret) {
      setError("Access denied");
      setLoading(false);
      return;
    }
    setAuthorized(true);

    fetch(`/api/analytics/stats?secret=${encodeURIComponent(secret)}&days=${days}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [days]);

  if (!authorized && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg)]">
        <p className="text-[var(--theme-text-secondary)]">404 — Page not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--theme-bg)]">
        <div className="glass rounded-xl p-8 text-center max-w-md">
          <p className="text-red-400 font-medium mb-2">Error</p>
          <p className="text-[var(--theme-text-secondary)] text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Aggregate project clicks for bar chart
  const projectChartData = data.projectClicks.reduce<
    Record<string, { project: string; github: number; live_demo: number }>
  >((acc, row) => {
    if (!acc[row.project]) {
      acc[row.project] = { project: row.project, github: 0, live_demo: 0 };
    }
    if (row.link_type === "github") acc[row.project].github = parseInt(row.count);
    else acc[row.project].live_demo = parseInt(row.count);
    return acc;
  }, {});

  // Aggregate daily trends for line chart
  const dailyMap: Record<string, Record<string, number>> = {};
  data.dailyTrends.forEach((row) => {
    const dateStr = new Date(row.date).toLocaleDateString("en", { month: "short", day: "numeric" });
    if (!dailyMap[dateStr]) dailyMap[dateStr] = { date: 0 };
    dailyMap[dateStr][row.event_type] = parseInt(row.count);
  });
  const dailyChartData = Object.entries(dailyMap).map(([date, events]) => ({
    date,
    ...events,
  }));

  // Events by type for pie chart
  const pieData = data.eventsByType.map((e) => ({
    name: e.event_type.replace(/_/g, " "),
    value: parseInt(e.count),
  }));

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Julian Soto</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-sm text-[var(--theme-text-secondary)]">
                Tracking visitor engagement & conversions
              </p>
            </div>
            <div className="flex gap-2">
              {[7, 14, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => { setDays(d); setLoading(true); }}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    days === d
                      ? "bg-[var(--theme-accent)] text-white"
                      : "bg-[var(--theme-surface-2)] text-[var(--theme-text-secondary)] hover:bg-[var(--theme-surface-3)]"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Events" value={data.totalEvents} sub={`Last ${days} days`} />
            <StatCard label="Project Clicks" value={
              data.eventsByType.find((e) => e.event_type === "project_click")?.count || "0"
            } />
            <StatCard label="Form Submissions" value={data.formFunnel.submissions} />
            <StatCard
              label="Conversion Rate"
              value={`${data.formFunnel.conversionRate}%`}
              sub={`${data.formFunnel.views} views → ${data.formFunnel.submissions} submits`}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Project Popularity */}
            <div className="glass rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Project Popularity</h2>
              {Object.keys(projectChartData).length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.values(projectChartData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
                    <XAxis dataKey="project" tick={{ fontSize: 11, fill: "var(--theme-text-secondary)" }} angle={-20} textAnchor="end" height={60} />
                    <YAxis tick={{ fontSize: 12, fill: "var(--theme-text-secondary)" }} />
                    <Tooltip contentStyle={{ background: "var(--theme-glass-bg)", border: "1px solid var(--theme-border)", borderRadius: 8 }} />
                    <Bar dataKey="github" fill="#12b886" name="GitHub" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="live_demo" fill="#63e6be" name="Live Demo" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-[var(--theme-text-muted)] text-sm py-12 text-center">No project click data yet</p>
              )}
            </div>

            {/* Events Distribution */}
            <div className="glass rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Events Distribution</h2>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "var(--theme-glass-bg)", border: "1px solid var(--theme-border)", borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-[var(--theme-text-muted)] text-sm py-12 text-center">No events data yet</p>
              )}
            </div>
          </div>

          {/* Daily Trends */}
          <div className="glass rounded-xl p-5 mb-8">
            <h2 className="text-lg font-semibold mb-4">Daily Trends</h2>
            {dailyChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--theme-border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "var(--theme-text-secondary)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--theme-text-secondary)" }} />
                  <Tooltip contentStyle={{ background: "var(--theme-glass-bg)", border: "1px solid var(--theme-border)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="section_view" stroke="#12b886" name="Section Views" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="project_click" stroke="#20c997" name="Project Clicks" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="form_submit" stroke="#63e6be" name="Form Submits" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="form_view" stroke="#96f2d7" name="Form Views" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-[var(--theme-text-muted)] text-sm py-12 text-center">No daily trend data yet</p>
            )}
          </div>

          {/* Section Engagement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Contact Form Funnel */}
            <div className="glass rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Contact Form Funnel</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--theme-text-secondary)]">Form Views</span>
                  <span className="font-semibold">{data.formFunnel.views}</span>
                </div>
                <div className="w-full bg-[var(--theme-surface-2)] rounded-full h-2">
                  <div className="bg-[var(--theme-accent)] h-2 rounded-full" style={{ width: "100%" }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--theme-text-secondary)]">Submissions</span>
                  <span className="font-semibold">{data.formFunnel.submissions}</span>
                </div>
                <div className="w-full bg-[var(--theme-surface-2)] rounded-full h-2">
                  <div
                    className="bg-[#20c997] h-2 rounded-full transition-all"
                    style={{ width: `${data.formFunnel.conversionRate}%` }}
                  />
                </div>

                <p className="text-center text-sm text-[var(--theme-text-muted)] pt-2">
                  {data.formFunnel.conversionRate}% conversion rate
                </p>
              </div>
            </div>

            {/* Section Views */}
            <div className="glass rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4">Section Engagement</h2>
              {data.eventsByType.filter((e) => e.event_type === "section_view").length > 0 ? (
                <div className="space-y-2">
                  {data.projectClicks.length === 0 && data.eventsByType
                    .filter((e) => e.event_type === "section_view")
                    .map((e) => (
                      <div key={e.event_type} className="flex items-center justify-between py-1">
                        <span className="text-sm">{e.event_type}</span>
                        <span className="font-mono text-sm">{e.count}</span>
                      </div>
                    ))}
                  <p className="text-[var(--theme-text-muted)] text-xs">
                    Section-level breakdown available in recent events below
                  </p>
                </div>
              ) : (
                <p className="text-[var(--theme-text-muted)] text-sm py-8 text-center">
                  No section view data yet
                </p>
              )}
            </div>
          </div>

          {/* Recent Events Table */}
          <div className="glass rounded-xl p-5">
            <h2 className="text-lg font-semibold mb-4">Recent Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--theme-border)]">
                    <th className="text-left py-2 px-3 text-[var(--theme-text-secondary)] font-medium">Type</th>
                    <th className="text-left py-2 px-3 text-[var(--theme-text-secondary)] font-medium">Details</th>
                    <th className="text-left py-2 px-3 text-[var(--theme-text-secondary)] font-medium">Locale</th>
                    <th className="text-left py-2 px-3 text-[var(--theme-text-secondary)] font-medium">Theme</th>
                    <th className="text-left py-2 px-3 text-[var(--theme-text-secondary)] font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentEvents.map((event) => (
                    <tr key={event.id} className="border-b border-[var(--theme-border)]/50 hover:bg-[var(--theme-surface-1)]">
                      <td className="py-2 px-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                          {event.event_type}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[var(--theme-text-secondary)] font-mono text-xs">
                        {JSON.stringify(event.event_data)}
                      </td>
                      <td className="py-2 px-3">{event.locale || "—"}</td>
                      <td className="py-2 px-3">{event.theme || "—"}</td>
                      <td className="py-2 px-3 text-[var(--theme-text-muted)] whitespace-nowrap">
                        {new Date(event.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {data.recentEvents.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[var(--theme-text-muted)]">
                        No events recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[var(--theme-text-muted)] mt-8 pb-4">
            Analytics Dashboard — Data from {new Date(data.period.since).toLocaleDateString()} to today
          </p>
        </div>
      </div>
    </>
  );
}
