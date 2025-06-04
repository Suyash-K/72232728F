const axios = require('axios');
const config = require('../config/server');

class ThirdPartyService {
  constructor() {
    this.baseUrl = config.thirdPartyBaseUrl;
    this.timeout = config.requestTimeout;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  setToken(token, expiry) {
    this.accessToken = token;
    this.tokenExpiry = parseInt(expiry);
    console.log('Token set:', { token: this.accessToken, expiry: this.tokenExpiry });
    return true;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const authResponse = await axios.post(`${this.baseUrl}/auth`, {
        clientId: config.clientId,
        clientSecret: config.clientSecret
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (authResponse.data && authResponse.data.token) {
        this.accessToken = authResponse.data.token;
        this.tokenExpiry = Date.now() + (3600 * 1000); // 1 hour expiry
        return this.accessToken;
      } else {
        throw new Error('No token in response');
      }
    } catch (error) {
      console.error('Auth Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async fetchNumbers(type) {
    try {
      const token = await this.getAccessToken();
      console.log('Using token:', token);
      
      const response = await axios.get(`${this.baseUrl}/numbers/${type}`, {
        timeout: this.timeout,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response:', response.data);
      return response.data.numbers || [];
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      return [];
    }
  }
}

module.exports = new ThirdPartyService();