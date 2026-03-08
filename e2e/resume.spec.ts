import { test, expect } from "@playwright/test";

test.describe("PDF Resume Generator - API", () => {
  test("GET /api/resume?locale=en returns a PDF", async ({ request }) => {
    const response = await request.get("/api/resume?locale=en");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const body = await response.body();
    expect(body.length).toBeGreaterThan(0);
    // PDF magic bytes: %PDF
    expect(body.slice(0, 4).toString()).toBe("%PDF");
  });

  test("GET /api/resume?locale=es returns a PDF", async ({ request }) => {
    const response = await request.get("/api/resume?locale=es");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const body = await response.body();
    expect(body.length).toBeGreaterThan(0);
    expect(body.slice(0, 4).toString()).toBe("%PDF");
  });

  test("GET /api/resume without locale defaults to EN", async ({ request }) => {
    const response = await request.get("/api/resume");
    expect(response.status()).toBe(200);
    const disposition = response.headers()["content-disposition"];
    expect(disposition).toContain("Julian_Soto_CV_EN.pdf");
  });

  test("GET /api/resume?locale=es has correct filename", async ({ request }) => {
    const response = await request.get("/api/resume?locale=es");
    const disposition = response.headers()["content-disposition"];
    expect(disposition).toContain("Julian_Soto_CV_ES.pdf");
  });

  test("POST /api/resume returns 405", async ({ request }) => {
    const response = await request.post("/api/resume");
    expect(response.status()).toBe(405);
  });
});

test.describe("PDF Resume Generator - Download Button", () => {
  test("Download CV button calls /api/resume on EN locale", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#profile");

    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByText("Download CV").click(),
    ]);

    expect(popup.url()).toContain("/api/resume");
    expect(popup.url()).toContain("locale=en");
  });

  test("Download CV button calls /api/resume on ES locale", async ({ page }) => {
    await page.goto("/es");
    await page.waitForSelector("#profile");

    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByText("Descargar CV").click(),
    ]);

    expect(popup.url()).toContain("/api/resume");
    expect(popup.url()).toContain("locale=es");
  });
});
