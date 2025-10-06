const express = require("express");
const path = require("path");
const app = express();

// serve static files if you have them
const staticDir = path.join(__dirname, "src", "static");
app.use(express.static(staticDir));

app.get("/", (_, res) => {
  try {
    res.sendFile(path.join(staticDir, "index.html"));
  } catch {
    res.send("Hello from Cloud Run!");
  }
});

const PORT = process.env.PORT || 8080;
// IMPORTANT: bind to 0.0.0.0 (not localhost)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on http://0.0.0.0:${PORT}`);
});
