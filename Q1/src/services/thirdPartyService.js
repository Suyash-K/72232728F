const axios = require('axios');
const config = require('../config/server');

class ThirdPartyService {
  constructor() {
    this.baseUrl = config.thirdPartyBaseUrl;
    this.timeout = config.requestTimeout;
  }

  async fetchNumbers(type) {
    const endpoints = {
      'p': '/primes',
      'f': '/fibo', 
      'e': '/even',
      'r': '/rand'
    };

    const endpoint = endpoints[type];
    if (!endpoint) {
      throw new Error(`Invalid number type: ${type}`);
    }

    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        timeout: this.timeout,
        headers: {
          'Authorization': `Bearer ${config.accessCode}`
        }
      });

      return response.data.numbers || [];
    } catch (error) {
      console.error(`Error fetching ${type} numbers:`, error.message);
      return [];
    }
  }
}

module.exports = new ThirdPartyService();