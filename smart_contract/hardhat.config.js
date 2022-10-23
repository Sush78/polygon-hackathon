require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.17",
  networks: {
    polygon:{
      url: "https://polygon-mumbai.g.alchemy.com/v2/6F2K-LHaNFo0kjX6Va7yeOdKpL5dO2NY",
      accounts: ["enter account address"]
    }
  }
};