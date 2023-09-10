// returns a given date object in format "YYYY-MM-DD"

exports.formatDate = (date) => {
  let formattedDate = date.toISOString();
  return formattedDate.slice(0, 10);
};
