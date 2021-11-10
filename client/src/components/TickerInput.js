import React, { useState } from "react";

function TickerInput({ buildInput }) {
  const [lowdate, setlowdate] = useState("");
  const [highdate, sethighdate] = useState("");
  const [tickersinput, settickersinput] = useState("");
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
        onClick={() => buildInput({ lowdate, highdate, tickersinput })}
      >
        Submit
      </button>
    </div>
  );
}

export default TickerInput;
