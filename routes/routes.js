const express = require("express");
const router = express.Router();

const routeController = require("../controllers/controller");

router.get("/exchange-rates/live", routeController.showLiveExchangeRates);
router.post("/convert-currency", routeController.convertCurrency);
router.get("/forex-history", routeController.fetchHistoryRates);
router.get("/custom-forex-history", routeController.fetchHistoryRatesForARange);
router.get("/rate-lookup/date", routeController.fetchHistoryForADate);
module.exports = router;
