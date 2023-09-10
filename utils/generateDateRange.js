// generates an array of dates for a given date range

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

