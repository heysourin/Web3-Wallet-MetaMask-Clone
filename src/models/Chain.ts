export type Chain = {
    chainId: string;
    name: string;
    blockExplorerUrl: string;
    rpcUrl: string;
  };
  
export const mumbai: Chain = {
    chainId: '80001',
    name: 'Polygon Testnet Mumbai',
    blockExplorerUrl: 'https://mumbai.polygonscan.com ',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/mpvjvqD4pWuqbecrNS04vl',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://mainnet.infura.io/v3/a7a636ee4960455',
};

export const CHAINS_CONFIG = {
    [mumbai.chainId]: mumbai,
    [mainnet.chainId]: mainnet,
};