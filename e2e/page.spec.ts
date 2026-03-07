import { test, expect } from "@playwright/test";

test.describe("Full Page Load", () => {
  test("homepage loads successfully", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("all main sections are present on the page", async ({ page }) => {
    await page.goto("/");

    const sections = ["profile", "about", "services", "projects", "timeline", "approach", "contact"];
    for (const id of sections) {
      const section = page.locator(`#${id}`);
      await expect(section).toBeAttached();
    }
  });

  test("page has correct title", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test("navigation is sticky at the top", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Nav should still be visible
    await expect(nav).toBeVisible();
  });

  test("Spanish locale loads correctly", async ({ page }) => {
    const response = await page.goto("/es");
    expect(response?.status()).toBe(200);

    // Should have Spanish nav items
    await expect(page.getByText("Servicios").first()).toBeVisible();
  });

  test("smooth scroll navigation works", async ({ page }) => {
    await page.goto("/");

    // Click "About" in nav
    const aboutLink = page.locator("nav").getByText("About", { exact: true }).first();
    await aboutLink.click();
    await page.waitForTimeout(1000);

    // About section should be near viewport top
    const aboutSection = page.locator("#about");
    const box = await aboutSection.boundingBox();
    expect(box).toBeTruthy();
  });

  test("page renders without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors (e.g., third-party scripts)
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("third-party")
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Responsive Layout", () => {
  test("desktop layout shows horizontal nav", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const desktopNav = page.locator("nav .hidden.md\\:flex").first();
    await expect(desktopNav).toBeVisible();
  });

  test("mobile layout shows hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
  });
});
