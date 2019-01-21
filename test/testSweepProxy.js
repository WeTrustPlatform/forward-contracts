const SweepProxy = artifacts.require('SweepProxy');
const Forwarder = artifacts.require('PassiveForwarder');

contract('SweepProxy', (accounts) => {
  const recipient = accounts[1];
  const sender = accounts[2];
  const anybody = accounts[3];
  const amount = web3.toWei('2', 'ether');
  const poolSize = 1;
  let initialBalance;

  it('should be able to proxy sweep', () => SweepProxy.new()
    .then(async (instance) => {
      const forwarders = [];
      for (let i = 0; i < poolSize; i += 1) {
        const pf = await Forwarder.new(recipient);
        await pf.sendTransaction({
          from: sender,
          value: amount,
        });
        forwarders.push(pf.address);
      }

      initialBalance = await web3.eth.getBalance(recipient);

      return instance.sweep(forwarders, {
        from: anybody,
      });
    }).then(() => web3.eth.getBalance(recipient)).then((balance) => {
      // verify balance
      assert.equal(balance.toNumber(), Number(initialBalance) + Number(amount * poolSize));
    }));
});
