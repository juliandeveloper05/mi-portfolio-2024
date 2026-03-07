import { test, expect } from "@playwright/test";

test.describe("Testimonials Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#testimonials").scrollIntoViewIfNeeded();
  });

  test("displays section heading", async ({ page }) => {
    const section = page.locator("#testimonials");
    await expect(section.getByText("What Clients Say")).toBeVisible();
  });

  test("renders testimonial cards with client names", async ({ page }) => {
    const section = page.locator("#testimonials");
    await expect(section.getByText("Maria Gonzalez")).toBeVisible();
  });

  test("testimonial cards show review text", async ({ page }) => {
    const section = page.locator("#testimonials");
    await expect(
      section.getByText(/delivered a complex Next.js/).first()
    ).toBeVisible();
  });

  test("testimonial cards display role and company", async ({ page }) => {
    const section = page.locator("#testimonials");
    await expect(
      section.getByText(/TechFlow Solutions/).first()
    ).toBeVisible();
  });

  test("testimonial cards display star ratings", async ({ page }) => {
    const section = page.locator("#testimonials");
    const stars = section.locator("svg");
    expect(await stars.count()).toBeGreaterThan(0);
  });

  test("swiper pagination is present", async ({ page }) => {
    const section = page.locator("#testimonials");
    const pagination = section.locator(".swiper-pagination");
    await expect(pagination).toBeVisible();
  });
});
