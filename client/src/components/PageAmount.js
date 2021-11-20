import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  processStockData,
  tickersToPages,
} from "../utils/StockDataProcessessing";
import {
  updatePageAmount,
  updateActiveIndex,
  updatePages,
} from "../slices/inputSlice";
import { getStocks } from "../utils/Requests";
import { setError, setLoading, setStocks } from "../slices/stockSlice";
import { requestError, compare } from "../utils/General";

function PageAmount() {
  const dispatch = useDispatch();
  const [activepageamount, setactivepageamount] = useState(10);
  const currenttickers = useSelector((state) => state.input.currenttickers);
  const lowdate = useSelector((state) => state.input.lowdate);
  const highdate = useSelector((state) => state.input.highdate);

  function updateState(pageamount, pagesarr) {
    dispatch(updatePageAmount({ pageamount }));
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

  function setPageAmount(amount) {
    if (!currenttickers || currenttickers.length === 0) return;
    const result = tickersToPages(currenttickers, amount);
    updateState(amount, result);
    dispatch(setLoading({ loading: true }));
    getStocks(0, result, lowdate, highdate)
      .then(requestError)
      .then((res) => {
        updateStockState(res);
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
      Results Per Page
      <p>
        <span
          className={
            activepageamount === 10 ? "page-number-active" : "page-number"
          }
          onClick={() => {
            setPageAmount(10);
            setactivepageamount(10);
          }}
        >
          10
        </span>
        &nbsp;
        <span
          className={
            activepageamount === 15 ? "page-number-active" : "page-number"
          }
          onClick={() => {
            setactivepageamount(15);
            setPageAmount(15);
          }}
        >
          15
        </span>
        &nbsp;
        <span
          className={
            activepageamount === 20 ? "page-number-active" : "page-number"
          }
          onClick={() => {
            setactivepageamount(20);
            setPageAmount(20);
          }}
        >
          20
        </span>
        &nbsp;
      </p>
    </div>
  );
}

export default PageAmount;
