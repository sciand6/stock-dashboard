const express = require("express");
const cors = require("cors");
const app = express();
const yahooFinance = require("yahoo-finance");

app.use(express.json());
app.use(cors());

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

app.listen(5000, () => console.log("Server started on port 5000"));
