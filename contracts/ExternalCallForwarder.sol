pragma solidity ^0.4.24;
import "./BasicForwarder.sol";

/// @title Smart contract for forwarding ETH and external calls to a pre-defined recipient
/// @author WeTrustPlatform
contract ExternalCallForwarder is BasicForwarder {
  address public recipient;

  modifier onlyRecipient() {
    if (msg.sender == recipient) _;
  }

  constructor(address _recipient) BasicForwarder(_recipient) public {
    recipient = _recipient;
  }

  /// @dev Courtesy of https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWallet.sol
  /// This method allows the recipient to call other smart contracts.
  function execute(address destination, uint256 value, bytes data) public onlyRecipient returns (bool) {
    uint256 dataLength = data.length;
    bool result;
    assembly {
      let x := mload(0x40)   // "Allocate" memory for output (0x40 is where "free memory" pointer is stored by convention)
      let d := add(data, 32) // First 32 bytes are the padded length of data, so exclude that
      result := call(
        sub(gas, 34710),   // 34710 is the value that solidity is currently emitting
                           // It includes callGas (700) + callVeryLow (3, to pay for SUB) + callValueTransferGas (9000) +
                           // callNewAccountGas (25000, in case the destination address does not exist and needs creating)
        destination,
        value,
        d,
        dataLength,        // Size of the input (in bytes) - this is what fixes the padding problem
        x,
        0                  // Output is ignored, therefore the output size is zero
      )
    }
    return result;
  }
}
