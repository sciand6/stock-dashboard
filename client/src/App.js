import React, { useState } from "react";
import { compare, setChartData } from "./utils/StockDataProcessessing";
import "./App.css";
import Stock from "./components/Stock";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";

function App() {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const [stockdata, setstockdata] = useState([]);
  const [lowdate, setlowdate] = useState("");
  const [highdate, sethighdate] = useState("");
  const [tickersinput, settickersinput] = useState("");
  const [pagearr, setpagearr] = useState([]);
  const [loading, setloading] = useState(false);

  function getChartData(property) {
    let chartData = [];
    for (var i = property.length - 1; i >= 0; i--) {
      let chartItem = [
        new Date(property[i].date).getTime(),
        property[i].adjClose,
      ];
      chartData.push(chartItem);
    }
    return chartData;
  }

  function buildInput() {
    if (!lowdate || !highdate || !tickersinput) return;
    var result = [];
    const tickerArr = tickersinput.split(",");
    var j = 0;
    var temp = [];
    for (let i = 0; i < tickerArr.length; i++) {
      temp.push(tickerArr[i]);
      if (j === 10) {
        result.push(temp);
        j = 0;
        temp = [];
      }
      j++;
    }
    setpagearr(result);
  }

  function getStocks(index) {
    if (pagearr.length === 0 || !pagearr) return;
    setloading(true);
    const tickerArr = pagearr[index];
    var inputString = "";
    var arr = [];
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
      .then((data) => data.json())
      .then((res) => {
        try {
          for (const property in res) {
            let chartData = getChartData(res[property]);
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
              configPrice: setChartData(property, chartData, numberFormat),
            };
            arr.push(obj);
          }
        } catch (error) {
          // swallow error
          console.log(error + "\nYour input:\n" + inputString);
        }
        // console.log(arr);
        setTimeout(() => {
          setstockdata(arr.sort(compare));
          setloading(false);
        }, 3000);
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
      <button onClick={() => buildInput()}>Submit</button>
      <br />
      <br />
      {loading ? (
        "Loading Results..."
      ) : (
        <div>
          {pagearr.map((inp, index) => {
            return (
              <span className="page-number" onClick={() => getStocks(index)}>
                {index + 1} &nbsp;
              </span>
            );
          })}
          <div className="headers">
            <div>Ticker</div>
            <div>ROI</div>
            <div>Close</div>
            <div>High</div>
            <div>Low</div>
          </div>
          {stockdata.map((stock) => {
            return (
              <div>
                <Stock stock={stock} />
                <ReactHighcharts config={stock.configPrice}></ReactHighcharts>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
