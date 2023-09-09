const { formatDate } = require("./formatDate");

exports.generateDateRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(formatDate(new Date(date)));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// let startDate = new Date("2023-09-05");
// let endDate = new Date("2023-09-09");

// generateDateRange(startDate, endDate);
