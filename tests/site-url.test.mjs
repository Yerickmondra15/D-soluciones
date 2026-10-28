import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { approvedSiteUrl, metadataBaseUrl } from "../lib/site-url.ts";

const keys = ["SITE_URL", "NETLIFY", "CONTEXT", "DEPLOY_PRIME_URL", "URL", "DEPLOY_URL"];
let saved;

beforeEach(() => {
  saved = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  for (const key of keys) delete process.env[key];
});

afterEach(() => {
  for (const key of keys) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

test("sin dominio aprobado conserva el fallback local de Next", () => {
  assert.equal(approvedSiteUrl(), undefined);
  assert.equal(metadataBaseUrl(), undefined);
});

test("el dominio aprobado se normaliza a su origen HTTPS", () => {
  process.env.SITE_URL = "https://gds.example/proyecto?ref=demo";
  assert.equal(approvedSiteUrl()?.href, "https://gds.example/");
  assert.equal(metadataBaseUrl()?.href, "https://gds.example/");
});

test("rechaza dominios SEO invalidos, HTTP y localhost", () => {
  for (const value of ["invalid", "http://gds.example", "https://localhost:3000", "https://127.0.0.1", "https://[::1]"]) {
    process.env.SITE_URL = value;
    assert.equal(approvedSiteUrl(), undefined);
  }
});

test("Netlify resuelve OpenGraph sin aprobar el dominio para SEO", () => {
  process.env.NETLIFY = "true";
  process.env.URL = "https://gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://gds-demo.netlify.app/");
  assert.equal(approvedSiteUrl(), undefined);
});

test("prioriza la URL de la rama o deploy preview de Netlify", () => {
  process.env.NETLIFY = "true";
  process.env.URL = "https://gds-demo.netlify.app";
  process.env.DEPLOY_PRIME_URL = "https://preview--gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://preview--gds-demo.netlify.app/");
  assert.equal(approvedSiteUrl(), undefined);
});

test("produccion usa la URL publica aunque la rama conserve previews privados", () => {
  process.env.NETLIFY = "true";
  process.env.CONTEXT = "production";
  process.env.URL = "https://gds-demo.netlify.app";
  process.env.DEPLOY_PRIME_URL = "https://codex-rama--gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://gds-demo.netlify.app/");
  assert.equal(approvedSiteUrl(), undefined);
});

test("acepta la URL unica del despliegue como ultimo fallback", () => {
  process.env.NETLIFY = "true";
  process.env.DEPLOY_URL = "https://deploy-id--gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://deploy-id--gds-demo.netlify.app/");
});

test("ignora URLs de despliegue invalidas", () => {
  process.env.NETLIFY = "true";
  process.env.DEPLOY_PRIME_URL = "http://localhost:3000";
  process.env.URL = "https://gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://gds-demo.netlify.app/");
  delete process.env.URL;
  assert.equal(metadataBaseUrl(), undefined);
});

test("ignora variables de Netlify cuando no se ejecuta en Netlify", () => {
  process.env.URL = "https://gds-demo.netlify.app";
  process.env.DEPLOY_PRIME_URL = "https://preview--gds-demo.netlify.app";
  assert.equal(metadataBaseUrl(), undefined);
});

test("el dominio aprobado prevalece sobre las URLs de Netlify", () => {
  process.env.SITE_URL = "https://gds.example";
  process.env.NETLIFY = "true";
  process.env.DEPLOY_PRIME_URL = "https://preview--gds-demo.netlify.app";
  assert.equal(metadataBaseUrl()?.href, "https://gds.example/");
});
