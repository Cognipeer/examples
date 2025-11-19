'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { useCognipeer } from '@/context/CognipeerContext';
import { FiCheck, FiInfo, FiCode } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

// Mock client tools implementations
const clientTools = [
    {
        type: 'function' as const,
        function: {
            name: 'getCurrentWeather',
            description: 'Get current weather for a specific city',
            parameters: {
                type: 'object' as const,
                properties: {
                    city: { type: 'string', description: 'City name' }
                },
                required: ['city']
            }
        },
        implementation: async ({ city }: { city: string }) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const temps = [18, 20, 22, 25, 28, 30];
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
            return `Weather in ${city}: ${conditions[Math.floor(Math.random() * conditions.length)]}, ${temps[Math.floor(Math.random() * temps.length)]}°C`;
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'calculateTip',
            description: 'Calculate tip amount based on bill total and percentage',
            parameters: {
                type: 'object' as const,
                properties: {
                    billAmount: { type: 'number', description: 'Total bill amount' },
                    tipPercentage: { type: 'number', description: 'Tip percentage (e.g., 15, 20)' }
                },
                required: ['billAmount', 'tipPercentage']
            }
        },
        implementation: async ({ billAmount, tipPercentage }: { billAmount: number; tipPercentage: number }) => {
            const tip = (billAmount * tipPercentage) / 100;
            const total = billAmount + tip;
            return `Bill: $${billAmount.toFixed(2)}\nTip (${tipPercentage}%): $${tip.toFixed(2)}\nTotal: $${total.toFixed(2)}`;
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'generateRandomPassword',
            description: 'Generate a random password with specified length',
            parameters: {
                type: 'object' as const,
                properties: {
                    length: { type: 'number', description: 'Password length' }
                },
                required: ['length']
            }
        },
        implementation: async ({ length }: { length: number }) => {
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return `Generated password: ${password}`;
        }
    },
    {
        type: 'function' as const,
        function: {
            name: 'getCurrentTime',
            description: 'Get current time in a specific timezone',
            parameters: {
                type: 'object' as const,
                properties: {
                    timezone: { type: 'string', description: 'Timezone (e.g., America/New_York, Europe/London)' }
                },
                required: ['timezone']
            }
        },
        implementation: async ({ timezone }: { timezone: string }) => {
            try {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { timeZone: timezone });
                const dateString = now.toLocaleDateString('en-US', { timeZone: timezone });
                return `Current time in ${timezone}: ${timeString} on ${dateString}`;
            } catch (error) {
                return `Invalid timezone: ${timezone}`;
            }
        }
    }
];

