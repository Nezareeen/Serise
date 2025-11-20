Place the Fleur de Leah font files in this directory so the app can load them.

Required filenames (used by the app):
- FleurDeLeah-Regular.woff2
- FleurDeLeah-Regular.woff

If you have the font in another format, you can rename or add additional @font-face rules in
`frontend/src/components/Layout/navBar.module.css`.

After placing the files, reload the dev server page. The script in `navBar.jsx` will attempt to load
`/fonts/FleurDeLeah-Regular.woff2` automatically and apply the font when available.
