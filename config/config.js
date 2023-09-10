require("dotenv").config();
const CURRENCY_SYMBOLS = "USD,AUD,CAD,PLN,INR";
const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = "http://api.exchangeratesapi.io/v1";
const DB_NAME = "currency-db";
const COLLECTION_NAME = "currency-rates";
const MONGO_URI = process.env.MONGO_URI;
const START_DATE = new Date("2023-09-05");

module.exports = {
  CURRENCY_SYMBOLS,
  API_KEY,
  BASE_URL,
  DB_NAME,
  COLLECTION_NAME,
  MONGO_URI,
  START_DATE,
};
