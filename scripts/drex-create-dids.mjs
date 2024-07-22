import hardhat from 'hardhat';
const { ethers } = hardhat;
import { promises as fs } from 'fs';

import { agent } from './veramo/setup.mjs';
import { HARDHAT_RPC_URL } from './veramo/setup.mjs';
const provider = new ethers.JsonRpcProvider(HARDHAT_RPC_URL);

async function main() {
    const A = await provider.getSigner(0);
    const A1 = await provider.getSigner(1);
    const B = await provider.getSigner(2);
    const B1 = await provider.getSigner(3);

    console.log("Using accounts:");
    console.log("  A:", await A.getAddress());
    console.log("  A1:", await A1.getAddress());
    console.log("  B:", await B.getAddress());
    console.log("  B1:", await B1.getAddress());

    const didA = await agent.didManagerCreate({ alias: 'A', provider: 'did:ethr' });
    const didA1 = await agent.didManagerCreate({ alias: 'A1', provider: 'did:ethr' });
    const didB = await agent.didManagerCreate({ alias: 'B', provider: 'did:ethr' });
    const didB1 = await agent.didManagerCreate({ alias: 'B1', provider: 'did:ethr' });

    console.log("DIDs Created:");
    console.log("DID A:", didA);
    console.log("DID A1:", didA1);
    console.log("DID B:", didB);
    console.log("DID B1:", didB1);

}

main().catch(console.error);
