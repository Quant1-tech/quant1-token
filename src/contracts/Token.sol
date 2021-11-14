pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token {
    using SafeMath for uint;

    //Variables
    string public name = "Quant1 Token";
    string public symbol = "QUT";
    uint256 public decimals = 18;
    uint256 public totalSupply; 
    //Track balances
    mapping(address => uint256) public balanceOf;

    //Events
    event Transfer(address indexed from,address indexed to, uint256 value);

    //Send tokens 
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(_to != address(0));
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool succes) {
        require(_from != address(0));
        require(_to != address(0));
        require(balanceOf[_from]>= _value);

        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);

        emit Transfer(_from, _to, _value);
        return true;
    }
    constructor() public {
        totalSupply= 1000000000000 * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }
}