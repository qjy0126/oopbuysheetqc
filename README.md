# OopBuySheetQC

Static site for **oopbuysheetqc.com** — OopBuy spreadsheet finds with QC photos.

Built in the same pink brand system as OopBuySpreadsheets, focused on browse → QC → buy.

## Pages

- `index.html` — home, categories, FAQ
- `spreadsheet.html` — category bar, search, product grid, pagination
- `product.html` — product detail + QC tags
- `dead-links.html` — broken link reports

## Local preview

Needs a local static server (ES modules):

```bash
python3 -m http.server 5502
```

Then open `http://127.0.0.1:5502`.

## Product data

Catalog comes from `kakobuysheetlink/` (symlink to the shared dataset):

- `kakobuysheetlink/js/data.js` — categories, invite codes, OopBuy link builder
- `kakobuysheetlink/js/catalog.js` — ~4,800 products
- Images: local first, then jsDelivr CDN
- Buy links open OopBuy with invite code `1W4CISK9G`

## Customize

- Accent color: `--pink` in `styles.css`
- Invite code: `OOPBUY_INVITE` in `products.js`
