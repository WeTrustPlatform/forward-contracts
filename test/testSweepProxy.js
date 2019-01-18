const SweepProxy = artifacts.require('SweepProxy');
const Forwarder = artifacts.require('PassiveForwarder');

contract('SweepProxy', (accounts) => {
  const recipient = accounts[1];
  const sender = accounts[2];
  const owner = accounts[3];
  const amount = web3.toWei('2', 'ether');
  const pool_size = 10;
  
  it('should be able to proxy sweep', () => SweepProxy.new()
    .then(async (instance) => {
    let forwarders = [];
    for (i = 0; i < pool_size; i++) {
      pf = await Forwarder.new(recipient);
      tx = await pf.sendTransaction({
        from: sender,
        value: amount,
        gas: '23000',
      });
      forwarders.push(pf.address);
    }
    return instance.sweep(forwarders, { from: owner });
  }).then(() => web3.eth.getBalance(recipient)).then((balance) => {
    // verify balance
    assert.equal(balance, amount * pool_size);
  }));
});
