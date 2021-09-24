
const path = require("path");
const fs = require('fs')
const mnemonic = fs.readFileSync(".secret").toString() || "01234567890123456789"
const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider;
const HDWalletProvider = require('@truffle/hdwallet-provider')
const arbProviderUrl = 'https://arbitrum-rinkeby.infura.io/v3/3851c6c409d144a4a10cc0648c41be49'

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
  networks: {
    develop: {
      port: 8545
    },
    arbitrum: {
      provider: function() {
        return wrapProvider(
          new HDWalletProvider(mnemonic, 'https://arbitrum-rinkeby.infura.io/v3/85e32b8991b84888a4f7d9e2a44a957b')
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