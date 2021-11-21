pragma solidity ^0.5.0;

contract Exchange {
// Deposit & Withdraw Funds
// Manage Orders - Make or Cancel
// Handle Trades - Change fees
/*
TODO:
[X] Set the fee account
[] Deposit Ether
[] Withdraw Ether
[] Deposit tokens
[] Withdraw tokens
[] Check balances
[] Make order 
[] Cancel order
[] Fill order
[] Charge fees
*/

//Variables
    address public feeAccount; // The account receives exchange fees 
    uint256 public feePercent; // The fee Percent
    constructor (address _feeAccount, uint256 _feePercent) public {
        // setting the fee account
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

}