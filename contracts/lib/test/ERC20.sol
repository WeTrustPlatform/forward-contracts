pragma solidity ^0.4.24;

/**
 * @title ERC20
 * Courtesy of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/BasicToken.sol
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
contract ERC20 {

  mapping(address => uint256) balances;

  uint256 totalSupply_ = 10 * (10 ** 18);

  constructor(address creator) public {
    balances[creator] = totalSupply_;
  }

  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  /**
  * @dev Transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
    require(_to != address(0));

    balances[msg.sender] = balances[msg.sender] - _value;
    balances[_to] = balances[_to] + _value;
    return true;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }
}
