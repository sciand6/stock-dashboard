import React from "react";

function PageList({ pagearr, getStocks }) {
  return (
    <div>
      {pagearr.map((inp, index) => {
        return (
          <span className="page-number" onClick={() => getStocks(index)}>
            {index + 1} &nbsp;
          </span>
        );
      })}
    </div>
  );
}

export default PageList;
