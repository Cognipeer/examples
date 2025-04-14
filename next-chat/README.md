# Cognipeer Chat Example

This is a React-based chat interface example that demonstrates how to use the Cognipeer APIs. The application allows users to:

1. List available peers
2. Start conversations with peers
3. Send and receive messages in a chat interface

## Features

- Modern UI built with Next.js and Tailwind CSS
- Responsive chat interface
- Configuration panel for API settings
- Reusable Cognipeer client library

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- A running Cognipeer API server

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/cognipeer-chat-example.git
cd cognipeer-chat-example
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Configuration

By default, the application connects to `http://localhost:8080` for the Cognipeer API. You can change this in the configuration panel at the top of the application.

## Cognipeer Client Library

The Cognipeer client library is located in `src/lib/cognipeer-client/` and can be extracted as a standalone npm package. The library provides:

- Type definitions for Cognipeer API entities
- Client implementation for API calls
- Promise-based interface for async operations

### Usage

```typescript
import { CognipeerClient } from '@/lib/cognipeer-client';

// Initialize the client
const client = new CognipeerClient({
  baseUrl: 'http://localhost:8080',
  token: 'your-optional-token'
});

// List available peers
const peers = await client.listPeers();

// Create a conversation
const conversation = await client.createConversation('peer-id');

// Send a message
const response = await client.sendMessage('conversation-id', 'Hello, world!');
```

## License

MIT

## Acknowledgments

- This project was created as a demonstration of the Cognipeer APIs
- Built with Next.js, React, and Tailwind CSS
