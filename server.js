import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const WIDGET_URL = "https://bht.bet/widgets/panel_bonus_opening_list_slim/hrupSoTwLRAfHcrA6Z63MDu7Vp4F9gZu";

app.get("/", async (req, res) => {
  try {
    const response = await fetch(WIDGET_URL);
    let html = await response.text();

    // Clean headers
    res.set("Content-Type", "text/html; charset=utf-8");
    res.removeHeader("X-Frame-Options");
    res.set("X-Frame-Options", ""); // explicitly unset
    res.set("Content-Security-Policy", ""); // unset CSP if needed

    res.send(html);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error fetching widget");
  }
});

app.listen(PORT, () => {
  console.log(`BHT proxy running on port ${PORT}`);
});
