import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compare } from "../../utils/General";
import { setStocks } from "../../slices/stockSlice";
import Stock from "./Stock";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import "../../css/StockList.css";

function StockList() {
  const stockdata = useSelector((state) => state.stock.stockdata);
  const dispatch = useDispatch();
  const [activesortorder, setactivesortorder] = useState(true); // true is asc and false is desc
  const [activesort, setactivesort] = useState("");

  function sortStocks(property) {
    let sortOrder = activesortorder ? "asc" : "desc";
    let stocksSorted = [...stockdata];
    dispatch(
      setStocks({ stockdata: stocksSorted.sort(compare(property, sortOrder)) })
    );
    setactivesortorder(!activesortorder);
    setactivesort(property);
  }

  return (
    <div>
      <div className="headers">
        <div onClick={() => sortStocks("ticker")}>
          Ticker &nbsp;
          <i
            className={
              activesort === "ticker"
                ? activesortorder
                  ? "arrow up"
                  : "arrow down"
                : ""
            }
          ></i>
        </div>
        <div onClick={() => sortStocks("roi")}>
          ROI &nbsp;
          <i
            className={
              activesort === "roi"
                ? activesortorder
                  ? "arrow up"
                  : "arrow down"
                : ""
            }
          ></i>
        </div>
        <div onClick={() => sortStocks("close")}>
          Close &nbsp;
          <i
            className={
              activesort === "close"
                ? activesortorder
                  ? "arrow up"
                  : "arrow down"
                : ""
            }
          ></i>
        </div>
        <div onClick={() => sortStocks("high")}>
          High &nbsp;
          <i
            className={
              activesort === "high"
                ? activesortorder
                  ? "arrow up"
                  : "arrow down"
                : ""
            }
          ></i>
        </div>
        <div onClick={() => sortStocks("low")}>
          Low &nbsp;
          <i
            className={
              activesort === "low"
                ? activesortorder
                  ? "arrow up"
                  : "arrow down"
                : ""
            }
          ></i>
        </div>
      </div>
      {stockdata.map((stock) => {
        return (
          <div key={stock.ticker}>
            <Stock stock={stock} />
            <ReactHighcharts config={stock.configPrice}></ReactHighcharts>
          </div>
        );
      })}
    </div>
  );
}

export default StockList;
