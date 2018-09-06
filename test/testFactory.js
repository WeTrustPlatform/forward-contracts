const Factory = artifacts.require('PassiveForwarderFactory');

contract('PassiveForwarderFactory', (accounts) => {
  const owner = accounts[3];
  const recipient = accounts[4];
  const other = accounts[5];

  let DeployedFactory;
  let newContract;
  it('should be able to create new contract', () => Factory.new(owner)
    .then((factoryInstance) => {
      DeployedFactory = factoryInstance;
      // read-only
      return DeployedFactory.create.call(recipient, { from: owner });
    }).then((newPassiveForwarder) => {
      newContract = newPassiveForwarder;
      // actually create new contract
      return DeployedFactory.create(recipient, { from: owner });
    }).then((tx) => {
      const { event, args } = tx.logs[0];
      assert.equal(event, 'Created');
      assert.equal(args.recipient, recipient);
      assert.equal(args.newContract, newContract);
      return DeployedFactory.recipients.call(recipient, 0);
    })
    .then((newPassiveForwarder) => {
      assert(newPassiveForwarder, newContract);
      return DeployedFactory.getNumberOfContracts(recipient);
    })
    .then((size) => {
      assert(size, 1);
    }));

  it('should throw when non-owner calls create', () => DeployedFactory.create(recipient, { from: other })
    .then(() => {
      assert.fail('should not reach here');
    }).catch(() => {
      assert.ok('passed');
    }));
});
