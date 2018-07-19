pragma solidity ^0.4.24;

/// @title Smart contract for forwarding ETH to a pre-defined recipient in the passive mode.  I.e. someone has to trigger the transfer.
/// @author WeTrustPlatform
contract PassiveForwarder {
  address public recipient;
  event Received(address indexed sender, uint256 indexed value);

  constructor(address _recipient) public {
    recipient = _recipient;
  }

  function () public payable {
    emit Received(msg.sender, msg.value);
  }

  function sweep() public {
    /// @dev using .call to be compatible with non-standard smartcontract's fallback method
    /// i.e. the targeted smart contract might have fallback method require more than 2300 gas
    require(recipient.call.value(address(this).balance)());
  }
}
