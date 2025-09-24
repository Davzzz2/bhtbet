import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const WIDGET_URL = "https://bht.bet/widgets/panel_bonus_opening_list_slim/hrupSoTwLRAfHcrA6Z63MDu7Vp4F9gZu";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(WIDGET_URL);
    let html = await response.text();

    // Inject CSS to force transparent bg
    html = html.replace(
  "</head>",
  `<style>
     html, body {
       background: transparent !important;
       margin: 0 !important;
       padding: 0 !important;
       overflow: hidden !important;
       height: auto !important;
     }
     body > div {
       background: transparent !important;
     }
     /* shrink any full-page wrapper that creates whitespace */
     body > *:not(:first-child) {
       display: none !important;
     }
   </style></head>`
);

    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("X-Frame-Options", "");   // strip
    res.set("Content-Security-Policy", ""); // strip CSP if present
    res.send(html);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error fetching widget");
  }
});

app.listen(PORT, () => {
  console.log(`BHT proxy running on port ${PORT}`);
});
