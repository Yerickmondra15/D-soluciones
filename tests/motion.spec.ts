import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("accordion anima alto real al abrir, cerrar y cambiar rapidamente", async ({ page }, info) => {
  await page.goto("/");
  await page.setViewportSize({ width: info.project.name === "mobile" ? 360 : 1440, height: 950 });
  const item = page.locator(".service-details").first();
  await item.scrollIntoViewIfNeeded();
  await expect(item.locator("summary")).toHaveAttribute("aria-expanded", "false");
  await expect(item.locator(".disclosure-panel")).toHaveCSS("height", "0px");
  const sample = () => item.evaluate(async element => {
    const panel = element.querySelector<HTMLElement>(".disclosure-panel")!;
    element.querySelector("summary")!.click();
    const heights: number[] = [];
    const start = performance.now();
    await new Promise<void>(resolve => {
      const tick = () => {
        heights.push(panel.getBoundingClientRect().height);
        if (performance.now() - start < 520) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    return heights;
  });
  const opening = await sample();
  const maximum = Math.max(...opening);
  expect(maximum).toBeGreaterThan(60);
  expect(opening.some(height => height > 3 && height < maximum - 3)).toBe(true);
  await expect(item.locator("summary")).toHaveAttribute("aria-expanded", "true");
  const closing = await sample();
  expect(closing.some(height => height > 3 && height < maximum - 3)).toBe(true);
  await expect(item).not.toHaveAttribute("open");
  const triggers = page.locator(".service-details summary");
  await triggers.nth(0).click();
  await triggers.nth(1).click();
  await triggers.nth(0).click();
  await triggers.nth(0).click();
  await expect(triggers.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect.poll(() => item.locator(".disclosure-panel").evaluate(node => Math.abs(node.getBoundingClientRect().height - node.scrollHeight))).toBeLessThan(2);
  await info.attach("alturas-acordeon", { body: JSON.stringify({ opening, closing }), contentType: "application/json" });
  const faq = page.locator(".faq-items details").first();
  await faq.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(faq.locator("summary")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Space");
  await expect(faq).not.toHaveAttribute("open");
});

test("agua responde al scroll en ambos sentidos sin otro canvas", async ({ page }, info) => {
  await page.goto("/");
  const wave = page.locator(".scroll-water-reveal");
  await expect(page.locator(".scroll-water-transition")).toHaveAttribute("data-motion", "scroll");
  await page.waitForTimeout(250);
  const before = await wave.getAttribute("d");
  await page.evaluate(() => scrollTo(0, 420));
  await expect.poll(() => wave.getAttribute("d")).not.toBe(before);
  await page.waitForTimeout(400);
  const lower = await wave.getAttribute("d");
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => wave.getAttribute("d")).not.toBe(lower);
  await expect(page.locator("canvas")).toHaveCount(1);
  await page.screenshot({ path: `.qa/scroll-water-top-${info.project.name}.png` });
});

test("modo liviano conserva fondo estatico y controles", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "deviceMemory", { value: 2, configurable: true }));
  await page.goto("/");
  await expect(page.locator(".scroll-water-transition")).toHaveAttribute("data-motion", "static");
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(page.locator(".water-ripple")).toHaveAttribute("data-webgl", "fallback");
  await expect(page.locator(".water-ripple canvas")).not.toHaveAttribute("data-frames");
  await expect(page.getByRole("button", { name: "Continuar en WhatsApp" })).toBeVisible();
});

test("fallback sin JavaScript sigue legible y details funciona", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const item = page.locator(".service-details").first();
  await item.locator("summary").click();
  await expect(item.locator("ul")).toBeVisible();
  expect(await item.locator("ul").evaluate(node => getComputedStyle(node).opacity)).toBe("1");
  await expect(page.locator(".hero-buttons a").first()).toHaveAttribute("href", /wa.me\/50687129222/);
  await context.close();
});

test("video se descarga al salir de pantalla", async ({ page }) => {
  await page.goto("/");
  await page.locator(".video-card").first().getByRole("button").click();
  await expect(page.locator("video")).toHaveCount(1);
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator("video")).toHaveCount(0);
});

test("header compacto, rutas SEO y preview no indexable", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => scrollTo(0, 350));
  await expect(page.locator(".site-header")).toHaveAttribute("data-scrolled", "true");
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.locator(".site-header")).toHaveAttribute("data-scrolled", "false");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  const socialImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(new URL(socialImage!).pathname).toBe("/media/proyecto-construccion-despues.webp");
  if (process.env.PLAYWRIGHT_EXPECTED_METADATA_ORIGIN) {
    expect(new URL(socialImage!).origin).toBe(process.env.PLAYWRIGHT_EXPECTED_METADATA_ORIGIN);
    const image = await page.request.get(socialImage!);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toMatch(/^image\//);
  }
  const robots = await page.request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("<loc>");
  expect((await page.request.get("/.env")).status()).toBe(404);
  expect((await page.request.get("/docs/referencias/Informacion_Piscinas_GDS.docx")).status()).toBe(404);
});

test("auditoria automatizada de accesibilidad en ambas rutas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/productos"]) {
    await page.goto(path);
    const report = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(report.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
  }
});

test("movil con 4G y CPU limitada sin bloquear contenido", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Perfil movil Chromium");
  test.setTimeout(90_000);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-buttons a").first()).toBeVisible();
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    const scripts = performance.getEntriesByType("resource").filter(entry => entry.name.includes(".js")) as PerformanceResourceTiming[];
    return { firstContentfulPaintMs: Math.round(performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0), domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd), scriptTransferBytes: scripts.reduce((sum, entry) => sum + entry.transferSize, 0) };
  });
  await info.attach("perfil-4g-cpu4", { body: JSON.stringify(metrics), contentType: "application/json" });
  console.log("PERFIL_4G", JSON.stringify(metrics));
});
