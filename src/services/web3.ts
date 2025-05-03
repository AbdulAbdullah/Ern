import injectedModule from '@web3-onboard/injected-wallets';
import { init } from '@web3-onboard/react';

const injected = injectedModule();

const INFURA_PROJECT_ID = import.meta.env.VITE_INFURA_PROJECT_ID;

export const web3onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0x2105', // 8453 in hex
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    },
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`
    },
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`
    }
  ],
  appMetadata: {
    name: 'Civic Auth Demo',
    icon: '<svg>...</svg>',
    description: 'Demo app with Civic Auth integration',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  },
  connect: {
    autoConnectLastWallet: false,
    removeWhereIsMyWalletWarning: true
  }
});