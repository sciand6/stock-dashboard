function validateInput(inp) {
  const { lowdate, highdate, tickersinput } = inp;
  var dateValidation = checkDates(lowdate, highdate);
  var tickerValidation = checkTickers(tickersinput);
  if (dateValidation.isError) {
    return dateValidation;
  }
  if (tickerValidation.isError) {
    return tickerValidation;
  }
  return { isError: false, error: "" };
}

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
  if (Date.parse(highdate) < Date.parse(lowdate)) {
    return {
      isError: true,
      error: "Your to date is greater than your from date.",
    };
  }

  return { isError: false, error: "" };
}

function checkTickers(tickersinput) {
  if (!tickersinput) {
    return { isError: true, error: "Please enter a valid list of tickers." };
  }
  return { isError: false, error: "" };
}

export { checkDates, checkTickers, validateInput };
