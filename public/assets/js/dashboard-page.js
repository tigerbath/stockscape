// target chart elements
const stockAllocationCanvas = $(".stock-allocation-chart");
const leaderboardCanvas = $(".leaderboard-graph");
const allocationChartCard = $("[name='allocation-chart-card']");

// const leaderboardChartOptions = {
//   type: "bar",
//   data: {
//     // pull top 10 usernames from db by total portfolio return value, sort highest to lowest
//     labels: [
//       "My Portfolio, kayleriegerpatton",
//       "Retirement Investments, tigerbath",
//       "YOLO Savings, conorKELLY",
//       "Play it Safe Stocks, lianavaleria15",
//     ],
//     datasets: [
//       {
//         label: "Return Value",
//         // pull from user -> portfolio in db, sort highest to lowest
//         data: [20100.56, 40000.0, 53400.27, 100.89],
//         // set these to the theme colors
//         backgroundColor: ["#95f9e3ff", "#69ebd0ff", "#758173ff", "#cb904dff"],
//         borderWidth: 1,
//         borderColor: "#777",
//         hoverBorderWidth: 2,
//         // hoverBorderColor: "#000",
//       },
//     ],
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Stock Allocations",
//       fontSize: 25,
//     },
//   },
// };

// const leaderboardChart = new Chart(leaderboardCanvas, leaderboardChartOptions);

// make POST request to our api in order to get the user portfolio data
const getAllocationChartData = async (event) => {
  const id = event.currentTarget.id;

  const userAllocationChartResponse = await fetch(
    `/api/users/${id}/dashboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  const allocationChartData = await userAllocationChartResponse.json();

  if (allocationChartData.error === "Failed to get user dashboard data.") {
    // * render some error if user dashboard data doesn't return?
  }

  if (allocationChartData.success) {
    renderAllocationChart(allocationChartData);
  }
};

// pass api data object to this function
const renderAllocationChart = (data) => {
  console.log("renderAllocationChart fn, data:", data);

  // transform data pie chart options config:
  //   find portfolio with highest stockReturns value(maybe do this in controller instead)
  // map through companies for symbol and stockReturns

  const allocationChartOptions = {
    type: "doughnut",
    data: {
      // pull company symbols from user -> portfolio -> company in db
      labels: [
        "$TSLA",
        "$GME",
        "$GOOGL",
        "$AMZN",
        "$FB",
        `${data.data[0].portfolioName}`,
      ],
      datasets: [
        {
          label: "Return Value",
          // pull from user -> portfolio in db
          data: [200000, 100000, 400000, 50000, 200000, 50000],
          // set these to the theme colors
          backgroundColor: [
            "#95f9e3ff",
            "#69ebd0ff",
            "#758173ff",
            "#cb904dff",
            "#5e47f7",
            "#241e4eff",
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 2,
          // hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      // TITLE IS NOT DISPLAYING
      title: {
        display: true,
        text: `${data.portfolioName} Stock Allocations`,
        fontSize: 25,
      },
    },
  };

  // render chart
  const allocationPieChart = new Chart(
    stockAllocationCanvas,
    allocationChartOptions
  );
};

allocationChartCard.on("click", getAllocationChartData);
$(document).ready(console.log("window ready"));
