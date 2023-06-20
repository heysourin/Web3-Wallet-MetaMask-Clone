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
    rpcUrl: '<YOUR-RPC-URL>',
};

export const mainnet: Chain = {
    chainId: '1',
    name: 'Ethereum',
    blockExplorerUrl: 'https://etherscan.io',
    rpcUrl: '<YOUR-RPC-URL>',
};

export const CHAINS_CONFIG = {
    [mumbai.chainId]: mumbai,
    [mainnet.chainId]: mainnet,
};