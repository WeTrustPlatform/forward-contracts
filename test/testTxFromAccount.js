const Forwarder = artifacts.require("PassiveForwarder");

contract("PassiveForwarder", function (accounts) {
  const recipient = accounts[1];
  const sender = accounts[2];
  const amount = web3.toWei("2", "ether");
  let DeployedContract;

  it("should be able to receive ETH", function () {
    return Forwarder.new(recipient)
      .then(function (instance) {
        DeployedContract = instance;
        // sending eth
        return DeployedContract.sendTransaction({
          from: sender,
          value: amount,
        });
      }).then(function () {
        // get latest balance
        return web3.eth.getBalance(DeployedContract.address);
      }).then(function (balance) {
        // verify balance
        assert.equal(balance, amount);
      });
  });

  it("should be able to sweep", function () {
    let initialBalance;
    return Promise.resolve(web3.eth.getBalance(recipient))
      .then(function (balance) {
        initialBalance = balance;
        return DeployedContract.sweep();
      }).then(function () {
        // get latest balance
        return web3.eth.getBalance(recipient);
      }).then(function (balance) {
        assert.equal(balance.toNumber(), Number(initialBalance) + Number(amount));
      });
  });
})
