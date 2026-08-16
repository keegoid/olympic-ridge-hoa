// Wrap a flyer image in a print-safe Letter PDF.
//
//   bun flyer-source/print-safe-image.ts <input-image> <output.pdf>
//
// Most home and office printers cannot print to the edge of the sheet. Laser
// printers reserve a paper-grip margin — the Canon imageCLASS MF750C driver
// reports a 5mm non-printable border on all four sides of Letter. Handing a
// printer a bare image also invites it to scale the artwork by whatever amount
// it likes.
//
// This centers the image on a Letter page at the largest size that fits inside
// the safe margin, so the printed result is predictable: print at 100% /
// "Actual Size" and nothing is clipped or rescaled.
import { $ } from "bun";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MARGIN_MM = 5;

const [input, output] = Bun.argv.slice(2);
if (!input || !output) {
  console.error("usage: bun print-safe-image.ts <input-image> <output.pdf>");
  process.exit(1);
}

const file = Bun.file(input);
if (!(await file.exists())) throw new Error(`no such image: ${input}`);

const mime = input.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
const b64 = Buffer.from(await file.arrayBuffer()).toString("base64");
const safeIn = (2 * MARGIN_MM) / 25.4;

const html = `<meta charset="utf-8">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  html, body { width: 8.5in; height: 11in; margin: 0; background: #fff;
               -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { display: flex; align-items: center; justify-content: center; overflow: hidden; }
  img { max-width: ${(8.5 - safeIn).toFixed(4)}in; max-height: ${(11 - safeIn).toFixed(4)}in;
        width: auto; height: auto; display: block; }
</style>
<img src="data:${mime};base64,${b64}" alt="">`;

const tmp = `${import.meta.dir}/.print-safe.build.html`;
await Bun.write(tmp, html);
await $`${CHROME} --headless --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=4000 --print-to-pdf=${output} ${tmp}`.quiet();

console.log(`wrote ${output} (${MARGIN_MM}mm safe margin)`);
