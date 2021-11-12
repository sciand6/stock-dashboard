import React from "react";
import Stock from "./Stock";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";

function StockList({ stockdata }) {
  return (
    <div>
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

export default StockList;