<<<<<<< HEAD
# Projeto DREX DID VC

TCC sobre identidades descentralizadas e credenciais verificáveis para o DREX
=======

Este projeto implementa uma solução de Identidade Descentralizada (DID) e Credenciais Verificáveis (VC) para o sistema de transações DREX. O objetivo é garantir a privacidade dos dados dos clientes, mantendo-os off-chain e utilizando uma rede local para simulação.

## Estrutura do Projeto

### Contratos Inteligentes

1. **EthereumDIDRegistry.sol**
   - Contrato para registro de DIDs na rede Ethereum.
   
2. **RealDigital.sol**
   - Implementação de um token ERC20 para representar o Real Digital.
   
3. **RealTokenizado.sol**
   - Implementação de um token ERC20 para representar o Real Tokenizado.
   
4. **RealTokenSwap.sol**
   - Contrato para a realização de swaps entre Real Digital e Real Tokenizado.

### Scripts de Interação

1. **setup.mjs**
   - Configuração do agente Veramo e conexão com o banco de dados SQLite.
   
2. **deploy-contracts.mjs**
   - Script para deploy dos contratos inteligentes na rede local usando Hardhat.
   
3. **drex-create-dids.mjs**
   - Script para criação de DIDs para os participantes da rede.
   
4. **drex-issue-credentials.mjs**
   - Script para emissão de credenciais verificáveis (VCs) para os participantes da rede.
   
5. **drex-swap.mjs**
   - Script para realizar swaps entre Real Digital e Real Tokenizado.

## Dependências

Este projeto utiliza as seguintes bibliotecas:

- **OpenZeppelin**: Conjunto de bibliotecas para desenvolvimento de contratos inteligentes seguros e padrões.
- **Ethers.js**: Biblioteca para interagir com a blockchain Ethereum.
- **Veramo**: Framework para gerenciamento de identidades descentralizadas e emissão de credenciais verificáveis.

