import React from "react";

function PageList({ pagearr, getStocks, activeIndex }) {
  return (
    <div>
      {pagearr.map((inp, index) => {
        return (
          <span
            className={
              index === activeIndex ? "page-number-active" : "page-number"
            }
            onClick={() => getStocks(index)}
          >
            {index + 1} &nbsp;
          </span>
        );
      })}
    </div>
  );
}

export default PageList;
