require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    hardhat:{

    },
    goerli:{
      url: process.env.INFURA_URL,
      accounts:[process.env.WALLET_PRIVATE_KEY]
    }
  }
};
