import { test, expect } from "@playwright/test";

test.describe("About Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
  });

  test("displays section heading", async ({ page }) => {
    const section = page.locator("#about");
    await expect(section.getByText("Beyond the Code")).toBeVisible();
  });

  test("displays professional description", async ({ page }) => {
    const section = page.locator("#about");
    await expect(
      section.getByText(/Senior Full-Stack Software Engineer/)
    ).toBeVisible();
  });

  test("displays about image", async ({ page }) => {
    const section = page.locator("#about");
    const img = section.locator("img").first();
    await expect(img).toBeVisible();
  });

  test("shows experience highlights", async ({ page }) => {
    const section = page.locator("#about");
    await expect(section.getByText("Work Experience")).toBeVisible();
    await expect(section.getByText(/Soul Solutions/)).toBeVisible();
  });

  test("shows recent projects info", async ({ page }) => {
    const section = page.locator("#about");
    await expect(section.getByText("Recent Projects")).toBeVisible();
  });
});
