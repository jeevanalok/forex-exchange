exports.currencyCalculator = (convertFrom, convertTo, amount, ratesChart) => {
  let convertFromValueWithRespectToEUR = ratesChart[convertFrom];
  let convertToValueWithRespectToEUR = ratesChart[convertTo];

  let convertedAmount =
    amount *
    (convertToValueWithRespectToEUR / convertFromValueWithRespectToEUR);

  return convertedAmount;
};
