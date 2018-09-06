const Forwarder = artifacts.require('PassiveForwarder');

contract('PassiveForwarder', (accounts) => {
  const recipient = accounts[1];
  const sender = accounts[2];
  const amount = web3.toWei('2', 'ether');
  let DeployedContract;

  it('should be able to receive ETH', () => Forwarder.new(recipient)
    .then((instance) => {
      DeployedContract = instance;
      // sending eth
      return DeployedContract.sendTransaction({
        from: sender,
        value: amount,
        gas: '23000', // this value should be low to make sure the fallback is standard
      });
    }).then(() => web3.eth.getBalance(DeployedContract.address)).then((balance) => {
      // verify balance
      assert.equal(balance, amount);
    }));

  it('should be able to sweep', () => {
    let initialBalance;
    return Promise.resolve(web3.eth.getBalance(recipient))
      .then((balance) => {
        initialBalance = balance;
        return DeployedContract.sweep();
      }).then(() => web3.eth.getBalance(recipient)).then((balance) => {
        assert.equal(balance.toNumber(), Number(initialBalance) + Number(amount));
      });
  });
});
