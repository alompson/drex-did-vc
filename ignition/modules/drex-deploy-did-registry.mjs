import hardhat from 'hardhat';
const { ethers } = hardhat;

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const EthereumDIDRegistryFactory = await ethers.getContractFactory("EthereumDIDRegistry");
    console.log("Deploying EthereumDIDRegistry...");

    const didRegistry = await EthereumDIDRegistryFactory.deploy();

    // Wait for the deployment to be mined
    await didRegistry.deployTransaction.wait();

    console.log("EthereumDIDRegistry deployed at address:", didRegistry.address);

    // Get the ABI from the contract instance
    const abi = EthereumDIDRegistryFactory.interface.format(ethers.utils.FormatTypes.json);

    console.log("ABI:", abi);
}

main().catch((error) => {
    console.error("Error during contract deployment:", error);
    process.exitCode = 1;
});
