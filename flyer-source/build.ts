// Build the Olympic Ridge welcome flyer.
//
//   bun flyer-source/build.ts
//
// Inlines the fonts and QR code into a self-contained HTML file, then renders
// a print-ready Letter PDF and a preview JPG straight into ../static/, where
// Hugo publishes them as /welcome-flyer.pdf and /welcome-flyer.jpg.
import { $ } from "bun";

const DIR = import.meta.dir;
const STATIC = `${DIR}/../static`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const b64 = async (p: string) =>
  Buffer.from(await Bun.file(`${DIR}/${p}`).arrayBuffer()).toString("base64");

let html = await Bun.file(`${DIR}/welcome-flyer.html`).text();

// Inline the fonts so the built HTML renders identically anywhere.
for (const file of ["Baloo2.ttf", "Nunito.ttf"]) {
  const before = html;
  html = html.replace(`url("fonts/${file}")`, `url("data:font/ttf;base64,${await b64(`fonts/${file}`)}")`);
  if (html === before) throw new Error(`font reference not found: fonts/${file}`);
}

// Inline the QR code (encodes https://olympicridgehoa.com/).
const qr = (await Bun.file(`${DIR}/qr-site.svg`).text())
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/width="[^"]*"/, "")
  .replace(/height="[^"]*"/, "");
const withQr = html.replace('<div class="qr" id="qr"></div>', `<div class="qr" id="qr">${qr}</div>`);
if (withQr === html) throw new Error("QR placeholder not found");
html = withQr;

const built = `${DIR}/welcome-flyer.build.html`;
await Bun.write(built, html);

await $`${CHROME} --headless --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=4000 --print-to-pdf=${STATIC}/welcome-flyer.pdf ${built}`.quiet();
await $`${CHROME} --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=816,1056 --virtual-time-budget=4000 --screenshot=${DIR}/preview.png ${built}`.quiet();

console.log(`wrote ${STATIC}/welcome-flyer.pdf`);
console.log(`wrote ${DIR}/preview.png — convert to ${STATIC}/welcome-flyer.jpg for the web preview`);
