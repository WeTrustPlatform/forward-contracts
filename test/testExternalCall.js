const Forwarder = artifacts.require('PassiveForwarder');
const ERC20 = artifacts.require('lib/test/ERC20.sol');

contract('PassiveForwarder', (accounts) => {
  const coinbase = accounts[0];
  const recipient = accounts[1];
  const amount = web3.toWei('1', 'ether');

  let DeployedForwarder;
  let DeployedERC20;

  it('should be able to transfer ERC20', () => ERC20.new(coinbase).then((erc20Instance) => {
    // deploy forwarder and erc20
    DeployedERC20 = erc20Instance;
    return Forwarder.new(recipient);
  }).then((forwarderInstance) => {
    DeployedForwarder = forwarderInstance;
    // transfer TRST to forwarder by calling ERC20 directly
    return DeployedERC20.transfer(DeployedForwarder.address, amount);
  }).then(() => DeployedERC20.balanceOf(DeployedForwarder.address))
    .then((balance) => {
      assert.equal(balance, amount, "Check Forwarder's balance");

      const contract = web3.eth.contract(DeployedERC20.abi).at(DeployedERC20);
      const data = contract.transfer.getData(recipient, amount);
      // recipient can claim ERC20 via the proxy externalCall
      return DeployedForwarder.externalCall(
        DeployedERC20.address,
        0,
        data,
        { from: recipient },
      );
    })
    .then(() => DeployedERC20.balanceOf(recipient))
    .then((balance) => {
      assert.equal(balance, amount, "Check Recipient's balance");
    }));
});
