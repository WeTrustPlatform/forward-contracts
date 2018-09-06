pragma solidity ^0.4.24;

import "./PassiveForwarder.sol";

/// @dev This contract is used for creating the Forwarder.
/// It also keeps track of all the Forwarders and their recipients
contract PassiveForwarderFactory {

  address public owner;

  /// @dev This will generate a public getter with two parameters
  /// recipient address and contract index
  mapping(address => address[]) public recipients;

  event Created(address indexed recipient, address indexed newContract);

  constructor(address _owner) public {
    owner = _owner;
  }

  function create(address recipient) public returns (address){
    require(msg.sender == owner, "Sender must be the owner.");

    PassiveForwarder pf = new PassiveForwarder(recipient);
    recipients[recipient].push(pf);
    emit Created(recipient, pf);
    return pf;
  }

  /// @dev This method helps iterate through the recipients mapping
  function getNumberOfContracts(address recipient) public view returns (uint256) {
    return recipients[recipient].length;
  }
}
