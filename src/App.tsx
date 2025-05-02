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
    if (isVerifying) return 'Verification in progress...';
    switch(gatewayStatus) {
      case GatewayStatus.ACTIVE:
        return 'Waiting for wallet signature...';
      case GatewayStatus.ERROR:
        return 'Verification failed';
      case GatewayStatus.UNKNOWN:
        return 'Preparing verification...';
      default:
        return '';
    }
  };

  return (
    <div className="auth-container">
      <h1>Civic Auth Demo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!isConnected ? (
        <button onClick={handleAuth}>Connect Wallet</button>
      ) : !gatewayToken ? (
        <>
          <p>Connected Address: {address}</p>
          <button onClick={handleAuth} disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Verify with Civic'}
          </button>
          {getStatusMessage() && (
            <p style={{ color: gatewayStatus === GatewayStatus.ERROR ? 'red' : 'inherit' }}>
              {getStatusMessage()}
            </p>
          )}
        </>
      ) : (
        <>
          <p>✓ Verified Address: {address}</p>
          <p>Gateway Token: {gatewayToken.toString()}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
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