function ClientToolsChat() {
    const { apiToken, apiUrl, peerId, setPeerId, peers, loadPeers } = useCognipeer();
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; tools?: any[] }>>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);

    // Load peers on mount
    useEffect(() => {
        if (peers.length === 0 && apiToken) {
            loadPeers();
        }
    }, [apiToken]);

    const handleSend = async () => {
        if (!input.trim() || !apiToken || !peerId) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Dynamically import SDK
            const { CognipeerClient } = await import('@cognipeer/sdk');
            const client = new CognipeerClient({ token: apiToken, apiUrl });

            let response;

            if (!conversationId) {
                // Create new conversation with client tools
                response = await client.conversations.create({
                    peerId,
                    messages: [{ role: 'user', content: input }],
                    clientTools: clientTools as any
                });

                if (response.conversationId) {
                    setConversationId(response.conversationId);
                }
            } else {
                // Continue conversation
                response = await client.conversations.sendMessage({
                    conversationId,
                    content: input,
                    clientTools: clientTools as any
                });
            }

            // Add AI response
            if (response.content) {
                setMessages(prev => [...prev, {
                    role: 'ai',
                    content: response.content || '',
                    tools: response.tools
                }]);
            }
        } catch (error: any) {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: `Error: ${error.message}`
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                        <p className="mb-4">Try asking:</p>
                        <div className="space-y-2 text-sm">
                            <p className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
                                "What's the weather in Tokyo?"
                            </p>
                            <br />
                            <p className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
                                "Calculate a 20% tip on $85"
                            </p>
                            <br />
                            <p className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
                                "Generate a 16 character password"
                            </p>
                            <br />
                            <p className="bg-gray-100 inline-block px-4 py-2 rounded-lg">
                                "What time is it in Europe/London?"
                            </p>
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user'
                            ? 'bg-teal-600 text-white'
                            : 'bg-white border border-gray-300'
                            }`}>
                            <ReactMarkdown className="prose prose-sm max-w-none">
                                {msg.content}
                            </ReactMarkdown>

                            {msg.tools && msg.tools.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-xs font-semibold text-gray-600 mb-2">Tools Used:</p>
                                    {msg.tools.map((tool, i) => (
                                        <div key={i} className="text-xs bg-gray-50 rounded p-2 mb-1">
                                            <span className="font-mono text-teal-700">{tool.name}</span>
                                            {tool.output && (
                                                <p className="text-gray-600 mt-1">{JSON.stringify(tool.output).substring(0, 100)}...</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-300 p-4 bg-white">
                {/* Peer Selection */}
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select AI Assistant (Peer)
                    </label>
                    <select
                        value={peerId}
                        onChange={(e) => {
                            setPeerId(e.target.value);
                            setConversationId(null); // Reset conversation when peer changes
                            setMessages([]); // Clear messages
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        disabled={loading}
                    >
                        <option value="">-- Select a peer --</option>
                        {peers.map((peer) => (
                            <option key={peer._id} value={peer._id}>
                                {peer.name} {peer.shortDescription ? `- ${peer.shortDescription}` : ''}
                            </option>
                        ))}
                    </select>
                    {!peerId && (
                        <p className="text-xs text-gray-500 mt-1">
                            Please select a peer to start chatting
                        </p>
                    )}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me to use a client tool..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        disabled={loading || !apiToken || !peerId}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim() || !apiToken || !peerId}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ClientToolsPage() {
    return (
        <main className="h-full flex flex-col bg-gray-50">
            <Header />

            <Navigation />

                <div className="flex-grow overflow-hidden flex">
                    {/* Left Panel - Documentation */}
                    <div className="w-1/2 border-r border-gray-300 overflow-auto p-6 bg-white">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Client-Side Tools</h1>
                            <p className="text-gray-600 mb-6">
                                Let AI execute JavaScript functions in your application
                            </p>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <FiInfo className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                    <div className="text-sm text-blue-900">
                                        <p className="font-semibold mb-1">How it works:</p>
                                        <p className="mb-2">
                                            Define JavaScript functions that AI can automatically call to fetch data, perform calculations, or interact with your app.
                                        </p>
                                        <p>The AI decides when to call these tools based on the conversation context.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Available Tools */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Available Tools</h2>
                                <div className="space-y-3">
                                    {clientTools.map((tool, idx) => (
                                        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <FiCode className="text-teal-600 mt-1 flex-shrink-0" size={18} />
                                                <div className="flex-1">
                                                    <p className="font-mono text-sm font-semibold text-gray-900 mb-1">
                                                        {tool.function.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {tool.function.description}
                                                    </p>
                                                    <div className="text-xs text-gray-500">
                                                        <span className="font-semibold">Parameters:</span>{' '}
                                                        {Object.keys(tool.function.parameters.properties).join(', ')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Code Example */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Code Example</h2>
                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                                    <code>{`import { CognipeerClient } from '@cognipeer/sdk';

const client = new CognipeerClient({ 
  token: 'your-api-token' 
});

const response = await client.conversations.create({
  peerId: 'your-peer-id',
  messages: [
    { role: 'user', content: 'What\\'s the weather in Tokyo?' }
  ],
  clientTools: [{
    type: 'function',
    function: {
      name: 'getCurrentWeather',
      description: 'Get current weather for a city',
      parameters: {
        type: 'object',
        properties: {
          city: { type: 'string' }
        },
        required: ['city']
      }
    },
    implementation: async ({ city }) => {
      const response = await fetch(
        \`https://api.weather.com/\${city}\`
      );
      const data = await response.json();
      return \`Temperature: \${data.temp}°C\`;
    }
  }]
});

// AI automatically called your function!
console.log(response.content);`}</code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Live Chat */}
                    <div className="w-1/2 flex flex-col">
                        <div className="bg-white border-b border-gray-300 p-4">
                            <h2 className="text-lg font-semibold text-gray-900">Live Demo</h2>
                            <p className="text-sm text-gray-600">Chat with AI that can use client-side tools</p>
                        </div>
                        <ClientToolsChat />
                    </div>
                </div>
            </main>
    );
}
