module.exports = {"ERC20":{"abi":[{"inputs":[{"name":"creator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],"bytecode":"0x6080604052678ac7230489e8000060015534801561001c57600080fd5b50604051602080610455833981018060405281019080805190602001909291905050506001546000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550506103c1806100946000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806318160ddd1461005c57806370a0823114610087578063a9059cbb146100de575b600080fd5b34801561006857600080fd5b50610071610143565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100c8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061014d565b6040518082815260200191505060405180910390f35b3480156100ea57600080fd5b50610129600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610195565b604051808215151515815260200191505060405180910390f35b6000600154905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156101e457600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561022057600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050929150505600a165627a7a72305820e133ff7141a92825f13db9724493bb3c0143bb87407ad91e2d28b97fe368433e0029","sourceMap":"358:1180:3:-;;;442:5;419:28;;544:79;8:9:-1;5:2;;;30:1;27;20:12;5:2;544:79:3;;;;;;;;;;;;;;;;;;;;;;;;;;;;;606:12;;586:8;:17;595:7;586:17;;;;;;;;;;;;;;;:32;;;;544:79;358:1180;;;;;;","source":"pragma solidity ^0.4.24;\n\n/**\n * @title ERC20\n * This contract is used for testing the method 'externalCall' which allows the recipient to call other contracts\n * via the Forwarder\n * Courtesy of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/BasicToken.sol\n * @dev see https://github.com/ethereum/EIPs/issues/20\n */\ncontract ERC20 {\n\n  mapping(address => uint256) balances;\n\n  uint256 totalSupply_ = 10e18;\n\n  event Transfer(\n    address indexed from,\n    address indexed to,\n    uint256 value\n  );\n\n  constructor(address creator) public {\n    balances[creator] = totalSupply_;\n  }\n\n  /**\n  * @dev Total number of tokens in existence\n  */\n  function totalSupply() public view returns (uint256) {\n    return totalSupply_;\n  }\n\n  /**\n  * @dev Transfer token for a specified address\n  * @param _to The address to transfer to.\n  * @param _value The amount to be transferred.\n  */\n  function transfer(address _to, uint256 _value) public returns (bool) {\n    require(_value <= balances[msg.sender]);\n    require(_to != address(0));\n\n    balances[msg.sender] = balances[msg.sender] - _value;\n    balances[_to] = balances[_to] + _value;\n    emit Transfer(msg.sender, _to, _value);\n    return true;\n  }\n\n  /**\n  * @dev Gets the balance of the specified address.\n  * @param _owner The address to query the the balance of.\n  * @return An uint256 representing the amount owned by the passed address.\n  */\n  function balanceOf(address _owner) public view returns (uint256) {\n    return balances[_owner];\n  }\n}\n","compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"schemaVersion":"2.0.1"},"Migrations":{"abi":[{"constant":true,"inputs":[],"name":"last_completed_migration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"completed","type":"uint256"}],"name":"setCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"new_address","type":"address"}],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506102f8806100606000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630900f01014610067578063445df0ac146100aa5780638da5cb5b146100d5578063fdacd5761461012c575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610159565b005b3480156100b657600080fd5b506100bf610241565b6040518082815260200191505060405180910390f35b3480156100e157600080fd5b506100ea610247565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013857600080fd5b506101576004803603810190808035906020019092919050505061026c565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561023d578190508073ffffffffffffffffffffffffffffffffffffffff1663fdacd5766001546040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050600060405180830381600087803b15801561022457600080fd5b505af1158015610238573d6000803e3d6000fd5b505050505b5050565b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102c957806001819055505b505600a165627a7a72305820b6514daaad8d4f7309bb5661a8f897b7250084929b3452042a7a8f357a8c4d510029","sourceMap":"26:480:0:-;;;178:50;8:9:-1;5:2;;;30:1;27;20:12;5:2;178:50:0;213:10;205:5;;:18;;;;;;;;;;;;;;;;;;26:480;;;;;;","source":"pragma solidity ^0.4.24;\n\ncontract Migrations {\n  address public owner;\n  uint public last_completed_migration;\n\n  modifier restricted() {\n    if (msg.sender == owner) _;\n  }\n\n  constructor() public {\n    owner = msg.sender;\n  }\n\n  function setCompleted(uint completed) public restricted {\n    last_completed_migration = completed;\n  }\n\n  function upgrade(address new_address) public restricted {\n    Migrations upgraded = Migrations(new_address);\n    upgraded.setCompleted(last_completed_migration);\n  }\n}\n","compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"schemaVersion":"2.0.1"},"PassiveForwarder":{"abi":[{"constant":true,"inputs":[],"name":"recipient","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_recipient","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Received","type":"event"},{"constant":false,"inputs":[],"name":"sweep","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"externalCall","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b5060405160208061041583398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610392806100836000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806335faa416146100b6578063397750b2146100cd57806366d003ac14610178575b60003411151561006657600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f88525874346040518082815260200191505060405180910390a2005b3480156100c257600080fd5b506100cb6101cf565b005b3480156100d957600080fd5b5061015e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610250565b604051808215151515815260200191505060405180910390f35b34801561018457600080fd5b5061018d610341565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015801561024d573d6000803e3d6000fd5b50565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610319576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f53656e646572206d7573742062652074686520726563697069656e742e00000081525060200191505060405180910390fd5b835191506040516020850160008285838a8c6187965a03f19250505080925050509392505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582076988b553ae8e72290b1a426255a516ced812983bdd4c706ad6e21b75df878610029","sourceMap":"310:1805:0:-;;;573:72;8:9:-1;5:2;;;30:1;27;20:12;5:2;573:72:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;630:10;618:9;;:22;;;;;;;;;;;;;;;;;;573:72;310:1805;;;;;;","source":"pragma solidity ^0.4.24;\n\n/// @title Smart contract for forwarding ETH to a pre-defined recipient in the passive mode i.e. someone has to trigger the transfer.\n/// It also allows recipient to call any smart contracts. For example: Calling Trustcoin smart contract to transfer TRST.\n/// @author WeTrustPlatform\ncontract PassiveForwarder {\n  /// @dev recipient must be a normal account or a smart contract with the standard payable fallback method.\n  /// Otherwise, fund will be stuck!\n  address public recipient;\n\n  event Received(address indexed sender, uint256 value);\n\n  constructor(address _recipient) public {\n    recipient = _recipient;\n  }\n\n  function () public payable {\n    require(msg.value > 0);\n    emit Received(msg.sender, msg.value);\n  }\n\n  function sweep() public {\n    recipient.transfer(address(this).balance);\n  }\n\n  /// @dev Courtesy of https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWallet.sol\n  /// This method allows the pre-defined recipient to call other smart contracts.\n  function externalCall(address destination, uint256 value, bytes data) public returns (bool) {\n    require(msg.sender == recipient, \"Sender must be the recipient.\");\n    uint256 dataLength = data.length;\n    bool result;\n    assembly {\n      let x := mload(0x40)   // \"Allocate\" memory for output (0x40 is where \"free memory\" pointer is stored by convention)\n      let d := add(data, 32) // First 32 bytes are the padded length of data, so exclude that\n      result := call(\n        sub(gas, 34710),     // 34710 is the value that solidity is currently emitting\n                             // It includes callGas (700) + callVeryLow (3, to pay for SUB) + callValueTransferGas (9000) +\n                             // callNewAccountGas (25000, in case the destination address does not exist and needs creating)\n        destination,\n        value,\n        d,\n        dataLength,          // Size of the input (in bytes) - this is what fixes the padding problem\n        x,\n        0                    // Output is ignored, therefore the output size is zero\n      )\n    }\n    return result;\n  }\n}\n","compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"schemaVersion":"2.0.1"},"PassiveForwarderFactory":{"abi":[{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recipients","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"recipient","type":"address"},{"indexed":true,"name":"newContract","type":"address"}],"name":"Created","type":"event"},{"constant":false,"inputs":[{"name":"recipient","type":"address"}],"name":"create","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getNumberOfContracts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b506040516020806109e283398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061095f806100836000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806372e3bae3146100675780638da5cb5b146100be5780639ed9331814610115578063ea8b902514610198575b600080fd5b34801561007357600080fd5b506100a8600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610225565b6040518082815260200191505060405180910390f35b3480156100ca57600080fd5b506100d3610271565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561012157600080fd5b50610156600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610296565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a457600080fd5b506101e3600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104c1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561035d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f53656e646572206d75737420626520746865206f776e65722e0000000000000081525060200191505060405180910390fd5b8261036661050e565b808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f0801580156103b8573d6000803e3d6000fd5b509050600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f587ece4cd19692c5be1a4184503d607d45542d2aca0698c0068f52e09ccb541c60405160405180910390a380915050919050565b6001602052816000526040600020818154811015156104dc57fe5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6040516104158061051f833901905600608060405234801561001057600080fd5b5060405160208061041583398101806040528101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610392806100836000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806335faa416146100b6578063397750b2146100cd57806366d003ac14610178575b60003411151561006657600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f88525874346040518082815260200191505060405180910390a2005b3480156100c257600080fd5b506100cb6101cf565b005b3480156100d957600080fd5b5061015e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610250565b604051808215151515815260200191505060405180910390f35b34801561018457600080fd5b5061018d610341565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015801561024d573d6000803e3d6000fd5b50565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610319576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f53656e646572206d7573742062652074686520726563697069656e742e00000081525060200191505060405180910390fd5b835191506040516020850160008285838a8c6187965a03f19250505080925050509392505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a7230582076988b553ae8e72290b1a426255a516ced812983bdd4c706ad6e21b75df878610029a165627a7a723058204e29ec756ab4fe6ace11cc4d43504c116e033dd9817c284617b56fa192c747b40029","sourceMap":"186:832:1:-;;;484:60;8:9:-1;5:2;;;30:1;27;20:12;5:2;484:60:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;533:6;525:5;;:14;;;;;;;;;;;;;;;;;;484:60;186:832;;;;;;","source":"pragma solidity ^0.4.24;\n\nimport \"./PassiveForwarder.sol\";\n\n/// @dev This contract is used for creating the Forwarder.\n/// It also keeps track of all the Forwarders and their recipients\ncontract PassiveForwarderFactory {\n\n  address public owner;\n\n  /// @dev This will generate a public getter with two parameters\n  /// recipient address and contract index\n  mapping(address => address[]) public recipients;\n\n  event Created(address indexed recipient, address indexed newContract);\n\n  constructor(address _owner) public {\n    owner = _owner;\n  }\n\n  function create(address recipient) public returns (address){\n    require(msg.sender == owner, \"Sender must be the owner.\");\n\n    PassiveForwarder pf = new PassiveForwarder(recipient);\n    recipients[recipient].push(pf);\n    emit Created(recipient, pf);\n    return pf;\n  }\n\n  /// @dev This method helps iterate through the recipients mapping\n  function getNumberOfContracts(address recipient) public view returns (uint256) {\n    return recipients[recipient].length;\n  }\n}\n","compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"schemaVersion":"2.0.1"},"SweepProxy":{"abi":[{"constant":false,"inputs":[{"name":"forwarders","type":"address[]"}],"name":"sweep","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b50610197806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063780469bb14610046575b600080fd5b34801561005257600080fd5b506100aa600480360381019080803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091929192905050506100ac565b005b600080600083519250600091505b828210156101655783828151811015156100d057fe5b9060200190602002015190508073ffffffffffffffffffffffffffffffffffffffff166335faa4166040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401600060405180830381600087803b15801561014057600080fd5b505af1158015610154573d6000803e3d6000fd5b5050505081806001019250506100ba565b505050505600a165627a7a7230582031969b0c60af115805832cea02fbcad36fc3f23e517ee83f89f02503475028ce0029","sourceMap":"197:232:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;197:232:1;;;;;;;","source":"pragma solidity ^0.4.24;\n\nimport \"./PassiveForwarder.sol\";\n\n/// @title Smart contract for calling the sweep function of more than one PassiveForwarder in a single call.\n/// @author WeTrustPlatform\ncontract SweepProxy {\n\n  function sweep(address[] forwarders) public {\n    uint len = forwarders.length;\n    for (uint i = 0; i < len; i++) {\n      PassiveForwarder pf = PassiveForwarder(forwarders[i]);\n      pf.sweep();\n    }\n  }\n}\n","compiler":{"name":"solc","version":"0.4.24+commit.e67f0147.Emscripten.clang"},"schemaVersion":"2.0.1"}};