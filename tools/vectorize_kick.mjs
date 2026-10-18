import fs from 'node:fs';
import zlib from 'node:zlib';

const buf = fs.readFileSync('site/images/kick-wordmark.png');
let pos = 8;
const idats = [];
let width = 0;
let height = 0;

while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idats.push(buf.slice(pos + 8, pos + 8 + len));
  }
  pos += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idats));
const stride = width * 4;
const pixels = Buffer.alloc(width * height * 4);
let rawPos = 0;

for (let y = 0; y < height; y++) {
  const filter = raw[rawPos++];
  for (let x = 0; x < width * 4; x++) {
    const val = raw[rawPos++];
    let up = y > 0 ? pixels[(y - 1) * stride + x] : 0;
    let upPrev = (y > 0 && x >= 4) ? pixels[(y - 1) * stride + x - 4] : 0;
    let left = x >= 4 ? pixels[y * stride + x - 4] : 0;
    let res = 0;
    if (filter === 0) res = val;
    else if (filter === 1) res = (val + left) & 0xff;
    else if (filter === 2) res = (val + up) & 0xff;
    else if (filter === 3) res = (val + Math.floor((left + up) / 2)) & 0xff;
    else if (filter === 4) {
      const p = left + up - upPrev;
      const pa = Math.abs(p - left);
      const pb = Math.abs(p - up);
      const pc = Math.abs(p - upPrev);
      let pr = (pa <= pb && pa <= pc) ? left : (pb <= pc ? up : upPrev);
      res = (val + pr) & 0xff;
    }
    pixels[y * stride + x] = res;
  }
}

// Convert alpha mask to horizontal spans
const rects = [];
for (let y = 0; y < height; y++) {
  let inSpan = false;
  let startX = 0;
  for (let x = 0; x < width; x++) {
    const a = pixels[(y * width + x) * 4 + 3];
    if (a > 90 && !inSpan) {
      inSpan = true;
      startX = x;
    } else if (a <= 90 && inSpan) {
      inSpan = false;
      rects.push({ x: startX, y, w: x - startX, h: 1 });
    }
  }
  if (inSpan) {
    rects.push({ x: startX, y, w: width - startX, h: 1 });
  }
}

// Merge adjacent vertical spans with same x and w
const merged = [];
for (let i = 0; i < rects.length; i++) {
  const r = rects[i];
  let found = false;
  for (let j = merged.length - 1; j >= 0; j--) {
    const m = merged[j];
    if (m.x === r.x && m.w === r.w && m.y + m.h === r.y) {
      m.h += 1;
      found = true;
      break;
    }
  }
  if (!found) merged.push({ ...r });
}

console.log('Original rects:', rects.length, 'Merged rects:', merged.length);

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="#53FC18">\n`;
for (const r of merged) {
  svg += `  <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/>\n`;
}
svg += '</svg>\n';

fs.writeFileSync('site/images/kick-wordmark.svg', svg);
console.log('Successfully created site/images/kick-wordmark.svg');
