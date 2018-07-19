const BasicForwarder = artifacts.require("./BasicForwarder.sol");

module.exports = function(deployer) {
  deployer.deploy(BasicForwarder, "0xf1195F847c6DF5fdb593CaF79642ef4a1E424bd8");
}
