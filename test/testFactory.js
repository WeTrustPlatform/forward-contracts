const Factory = artifacts.require("PassiveForwarderFactory");
const Forwarder = artifacts.require("PassiveForwarder");

contract("PassiveForwarderFactory", function (accounts) {
  const owner = accounts[3];
  const recipient = accounts[4];
  const other = accounts[5];

  let DeployedFactory;
  let newContract;
  it("should be able to create new contract", function () {
    return Factory.new(owner)
      .then(function (factoryInstance) {
        DeployedFactory = factoryInstance;
        // read-only
        return DeployedFactory.create.call(recipient, {from: owner});
      }).then(function(newPassiveForwarder) {
        newContract = newPassiveForwarder;
        // actually create new contract
        return DeployedFactory.create(recipient, {from: owner});
      }).then(function(tx) {
        const {event, args} = tx.logs[0];
        assert.equal(event, "Created");
        assert.equal(args.recipient, recipient);
        assert.equal(args.newContract, newContract);
        return DeployedFactory.recipients.call(recipient, 0);
      }).then(function(newPassiveForwarder) {
        assert(newPassiveForwarder, newContract);
      });
  });

  it("should throw when non-owner calls create", function() {
    return DeployedFactory.create(recipient, {from: other})
      .then(function () {
        assert.fail("should not reach here");
      }).catch(function (err) {
        assert.ok("passed");
      })
  })
});
