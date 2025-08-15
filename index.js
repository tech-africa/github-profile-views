const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const viewsFile = path.join(__dirname, "views.json");

// Initialize file if not exists
if (!fs.existsSync(viewsFile)) {
  fs.writeFileSync(viewsFile, JSON.stringify({ views: 0 }));
}

// Function to get and update view count
function incrementViews() {
  let data = JSON.parse(fs.readFileSync(viewsFile));
  data.views += 1;
  fs.writeFileSync(viewsFile, JSON.stringify(data));
  return data.views;
}

app.get("/", (req, res) => {
  const count = incrementViews();
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="30">
      <rect width="160" height="30" fill="#0e75b6"/>
      <text x="10" y="20" font-size="16" fill="#fff">Views: ${count}</text>
    </svg>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
