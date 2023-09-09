exports.formatDate = (date) => {
  let formattedDate = date.toISOString();

  return formattedDate.slice(0, 10);
};
