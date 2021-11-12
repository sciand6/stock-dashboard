import React, { useState } from "react";

function PageAmount({ updatePageAmount }) {
  const [activepageamount, setactivepageamount] = useState(10);

  return (
    <div>
      <div>How many stocks to show per page? </div>
      <p>
        <span
          className={
            activepageamount === 10 ? "page-number-active" : "page-number"
          }
          onClick={() => {
            updatePageAmount(10);
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
            updatePageAmount(15);
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
            updatePageAmount(20);
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
