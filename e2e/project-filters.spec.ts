import { test, expect } from "@playwright/test";

test.describe("Project Filtering & Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
  });

  test("filter bar is visible with all category buttons", async ({ page }) => {
    const section = page.locator("#projects");
    const filterGroup = section.locator('[role="group"]');
    await expect(filterGroup).toBeVisible();

    // All 5 filter buttons present (All, Web, Mobile, AI/ML, Consulting)
    const buttons = filterGroup.locator("button");
    expect(await buttons.count()).toBe(5);
  });

  test("search input is visible", async ({ page }) => {
    const section = page.locator("#projects");
    const searchInput = section.locator("#project-search");
    await expect(searchInput).toBeVisible();
  });

  test("default state shows all 6 projects", async ({ page }) => {
    const projectNames = [
      "Bitrova",
      "Bass Academy",
      "NexusShop",
      "Dumu",
      "Soul Solutions",
      "Forma Real",
    ];

    const section = page.locator("#projects");
    for (const name of projectNames) {
      await expect(section.getByText(name).first()).toBeVisible();
    }
  });

  test("category filter: Web shows only web projects", async ({ page }) => {
    const section = page.locator("#projects");
    const filterGroup = section.locator('[role="group"]');

    // Click "Web" filter
    await filterGroup.getByText("Web").click();

    // Web projects should be visible
    await expect(section.getByText("Bass Academy").first()).toBeVisible();
    await expect(section.getByText("NexusShop").first()).toBeVisible();
    await expect(section.getByText("Forma Real").first()).toBeVisible();

    // Non-web projects should be hidden
    await expect(section.getByText("Bitrova").first()).toBeHidden();
    await expect(section.getByText("Dumu").first()).toBeHidden();
    await expect(section.getByText("Soul Solutions").first()).toBeHidden();
  });

  test("category filter: Mobile shows only Bitrova", async ({ page }) => {
    const section = page.locator("#projects");
    const filterGroup = section.locator('[role="group"]');

    await filterGroup.getByText("Mobile").click();

    await expect(section.getByText("Bitrova").first()).toBeVisible();
    await expect(section.getByText("Bass Academy").first()).toBeHidden();
    await expect(section.getByText("NexusShop").first()).toBeHidden();
  });

  test("search filters by project title", async ({ page }) => {
    const section = page.locator("#projects");
    const searchInput = section.locator("#project-search");

    await searchInput.fill("Bass");

    await expect(section.getByText("Bass Academy").first()).toBeVisible();
    await expect(section.getByText("Bitrova").first()).toBeHidden();
    await expect(section.getByText("NexusShop").first()).toBeHidden();
  });

  test("search filters by technology name", async ({ page }) => {
    const section = page.locator("#projects");
    const searchInput = section.locator("#project-search");

    await searchInput.fill("Python");

    await expect(section.getByText("Dumu").first()).toBeVisible();
    await expect(section.getByText("Bass Academy").first()).toBeHidden();
    await expect(section.getByText("Bitrova").first()).toBeHidden();
  });

  test("no results state shows message and clear button", async ({ page }) => {
    const section = page.locator("#projects");
    const searchInput = section.locator("#project-search");

    await searchInput.fill("xyzabc123nonexistent");

    // No results message should appear
    await expect(
      section.getByText(/no projects match/i).first()
    ).toBeVisible();

    // Clear filters button should appear
    const clearButton = section.getByText(/clear filters/i).first();
    await expect(clearButton).toBeVisible();

    // Click clear and verify all projects reappear
    await clearButton.click();
    await expect(section.getByText("Bitrova").first()).toBeVisible();
    await expect(section.getByText("Bass Academy").first()).toBeVisible();
  });

  test("combined category filter and search", async ({ page }) => {
    const section = page.locator("#projects");
    const filterGroup = section.locator('[role="group"]');
    const searchInput = section.locator("#project-search");

    // Select Web category
    await filterGroup.getByText("Web").click();

    // Then search within web projects
    await searchInput.fill("Academy");

    // Only Bass Academy should be visible
    await expect(section.getByText("Bass Academy").first()).toBeVisible();
    await expect(section.getByText("NexusShop").first()).toBeHidden();
    await expect(section.getByText("Forma Real").first()).toBeHidden();

    // Clear search, all web projects should reappear
    await searchInput.clear();
    await expect(section.getByText("Bass Academy").first()).toBeVisible();
    await expect(section.getByText("NexusShop").first()).toBeVisible();
    await expect(section.getByText("Forma Real").first()).toBeVisible();
  });
});
