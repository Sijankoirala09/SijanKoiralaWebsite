import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("production HTML works before JavaScript loads", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A little craft.",
  );
  await expect(page.locator("#about img")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "sijankoirala.official@gmail.com" }),
  ).toHaveAttribute("href", "mailto:sijankoirala.official@gmail.com");
  await context.close();
});

test("page loads without runtime errors, failed assets, or horizontal overflow", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  await expect(page.locator(".clock")).toHaveText(/\d{2}:\d{2} NPT/);
  await expect
    .poll(() =>
      page
        .locator("#about img")
        .evaluate((img) => img.complete && img.naturalWidth > 0),
    )
    .toBe(true);
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `No overflow at ${width}px`,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("project views support focus, Escape, backdrop dismissal, and every project", async ({
  page,
}) => {
  await page.goto("/");
  for (const title of ["Apex UI", "Chronos Audio", "Verve Storefront"]) {
    const trigger = page.getByRole("button", {
      name: `Explore ${title}`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(dialog.getByText(/not a live client product/)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
  await page
    .getByRole("button", { name: "Explore Apex UI", exact: true })
    .click();
  await page.mouse.click(2, 2);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("services can expand and collapse with keyboard input", async ({
  page,
}) => {
  await page.goto("/");
  const service = page.locator(".service").nth(1);
  const summary = service.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  await expect(
    service.getByText("React interfaces & components"),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(service).not.toHaveAttribute("open");
});

test("email copy provides success feedback and a useful failure fallback", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== "chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Email copied ✓" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "sijankoirala.official@gmail.com",
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = () => Promise.reject(new Error("Denied"));
  });
  await page.getByRole("button", { name: "Email copied ✓" }).click();
  await expect(
    page.getByRole("button", { name: "Use the email link ↗" }),
  ).toBeVisible();
});

test("sculpture changes on request and reduced motion is respected", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const paths = page.locator(".sculpture-svg g");
  const before = await paths.innerHTML();
  await page.getByRole("button", { name: "Change sculpture shape" }).click();
  await expect(page.locator(".sculpture-caption")).toContainText("FIG. 02");
  expect(await paths.innerHTML()).not.toBe(before);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("mobile navigation opens, follows links, and closes with Escape", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile);
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#about$/);
  await page.locator(".site-header").scrollIntoViewIfNeeded();
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("page and project dialog pass automated accessibility checks", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const scan = () =>
    new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
  expect((await scan()).violations).toEqual([]);
  await page
    .getByRole("button", { name: "Explore Apex UI", exact: true })
    .click();
  expect((await scan()).violations).toEqual([]);
});
