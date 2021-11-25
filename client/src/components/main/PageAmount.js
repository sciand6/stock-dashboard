import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestError, compare } from "../../utils/General";
import { getStocks } from "../../utils/Requests";
import {
  processStockData,
  tickersToPages,
} from "../../utils/StockDataProcessessing";
import {
  updatePageAmount,
  updateActiveIndex,
  updatePages,
} from "../../slices/inputSlice";
import { setError, setLoading, setStocks } from "../../slices/stockSlice";

function PageAmount() {
  const dispatch = useDispatch();
  const activepageamount = useSelector((state) => state.input.pageamount);
  const currenttickers = useSelector((state) => state.input.currenttickers);
  const lowdate = useSelector((state) => state.input.lowdate);
  const highdate = useSelector((state) => state.input.highdate);

  function updateInputState(pageamount, pagesarr) {
    dispatch(updatePageAmount({ pageamount }));
    dispatch(updatePages({ pagesarr }));
    dispatch(updateActiveIndex({ activeindex: 0 }));
  }

  function updateStockState(res) {
    const { failed, arr } = processStockData(res);
    dispatch(setStocks({ stockdata: arr.sort(compare("roi", "desc")) }));
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
    dispatch(setLoading({ loading: true }));
    getStocks(0, result, lowdate, highdate)
      .then(requestError)
      .then((res) => {
        updateInputState(amount, result);
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
