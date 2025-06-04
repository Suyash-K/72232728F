require('dotenv').config();

const config = {
  port: process.env.PORT || 9876,
  windowSize: parseInt(process.env.WINDOW_SIZE) || 10,
  thirdPartyBaseUrl: process.env.THIRD_PARTY_BASE_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessCode: process.env.ACCESS_CODE,
  requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 500,
  accessToken: process.env.ACCESS_TOKEN,
  tokenExpiry: parseInt(process.env.TOKEN_EXPIRY)
};

module.exports = config;