pragma solidity ^0.4.24;

import "./PassiveForwarder.sol";

contract PassiveForwarderFactory {

  address public owner;
  mapping(address => address[]) public recipients;

  event Created(address indexed recipient, address indexed newContract);

  constructor(address _owner) public {
    owner = _owner;
  }

  function create(address recipient) public returns (address newContract){
    require(msg.sender == owner, "Sender must be the owner.");

    PassiveForwarder pf = new PassiveForwarder(recipient);
    recipients[recipient].push(pf);
    emit Created(recipient, address(pf));
    return pf;
  }

  function getNumberOfContracts(address recipient) public view returns (uint256) {
    return recipients[recipient].length;
  }
}
