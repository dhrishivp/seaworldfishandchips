# Sea World Fish 'N' Chips

Website for **Sea World Fish 'N' Chips**, the fish and chip shop at 2 Nightingales Corner, Little Chalfont, Amersham HP7 9PY (01494 766631).

It's a plain static site (HTML, CSS and JS) with no build step.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing

- **Menu**: edit `js/menu-data.js`. Each category has a title, an optional note, and a list of items (`name`, `desc`, `price`, and `from: true` for "from £…" prices). The page builds the tabs and lists from this file.
- **Hours**: the hours table is in `index.html` (`#hours`). The live "Open now" badge reads `OPEN_MIN`, `CLOSE_MIN` and `CLOSED_DAYS` in `js/main.js`. The footer, the info strip and the schema markup also show the hours.
- **Photos**: these go in `images/`. The hero uses `shop-front.webp`, and `og-image.jpg` is the preview image shown when the link is shared.

## Deploy

Drag the folder into Netlify, or connect the repo. `netlify.toml` publishes the root with no build command.

## Still to confirm

- Fish and chip prices come from the shop's Just Eat listing. All other menu items and prices are placeholders. Once the menu is confirmed, remove the "Menu & prices to be confirmed" note.
- Hours are Mon–Sat 11:00am – 9:00pm, Sunday closed. Just Eat lists an 11:30am opening.
- "Cash only" is based on the sign by the counter.
