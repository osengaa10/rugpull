
var FomoOE = artifacts.require("./FomoOE.sol");
var RugToken = artifacts.require("./RugToken.sol");

module.exports = function(deployer) {
  deployer.deploy(FomoOE);
  deployer.deploy(RugToken,10);
};

