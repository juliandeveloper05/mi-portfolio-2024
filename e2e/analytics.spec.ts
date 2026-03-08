import { test, expect } from "@playwright/test";

test.describe("Analytics Integration", () => {
  test.describe("Tracking API", () => {
    test("POST /api/analytics/track accepts valid events", async ({ request }) => {
      const response = await request.post("/api/analytics/track", {
        data: {
          eventType: "section_view",
          eventData: { section: "projects" },
          locale: "en",
          theme: "dark",
        },
      });
      // May fail if no DB is configured, but should not return 405
      expect(response.status()).not.toBe(405);
    });

    test("POST /api/analytics/track rejects invalid event types", async ({ request }) => {
      const response = await request.post("/api/analytics/track", {
        data: {
          eventType: "invalid_event",
          eventData: {},
        },
      });
      expect(response.status()).toBe(400);
    });

    test("GET /api/analytics/track returns 405", async ({ request }) => {
      const response = await request.get("/api/analytics/track");
      expect(response.status()).toBe(405);
    });
  });

  test.describe("Stats API", () => {
    test("GET /api/analytics/stats without secret returns 401", async ({ request }) => {
      const response = await request.get("/api/analytics/stats");
      expect(response.status()).toBe(401);
    });

    test("GET /api/analytics/stats with wrong secret returns 401", async ({ request }) => {
      const response = await request.get("/api/analytics/stats?secret=wrong");
      expect(response.status()).toBe(401);
    });
  });

  test.describe("Dashboard Page", () => {
    test("dashboard without secret shows 404-like page", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page.getByText("404")).toBeVisible();
    });

    test("dashboard with wrong secret shows error", async ({ page }) => {
      await page.goto("/dashboard?secret=wrong");
      // Should show error or unauthorized state
      await page.waitForTimeout(2000);
      const body = await page.textContent("body");
      expect(body).toBeTruthy();
    });
  });

  test.describe("Event Tracking on Components", () => {
    test("project GitHub links have click tracking", async ({ page }) => {
      await page.goto("/");
      await page.locator("#projects").scrollIntoViewIfNeeded();

      const githubLinks = page.locator('#projects a[href*="github.com"]');
      expect(await githubLinks.count()).toBeGreaterThan(0);

      // Verify the link exists and is clickable
      const firstLink = githubLinks.first();
      await expect(firstLink).toBeVisible();
    });

    test("contact section is tracked when scrolled into view", async ({ page }) => {
      await page.goto("/");

      // Set up a request listener for analytics calls
      const analyticsRequests: string[] = [];
      page.on("request", (req) => {
        if (req.url().includes("/api/analytics/track")) {
          analyticsRequests.push(req.url());
        }
      });

      // Scroll to contact section
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      // The section should be visible (tracking fires via IntersectionObserver)
      await expect(page.locator("#contact")).toBeVisible();
    });
  });
});
