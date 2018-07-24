# Forward Contracts

### Overview
Smart contracts to forward ETH to a pre-defined address.

### Requirements
- Contracts are pre-generated.
- Recipient's address is assigned in the constructor.
- Forwarding happens in a passive mode which requires a trigger to sweep the balance.
- Recipient can call other smart contracts via a proxy method. This is to recover ERC20 mistakenly sent to the Forward contract.
- Stateless.

### Getting started
- Install truffleframework: npm install -g truffle
- Install ganache: `https://truffleframework.com/ganache`
- Run `truffle migrate` to deploy the Forwarder.  The recipient's address is pre-defined in migrations/2_deploy_forwarder.js
- After sending ETH to the Forwarder contract, call `sweep` method to forward the balance to the pre-defined recipient 

### License
[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.txt) &copy; WeTrustPlatform
