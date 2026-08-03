# Welcome Flyer Source

Source for the Olympic Ridge welcome flyer posted on the community bulletin board
and published at [/welcome/](../content/welcome.md).

This directory is not part of the Hugo site. Hugo only publishes `content/` and
`static/`, so nothing here is served — the build writes its output into `static/`.

## Rebuilding

```bash
bun flyer-source/build.ts
```

That writes `static/welcome-flyer.pdf` (the print file) and
`flyer-source/preview.png`. To refresh the web preview image:

```bash
sips -Z 1103 -s format jpeg -s formatOptions 88 \
  flyer-source/preview.png --out static/welcome-flyer.jpg
```

Requires Google Chrome at the standard macOS path — the build shells out to
headless Chrome for PDF rendering. No network access needed; the fonts and QR
code are committed here.

## Files

| File | What it is |
|---|---|
| `welcome-flyer.html` | The flyer. Edit this. Self-contained HTML/CSS with inline SVG art and a small script that draws the bunting and the house skyline. |
| `build.ts` | Inlines fonts and the QR code, renders the PDF and preview. |
| `qr-site.svg` | QR code encoding `https://olympicridgehoa.com/`. |
| `fonts/` | Baloo 2 (display) and Nunito (body), both SIL Open Font License — see the `OFL-*.txt` files. |
| `welcome-flyer.build.html` | Generated. Self-contained single file, handy for emailing or printing from any machine. |
| `preview.png` | Generated. 2x render used to make the web preview JPG. |

## Design notes

- The page is a fixed 8.5in × 11in box with `@page { size: 8.5in 11in; margin: 0 }`.
  Everything is positioned in inches so the print output is predictable.
- Colors are sampled from the 2026 block party flyer so the two read as a set:
  sky `#81CDDA`, hill and footer `#245E29`, houses `#1B4A20`, yellow `#FDD95A`,
  text `#4F3437`.
- The layout is tight. Adding copy pushes the content down over the house
  skyline at the bottom — if the houses disappear behind the yellow action
  pills, cut copy rather than shrinking the type.
- Body copy is already near the legibility floor for a bulletin board. Don't go
  below about 8.5pt.
- Keep the flyer evergreen: no meeting dates, no block party date, no "next
  meeting" — it stays posted all year. Dated details belong on the website.
- The Google Meet link is deliberately **not** on the flyer or anywhere on the
  public site. Meetings are for owners; the link is mailed and posted in the
  private Facebook group.

## Regenerating the QR code

Only needed if the site URL changes.

```bash
bunx --bun qrcode -t svg -o flyer-source/qr-site.svg -e M -w 3 https://olympicridgehoa.com/
```

Verify it decodes before printing — a QR that renders but doesn't scan is worse
than none.
