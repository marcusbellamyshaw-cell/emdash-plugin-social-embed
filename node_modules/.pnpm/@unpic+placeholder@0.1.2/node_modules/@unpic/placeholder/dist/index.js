"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  blurhashToCssGradientString: () => blurhashToCssGradientString,
  blurhashToCssGradients: () => blurhashToCssGradients,
  blurhashToDataUri: () => blurhashToDataUri,
  blurhashToGradientCssObject: () => blurhashToGradientCssObject,
  blurhashToImageCssObject: () => blurhashToImageCssObject,
  blurhashToImageCssString: () => blurhashToImageCssString,
  getDominantColor: () => getDominantColor,
  getPalette: () => getPalette,
  imageDataToDataURI: () => imageDataToDataURI,
  kMeansClusters: () => kMeansClusters,
  pixelsToCssGradients: () => pixelsToCssGradients,
  rgbColorToCssString: () => rgbColorToCssString,
  rgbaPixelsToBmp: () => rgbaPixelsToBmp
});
module.exports = __toCommonJS(src_exports);

// src/blurhash.ts
var import_blurhash = require("blurhash");

// src/format.ts
function rgbaPixelsToBmp(pixels, width, height) {
  const bytesPerPixel = 3;
  const padding = (4 - width * bytesPerPixel % 4) % 4;
  const bmpPixels = new Uint8Array((width * bytesPerPixel + padding) * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const j = (height - y - 1) * (width * bytesPerPixel + padding) + x * bytesPerPixel;
      bmpPixels[j] = pixels[i + 2];
      bmpPixels[j + 1] = pixels[i + 1];
      bmpPixels[j + 2] = pixels[i];
    }
  }
  const header = new Uint8Array([
    66,
    77,
    // magic
    54 + bmpPixels.length,
    4,
    0,
    0,
    // size in bytes
    0,
    0,
    // app data
    0,
    0,
    // app data
    54,
    0,
    0,
    0,
    // start of data offset
    40,
    0,
    0,
    0,
    // info hdrlen
    width & 255,
    width >> 8 & 255,
    width >> 16 & 255,
    width >> 24 & 255,
    // width
    height & 255,
    height >> 8 & 255,
    height >> 16 & 255,
    height >> 24 & 255,
    // height
    1,
    0,
    // num color planes
    24,
    0,
    // bits per pixel
    0,
    0,
    0,
    0,
    // compression is none
    bmpPixels.length,
    0,
    0,
    0,
    // image bits size
    19,
    11,
    0,
    0,
    // horz resoluition in pixel / m
    19,
    11,
    0,
    0,
    // vert resolutions (0x03C3 = 96 dpi, 0x0B13 = 72 dpi)
    0,
    0,
    0,
    0,
    // #colors in palette
    0,
    0,
    0,
    0
    // #important colors
  ]);
  const fullArr = new Uint8Array(header.length + bmpPixels.length);
  fullArr.set(header);
  fullArr.set(bmpPixels, header.length);
  return fullArr;
}
function imageDataToDataURI(data, mimeType) {
  const base64 = btoa(String.fromCharCode(...data));
  return `data:${mimeType};base64,${base64}`;
}
var toHex = (n) => {
  const hex = n.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};
var rgbToHex = (r, g, b) => {
  return "#" + toHex(r) + toHex(g) + toHex(b);
};
function percentOrZero(num) {
  if (num === 0)
    return 0;
  return `${num}%`;
}
function pixelsToCssGradients(pixels, columns, rows) {
  const stops = [];
  for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
    const col = j % columns;
    const row = Math.floor(j / columns);
    const percentX = Math.round(col / (columns - 1) * 100);
    const percentY = Math.round(row / (rows - 1) * 100);
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const color = `radial-gradient(at ${percentOrZero(
      percentX
      // Hex is smaller than rgba. #00000000 = transparent
    )} ${percentOrZero(percentY)},${rgbToHex(r, g, b)},#00000000 50%)`;
    stops.push(color);
  }
  return stops;
}

