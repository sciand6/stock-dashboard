import React from "react";
import "../../css/Stocks.css";

function Stock({ stock }) {
  return (
    <div className="row">
      <div className="ticker">{stock.ticker}</div>
      <div className={stock.roi > 0 ? "green" : "red"}>
        {stock.roi.toFixed(3)}
      </div>
      <div className="green">${stock.close}</div>
      <div className="green">${stock.high}</div>
      <div className="green">${stock.low}</div>
    </div>
  );
}

export default Stock;
