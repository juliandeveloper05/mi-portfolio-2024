import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav");
  });

  test("renders logo and navigation links", async ({ page }) => {
    const logo = page.locator('img[alt="Logo"]');
    await expect(logo).toBeVisible();

    const navLinks = page.locator("nav .hidden.md\\:flex a, nav .hidden.md\\:flex [class*='cursor-pointer']");
    await expect(navLinks.first()).toBeVisible();
  });

  test("displays all navigation items on desktop", async ({ page }) => {
    const expectedItems = [
      "Welcome",
      "About",
      "Services",
      "Projects",
      "Timeline",
      "Approach",
      "Contact",
    ];

    for (const item of expectedItems) {
      const link = page.locator("nav").getByText(item, { exact: true }).first();
      await expect(link).toBeVisible();
    }
  });

  test("theme toggle switches between dark and light mode", async ({ page }) => {
    const htmlElement = page.locator("html");

    const themeToggle = page.locator("nav").locator("button").filter({
      has: page.locator("svg"),
    }).first();

    const initialClass = await htmlElement.getAttribute("class");
    await themeToggle.click();
    await page.waitForTimeout(500);

    const newClass = await htmlElement.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });

  test("language switch changes content to Spanish", async ({ page }) => {
    const esButton = page.locator("nav").getByText("ES", { exact: true }).first();
    await esButton.click();
    await page.waitForURL("**/es**");

    const navText = page.locator("nav").getByText("Servicios", { exact: true }).first();
    await expect(navText).toBeVisible();
  });

  test("language switch changes content to English", async ({ page }) => {
    // Go to Spanish first
    await page.goto("/es");
    await page.waitForSelector("nav");

    const enButton = page.locator("nav").getByText("EN", { exact: true }).first();
    await enButton.click();
    await page.waitForURL(/\/(?:en)?$/);

    const navText = page.locator("nav").getByText("Services", { exact: true }).first();
    await expect(navText).toBeVisible();
  });
});

test.describe("Navbar - Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("shows hamburger menu on mobile", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav");

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuButton).toBeVisible();
  });

  test("opens and closes mobile menu", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav");

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await menuButton.click();

    // Mobile menu should show nav items
    const mobileMenu = page.locator("nav").getByText("About", { exact: true }).first();
    await expect(mobileMenu).toBeVisible();

    // Close the menu
    await menuButton.click();
    await page.waitForTimeout(300);
  });

  test("mobile menu has language toggle buttons", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav");

    const menuButton = page.locator('button[aria-label="Toggle menu"]');
    await menuButton.click();

    await expect(page.getByText("English")).toBeVisible();
    await expect(page.getByText("Español")).toBeVisible();
  });
});
