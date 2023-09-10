# Forex Exchange API

Welcome to the Forex Exchange API project! This API is designed and implemented to provide the backend functionality for a Forex Exchange application. It enables users to perform currency conversion, access live exchange rates, and store/query historical exchange rate data for the past 7 days. [Live Preview](https://forex-exchange-68hj.onrender.com/)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)

## Features

The Forex Exchange API provides the following key features:

- **Currency Conversion:** Convert one currency to another using the latest exchange rates.
- **Live Exchange Rates:** Access real-time exchange rates for various currency pairs.
- **Historical Data:** Store and query historical exchange rate data for the past 7 days.

## Getting Started

Follow these instructions to set up and run the Forex Exchange API on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Install Node.js
- **Mongo Db** Install MongoDB
- **APIKEY** api key from exchangeratesapi.io

### Installation

1. Clone this repository to your local machine:
   `https://github.com/jeevanalok/forex-exchange.git`

2. Navigate to the project directory:
   `cd forex`

3. Install the project dependencies:
   `npm install`

### Running the API

1. Start the API server:
   `npm start`
2. The API should now be running on `http://localhost:3000`. You can access it using your favorite API client or by making HTTP requests programmatically.

## API Endpoints

The Forex Exchange API provides the following endpoints:

- **GET /convert-currency:** Convert currency from one type to another.
- **GET /exchange-rates/live:** Retrieve live exchange rates for various currency pairs.
- **GET /forex-history:** Query historical exchange rate data for the past 7 days.

Go through the code to access more apis.
