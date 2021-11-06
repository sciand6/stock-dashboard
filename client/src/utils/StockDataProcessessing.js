import moment from "moment";

function compare(a, b) {
  if (a.roi > b.roi) return -1;
  if (a.roi < b.roi) return 1;
  return 0;
}

function setChartData(ticker, chartData, numberFormat) {
  return {
    yAxis: [
      {
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value);
          },
          x: -15,
          style: {
            color: "#000",
            position: "absolute",
          },
          align: "left",
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          numberFormat.format(this.y, 0) +
          "</b><br/>" +
          moment(this.x).format("MMMM Do YYYY, h:mm")
        );
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
      },
    },
    title: {
      text: `${ticker} stock price`,
    },
    chart: {
      height: 500,
    },

    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,
    },
    xAxis: {
      type: "date",
    },
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 4,
    },
    series: [
      {
        name: "Price",
        type: "spline",

        data: chartData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };
}

export { compare, setChartData };
