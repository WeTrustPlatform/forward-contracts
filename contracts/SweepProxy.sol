pragma solidity ^0.4.24;

import "./PassiveForwarder.sol";

/// @title Smart contract for calling the sweep function of more than one PassiveForwarder in a single call.
/// @author WeTrustPlatform
contract SweepProxy {

  function sweep(address[] forwarders) public {
    for (uint i = 0; i < forwarders.length; i++) {
      PassiveForwarder pf = new PassiveForwarder(forwarders[i]);
      pf.sweep();
    }
  }
}
