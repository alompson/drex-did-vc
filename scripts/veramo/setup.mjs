import { createAgent } from '@veramo/core';
import { DIDManager } from '@veramo/did-manager';
import { EthrDIDProvider } from '@veramo/did-provider-ethr';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
import { CredentialPlugin } from '@veramo/credential-w3c';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { Resolver } from 'did-resolver';
import { getResolver as ethrDidResolver } from 'ethr-did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';
import { KeyStore, DIDStore, PrivateKeyStore, migrations, Entities } from '@veramo/data-store';
import { DataSource } from 'typeorm';

const DATABASE_FILE = 'database.sqlite';
const KMS_SECRET_KEY = "074afed8f9d50546f5c699d2a989f1dcc8194cea1248634f0c7283f496eb285c";

// Replace this with your deployed DID Registry contract address

export const DID_REGISTRY_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
export const HARDHAT_RPC_URL = 'http://localhost:8545';

const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize();

export const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr',
      providers: {
        'did:ethr': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'hardhat',
          rpcUrl: HARDHAT_RPC_URL,
          registry: DID_REGISTRY_ADDRESS,
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: HARDHAT_RPC_URL }),
        ...webDidResolver(),
      }),
    }),
    new CredentialPlugin(),
  ],
});
