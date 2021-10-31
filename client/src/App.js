import React, { useState } from "react";
import { compare } from "./utils/StockDataProcessessing";
import "./App.css";
import Stock from "./components/Stock";

function App() {
  const [stockdata, setstockdata] = useState([]);
  const [lowdate, setlowdate] = useState("");
  const [highdate, sethighdate] = useState("");
  const [tickersinput, settickersinput] = useState("");

  function getStocks() {
    settickersinput(tickersinput.replaceAll(" ", ""));
    if (!lowdate || !highdate || !tickersinput) return;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tickers: tickersinput,
        lowdate,
        highdate,
      }),
    };
    fetch("http://localhost:5000/", opts)
      .then((data) => data.json())
      .then((res) => {
        let arr = [];
        try {
          for (const property in res) {
            let obj = {
              ticker: property,
              close: res[property][0].adjClose,
              high: Math.max.apply(
                Math,
                res[property].map(function (o) {
                  return o.high;
                })
              ),
              low: Math.min.apply(
                Math,
                res[property].map(function (o) {
                  return o.low;
                })
              ),
              roi:
                (res[property][0].adjClose -
                  res[property][res[property].length - 1].adjClose) /
                res[property][res[property].length - 1].adjClose,
            };
            arr.push(obj);
          }
        } catch (error) {
          // swallow error
          console.log(error);
        }
        setstockdata(arr.sort(compare));
      });
  }

  return (
    <div className="App">
      <h1>Stock Dashboard</h1>
      <input type="text" onChange={(e) => setlowdate(e.target.value)} />
      &nbsp;To&nbsp;
      <input type="text" onChange={(e) => sethighdate(e.target.value)} />
      <br />
      <br />
      <input type="text" onChange={(e) => settickersinput(e.target.value)} />
      <button onClick={() => getStocks()}>SUBMIT</button>
      <div className="headers">
        <div>Ticker</div>
        <div>ROI</div>
        <div>Close</div>
        <div>High</div>
        <div>Low</div>
      </div>
      {stockdata.map((stock) => {
        return <Stock stock={stock} />;
      })}
    </div>
  );
}

export default App;
