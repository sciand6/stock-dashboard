import "./App.css";
import React from "react";
import TickerInput from "./components/TickerInput";
import { useSelector } from "react-redux";
import PageList from "./components/PageList";
import StockList from "./components/StockList";
import PageAmount from "./components/PageAmount";

function App() {
  const loading = useSelector((state) => state.stock.loading);
  const error = useSelector((state) => state.stock.error);

  return (
    <div className="App">
      <h1>Stock Dashboard</h1>
      <TickerInput />
      <p className="red">{error}</p>
      <br />
      <PageAmount />
      {loading ? (
        "Loading Results..."
      ) : (
        <div>
          <PageList />
          <StockList />
        </div>
      )}
    </div>
  );
}

export default App;
