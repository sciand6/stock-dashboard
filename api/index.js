const express = require("express");
const cors = require("cors");
const app = express();
const yahooFinance = require("yahoo-finance");
const path = require("path");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "/build")));

app.post("/apiv1/getStockData", (req, res) => {
  var { tickers, lowdate, highdate } = req.body;
  tickers = tickers.split(",");
  yahooFinance
    .historical({
      symbols: tickers,
      from: lowdate,
      to: highdate,
      period: "d",
    })
    .then((data) => {
      return res.json(data);
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(process.env.PORT || 5000);
