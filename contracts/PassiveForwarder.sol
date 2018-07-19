pragma solidity ^0.4.24;

/// @title Smart contract for forwarding ETH to a pre-defined recipient in the passive mode.  I.e. someone has to trigger the transfer.
/// @author WeTrustPlatform
contract PassiveForwarder {
  /// @notice this address should be of regular account. Otherwise, sweep will fail because the gas limit for .transfer is 2300
  address public recipient;
  event Received(address sender, uint256 value);

  constructor(address _recipient) public {
    recipient = _recipient;
  }

  function () public payable {
    emit Received(msg.sender, msg.value);
  }

  function sweep() public {
    recipient.transfer(address(this).balance);
  }
}
