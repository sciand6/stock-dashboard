import moment from "moment";

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
      text: `${ticker}`,
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

function getChartData(property) {
  let chartData = [];
  for (var i = property.length - 1; i >= 0; i--) {
    let chartItem = [
      new Date(property[i].date).getTime(),
      property[i].adjClose,
    ];
    chartData.push(chartItem);
  }
  return chartData;
}

function tickersToPages(tickersArr, amountOfPages) {
  var j = 0;
  var temp = [];
  var result = [];

  for (let i = 0; i < tickersArr.length; i++) {
    temp.push(tickersArr[i]);
    if (j === amountOfPages) {
      result.push(temp);
      j = 0;
      temp = [];
    }
    j++;
  }

  if (temp.length > 0) result.push(temp);

  return result;
}

function processStockData(res) {
  const options = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options);
  var arr = [];
  var failed = [];
  for (const property in res) {
    try {
      let chartData = getChartData(res[property]);
      let obj = {
        ticker: property,
        close: res[property][0].adjClose,
        high: Math.max.apply(
          Math,
          res[property].map(function (o) {
            return o.high;
          })
        ),
        low: Math.min.apply(
          Math,
          res[property].map(function (o) {
            return o.low;
          })
        ),
        roi:
          (res[property][0].adjClose -
            res[property][res[property].length - 1].adjClose) /
          res[property][res[property].length - 1].adjClose,
        configPrice: setChartData(property, chartData, numberFormat),
      };
      arr.push(obj);
    } catch {
      failed.push(property);
    }
  }

  return { failed, arr };
}

export { setChartData, getChartData, tickersToPages, processStockData };
