import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();
  });

  test("displays Julian Soto name/brand", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByText("Julian Soto")).toBeVisible();
  });

  test("displays copyright text", async ({ page }) => {
    const footer = page.locator("footer");
    const currentYear = new Date().getFullYear().toString();
    await expect(footer.getByText(currentYear)).toBeVisible();
  });

  test("has LinkedIn social link", async ({ page }) => {
    const footer = page.locator("footer");
    const linkedin = footer.locator('a[aria-label="LinkedIn"]');
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/full-stack-julian-soto/"
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");
  });

  test("has Instagram social link", async ({ page }) => {
    const footer = page.locator("footer");
    const instagram = footer.locator('a[aria-label="Instagram"]');
    await expect(instagram).toBeVisible();
    await expect(instagram).toHaveAttribute("target", "_blank");
  });

  test("has WhatsApp social link", async ({ page }) => {
    const footer = page.locator("footer");
    const whatsapp = footer.locator('a[aria-label="WhatsApp"]');
    await expect(whatsapp).toBeVisible();
    await expect(whatsapp).toHaveAttribute("href", /wa\.me/);
  });

  test("has YouTube social link", async ({ page }) => {
    const footer = page.locator("footer");
    const youtube = footer.locator('a[aria-label="YouTube"]');
    await expect(youtube).toBeVisible();
    await expect(youtube).toHaveAttribute("target", "_blank");
  });

  test("all social links open in new tab", async ({ page }) => {
    const footer = page.locator("footer");
    const socialLinks = footer.locator("a[target='_blank']");
    const count = await socialLinks.count();
    expect(count).toBe(4);

    for (let i = 0; i < count; i++) {
      await expect(socialLinks.nth(i)).toHaveAttribute("rel", /noopener/);
    }
  });
});
