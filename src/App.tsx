import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ChakraProvider, Box, Heading, Text, Button, VStack, Container, useColorModeValue } from '@chakra-ui/react';
import QuestList from './pages/QuestList';
import './App.css';

function AuthContent() {
  const { isConnected, address, connect, disconnect } = useAuth();
  const navigate = useNavigate();
  
  const bgGradient = useColorModeValue(
    'linear(to-br, purple.50, white)',
    'linear(to-br, gray.900, purple.900)'
  );
  
  const containerBg = useColorModeValue(
    'whiteAlpha.900',
    'whiteAlpha.100'
  );

  useEffect(() => {
    if (isConnected) {
      navigate('/quests');
    }
  }, [isConnected, navigate]);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient} py={8}>
      <Container maxW="container.md">
        <VStack
          spacing={6}
          bg={containerBg}
          backdropFilter="blur(10px)"
          borderRadius="xl"
          p={8}
          boxShadow="xl"
        >
          <Heading 
            as="h1" 
            size="xl"
            bgGradient="linear(to-r, purple.400, purple.600)"
            bgClip="text"
          >
            Earn Global
          </Heading>
          
          <Text fontSize="lg" textAlign="center" opacity={0.9}>
            Welcome to Earn Global platform where you can earn by performing some quest.
            {!isConnected && (
              <Text fontSize="md" mt={2} fontStyle="italic" opacity={0.7}>
                Connect your wallet to start earning
              </Text>
            )}
          </Text>

          {!isConnected ? (
            <Button
              colorScheme="purple"
              size="lg"
              onClick={connect}
              w="full"
              maxW="sm"
            >
              Connect Wallet
            </Button>
          ) : (
            <VStack spacing={4} w="full">
              <Box
                bg="whiteAlpha.200"
                p={3}
                borderRadius="md"
                fontFamily="mono"
                fontSize="sm"
                w="full"
                textAlign="center"
              >
                {formatAddress(address || '')}
              </Box>
              <Button
                colorScheme="purple"
                variant="outline"
                onClick={disconnect}
                w="full"
                maxW="sm"
              >
                Disconnect
              </Button>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAuth();
  
  if (!isConnected) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <ChakraProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthContent />} />
            <Route 
              path="/quests" 
              element={
                <ProtectedRoute>
                  <QuestList />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
