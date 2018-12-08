const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 9001;
const buildPath = path.join(__dirname, "../../build");
const mentorsFilePath = path.join(__dirname, "./api/Mentors.json");
app.use(bodyParser.json());
app.use(express.static(buildPath));

app.get("/api/mentors", (req, res) => {
  fs.readFile(mentorsFilePath, "utf8", (err, data) => {
    try {
      res.send(data);
    } catch (error) {
      throw new Error(err);
    }
  });
});

app.get("/*", function(req, res) {
  const indexPath = path.join(buildPath, "index.html");
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Express app is talking from port ${port}`);
});
