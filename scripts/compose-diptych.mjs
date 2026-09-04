#!/usr/bin/env node

import process from "node:process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("Missing dependency: sharp. Run this script in a Codex workspace with bundled dependencies or install sharp locally.");
  process.exit(2);
}

function usage() {
  console.error("Usage: node scripts/compose-diptych.mjs SOURCE LOWER OUTPUT [--photo-fit cover|contain] [--focus-x 0.5] [--focus-y 0.5] [--width 1200] [--height 1800] [--top-height 840] [--matte '#F2EEE5']");
}

const positional = [];
const options = { photoFit: "cover", focusX: 0.5, focusY: 0.5, width: 1200, height: 1800, topHeight: 840, matte: "#F2EEE5" };

for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) {
    positional.push(arg);
    continue;
  }
  const value = process.argv[++i];
  if (value === undefined) {
    usage();
    process.exit(2);
  }
  if (arg === "--photo-fit") options.photoFit = value;
  else if (arg === "--focus-x") options.focusX = Number(value);
  else if (arg === "--focus-y") options.focusY = Number(value);
  else if (arg === "--width") options.width = Number(value);
  else if (arg === "--height") options.height = Number(value);
  else if (arg === "--top-height") options.topHeight = Number(value);
  else if (arg === "--matte") options.matte = value;
  else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(2);
  }
}

if (positional.length !== 3 || !["contain", "cover"].includes(options.photoFit)) {
  usage();
  process.exit(2);
}
for (const key of ["width", "height", "topHeight"]) {
  if (!Number.isInteger(options[key]) || options[key] <= 0) {
    console.error(`${key} must be a positive integer.`);
    process.exit(2);
  }
}
if (options.topHeight >= options.height) {
  console.error("topHeight must be smaller than height.");
  process.exit(2);
}
if (![options.focusX, options.focusY].every((value) => Number.isFinite(value) && value >= 0 && value <= 1)) {
  console.error("focusX and focusY must be numbers from 0 to 1.");
  process.exit(2);
}

const [sourcePath, lowerPath, outputPath] = positional;
const lowerHeight = options.height - options.topHeight;
const sourceMeta = await sharp(sourcePath).metadata();
if (!sourceMeta.width || !sourceMeta.height) throw new Error("Could not read source image dimensions.");

let upper;
let crop = null;
if (options.photoFit === "contain") {
  upper = await sharp(sourcePath)
    .rotate()
    .resize(options.width, options.topHeight, {
      fit: "contain",
      position: "centre",
      background: options.matte,
      withoutEnlargement: false,
    })
    .removeAlpha()
    .png()
    .toBuffer();
} else {
  const widthScale = options.width / (sourceMeta.autoOrient?.width ?? sourceMeta.width);
  const heightScale = options.topHeight / (sourceMeta.autoOrient?.height ?? sourceMeta.height);
  const resized = widthScale >= heightScale
    ? await sharp(sourcePath).rotate().resize({ width: options.width }).removeAlpha().png().toBuffer()
    : await sharp(sourcePath).rotate().resize({ height: options.topHeight }).removeAlpha().png().toBuffer();
  const resizedMeta = await sharp(resized).metadata();
  const maxLeft = Math.max(0, resizedMeta.width - options.width);
  const maxTop = Math.max(0, resizedMeta.height - options.topHeight);
  const left = Math.max(0, Math.min(maxLeft, Math.round(options.focusX * resizedMeta.width - options.width / 2)));
  const top = Math.max(0, Math.min(maxTop, Math.round(options.focusY * resizedMeta.height - options.topHeight / 2)));
  crop = { left, top, resizedWidth: resizedMeta.width, resizedHeight: resizedMeta.height };
  upper = await sharp(resized)
    .extract({ left, top, width: options.width, height: options.topHeight })
    .png()
    .toBuffer();
}

const lower = await sharp(lowerPath)
  .rotate()
  .resize(options.width, lowerHeight, { fit: "cover", position: "centre" })
  .removeAlpha()
  .png()
  .toBuffer();

await sharp({ create: { width: options.width, height: options.height, channels: 3, background: options.matte } })
  .composite([
    { input: upper, left: 0, top: 0 },
    { input: lower, left: 0, top: options.topHeight },
  ])
  .png()
  .toFile(outputPath);

const orientedWidth = sourceMeta.autoOrient?.width ?? sourceMeta.width;
const orientedHeight = sourceMeta.autoOrient?.height ?? sourceMeta.height;
const scale = options.photoFit === "contain"
  ? Math.min(options.width / orientedWidth, options.topHeight / orientedHeight)
  : Math.max(options.width / orientedWidth, options.topHeight / orientedHeight);

console.log(JSON.stringify({
  output: outputPath,
  canvas: { width: options.width, height: options.height },
  upperPanel: {
    height: options.topHeight,
    fit: options.photoFit,
    sourceWidth: orientedWidth,
    sourceHeight: orientedHeight,
    scaleX: scale,
    scaleY: scale,
    aspectRatioPreserved: true,
    focusX: options.focusX,
    focusY: options.focusY,
    crop,
  },
  lowerPanel: { height: lowerHeight },
}, null, 2));
