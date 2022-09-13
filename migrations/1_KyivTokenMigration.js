var IterableMapping = artifacts.require("IterableMapping");
var KyivToken = artifacts.require("KyivToken");

module.exports = function(deployer) {

  deployer.deploy(IterableMapping);

  deployer.link(IterableMapping,KyivToken);

  deployer.deploy(KyivToken);
  
};