// src/blurhash.ts
function blurhashToDataUri(blurhash, width = 8, height = 8) {
  const pixels = (0, import_blurhash.decode)(blurhash, width, height);
  const data = rgbaPixelsToBmp(pixels, width, height);
  return imageDataToDataURI(data, "image/bmp");
}
function blurhashToCssGradients(blurhash, columns = 4, rows = 3) {
  const pixels = (0, import_blurhash.decode)(blurhash, columns, rows);
  return pixelsToCssGradients(pixels, columns, rows);
}
function blurhashToCssGradientString(blurhash, columns = 4, rows = 3) {
  return blurhashToCssGradients(blurhash, columns, rows).join(",");
}
function blurhashToGradientCssObject(blurhash, columns = 4, rows = 3) {
  return {
    backgroundImage: blurhashToCssGradients(blurhash, columns, rows).join(",")
  };
}
function blurhashToImageCssObject(blurhash, width = 8, height = 8) {
  return {
    backgroundImage: `url("${blurhashToDataUri(blurhash, width, height)}")`,
    backgroundSize: "cover"
  };
}
function blurhashToImageCssString(blurhash, width = 8, height = 8) {
  return `background: url("${blurhashToDataUri(
    blurhash,
    width,
    height
  )}") cover`;
}

// src/palette.ts
function getPalette(pixels, clusterCount = 8) {
  const clusters = kMeansClusters(pixels, clusterCount, 1e3, 50);
  return clusters.map((cluster) => cluster.centroid);
}
function getDominantColor(pixels) {
  return getPalette(pixels, 4)[0];
}
function kMeansClusters(pixels, clusterCount, sampleSize, maxIterations) {
  const data = [];
  for (let i = 0; i < sampleSize * 4; i += 4) {
    const index = Math.floor(Math.random() * (pixels.length / 4)) * 4;
    data.push([pixels[index], pixels[index + 1], pixels[index + 2]]);
  }
  let clusters = [];
  for (let i = 0; i < clusterCount; i++) {
    clusters.push({
      centroid: data[Math.floor(Math.random() * data.length)],
      cluster: []
    });
  }
  let changed = true;
  let iterations = 0;
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    clusters.forEach((cluster) => cluster.cluster = []);
    data.forEach((point) => {
      let minDistance = Infinity;
      let closestClusterIndex = 0;
      clusters.forEach((cluster, index) => {
        const distance = euclideanDistance(point, cluster.centroid);
        if (distance < minDistance) {
          minDistance = distance;
          closestClusterIndex = index;
        }
      });
      clusters[closestClusterIndex].cluster.push(point);
    });
    clusters.forEach((cluster) => {
      const newCentroid = mean(cluster.cluster);
      if (newCentroid && !equal(newCentroid, cluster.centroid)) {
        changed = true;
        cluster.centroid = newCentroid;
      }
    });
  }
  return clusters.sort((a, b) => b.cluster.length - a.cluster.length);
}
function euclideanDistance(a, b) {
  return Math.sqrt(
    a.reduce((sum, value, index) => sum + Math.pow(value - b[index], 2), 0)
  );
}
function mean(points) {
  return points?.[0]?.map(
    (_, index) => points.reduce((sum, point) => sum + point[index], 0) / points.length
  );
}
function equal(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
function rgbColorToCssString([red, green, blue]) {
  return `rgb(${red},${green},${blue})`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blurhashToCssGradientString,
  blurhashToCssGradients,
  blurhashToDataUri,
  blurhashToGradientCssObject,
  blurhashToImageCssObject,
  blurhashToImageCssString,
  getDominantColor,
  getPalette,
  imageDataToDataURI,
  kMeansClusters,
  pixelsToCssGradients,
  rgbColorToCssString,
  rgbaPixelsToBmp
});
