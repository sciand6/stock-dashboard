import React, { useState } from "react";
import {
  processStockData,
  tickersToPages,
} from "./utils/StockDataProcessessing";
import { validateInput } from "./utils/InputValidation";
import { requestError, compare, buildInput } from "./utils/General";
import "./App.css";
import TickerInput from "./components/TickerInput";
import PageList from "./components/PageList";
import StockList from "./components/StockList";
import PageAmount from "./components/PageAmount";

function App() {
  const [stockdata, setstockdata] = useState([]);
  const [ldate, setldate] = useState("");
  const [hdate, sethdate] = useState("");
  const [currenttickers, setcurrenttickers] = useState([]);
  const [pagesarr, setpagesarr] = useState([]);
  const [activeindex, setactiveindex] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [pageamount, setpageamount] = useState(10);

  function updatePageAmount(amount) {
    if (!currenttickers || currenttickers.length === 0) return;
    setpageamount(amount);
    const result = tickersToPages(currenttickers, amount);
    setpagesarr(result);
    setactiveindex(0);
    getStocks(0, result, ldate, hdate);
  }

  function submitTickers(tickerParams) {
    if (validateInput(tickerParams).isError) {
      seterror(validateInput(tickerParams).error);
      return;
    }
    const { lowdate, highdate, tickersinput } = tickerParams;
    setldate(lowdate);
    sethdate(highdate);
    const tickerArr = tickersinput.split(",");
    setcurrenttickers(tickerArr);
    const result = buildInput(tickersinput, pageamount);
    setpagesarr(result);
    seterror("");
    setactiveindex(0);
    getStocks(0, result, lowdate, highdate);
  }

  function getStocks(
    index = 0,
    pagearr = pagesarr,
    lowdate = ldate,
    highdate = hdate
  ) {
    setactiveindex(index);
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
      <TickerInput buildInput={submitTickers} />
      <p className="red">{error}</p>
      <br />
      <PageAmount updatePageAmount={updatePageAmount} />
      {loading ? (
        "Loading Results..."
      ) : (
        <div>
          <PageList
            pagearr={pagesarr}
            getStocks={getStocks}
            activeIndex={activeindex}
          />
          <StockList stockdata={stockdata} />
        </div>
      )}
    </div>
  );
}

export default App;
