pragma solidity ^0.4.24;

/// @title Smart contract for forwarding ETH to a pre-defined recipient. Minimal version.
/// @author WeTrustPlatform
contract BasicForwarder {
  address public recipient;

  constructor(address _recipient) public {
    recipient = _recipient;
  }

  function () public payable {
    recipient.transfer(msg.value);
  }
}
