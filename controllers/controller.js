const axios = require("axios");
const {
  CURRENCY_SYMBOLS,
  API_KEY,
  BASE_URL,
  DB_NAME,
  COLLECTION_NAME,
  MONGO_URI,
} = require("../config/config");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { formatDate } = require("../utils/formatDate");
const { currencyCalculator } = require("../utils/currencyCalculator");

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

exports.convertCurrency = async (req, res) => {
  const { convertFrom, convertTo, amount } = req.body;

  async function connectToDB() {
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      const { rates } = await collection.findOne({
        date: formatDate(new Date()),
      });

      if (rates[convertFrom] === undefined || rates[convertTo] === undefined) {
        res.status(400).json({ message: "Error: Invalid Currency Codes" });
      } else {
        let convertedAmount = currencyCalculator(
          convertFrom,
          convertTo,
          amount,
          rates
        );

        res.status(200).json({
          message: "Successfully Converted!",
          convertedAmount: convertedAmount,
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log("Error:", err);
    } finally {
      await client.close();
    }
  }

  connectToDB().catch(console.dir);
};

exports.showLiveExchangeRates = async (req, res) => {
  const url = `${BASE_URL}/latest?access_key=${API_KEY}&symbols=${CURRENCY_SYMBOLS}`;
  const { data } = await axios.get(url);
  try {
    if (data.success) {
      let output = {
        EUR: 1.0,
        ...data.rates,
      };
      res.status(200).json({ data: output });
    } else {
      res.status(404).json({ message: "Error in fetching data!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.fetchHistoryForADate = async (req, res) => {
  const { date } = req.query;
  async function connectToDB() {
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      try {
        const result = await collection.findOne({ date: date });

        if (result) {
          res
            .status(200)
            .json({ message: "Data Fetched Successfully", data: result });
        } else {
          res.status(404).json({
            message: "Data for the given date is not available",
          });
        }
      } catch (err) {
        res.status(404).json({ message: "Error in fetching data" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log("Error:", err);
    } finally {
      await client.close();
    }
  }

  connectToDB().catch(console.dir);
};

exports.fetchHistoryRates = async (req, res) => {
  async function connectToDB() {
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const collection = db.collection(COLLECTION_NAME);

      try {
        const results = await collection.find().toArray();

        res
          .status(200)
          .json({ message: "Data Fetched Successfully", data: results });
      } catch (err) {
        res.status(404).json({ message: "Error in fetching data" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log("Error:", err);
    } finally {
      await client.close();
    }
  }

  connectToDB().catch(console.dir);
};
exports.fetchHistoryRatesForARange = async (req, res) => {
  const { startDate, endDate } = req.query;
  async function connectToDB() {
    try {
      if (new Date(startDate) > new Date(endDate)) {
        res
          .status(400)
          .json({ message: "Start date should be smaller than end date." });
      } else {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        try {
          const startDateValidation = await collection.findOne({
            date: startDate,
          });
          const endDateValidation = await collection.findOne({ date: endDate });

          if (startDateValidation === null || endDateValidation === null) {
            res.status(404).json({
              message: "The given dates do not exist in the database.",
            });
          } else {
            const result = await collection
              .find({
                date: { $gte: startDate, $lte: endDate },
              })
              .toArray();

            res
              .status(200)
              .json({ message: "Data Fetched Successfully", data: result });
          }
        } catch (err) {
          console.log(err);
          res.status(404).json({ message: "Error in fetching data" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log("Error:", err);
    } finally {
      await client.close();
    }
  }

  connectToDB().catch(console.dir);
};
