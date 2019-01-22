pragma solidity ^0.4.24;

import "./PassiveForwarder.sol";

/// @title Smart contract for calling the sweep function of more than one PassiveForwarder in a single call.
/// @author WeTrustPlatform
contract SweepProxy {

  function sweep(address[] forwarders) public {
    uint len = forwarders.length;
    for (uint i = 0; i < len; i++) {
      PassiveForwarder pf = PassiveForwarder(forwarders[i]);
      pf.sweep();
    }
  }
}
