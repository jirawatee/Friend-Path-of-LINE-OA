const axios = require("axios");

class LINE {
  async getUserProfile(accessToken) {
    try {
      const profile = await axios({
        method: 'get',
        url: "https://api.line.me/v2/profile",
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return profile.data;
    } catch (error) {
      return error.response.status;
    }
  }
}

module.exports = new LINE();
