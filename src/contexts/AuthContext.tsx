import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { BrowserProvider } from 'ethers';

interface AuthContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isConnected: false,
  address: null,
  connect: async () => {},
  disconnect: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const setupWallet = async () => {
      if (wallet?.provider && wallet?.accounts[0]?.address) {
        try {
          const provider = new BrowserProvider(wallet.provider);
          const network = await provider.getNetwork();
          setAddress(wallet.accounts[0].address);

          console.log('Connected to network:', {
            chainId: network.chainId,
            name: network.name
          });
        } catch (err) {
          console.error('Error setting up wallet:', err);
          setAddress(null);
        }
      } else {
        setAddress(null);
      }
    };

    setupWallet();
  }, [wallet]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Connection error:', err);
      throw err;
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect({ label: wallet?.label || '' });
    } catch (err) {
      console.error('Disconnect error:', err);
      throw err;
    }
  };

  const value = {
    isConnected: !!wallet,
    address,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);