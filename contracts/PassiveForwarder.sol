pragma solidity ^0.4.24;

import "./ExternalCallForwarder.sol";

/// @title Smart contract for forwarding ETH to a pre-defined recipient in the passive mode i.e. someone has to trigger the transfer.
/// ExternalCallForwarder allows recipient to call any smart contracts. For example: Calling Trustcoin smart contract to transfer TRST.
/// @author WeTrustPlatform
contract PassiveForwarder is ExternalCallForwarder {
  /// @dev recipient could be a normal account or a smart contract with the payable fallback method.
  /// @notice if recipient is a smart contract without the payable fallback method, fund will be *stuck*.
  address public recipient;
  event Received(address indexed sender, uint256 indexed value);

  constructor(address _recipient) ExternalCallForwarder(_recipient) public {
    recipient = _recipient;
  }

  function () public payable {
    emit Received(msg.sender, msg.value);
  }

  function sweep() public returns (bool) {
    /// @dev using .call to be compatible with non-standard payable fallback method
    /// i.e. the target smart contract might have fallback method require more than 2300 gas
    return recipient.call.value(address(this).balance)();
  }
}
