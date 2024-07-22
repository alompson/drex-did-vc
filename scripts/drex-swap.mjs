import hardhat from 'hardhat';
const { ethers } = hardhat;

import { parseUnits } from 'ethers';

import { agent } from './veramo/setup.mjs';
import fs from 'fs/promises';
import { HARDHAT_RPC_URL } from './veramo/setup.mjs';

const provider = new ethers.JsonRpcProvider(HARDHAT_RPC_URL);

async function main() {

  
    // Read the contract addresses from the file
    const data = await fs.readFile('deployed_contracts.json', 'utf-8');
    const addresses = JSON.parse(data);

    console.log("Contract addresses:");
    console.log("RealTokenizado:", addresses.RealTokenizado);
    console.log("RealDigital:", addresses.RealDigital);
    console.log("RealTokenSwap:", addresses.RealTokenSwap);

    const A = await provider.getSigner(0);
    const A1 = await provider.getSigner(1);
    const B = await provider.getSigner(2);
    const B1 = await provider.getSigner(3);

    const didA = await agent.didManagerGetByAlias({ alias: 'A' });
    const didA1 = await agent.didManagerGetByAlias({ alias: 'A1' });
    const didB = await agent.didManagerGetByAlias({ alias: 'B' });
    const didB1 = await agent.didManagerGetByAlias({ alias: 'B1' });

    // Get contract instances
    const realTokenizado = await ethers.getContractAt("RealTokenizado", addresses.RealTokenizado);
    const realDigital = await ethers.getContractAt("RealDigital", addresses.RealDigital);
    const swapContract = await ethers.getContractAt("RealTokenSwap", addresses.RealTokenSwap);

    // Mint Real Digital and Real Tokenizado to specific accounts
    await realDigital.mint(await A.getAddress(), 1000); // 1000 RD
    await realDigital.mint(await B.getAddress(), 1000); // 1000 RD
    await realTokenizado.mint(await A1.getAddress(), 1000); // 1000 RT
    await realTokenizado.mint(await B1.getAddress(), 1000); // 1000 RT

    console.log("Tokens Minted");

    // Verify credentials
    const credentialA1 = await agent.verifyCredential({
        credential: {
        credentialSubject: {
            clienteA1: {
            id: 'did:ethr:0x02b727b25e470d7a6a334748424f05296f4e97ac12d323d20096d6ecfe49e34573',
            taxId: '12345678901',
            cnpj8: '12345678',
            bankNumber: '123',
            account: '123456',
            branch: '1234',
            wallet: 'cA1',
            registered: true,
            owner: 'did:ethr:0x02b727b25e470d7a6a334748424f05296f4e97ac12d323d20096d6ecfe49e34573'
            }
        },
        issuer: {
            id: 'did:ethr:0x03da4ce62fa911f9031bdf5a639d605fe0c1ab081d4a6d06acae834144ade8d93b'
        },
        type: [ 'VerifiableCredential' ],
        '@context': [ 'https://www.w3.org/2018/credentials/v1' ],
        issuanceDate: '2024-07-21T12:23:09.000Z',
        proof: {
            type: 'JwtProof2020',
            jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNsaWVudGVBMSI6eyJpZCI6ImRpZDpldGhyOjB4MDJiNzI3YjI1ZTQ3MGQ3YTZhMzM0NzQ4NDI0ZjA1Mjk2ZjRlOTdhYzEyZDMyM2QyMDA5NmQ2ZWNmZTQ5ZTM0NTczIiwidGF4SWQiOiIxMjM0NTY3ODkwMSIsImNucGo4IjoiMTIzNDU2NzgiLCJiYW5rTnVtYmVyIjoiMTIzIiwiYWNjb3VudCI6IjEyMzQ1NiIsImJyYW5jaCI6IjEyMzQiLCJ3YWxsZXQiOiJjQTEiLCJyZWdpc3RlcmVkIjp0cnVlLCJvd25lciI6ImRpZDpldGhyOjB4MDJiNzI3YjI1ZTQ3MGQ3YTZhMzM0NzQ4NDI0ZjA1Mjk2ZjRlOTdhYzEyZDMyM2QyMDA5NmQ2ZWNmZTQ5ZTM0NTczIn19fSwibmJmIjoxNzIxNTY0NTg5LCJpc3MiOiJkaWQ6ZXRocjoweDAzZGE0Y2U2MmZhOTExZjkwMzFiZGY1YTYzOWQ2MDVmZTBjMWFiMDgxZDRhNmQwNmFjYWU4MzQxNDRhZGU4ZDkzYiJ9.Yin1TNWghJJyUPjSo2NQOBy93uszU3hooZTLLFQD8bwd2xN3Lgn2iID1SGyOqoHr1Id9V0vEDBDhYpG_cyA4yw'
        },
        },
    });

    const credentialB1 = await agent.verifyCredential({
        credential: {
            credentialSubject: {
                clienteB1: {
                  id: 'did:ethr:0x037e475632e077f6f23b474c34c5b8a54de6ebf1499f6fdc88c4a0a815f9e2d3ca',
                  taxId: '12345678901',
                  cnpj8: '12345678',
                  bankNumber: '123',
                  account: '123456',
                  branch: '1234',
                  wallet: 'cB1',
                  registered: true,
                  owner: 'did:ethr:0x037e475632e077f6f23b474c34c5b8a54de6ebf1499f6fdc88c4a0a815f9e2d3ca'
                }
              },
              issuer: {
                id: 'did:ethr:0x03639a99ff1b1b8d4ce1bc3ade8836a9f6624c68947c997e63e9c6eb2a3ac2703e'
              },
              type: [ 'VerifiableCredential' ],
              '@context': [ 'https://www.w3.org/2018/credentials/v1' ],
              issuanceDate: '2024-07-21T12:23:09.000Z',
              proof: {
                type: 'JwtProof2020',
                jwt: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNsaWVudGVCMSI6eyJpZCI6ImRpZDpldGhyOjB4MDM3ZTQ3NTYzMmUwNzdmNmYyM2I0NzRjMzRjNWI4YTU0ZGU2ZWJmMTQ5OWY2ZmRjODhjNGEwYTgxNWY5ZTJkM2NhIiwidGF4SWQiOiIxMjM0NTY3ODkwMSIsImNucGo4IjoiMTIzNDU2NzgiLCJiYW5rTnVtYmVyIjoiMTIzIiwiYWNjb3VudCI6IjEyMzQ1NiIsImJyYW5jaCI6IjEyMzQiLCJ3YWxsZXQiOiJjQjEiLCJyZWdpc3RlcmVkIjp0cnVlLCJvd25lciI6ImRpZDpldGhyOjB4MDM3ZTQ3NTYzMmUwNzdmNmYyM2I0NzRjMzRjNWI4YTU0ZGU2ZWJmMTQ5OWY2ZmRjODhjNGEwYTgxNWY5ZTJkM2NhIn19fSwibmJmIjoxNzIxNTY0NTg5LCJpc3MiOiJkaWQ6ZXRocjoweDAzNjM5YTk5ZmYxYjFiOGQ0Y2UxYmMzYWRlODgzNmE5ZjY2MjRjNjg5NDdjOTk3ZTYzZTljNmViMmEzYWMyNzAzZSJ9.apxemkJChWMoymvzFPRBtiBVk46LH3KFJUPsqBpwsCcquIGkq4-XMXLWN_dud4KwDAUgjsfccP1ypf9r7JRxxQ'
              },
        },
    });

    console.log(`Credential verified`, credentialA1.verified);
    console.log(`Credential verified`, credentialB1.verified);

    if (!credentialA1.verified || !credentialB1.verified) {
        throw new Error("Credential verification failed");
    }

    console.log("Credentials Verified");

    // Perform the swap
    const amount = 100; // 100 BRL

    await realTokenizado.approve(await A1.getAddress(), amount);
    await realDigital.approve(await A.getAddress(), amount);

    await swapContract.swap(
        await A1.getAddress(),
        await B1.getAddress(),
        amount,
        await A.getAddress(),
        await B.getAddress()
    );

    console.log("Swap performed successfully");
    }

    main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
