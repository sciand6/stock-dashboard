import React, { useState } from "react";
import {
  processStockData,
  tickersToPages,
} from "./utils/StockDataProcessessing";
import { checkDates, checkTickers } from "./utils/InputValidation";
import { requestError, compare } from "./utils/General";
import "./App.css";
import TickerInput from "./components/TickerInput";
import PageList from "./components/PageList";
import StockList from "./components/StockList";

function App() {
  const [stockdata, setstockdata] = useState([]);
  const [ldate, setldate] = useState("");
  const [hdate, sethdate] = useState("");
  const [pagesarr, setpagesarr] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  function buildInput(params) {
    const { lowdate, highdate, tickersinput } = params;
    var dateValidation = checkDates(lowdate, highdate);
    var tickerValidation = checkTickers(tickersinput);
    if (dateValidation.isError) {
      seterror(dateValidation.error);
      return;
    }
    if (tickerValidation.isError) {
      seterror(tickerValidation.error);
      return;
    }
    setldate(lowdate);
    sethdate(highdate);
    const tickerArr = tickersinput.split(",");
    const result = tickersToPages(tickerArr);
    setpagesarr(result);
    seterror("");
    getStocks(0, result, lowdate, highdate);
  }

  function getStocks(
    index = 0,
    pagearr = pagesarr,
    lowdate = ldate,
    highdate = hdate
  ) {
    setloading(true);
    const tickerArr = pagearr[index];
    var inputString = "";
    for (let i = 0; i < tickerArr.length; i++) {
      inputString += tickerArr[i] + ",";
    }
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tickers: inputString.slice(0, -1),
        lowdate,
        highdate,
      }),
    };
    fetch("http://localhost:5000/", opts)
      .then(requestError)
      .then((res) => {
        const { failed, arr } = processStockData(res);
        setTimeout(() => {
          setstockdata(arr.sort(compare));
          setloading(false);
          if (failed.length !== 0)
            seterror(
              "Couldn't find data for the following stocks: \n" + failed
            );
        }, 3000);
      })
      .catch((error) => {
        seterror(error);
      });
  }

  return (
    <div className="App">
      <h1>Stock Dashboard</h1>
      <TickerInput buildInput={buildInput} />
      <p className="red">{error}</p>
      <br />
      {loading ? (
        "Loading Results..."
      ) : (
        <div>
          <PageList pagearr={pagesarr} getStocks={getStocks} />
          <StockList stockdata={stockdata} />
        </div>
      )}
    </div>
  );
}

export default App;
