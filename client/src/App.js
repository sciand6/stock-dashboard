import React, { useState } from "react";
import { compare } from "./utils/StockDataProcessessing";
import "./App.css";
import Stock from "./components/Stock";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import moment from "moment";

function App() {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  const [stockdata, setstockdata] = useState([]);
  const [lowdate, setlowdate] = useState("");
  const [highdate, sethighdate] = useState("");
  const [tickersinput, settickersinput] = useState("");

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

  function setChartData(ticker, chartData) {
    return {
      yAxis: [
        {
          offset: 20,

          labels: {
            formatter: function () {
              return numberFormat.format(this.value);
            },
            x: -15,
            style: {
              color: "#000",
              position: "absolute",
            },
            align: "left",
          },
        },
      ],
      tooltip: {
        shared: true,
        formatter: function () {
          return (
            numberFormat.format(this.y, 0) +
            "</b><br/>" +
            moment(this.x).format("MMMM Do YYYY, h:mm")
          );
        },
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,
        },
      },
      rangeSelector: {
        selected: 1,
      },
      title: {
        text: `${ticker} stock price`,
      },
      chart: {
        height: 500,
      },

      credits: {
        enabled: false,
      },

      legend: {
        enabled: true,
      },
      xAxis: {
        type: "date",
      },
      rangeSelector: {
        buttons: [
          {
            type: "day",
            count: 1,
            text: "1d",
          },
          {
            type: "day",
            count: 7,
            text: "7d",
          },
          {
            type: "month",
            count: 1,
            text: "1m",
          },
          {
            type: "month",
            count: 3,
            text: "3m",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        selected: 4,
      },
      series: [
        {
          name: "Price",
          type: "spline",

          data: chartData,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    };
  }

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
              configPrice: setChartData(property, chartData),
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
        return (
          <div>
            <Stock stock={stock} />
            <ReactHighcharts config={stock.configPrice}></ReactHighcharts>
          </div>
        );
      })}
    </div>
  );
}

export default App;
