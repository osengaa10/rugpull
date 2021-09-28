
const path = require("path");
const fs = require('fs')
const mnemonic = fs.readFileSync(".secret2").toString() || "01234567890123456789"
const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider;
const HDWalletProvider = require('@truffle/hdwallet-provider')
const arbProviderUrl = `https://arbitrum-rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`

require('dotenv').config();
const INFURA_PROJECT_ID = process.env["INFURA_PROJECT_ID"];
// module.exports = {
//   arbitrum: {
//     provider: function () {
//         return new HDWalletProvider(mnemonic, arbProviderUrl)
//     },
//     network_id: '*',
//     gasPrice: 0,
//   },
//   compilers: {
//     solc: {
//       version: "0.8.5"
//     }
//   }
// }

// https://rinkeby.arbitrum.io/rpc


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  contracts_directory: './contracts/ethereum',
  networks: {
    develop: {
      port: 8545
    },
    arbitrum: {
      provider: function() {
        return wrapProvider(
          new HDWalletProvider(mnemonic, `https://arbitrum-rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`)
        )
      },
      network_id: 421611,
      gas: 287938372
    }
  },
  compilers: {
    solc: {
      version: "0.8.5"
    }
  }
};