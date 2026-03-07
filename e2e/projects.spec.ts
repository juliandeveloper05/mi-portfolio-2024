import { test, expect } from "@playwright/test";

test.describe("Projects Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
  });

  test("displays section heading", async ({ page }) => {
    const section = page.locator("#projects");
    await expect(
      section.getByText(/projects/i).first()
    ).toBeVisible();
  });

  test("renders all 6 project cards", async ({ page }) => {
    const projectNames = [
      "Bitrova",
      "Bass Academy",
      "NexusShop",
      "Dumu AI",
      "Soul Solutions",
      "Forma Real",
    ];

    const section = page.locator("#projects");
    for (const name of projectNames) {
      await expect(section.getByText(name).first()).toBeVisible();
    }
  });

  test("project cards have tech badges", async ({ page }) => {
    const section = page.locator("#projects");
    // Bitrova uses React Native
    await expect(section.getByText("React Native").first()).toBeVisible();
  });

  test("project cards have GitHub links", async ({ page }) => {
    const section = page.locator("#projects");
    const githubLinks = section.locator('a[href*="github.com"]');
    expect(await githubLinks.count()).toBeGreaterThan(0);
  });

  test("project cards have images", async ({ page }) => {
    const section = page.locator("#projects");
    const images = section.locator("img");
    expect(await images.count()).toBeGreaterThanOrEqual(6);
  });

  test("project cards have descriptions", async ({ page }) => {
    const section = page.locator("#projects");
    // Check for at least one project description
    await expect(
      section.getByText(/task/i).first()
    ).toBeVisible();
  });
});
