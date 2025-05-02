# Civic Auth Integration Demo

## Project Overview

This project solves the challenge of implementing secure and decentralized authentication in Web3 applications by integrating Civic Authentication with Ethereum wallet connectivity. It provides:

1. **Wallet Authentication**: Seamless connection to Web3 wallets like MetaMask using Web3-Onboard
2. **Identity Verification**: Integration with Civic's Gateway Protocol for robust identity verification
3. **Ethereum Integration**: Connection to Ethereum network through Infura for blockchain interactions

The solution ensures that only verified users can access certain parts of your dApp, adding an extra layer of security beyond simple wallet connections.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- A Web3 wallet (like MetaMask) installed in your browser
- Infura Project ID (for Ethereum network access)
- Civic Gatekeeper Network ID

## Getting Required Credentials

### 1. Obtaining Infura Project ID (VITE_INFURA_PROJECT_ID)

1. Visit [Infura](https://infura.io/) and create an account
2. Create a new project:
   - Click "Create New Project"
   - Select "Web3 API" as the project type
   - Give your project a name
3. Once created, you'll find your Project ID in the project settings
4. Copy the Project ID and add it to your `.env` file

### 2. Obtaining Civic Gatekeeper Network ID (VITE_CIVIC_GATEKEEPER_NETWORK)

1. Visit [Civic Developer Portal](https://civic.com/developers)
2. Create a developer account if you don't have one
3. Create a new Gateway instance:
   - Navigate to the Gateway section
   - Click "Create New Gateway"
   - Follow the setup wizard
4. Once your Gateway is created:
   - Find your Gatekeeper Network ID in the Gateway details
   - It will look something like `ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6`
5. Copy the Gatekeeper Network ID to your `.env` file

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulAbdullah/Ern.git
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy the environment template file:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and add your credentials:
     ```
     VITE_INFURA_PROJECT_ID=your-infura-project-id
     VITE_CIVIC_GATEKEEPER_NETWORK=your-civic-gatekeeper-network-id
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## How It Works

1. **Wallet Connection**:
   - Uses Web3-Onboard to manage wallet connections
   - Supports multiple wallet providers (MetaMask, WalletConnect, etc.)
   - Handles wallet state and connection lifecycle

2. **Civic Integration**:
   - Implements Civic's Gateway Protocol for identity verification
   - Uses the Civic Gateway React component for seamless UI integration
   - Manages verification status and token handling

3. **Authentication Flow**:
   - User connects their Web3 wallet
   - Application verifies wallet connection
   - User completes Civic verification
   - Gateway token is issued upon successful verification
   - User can access protected features

## Testing the Integration

1. **Connect Wallet**
   - Open the application in your browser
   - Click the "Connect Wallet" button
   - Select your Web3 wallet (e.g., MetaMask)
   - Approve the connection request

2. **Civic Verification**
   - Once your wallet is connected, you'll see your wallet address displayed
   - Click the "Verify with Civic" button
   - Complete the Civic verification process in the popup
   - After successful verification, you'll see your Gateway Token displayed

3. **Disconnecting**
   - Click the "Disconnect" button to disconnect your wallet
   - The app will return to the initial state

## Development Environment

### Local Development
- The application runs on Vite for fast development
- TypeScript support for better type safety
- Hot Module Replacement (HMR) enabled

### Testing
You can test the integration using these networks:
- For Ethereum: Use Goerli or Sepolia testnet
- For Civic: Use the test Gatekeeper Network (available in Civic's developer portal)

## Project Structure

- `src/contexts/AuthContext.tsx`: Manages authentication state and Civic integration
- `src/services/web3.ts`: Configures Web3-Onboard for wallet connections
- `src/App.tsx`: Main application component with UI implementation

## Dependencies

- @web3-onboard/react
- @web3-onboard/injected-wallets
- @civic/ethereum-gateway-react
- ethers

## Environment Variables

The application uses the following environment variables:

- `VITE_INFURA_PROJECT_ID`: Required for Ethereum network access through Infura
- `VITE_CIVIC_GATEKEEPER_NETWORK`: Required for Civic Gateway authentication

These variables should be set in your `.env` file. A template is provided in `.env.example`.

> Note: Never commit your `.env` file to version control. The `.env` file is already added to `.gitignore`.

## Common Issues

1. **Wallet Connection Issues**
   - Make sure your Web3 wallet is installed and unlocked
   - Check if you're on the correct network (Ethereum Mainnet)

2. **Civic Verification Issues**
   - Ensure your Gatekeeper Network ID is correct
   - Check if you have sufficient funds for verification
   - Make sure you're using a supported browser

3. **Network Issues**
   - Verify your Infura Project ID is correct
   - Check your internet connection

## Development Notes

- The application uses React with TypeScript
- Styling is done using CSS modules
- Web3 integration is handled through Web3-Onboard
- Civic integration uses the official Civic Gateway React component

## Contributing

Feel free to submit issues and enhancement requests.

## License

[Your chosen license]
