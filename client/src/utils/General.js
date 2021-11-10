function requestError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

function compare(a, b) {
  if (a.roi > b.roi) return -1;
  if (a.roi < b.roi) return 1;
  return 0;
}

export { requestError, compare };
