import { agent } from './veramo/setup.mjs';

async function main() {
    const identifiers = await agent.didManagerFind();

    if (identifiers.length > 0) {
      identifiers.map((id) => {
        console.log(id)
        console.log('..................')
      })
    }

  // Assume DIDs have already been created and fetched from the previous script
  const didA = await agent.didManagerGetByAlias({ alias: 'A' });
  const didA1 = await agent.didManagerGetByAlias({ alias: 'A1' });
  const didB = await agent.didManagerGetByAlias({ alias: 'B' });
  const didB1 = await agent.didManagerGetByAlias({ alias: 'B1' });



  const credentialA1 = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: didA.did },
      credentialSubject: {
        "clienteA1": {
            "id": didA1.did,
            "taxId": "12345678901",
            "cnpj8": "12345678",
            "bankNumber": "123",
            "account": "123456",
            "branch": "1234",
            "wallet": "cA1",
            "registered": true,
            "owner": didA1.did
          }
      },
      issuanceDate: new Date().toISOString(),
      type: ['VerifiableCredential'],
      '@context': ['https://www.w3.org/2018/credentials/v1'],
    },
    proofFormat: 'jwt',
  });

  const credentialB1 = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: didB.did },
      credentialSubject: {
        "clienteB1": {
            "id": didB1.did,
            "taxId": "12345678901",
            "cnpj8": "12345678",
            "bankNumber": "123",
            "account": "123456",
            "branch": "1234",
            "wallet": "cB1",
            "registered": true,
            "owner": didB1.did
          }
      },
      issuanceDate: new Date().toISOString(),
      type: ['VerifiableCredential'],
      '@context': ['https://www.w3.org/2018/credentials/v1'],
    },
    proofFormat: 'jwt',
  });

  console.log("Credentials Issued:");
  console.log("Credential A1:", credentialA1);
  console.log("Credential B1:", credentialB1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
