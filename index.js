const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const forexRoute = require("./routes/routes");
const authRouter = require("./routes/auth");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { generateDateRange } = require("./utils/generateDateRange");
const { apiLimiter } = require("./middleware/rateLimiting");

const {
  API_KEY,
  BASE_URL,
  DB_NAME,
  COLLECTION_NAME,
  MONGO_URI,
  START_DATE,
} = require("./config/config");
const { authenticateJWT } = require("./middleware/authenticateJWT");

const app = express();

app.use(bodyParser.json());
app.use("/api/v1", authenticateJWT, apiLimiter, forexRoute);
app.use("/auth", authRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    message:
      "Welcome to forex exchange! This endpoint doesn't exists.Head over to github repo to know more ;)",
    url: "https://github.com/jeevanalok/forex-exchange",
  });
});

const port = process.env.PORT || 3000;

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDB() {
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db(DB_NAME).command({ ping: 1 });

  console.log("Pinged your deployment. Successfully connected to MongoDB!");

  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  //Initial DB operations while starting up

  const dateRange = generateDateRange(
    (startDate = START_DATE),
    (endDate = new Date())
  );

  Promise.all(
    dateRange.map(async (date) => {
      try {
        const result = await collection.findOne({ date: date });
        if (result == null) {
          const url = `${BASE_URL}/${date}?access_key=${API_KEY}`;

          const response = await axios.get(url);

          let document = {
            date: response.data.date,
            rates: response.data.rates,
          };

          try {
            const collectionResult = await collection.insertOne(document);
            console.log(`Forex data for ${date} has been inserted in database`);
          } catch (err) {
            console.log({ message: "Error in insertion!", error: err });
          }
        } else {
          console.log(
            `Forex date for ${date} already exists in database. Skipping insertion`
          );
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    })
  ).then(async () => {
    await client.close();
  });
}

connectToDB().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
