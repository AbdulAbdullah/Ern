import { useCallback, useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useGateway, GatewayStatus } from '@civic/ethereum-gateway-react';
import './App.css';

function AuthContent() {
  const { isConnected, address, connect, disconnect } = useAuth();
  const { requestGatewayToken, gatewayStatus, gatewayToken } = useGateway() || {};
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Reset error when status changes
  useEffect(() => {
    if (gatewayStatus) {
      setError(null);
    }
  }, [gatewayStatus]);

  // Log status changes
  useEffect(() => {
    console.log('Gateway Status Changed:', { 
      gatewayStatus,
      hasToken: !!gatewayToken,
      address
    });
  }, [gatewayStatus, gatewayToken, address]);

  const handleAuth = useCallback(async () => {
    try {
      setError(null);
      if (!isConnected) {
        await connect();
      } else if (requestGatewayToken) {
        setIsVerifying(true);
        console.log('Starting Civic verification...', { 
          address,
          isConnected,
          hasRequestFunction: !!requestGatewayToken 
        });
        await requestGatewayToken();
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify with Civic');
    } finally {
      setIsVerifying(false);
    }
  }, [isConnected, connect, requestGatewayToken, address]);

  const getStatusMessage = () => {
    if (isVerifying) return { text: 'Verification in progress...', type: 'info' };
    switch(gatewayStatus) {
      case GatewayStatus.ACTIVE:
        return { text: 'Waiting for wallet signature...', type: 'info' };
      case GatewayStatus.ERROR:
        return { text: 'Verification failed', type: 'error' };
      case GatewayStatus.UNKNOWN:
        return { text: 'Preparing verification...', type: 'info' };
      default:
        return null;
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const status = getStatusMessage();

  return (
    <div className="auth-container">
      <h1>Earn Global</h1>
      <div className="welcome-message">
        Welcome to Earn Global platform where you can earn by performing some quest.
        {!isConnected && <div className="welcome-subtitle">Before we begin, sign in using your EVM wallet</div>}
      </div>
      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}
      
      {!isConnected ? (
        <button onClick={handleAuth}>
          Connect Wallet
        </button>
      ) : !gatewayToken ? (
        <>
          <div className="address-display">
            {formatAddress(address || '')}
          </div>
          <button onClick={handleAuth} disabled={isVerifying}>
            {isVerifying ? (
              <>
                Verifying
                <span className="loading"></span>
              </>
            ) : (
              'Verify with Civic'
            )}
          </button>
          {status && (
            <div className={`status-message ${status.type}`}>
              {status.text}
            </div>
          )}
        </>
      ) : (
        <div className="verification-success">
          <span className="checkmark">✓</span>
          <div className="address-display">
            {formatAddress(address || '')}
          </div>
          <div className="token-display">
            Gateway Token: {gatewayToken.toString().slice(0, 10)}...
          </div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

export default App;
