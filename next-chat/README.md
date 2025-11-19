# Cognipeer Next.js Chat Examples

This is a comprehensive example application showcasing all features of the **@cognipeer/sdk** package.

## 🚀 Features

### 1. **Basic Chat** (`/basic-chat`)
Standard conversational AI interface demonstrating:
- Creating conversations with peers
- Sending and receiving messages
- Handling AI responses
- Real-time chat UI

### 2. **Client-Side Tools** (`/client-tools`)
Demonstrates AI executing JavaScript functions in your application:
- **getCurrentWeather**: Fetch weather information for cities
- **calculateTip**: Calculate tip amounts and totals
- **generateRandomPassword**: Create secure random passwords
- **getCurrentTime**: Get current time in any timezone

The AI automatically decides when to call these tools based on user queries.

### 3. **Webchat Iframe** (`/webchat-iframe`)
Embed Cognipeer chat interface in an iframe:
- Mount webchat to any div element
- Configuration UI for hook ID
- Live preview with iframe integration
- Event handling for tool calls
- Responsive design

### 4. **Webchat Widget** (`/webchat-widget`)
Floating chat button for websites:
- Customizable position (bottom-left, bottom-right, top-left, top-right)
- Theme customization (primary color)
- Open/close programmatically
- Lifecycle management (create, destroy)
- Perfect for adding chat to existing websites

### 5. **Webchat URL Generator** (`/webchat-url`)
Generate custom webchat URLs:
- Pre-fill contact information (name, email, phone)
- Pass initial context as JSON
- Set custom parameters
- Open in new tab or copy link
- Useful for marketing campaigns and support tickets

## 📦 Installation

```bash
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or another port if 3000 is in use).

## 🔑 Configuration

Create a `.env.local` file with your Cognipeer credentials:

```env
NEXT_PUBLIC_COGNIPEER_API_URL=https://api.cognipeer.com
NEXT_PUBLIC_COGNIPEER_API_TOKEN=your-api-token-here
```

## 📚 SDK Documentation

For complete SDK documentation, see: `../../client-sdk/docs/WEBCHAT.md`

## 🎯 Use Cases

### Basic Chat
Perfect for:
- Customer support chatbots
- Virtual assistants
- FAQ systems
- Educational tutors

### Client-Side Tools
Ideal for:
- Data fetching from your APIs
- Calculations and computations
- Integration with browser APIs
- User-specific operations

### Webchat Iframe
Best for:
- Embedding in existing applications
- Custom-styled chat interfaces
- Dashboard integrations
- Full-page chat experiences

### Webchat Widget
Great for:
- Adding chat to any website
- Non-intrusive support
- Marketing websites
- E-commerce stores

### Webchat URL Generator
Useful for:
- Email campaigns with pre-filled context
- Support ticket integrations
- Marketing automation
- Social media links

## 🛠 Technology Stack

- **Next.js 15.3.0**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **@cognipeer/sdk**: Cognipeer AI client library
- **react-icons**: Icon components
- **react-markdown**: Markdown rendering for AI responses

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with feature showcase
│   ├── basic-chat/           # Basic chat example
│   ├── client-tools/         # Client-side tools demo
│   ├── webchat-iframe/       # Iframe embed demo
│   ├── webchat-widget/       # Floating widget demo
│   └── webchat-url/          # URL generator demo
├── components/
│   ├── Navigation.tsx        # Main navigation component
│   ├── Chat.tsx             # Original chat component
│   ├── ChatMessage.tsx      # Message display component
│   ├── MessageInput.tsx     # Message input component
│   └── PeerList.tsx         # Peer selection component
└── context/
    └── CognipeerContext.tsx # Global state management
```

## 🔄 API Methods Used

### Conversations API
```typescript
// Create conversation
const response = await client.conversations.create({
  peerId: 'peer-id',
  messages: [{ role: 'user', content: 'Hello' }]
});

// Send message
const response = await client.conversations.sendMessage({
  conversationId: 'conversation-id',
  content: 'User message'
});

// With client tools
const response = await client.conversations.create({
  peerId: 'peer-id',
  messages: [{ role: 'user', content: 'What's the weather?' }],
  clientTools: [weatherTool]
});
```

### Webchat API
```typescript
import { CognipeerWebchat } from '@cognipeer/sdk';

// Iframe embed
const webchat = new CognipeerWebchat({
  hookId: 'your-hook-id'
});
webchat.mount('#chat-container');

// Floating widget
CognipeerWebchat.createWidget({
  hookId: 'your-hook-id',
  position: 'bottom-right',
  theme: { primaryColor: '#0EA5E9' }
});

// URL generation
const url = webchat.generateUrl({
  contact: { name: 'John', email: 'john@example.com' },
  context: { orderId: '12345' }
});
```

## 🎨 Customization

Each example page includes:
- Configuration UI for easy testing
- Code examples showing implementation
- Info boxes explaining use cases
- Responsive design for mobile and desktop

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is occupied, Next.js will automatically use the next available port (e.g., 3002).

### Module Not Found
Make sure you've run `npm install` in both the SDK and example directories:
```bash
cd ../../client-sdk && npm install && npm run build
cd ../examples/next-chat && npm install
```

### Webchat Not Loading
Ensure your hook ID is valid and the API token is correctly configured in `.env.local`.

## 📄 License

This example application is part of the Cognipeer SDK project.

## 🤝 Support

For questions and support:
- SDK Documentation: `../../client-sdk/docs/`
- API Documentation: https://docs.cognipeer.com
- GitHub Issues: Create an issue in the repository

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
