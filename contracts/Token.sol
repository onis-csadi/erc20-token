//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

    constructor(uint256 supply) ERC20("Token", "TKN"){
        _mint(msg.sender, supply * (10**decimals()));
    }
}