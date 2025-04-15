# Cognipeer Examples

This repository contains example applications that demonstrate how to integrate and use Cognipeer's APIs and client libraries in various environments and use cases.

## Overview

Cognipeer provides powerful AI assistant capabilities through its API and client libraries. These examples show developers how to:

- Connect to Cognipeer API services
- Interact with AI assistants (peers)
- Create and manage conversations
- Build interactive interfaces for AI communication
- Implement tool integration for enhanced AI capabilities

## Available Examples

### [Next-Chat](./next-chat)

A React-based chat interface example built with Next.js that demonstrates the core functionality of the `@cognipeer/client-js` package:

- Modern user interface built with Next.js and Tailwind CSS
- Real-time messaging with AI assistants
- Configuration panel for API settings
- Complete message history and conversation management

![Cognipeer Chat Interface](./next-chat/public/cognipeer-icon.png)

### Coming Soon

More examples will be added to demonstrate different integration scenarios, including:

- Vanilla JavaScript implementation
- React Native mobile application
- Node.js backend integration
- Tool integration examples
- Custom AI assistant configuration

## Getting Started

Each example contains its own README with specific instructions. Generally, to run any example:

1. Navigate to the example directory:
```bash
cd examples/[example-name]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (usually in a `.env.local` file)

4. Start the application:
```bash
npm run dev
```

## Core Package

All examples use the `@cognipeer/client-js` npm package, which provides:

- Type definitions for Cognipeer API entities
- Client implementation for API calls
- Promise-based interface for asynchronous operations

### Basic Usage

```typescript
import CognipeerClient from '@cognipeer/client-js';

// Initialize the client
const client = new CognipeerClient({
  baseUrl: 'https://api.cognipeer.com/v1/client',
  token: 'optional-token'
});

// List available AI assistants
const peers = await client.peer.list();

// Create a conversation
const conversation = await client.conversation.create('peer-id');

// Send a message
const response = await client.conversation.sendMessage('conversation-id', 'Hello, world!');
```

## Resources

- [Cognipeer Documentation](https://cognipeer.com/docs)
- [API Reference](https://cognipeer.com/api)
- [Client Package (@cognipeer/client-js)](https://www.npmjs.com/package/@cognipeer/client-js)

## License

MIT

## Contributing

We welcome contributions! Feel free to submit pull requests with new examples or improvements to existing ones.