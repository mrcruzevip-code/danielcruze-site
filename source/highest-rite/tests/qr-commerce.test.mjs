import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "data/qr-commerce.json"), "utf8"));

test("QR catalogue is public, controlled and not payment enabled", () => {
  assert.equal(manifest.origin, "https://danielcruze.com");
  assert.equal(manifest.status, "review-only");
  assert.deepEqual(manifest.codes.map((code) => code.id).sort(), ["gold", "temple"]);
  for (const code of manifest.codes) {
    assert.equal(code.audience, "public");
    assert.equal(code.paymentEnabled, false);
    assert.equal(code.productionReady, false);
    assert.equal(code.path, "/qr/" + code.id + "/");
    assert.ok(fs.existsSync(path.join(root, "app/qr", code.id + ".tsx")));
    const url = new URL(code.path, manifest.origin);
    assert.equal(url.origin, manifest.origin);
    assert.ok(!("checkoutUrl" in code));
  }
});

test("Both target URLs are QR-encodable with high error correction", async () => {
  for (const code of manifest.codes) {
    const destination = new URL(code.path, manifest.origin).toString();
    const svg = await QRCode.toString(destination, {
      type: "svg",
      errorCorrectionLevel: "H",
      margin: 4,
      color: { dark: "#222017", light: "#FFFFFF" },
    });
    assert.match(svg, /<svg[\s>]/);
    assert.match(svg, /<path\b/);
  }
});


test("new image-sourced QR candidates cannot silently become public products", () => {
  const candidates = JSON.parse(fs.readFileSync(path.join(root, "data/qr-source-candidates.json"), "utf8"));
  assert.equal(candidates.reviewOnly, true);
  assert.equal(candidates.autoPublish, false);
  assert.equal(candidates.sources.length, 10);
  const ids = new Set();
  for (const candidate of candidates.sources) {
    assert.equal(candidate.publishApproved, false);
    assert.ok(!ids.has(candidate.id), "duplicate candidate ID");
    ids.add(candidate.id);
    if (["restricted-invite", "expired-signed-download", "development-app"].includes(candidate.category)) {
      assert.equal(candidate.targetUrl, null, "restricted link must not be committed");
    }
    if (candidate.targetUrl) {
      assert.equal(new URL(candidate.targetUrl).protocol, "https:");
      assert.ok(!JSON.stringify(manifest).includes(candidate.targetUrl), "unapproved destination must not be used by public QR routes");
    }
  }
});
