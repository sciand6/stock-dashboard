function checkDates(lowdate, highdate) {
  if (!lowdate) {
    return { isError: true, error: "Please enter a valid from date." };
  }
  if (!highdate) {
    return { isError: true, error: "Please enter a valid to date." };
  }
  if (isNaN(Date.parse(lowdate))) {
    return { isError: true, error: "Please enter a valid from date." };
  }
  if (isNaN(Date.parse(highdate))) {
    return { isError: true, error: "Please enter a valid to date." };
  }

  return { isError: false, error: "" };
}

function checkTickers(tickersinput) {
  if (!tickersinput) {
    return { isError: true, error: "Please enter a valid list of tickers." };
  }
  return { isError: false, error: "" };
}

export { checkDates, checkTickers };
