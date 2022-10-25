require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: "0.8.17",
  networks: {
    polygon:{
      url: "https://polygon-mumbai.g.alchemy.com/v2/6F2K-LHaNFo0kjX6Va7yeOdKpL5dO2NY",
      accounts: ["0x1ea0429d0e67a6dd4f34e5b81d7068042fab9dc8efd123531d94f3835269143a"]
    }
  }
};