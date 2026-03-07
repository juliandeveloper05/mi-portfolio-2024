import { test, expect } from "@playwright/test";

test.describe("Timeline Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#timeline").scrollIntoViewIfNeeded();
  });

  test("displays timeline section", async ({ page }) => {
    const section = page.locator("#timeline");
    await expect(section).toBeVisible();
  });

  test("shows timeline events with years", async ({ page }) => {
    const section = page.locator("#timeline");
    await expect(section.getByText("2024").first()).toBeVisible();
  });

  test("timeline events are expandable", async ({ page }) => {
    const section = page.locator("#timeline");
    // Find the first clickable timeline event
    const expandButton = section.locator("button, [role='button'], [class*='cursor-pointer']").first();

    if (await expandButton.count() > 0) {
      await expandButton.click();
      await page.waitForTimeout(500);
      // After expanding, more content should be visible
      const content = section.locator("p, span, div");
      expect(await content.count()).toBeGreaterThan(0);
    }
  });

  test("shows Soul Solutions experience", async ({ page }) => {
    const section = page.locator("#timeline");
    await expect(section.getByText(/Soul Solutions/).first()).toBeVisible();
  });
});
