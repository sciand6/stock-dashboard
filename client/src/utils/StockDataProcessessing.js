exports.compare = (a, b) => {
  if (a.roi > b.roi) return -1;
  if (a.roi < b.roi) return 1;
  return 0;
};
