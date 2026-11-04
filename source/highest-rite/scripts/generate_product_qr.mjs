#!/usr/bin/env node
// Generates conventional, high-contrast QR codes; no unverified emblem overlays.
// Usage: node scripts/generate_product_qr.mjs [--out /path/to/output]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "data/qr-commerce.json"), "utf8"));
const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
if (outFlag !== -1 && !args[outFlag + 1]) {
  throw new Error("--out needs a directory");
}
const outputDir = outFlag === -1
  ? path.join(root, "public/qr")
  : path.resolve(args[outFlag + 1]);

const origin = new URL(config.origin);
if (origin.protocol !== "https:" || origin.hostname !== "danielcruze.com" || origin.pathname !== "/") {
  throw new Error("QR origin must be the approved HTTPS root domain");
}
fs.mkdirSync(outputDir, { recursive: true });

for (const code of config.codes) {
  if (!["gold", "temple"].includes(code.id) || code.audience !== "public") {
    throw new Error("Unexpected QR identifier or audience");
  }
  if (!/^\/qr\/[a-z]+\/$/.test(code.path)) throw new Error("Invalid QR path");
  const destination = new URL(code.path, origin).toString();
  const options = {
    errorCorrectionLevel: "H",
    margin: 4,
    width: 960,
    color: { dark: "#222017", light: "#FFFFFF" },
  };
  const svg = await QRCode.toString(destination, { ...options, type: "svg" });
  fs.writeFileSync(path.join(outputDir, code.id + ".svg"), svg, "utf8");
  await QRCode.toFile(path.join(outputDir, code.id + ".png"), destination, options);
  console.log(code.id + " -> " + destination);
}
console.log("QR files created in " + outputDir + "; manual device scans required before distribution.");
