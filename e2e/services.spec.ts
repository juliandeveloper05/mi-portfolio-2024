import { test, expect } from "@playwright/test";

test.describe("Services Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#services").scrollIntoViewIfNeeded();
  });

  test("displays section heading", async ({ page }) => {
    const section = page.locator("#services");
    await expect(section.getByText("My Services")).toBeVisible();
  });

  test("renders all 6 service cards", async ({ page }) => {
    const serviceCards = [
      "Modern Frontend Architecture",
      "Scalable Backend & API Design",
      "Data Strategy & Modeling",
      "End-to-End Product Engineering",
      "CMS & WordPress Development",
      "AI & Audio Processing",
    ];

    const section = page.locator("#services");
    for (const title of serviceCards) {
      await expect(section.getByText(title)).toBeVisible();
    }
  });

  test("service cards have descriptions", async ({ page }) => {
    const section = page.locator("#services");
    await expect(
      section.getByText(/Building modern and responsive/)
    ).toBeVisible();
    await expect(
      section.getByText(/Developing robust and scalable/)
    ).toBeVisible();
  });

  test("service cards display technology badges", async ({ page }) => {
    const section = page.locator("#services");
    // Check for common tech badges
    await expect(section.getByText("React").first()).toBeVisible();
    await expect(section.getByText("TypeScript").first()).toBeVisible();
  });
});
