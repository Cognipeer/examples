# Cognipeer Chat Example

This is a React-based chat interface example that demonstrates how to use Cognipeer APIs. The application allows users to:

1. List available AI assistants (peers)
2. Initiate conversations with AI assistants
3. Send and receive messages in a chat interface

## Features

- Modern user interface built with Next.js and Tailwind CSS
- Responsive chat interface
- Configuration panel for API settings
- Easy integration with the `@cognipeer/client-js` npm package

## Getting Started

### Requirements

- Node.js 18.0.0 or newer
- A running Cognipeer API server (or access to Cognipeer API service)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_COGNIPEER_API_URL=https://api.cognipeer.com/v1/client
NEXT_PUBLIC_COGNIPEER_API_TOKEN=your_api_token_here
```

- `NEXT_PUBLIC_COGNIPEER_API_URL`: The base URL for the Cognipeer API (defaults to https://api.cognipeer.com/v1/client if not provided)
- `NEXT_PUBLIC_COGNIPEER_API_TOKEN`: Your Cognipeer API token for authentication (optional)

Note: You can also configure these settings through the application's configuration panel after starting the app.

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

By default, the application connects to Cognipeer API at `https://api.cognipeer.com`. You can change this in the configuration panel at the top of the application.

## Using @cognipeer/client-js Package

This example application uses the `@cognipeer/client-js` npm package. This package provides easy access to Cognipeer APIs and includes:

- Type definitions for Cognipeer API entities
- Client implementation for API calls
- Promise-based interface for asynchronous operations

### Usage Example

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

### Core Features

- **Peer Listing**: View all AI assistants integrated into the platform
- **Conversation Management**: Create and manage conversations with AI assistants
- **Messaging**: Conduct text-based chats with AI assistants
- **Tool Integration**: Enable AI assistants to provide more interactive responses using tools

This example application is specifically designed to show developers how they can use Cognipeer's APIs and integrate them into their own applications.

## License

MIT

## Acknowledgements

- This project was created as a demonstration of Cognipeer APIs
- Built with Next.js, React, and Tailwind CSS
