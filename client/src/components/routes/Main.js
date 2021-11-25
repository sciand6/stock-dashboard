import React from "react";
import { useSelector } from "react-redux";
import TickerInput from "../main/TickerInput";
import PageList from "../main/PageList";
import StockList from "../main/StockList";
import PageAmount from "../main/PageAmount";

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
          {loading ? (
            "Loading Results..."
          ) : (
            <div>
              <PageAmount />
              <p>
                Currently showing data from <strong>{lowdate}</strong> through{" "}
                <strong>{highdate}</strong>
              </p>
              <PageList />
              <StockList />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Main;
