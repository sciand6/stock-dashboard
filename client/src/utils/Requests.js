function getStocks(index, pagearr, lowdate, highdate) {
  const tickerArr = pagearr[index];
  var inputString = "";
  for (let i = 0; i < tickerArr.length; i++) {
    inputString += tickerArr[i] + ",";
  }
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tickers: inputString.slice(0, -1),
      lowdate: lowdate,
      highdate: highdate,
    }),
  };
  return fetch("http://localhost:5000/apiv1/getStockData/", opts);
}

export { getStocks };
