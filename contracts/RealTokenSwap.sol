// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./RealDigital.sol";
import "./RealTokenizado.sol";

contract RealTokenSwap is AccessControl {
    RealTokenizado public realTokenizado;  // Retail CBDC
    RealDigital public realDigital;        // Wholesale CBDC


    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    constructor(
        address _realTokenizado,
        address _realDigital,
        address admin
    ) {
        realTokenizado = RealTokenizado(_realTokenizado);
        realDigital = RealDigital(_realDigital);
        
        _grantRole(ADMIN_ROLE, admin);
    }

    //The swap function is used to send RealTokenizado tokens from one wallet to another, following the BACEN specification
    function swap(
        address sender,
        address recipient,
        uint256 amount,
        address senderIF,
        address recipientIF
    ) external onlyRole(ADMIN_ROLE) {
        // Step 1: Approve the swap contract to burn RealTokenizado from sender
        require(realTokenizado.approve(address(this), amount), "Approval failed for burning RealTokenizado");

        // Step 2: Burn the RealTokenizado (Retail CBDC) in the sender's wallet
        realTokenizado.burnFrom(sender, amount);

        // Step 3: Approve the swap contract to transfer RealDigital from senderIF
        require(realDigital.approve(address(this), amount), "Approval failed for transferring RealDigital");

        // Step 4: Transfer the RealDigital (Wholesale CBDC) from senderIF to recipientIF
        realDigital.transferFromTokens(senderIF, recipientIF, amount);

        // Step 5: Mint the RealTokenizado (Retail CBDC) in the recipient's wallet
        realTokenizado.mint(recipient, amount);
    }
}
