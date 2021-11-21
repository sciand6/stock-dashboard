import React from "react";
import TickerInput from "./TickerInput";
import PageList from "./PageList";
import StockList from "./StockList";
import PageAmount from "./PageAmount";
import { useSelector } from "react-redux";

function Main() {
  const loading = useSelector((state) => state.stock.loading);
  const error = useSelector((state) => state.stock.error);
  const lowdate = useSelector((state) => state.input.lowdate);
  const highdate = useSelector((state) => state.input.highdate);
  return (
    <div>
      <TickerInput />
      <p className="red">{error}</p>
      <br />
      {lowdate && highdate ? (
        <div>
          <PageAmount />
          <p>
            Currently showing data from <strong>{lowdate}</strong> through{" "}
            <strong>{highdate}</strong>
          </p>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        "Loading Results..."
      ) : (
        <div>
          <PageList />
          <StockList />
        </div>
      )}
    </div>
  );
}

export default Main;
