//const https = require("https");
//require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
//const TOKEN = process.env.LINE_ACCESS_TOKEN;
//const dateFNS = require("date-fns");
const { handleWebHook } = require("./webhook");
const { readLineEvents, checkLineId } = require("./preprocess");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/webhook", readLineEvents, checkLineId, handleWebHook);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});
