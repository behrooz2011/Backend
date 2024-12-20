const axios = require("axios");

exports.getExchangeRates = async () => {
  const response = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/USD`
  );
  return response.data;
};
