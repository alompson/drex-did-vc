//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RealDigital is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(
        string memory name,
        string memory symbol,
        address authority
    ) ERC20(name, symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, authority);
        _grantRole(MINTER_ROLE, authority);
        _grantRole(BURNER_ROLE, authority);
    }

    function mint(address account, uint256 amount) external {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _mint(account, amount);
    }

    function burnFrom(address account, uint256 amount) external {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(account, amount);
    }

    //the function transferTokens is used to transfer tokens to a specific address.
    function transferTokens(address recipient, uint256 amount) external returns (bool) {
        return transfer(recipient, amount);
    }

    function approveTokens(address spender, uint256 amount) external returns (bool) {
        return approve(spender, amount);
    }

    function transferFromTokens(address sender, address recipient, uint256 amount) external returns (bool) {
        return transferFrom(sender, recipient, amount);
    }

    function grantMinterRole(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _grantRole(MINTER_ROLE, account);
    }

    function grantBurnerRole(address account) external {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _grantRole(BURNER_ROLE, account);
    }
}
