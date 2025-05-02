import React, { createContext, useContext, useState, useEffect } from 'react';
import { useConnectWallet } from '@web3-onboard/react';
import { GatewayProvider } from '@civic/ethereum-gateway-react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

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

export const CIVIC_GATEKEEPER_NETWORK = import.meta.env.VITE_CIVIC_GATEKEEPER_NETWORK;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | undefined>(undefined);

  useEffect(() => {
    const setupWallet = async () => {
      if (wallet?.provider && wallet?.accounts[0]?.address) {
        try {
          const newProvider = new BrowserProvider(wallet.provider);
          setProvider(newProvider);
          const newSigner = await newProvider.getSigner();
          setSigner(newSigner);
          setAddress(wallet.accounts[0].address);

          // Log chain info for debugging
          const network = await newProvider.getNetwork();
          console.log('Connected to network:', {
            chainId: network.chainId,
            name: network.name
          });
        } catch (err) {
          console.error('Error setting up wallet:', err);
          setProvider(undefined);
          setSigner(null);
          setAddress(null);
        }
      } else {
        setProvider(undefined);
        setSigner(null);
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

  // Create wallet configuration for Civic
  const civicWallet = (provider && signer && address) ? {
    address: address,
    provider,
    signer,
  } : undefined;

  return (
    <AuthContext.Provider value={value}>
      <GatewayProvider 
        gatekeeperNetwork={CIVIC_GATEKEEPER_NETWORK}
        wallet={civicWallet}
        stage="dev"
        handleTransaction={async (tx: any) => {
          try {
            console.log('Processing Civic transaction...', {
              from: address,
              chainId: wallet?.chains[0]?.id
            });
            const result = await tx.wait();
            console.log('Civic transaction complete:', result);
            return result;
          } catch (err) {
            console.error('Civic transaction error:', err);
            throw err;
          }
        }}
      >
        {children}
      </GatewayProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);