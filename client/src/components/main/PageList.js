import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStocks } from "../../utils/Requests";
import { requestError, compare } from "../../utils/General";
import { processStockData } from "../../utils/StockDataProcessessing";
import { setStocks, setLoading, setError } from "../../slices/stockSlice";
import { updateActiveIndex } from "../../slices/inputSlice";
import "../../css/PageList.css";

function PageList() {
  const dispatch = useDispatch();
  const activeindex = useSelector((state) => state.input.activeindex);
  const pagesarr = useSelector((state) => state.input.pagesarr);
  const lowdate = useSelector((state) => state.input.lowdate);
  const highdate = useSelector((state) => state.input.highdate);

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

  function updateStocks(index) {
    dispatch(setLoading({ loading: true }));
    getStocks(index, pagesarr, lowdate, highdate)
      .then(requestError)
      .then((res) => {
        setTimeout(() => {
          updateStockState(res);
          dispatch(updateActiveIndex({ activeindex: index }));
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
      {pagesarr.map((inp, index) => {
        return (
          <span
            className={
              index === activeindex ? "page-number-active" : "page-number"
            }
            onClick={() => updateStocks(index)}
          >
            {index + 1} &nbsp;
          </span>
        );
      })}
    </div>
  );
}

export default PageList;
