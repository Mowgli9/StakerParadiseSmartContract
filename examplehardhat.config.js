require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html


const  ALCHEMY_API_HTTPS = "";

const  PRIVATE_KEY = "";

const ETHERSCAN_KEY = ""



module.exports = {
  solidity: "0.8.7",
  networks:{
    rinkeby:{
      url: ALCHEMY_API_HTTPS,
      accounts :[PRIVATE_KEY]
    }
  },
  etherscan:{
    apiKey: ETHERSCAN_KEY
  }
};
