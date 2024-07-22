//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RealTokenizado is ERC20, AccessControl {
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(
        string memory name,
        string memory symbol,
        address authority
    ) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, authority);
    }

    //the function burnFrom is used to burn tokens from a specific wallet.
    function burnFrom(address account, uint256 amount) external {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(account, amount);
    }

    //the function mint is used to mint tokens to a specific address.
    function mint(address account, uint256 amount) external {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(account, amount);
    }

    //the function grantBurnerRole is used to grant a specific address the role of burner.
    function grantBurnerRole(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _grantRole(BURNER_ROLE, account);
    }

    //the function grantMinterRole is used to grant a specific address the role of minter.
    function grantMinterRole(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _grantRole(MINTER_ROLE, account);
    }

    //the functiom approveTokens is used to approve a specific amount of tokens to a spender.
    function approveTokens(address spender, uint256 amount) external returns (bool) {
        return approve(spender, amount);
    }
}
