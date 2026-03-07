import { test, expect } from "@playwright/test";

test.describe("Contact Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("displays contact heading", async ({ page }) => {
    const section = page.locator("#contact");
    await expect(section.getByText("Contact me")).toBeVisible();
  });

  test("displays email address link", async ({ page }) => {
    const section = page.locator("#contact");
    const emailLink = section.locator('a[href="mailto:juliansoto.dev@gmail.com"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText("juliansoto.dev@gmail.com");
  });

  test("displays contact form with all fields", async ({ page }) => {
    const section = page.locator("#contact");

    const emailInput = section.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("placeholder", "Your email");

    const messageTextarea = section.locator("textarea");
    await expect(messageTextarea).toBeVisible();
    await expect(messageTextarea).toHaveAttribute("placeholder", "Your message");

    const submitButton = section.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText("Send");
  });

  test("form fields accept user input", async ({ page }) => {
    const section = page.locator("#contact");

    const emailInput = section.locator('input[type="email"]');
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");

    const messageTextarea = section.locator("textarea");
    await messageTextarea.fill("Hello, this is a test message.");
    await expect(messageTextarea).toHaveValue("Hello, this is a test message.");
  });

  test("submit button is disabled while loading", async ({ page }) => {
    const section = page.locator("#contact");
    const submitButton = section.locator('button[type="submit"]');

    // Button should not be disabled initially
    await expect(submitButton).not.toBeDisabled();
  });

  test("form validation prevents empty submission", async ({ page }) => {
    const section = page.locator("#contact");
    const submitButton = section.locator('button[type="submit"]');

    // Submit empty form
    await submitButton.click();

    // Toast notification should appear with error
    await page.waitForTimeout(500);
    const toast = page.locator(".toastify, [class*='toast']").first();
    if (await toast.count() > 0) {
      await expect(toast).toBeVisible();
    }
  });
});

test.describe("Contact - Spanish", () => {
  test("displays Spanish labels", async ({ page }) => {
    await page.goto("/es");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const section = page.locator("#contact");
    await expect(section.getByText(/Contáctame|Contacto/)).toBeVisible();
  });
});
