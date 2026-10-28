import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(await readFile(resolve(root, "data/media-manifest.json"), "utf8"));

test("el manifiesto conserva 57 originales y separa las fotos pendientes", async () => {
  assert.equal(manifest.length, 57);
  for (const item of manifest) {
    const location = item.web_path ? "public" + item.web_path : item.review_path;
    assert.ok(location);
    const path = resolve(root, location);
    assert.ok(path.startsWith(root));
    assert.ok((await stat(path)).size > 0);
    if (item.poster_path) assert.ok((await stat(resolve(root, "public" + item.poster_path))).size > 0);
  }
  const pending = manifest.filter(item => item.publication_status === "permission_required");
  assert.equal(pending.length, 2);
  assert.ok(pending.every(item => !item.web_path));
});

test("las imágenes web no contienen EXIF", async () => {
  for (const item of manifest.filter(item => item.kind === "image" && item.web_path)) {
    const metadata = await sharp(resolve(root, "public" + item.web_path)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.exif, undefined, item.web_path);
    assert.ok(metadata.width > 0 && metadata.height > 0);
  }
});

function handlers(buffer, start = 0, end = buffer.length) {
  const found = [];
  for (let offset = start; offset + 8 <= end;) {
    let size = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const header = size === 1 ? 16 : 8;
    if (size === 1) size = Number(buffer.readBigUInt64BE(offset + 8));
    if (size === 0) size = end - offset;
    assert.ok(size >= header && offset + size <= end, "Contenedor MP4 válido");
    if (["moov", "trak", "mdia"].includes(type)) found.push(...handlers(buffer, offset + header, offset + size));
    if (type === "hdlr") found.push(buffer.toString("ascii", offset + header + 8, offset + header + 12));
    offset += size;
  }
  return found;
}

test("los seis MP4 tienen video y no contienen pistas de audio", async () => {
  const videos = manifest.filter(item => item.kind === "video");
  assert.equal(videos.length, 6);
  for (const video of videos) {
    const tracks = handlers(await readFile(resolve(root, "public" + video.web_path)));
    assert.ok(tracks.includes("vide"), video.web_path);
    assert.ok(!tracks.includes("soun"), video.web_path);
  }
});
