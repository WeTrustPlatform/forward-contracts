const ForwardETH = artifacts.require("./ForwardETH.sol");

module.exports = function(deployer) {
  deployer.deploy(ForwardETH, "0x627306090abab3a6e1400e9345bc60c78a8bef57")
    .then(function(result) {
      console.log(JSON.stringify(result));
    });
}
