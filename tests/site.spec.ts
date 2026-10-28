import { expect, test } from "@playwright/test";
import sharp from "sharp";

test("contenido comercial y enlaces verificados", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Piscinas GDS");
  await expect(page.locator(".service-card")).toHaveCount(6);
  await expect(page.locator("body")).not.toContainText(/Guadalajara|México|98%|24\/7|hola@gds|AquaViva/);
  const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll(nodes => nodes.map(node => (node as HTMLAnchorElement).href));
  expect(links.length).toBeGreaterThan(10);
  expect(links.every(link => new URL(link).pathname === "/50687129222")).toBe(true);
  const service = page.locator(".service-card").first();
  await service.locator("summary").click();
  await expect(service.locator("details")).toHaveAttribute("open", "");
  expect(new URL(await service.locator("a").getAttribute("href") ?? "").searchParams.get("text")).toContain("Mantenimiento de piscinas");
  await page.locator("#preguntas summary").first().click();
  await expect(page.locator("#preguntas details").first()).toHaveAttribute("open", "");
});

test("comparador accesible y galería con foco y teclado", async ({ page }, info) => {
  await page.goto("/");
  const range = page.getByRole("slider");
  await range.focus();
  await range.press("End");
  await expect(range).toHaveValue("100");
  await range.press("Home");
  await expect(range).toHaveValue("0");
  const bounds = (await range.boundingBox())!;
  const point = { position: { x: bounds.width * .7, y: bounds.height / 2 } };
  if (info.project.name === "mobile") await range.tap(point);
  else await range.click(point);
  expect(Number(await range.inputValue())).toBeGreaterThan(60);
  const opener = page.locator(".gallery-item").first();
  await opener.click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await expect(page.getByRole("button", { name: "Cerrar galería" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Fotografía siguiente" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Cerrar galería" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#gallery-caption")).toContainText("2 / 9");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#gallery-caption")).toContainText("1 / 9");
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("catálogo sin inventario ficticio y filtros", async ({ page }) => {
  await page.goto("/productos");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Catálogo de Piscinas GDS");
  await expect(page.locator(".catalog-disclaimer")).toContainText("Inventario por confirmar");
  await expect(page.locator(".catalog-card")).toHaveCount(5);
  await page.getByRole("button", { name: "Filtros", exact: true }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await expect(page.locator(".catalog-card h3")).toHaveText("Filtros");
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByRole("searchbox").fill("iluminacion");
  await expect(page.locator(".catalog-card h3")).toHaveText("Iluminación");
  await page.getByRole("searchbox").fill("no-existe");
  await expect(page.getByText("No encontramos resultados.")).toBeVisible();
  await page.getByRole("button", { name: "Limpiar filtros" }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(5);
});

test("formulario prepara WhatsApp sin enviar ni guardar datos", async ({ page, context }) => {
  await context.route("https://wa.me/**", route => route.fulfill({ contentType: "text/html", body: "Vista de prueba de WhatsApp" }));
  await page.goto("/");
  await page.getByLabel("Tu nombre", { exact: true }).fill("Prueba & GDS");
  await page.getByLabel("Ubicación", { exact: true }).fill("San José");
  await page.getByLabel("Servicio de interés").selectOption("Recuperación de agua");
  await page.getByLabel("Tu consulta", { exact: true }).fill("El agua necesita una revisión técnica.");
  await page.getByRole("checkbox").check();
  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Continuar en WhatsApp" }).click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  const url = new URL(popup.url());
  expect(url.pathname).toBe("/50687129222");
  expect(url.searchParams.get("text")).toContain("Prueba & GDS");
  expect(url.searchParams.get("text")).toContain("Recuperación de agua");
  expect(url.searchParams.get("text")).toContain("San José");
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await popup.close();
});

test("videos bajo demanda y reproducción de los seis clips", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => { if (request.url().includes(".mp4")) requests.push(request.url()); });
  await page.goto("/");
  await page.locator(".video-grid").scrollIntoViewIfNeeded();
  await expect(page.locator("video")).toHaveCount(0);
  expect(requests).toHaveLength(0);
  for (let index = 0; index < 6; index++) {
    await page.locator(".video-card").nth(index).getByRole("button").click();
    const video = page.locator("video");
    await expect(video).toHaveCount(1);
    await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
    expect(await video.evaluate(node => (node as HTMLVideoElement).duration)).toBeGreaterThan(0);
    expect(await video.evaluate(node => (node as HTMLVideoElement).error)).toBeNull();
  }
});

test("menú móvil cierra al navegar y con Escape", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Menú solo en celular");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Navegación móvil" })).toBeVisible();
  await page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Servicios", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("reduced motion desactiva agua y animaciones", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await expect(page.locator(".water-ripple")).toHaveAttribute("data-webgl", "fallback");
  await expect(page.locator(".water-ripple canvas")).not.toHaveAttribute("data-frames");
  expect(await page.locator("#contacto").evaluate(node => getComputedStyle(node, "::after").animationName)).toBe("none");
});

test("agua visible, seguimiento fluido, pausa fuera de pantalla y fallback", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "Interacción con mouse");
  await page.goto("/");
  const section = page.locator("#contacto");
  await section.scrollIntoViewIfNeeded();
  await expect(page.locator(".water-ripple")).toHaveAttribute("data-webgl", "ready");
  const canvas = page.locator(".water-ripple canvas");
  const frame = Number(await canvas.getAttribute("data-frames"));
  await expect.poll(async () => Number(await canvas.getAttribute("data-frames"))).toBeGreaterThan(frame);
  const rect = (await section.boundingBox())!;
  await page.mouse.move(rect.x + rect.width * .8, rect.y + rect.height * .7);
  await expect(section).toHaveAttribute("data-hover", "true");
  await expect.poll(() => section.evaluate(node => parseFloat((node as HTMLElement).style.getPropertyValue("--x")))) .toBeGreaterThan(78);
  const firstFrame = await canvas.screenshot();
  const pixels = await sharp(firstFrame).stats();
  expect(pixels.channels.some(channel => channel.max - channel.min > 30)).toBe(true);
  await expect.poll(async () => !(await canvas.screenshot()).equals(firstFrame)).toBe(true);
  await page.screenshot({ path: `.qa/water-${info.project.name}.png` });
  await page.mouse.move(0, 0);
  await expect(section).toHaveAttribute("data-hover", "false");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(async () => canvas.evaluate(node => node.getBoundingClientRect().top > innerHeight)).toBe(true);
  const paused = await canvas.getAttribute("data-frames");
  await page.waitForTimeout(200);
  expect(await canvas.getAttribute("data-frames")).toBe(paused);
  await section.scrollIntoViewIfNeeded();
  await canvas.evaluate(node => (node as HTMLCanvasElement).getContext("webgl")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(page.locator(".water-ripple")).toHaveAttribute("data-webgl", "fallback");
});

test("sin desbordamientos, medios visibles y cabeceras de seguridad", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["content-security-policy"]).toContain("object-src 'none'");
  expect(await page.locator("html").getAttribute("lang")).toBe("es-CR");
  expect(await page.locator("meta[property='og:image']").getAttribute("content")).toContain("norberto-despues.webp");
  await page.locator(".hero-photo img").evaluate(image => (image as HTMLImageElement).decode());
  expect(await page.locator(".hero-photo img").evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(100);
  for (const width of info.project.name === "mobile" ? [320, 390, 680] : [768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize(info.project.name === "mobile" ? { width: 390, height: 844 } : { width: 1440, height: 1000 });
  await page.screenshot({ path: `.qa/home-${info.project.name}.png` });
  await page.locator("#contacto").scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/contact-${info.project.name}.png` });
  expect(errors).toEqual([]);
});
