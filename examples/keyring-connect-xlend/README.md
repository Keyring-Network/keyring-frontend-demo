# Keyring Connect xLend Demo

This demo showcases the integration of [Keyring Connect SDK](https://www.npmjs.com/package/@keyringnetwork/keyring-connect-sdk) with a fictional lending platform called xLend. The application demonstrates how to implement Keyring Connect verification flow in a DeFi lending application.

## Overview

The demo simulates a complete Keyring Connect verification flow with four stages:

1. **Install Extension**: Prompts users to install the Keyring Connect browser extension
2. **Start Verification**: Initiates the Keyring Connect verification process
3. **In Progress**: Shows verification status and allows checking progress
4. **Completed**: Displays successful verification and unlocks lending features

## Key Components

- `KeyringConnectModule`: A component that demonstrates the Keyring Connect SDK integration for Keyring Connect verification, handling extension installation checks, verification initiation, status monitoring, and displaying appropriate UI states based on the verification progress.
- `XLendAppInterface`: A mock lending application UI that integrates the `KeyringConnectModule` within a card-based interface, showcasing how Keyring Connect verification can be embedded into a DeFi lending platform's user flow.

## Running the Demo

First, run the development server:

```bash
npm install && npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note

This is a demonstration project. In a production environment, the Keyring Connect verification process would progress automatically based on user actions rather than through manual step navigation.
