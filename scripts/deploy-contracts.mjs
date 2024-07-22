import hardhat from 'hardhat';
const { ethers } = hardhat;

import fs from 'fs/promises';

import { HARDHAT_RPC_URL } from './veramo/setup.mjs';

const provider = new ethers.JsonRpcProvider(HARDHAT_RPC_URL);

async function main() {
    const A = await provider.getSigner(0);
    const A1 = await provider.getSigner(1);
    const B = await provider.getSigner(2);
    const B1 = await provider.getSigner(3);

  console.log("Deploying contracts with the account:", A.getAddress());

  // Deploy RealTokenizado contract with required arguments
  const RealTokenizado = await ethers.getContractFactory("RealTokenizado");
  const realTokenizado = await RealTokenizado.deploy("RealTokenizadoName", "RT", await A.getAddress());
  await realTokenizado.waitForDeployment();
  console.log("RealTokenizado deployed to:", await realTokenizado.getAddress());

  // Deploy RealDigital contract with required arguments
  const RealDigital = await ethers.getContractFactory("RealDigital");
  const realDigital = await RealDigital.deploy("RealDigitalName", "RD", await A.getAddress());
  await realDigital.waitForDeployment();
  console.log("RealDigital deployed to:", await realDigital.getAddress());

  // Deploy RealTokenSwap contract
  const RealTokenSwap = await ethers.getContractFactory("RealTokenSwap");
  const swapContract = await RealTokenSwap.deploy(await realTokenizado.getAddress(), await realDigital.getAddress(), await A.getAddress());
  await swapContract.waitForDeployment();

  console.log("RealTokenSwap deployed to:", await swapContract.getAddress());

  // Deploy EthereumDIDRegistry contract
  const EthereumDIDRegistry = await ethers.getContractFactory("EthereumDIDRegistry");
  const ethereumDIDRegistry = await EthereumDIDRegistry.deploy();
  await ethereumDIDRegistry.waitForDeployment();
  console.log("EthereumDIDRegistry deployed to:", await ethereumDIDRegistry.getAddress());

  // Save the contract addresses to a file
  const addresses = {
    RealTokenizado: await realTokenizado.getAddress(),
    RealDigital: await realDigital.getAddress(),
    RealTokenSwap: await swapContract.getAddress(),
    EthereumDIDRegistry: await ethereumDIDRegistry.getAddress()
  };

    // Grant roles
    await realTokenizado.grantBurnerRole(await A.getAddress());
    await realTokenizado.grantMinterRole(await A.getAddress());
    await realTokenizado.grantBurnerRole(await B.getAddress());
    await realTokenizado.grantMinterRole(await B.getAddress());

    await realDigital.grantBurnerRole(await A.getAddress());
    await realDigital.grantMinterRole(await A.getAddress());
    await realDigital.grantBurnerRole(await B.getAddress());
    await realDigital.grantMinterRole(await B.getAddress());


  await fs.writeFile('deployed_contracts.json', JSON.stringify(addresses, null, 2));
  console.log("Contract addresses saved to deployed_contracts.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
