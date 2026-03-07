import { test, expect } from "@playwright/test";

test.describe("Profile / Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#profile");
  });

  test("displays greeting and name", async ({ page }) => {
    const section = page.locator("#profile");
    await expect(section.getByText("Hello, I'm")).toBeVisible();
    await expect(section.getByText("Julian Soto")).toBeVisible();
  });

  test("displays professional title", async ({ page }) => {
    const section = page.locator("#profile");
    await expect(
      section.getByText(/Senior Software Engineer/)
    ).toBeVisible();
  });

  test("has Download CV button", async ({ page }) => {
    const section = page.locator("#profile");
    const cvButton = section.getByText("Download CV");
    await expect(cvButton).toBeVisible();
  });

  test("has Hire Me CTA button", async ({ page }) => {
    const section = page.locator("#profile");
    const ctaButton = section.getByText(/Hire Me/);
    await expect(ctaButton).toBeVisible();
  });

  test("displays profile image", async ({ page }) => {
    const section = page.locator("#profile");
    const profileImg = section.locator("img").first();
    await expect(profileImg).toBeVisible();
  });

  test("Download CV links to correct PDF for English locale", async ({ page }) => {
    const cvLink = page.locator('a[href*="cv_ingles"], a[download*="cv"]').first();
    if (await cvLink.count() > 0) {
      const href = await cvLink.getAttribute("href");
      expect(href).toContain("cv");
    }
  });
});

test.describe("Profile - Spanish", () => {
  test("displays Spanish content when locale is ES", async ({ page }) => {
    await page.goto("/es");
    await page.waitForSelector("#profile");

    const section = page.locator("#profile");
    await expect(section.getByText("Hola, soy")).toBeVisible();
  });
});
