pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PassiveForwarder.sol";

contract testTxFromContract {
  uint256 public initialBalance = 4 ether;
  uint256 private amount = 1 ether;
  address private recipient = 0xdD3c57a6F79219e67985d6ee0C1a8395E8B0edBA;
  PassiveForwarder private pf = new PassiveForwarder(recipient);

  function testReceiving() public {
    address(pf).transfer(amount);
    Assert.equal(address(pf).balance, amount, "Forwarder should receive ETH");
  }

  function testSweeping() public {
    pf.sweep();
    Assert.equal(address(pf).balance, 0, "Forwarder should be empty");
    Assert.equal(address(recipient).balance, amount, "ETH should be forwared to the recipient");
  }
}
