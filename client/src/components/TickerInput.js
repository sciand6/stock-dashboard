import React, { useState } from "react";
import {
  saveInput,
  updateActiveIndex,
  updatePages,
} from "../slices/inputSlice";
import { useSelector, useDispatch } from "react-redux";
import { validateInput } from "../utils/InputValidation";
import { getStocks } from "../utils/Requests";
import { buildInput } from "../utils/General";
import { requestError, compare } from "../utils/General";
import { processStockData } from "../utils/StockDataProcessessing";
import { setStocks, setLoading, setError } from "../slices/stockSlice";

function TickerInput() {
  const dispatch = useDispatch();
  const [lowdate, setlowdate] = useState("");
  const [highdate, sethighdate] = useState("");
  const [tickersinput, settickersinput] = useState("");
  const pageamount = useSelector((state) => state.input.pageamount);

  function updateState(tickerParams, pagesarr) {
    const { lowdate, highdate, tickersinput } = tickerParams;
    const currenttickers = tickersinput.split(",");
    dispatch(
      saveInput({
        lowdate,
        highdate,
        currenttickers,
      })
    );
    dispatch(updatePages({ pagesarr }));
    dispatch(updateActiveIndex({ activeindex: 0 }));
  }

  function updateStockState(res) {
    const { failed, arr } = processStockData(res);
    dispatch(setStocks({ stockdata: arr.sort(compare) }));
    dispatch(setLoading({ loading: false }));
    if (failed.length !== 0) {
      dispatch(
        setError({
          error: "Couldn't find data for the following stocks: \n" + failed,
        })
      );
    }
  }

  function submitTickers(tickerParams) {
    if (validateInput(tickerParams).isError) {
      dispatch(
        setError({
          error: validateInput(tickerParams).error,
        })
      );
      return;
    }
    const result = buildInput(tickersinput, pageamount);
    updateState(tickerParams, result);
    dispatch(setLoading({ loading: true }));
    getStocks(0, result, lowdate, highdate)
      .then(requestError)
      .then((res) => {
        setTimeout(() => {
          updateStockState(res);
        }, 3000);
      })
      .catch((error) => {
        dispatch(
          setError({
            error,
          })
        );
      });
  }

  return (
    <div>
      <p>Enter Date Range</p>
      <label htmlFor="lowdate">From:&nbsp;</label>
      <input
        className="ticker-input"
        placeholder="2021-01-01"
        id="lowdate"
        type="text"
        onChange={(e) => setlowdate(e.target.value)}
      />
      &nbsp;
      <label htmlFor="highdate">To:&nbsp;</label>
      <input
        className="ticker-input"
        placeholder="2021-07-04"
        type="text"
        onChange={(e) => sethighdate(e.target.value)}
      />
      <p>Enter Tickers</p>
      <input
        className="ticker-input"
        type="text"
        placeholder="FB,AMZN,NFLX,GOOGL"
        onChange={(e) => settickersinput(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => submitTickers({ lowdate, highdate, tickersinput })}
      >
        Submit
      </button>
    </div>
  );
}

export default TickerInput;
