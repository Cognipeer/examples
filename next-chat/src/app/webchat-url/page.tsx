'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { FiCopy, FiCheck, FiInfo, FiExternalLink } from 'react-icons/fi';
import { usePersistedHookId } from '@/hooks/usePersistedHookId';

export default function WebchatUrlPage() {
    const [hookId, setHookId] = usePersistedHookId();
    const [contact, setContact] = useState({ email: '', name: '' });
    const [context, setContext] = useState('');
    const [params, setParams] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!hookId.trim()) {
            alert('Please enter a Hook ID');
            return;
        }

        // Build URL manually (simulating SDK behavior)
        const baseUrl = `${process.env.NEXT_PUBLIC_COGNIPEER_BASE_URL || 'https://app.cognipeer.com'}/webchat/${hookId}`;
        const urlParams = new URLSearchParams();

        if (contact.email || contact.name) {
            urlParams.append('contact', JSON.stringify(contact));
        }

        if (context.trim()) {
            try {
                const contextObj = JSON.parse(context);
                urlParams.append('context', JSON.stringify(contextObj));
            } catch (e) {
                alert('Invalid JSON in context field');
                return;
            }
        }

        if (params.trim()) {
            try {
                const paramsObj = JSON.parse(params);
                urlParams.append('params', JSON.stringify(paramsObj));
            } catch (e) {
                alert('Invalid JSON in params field');
                return;
            }
        }

        const queryString = urlParams.toString();
        const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

        setGeneratedUrl(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleOpenInNewTab = () => {
        window.open(generatedUrl, '_blank');
    };

    return (
        <main className="h-full flex flex-col bg-gray-50">
            <Header />

            <Navigation />

                <div className="flex-grow overflow-auto p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Webchat URL Generation</h1>
                            <p className="text-gray-600">
                                Generate custom webchat URLs with pre-filled data and parameters
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <FiInfo className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                <div className="text-sm text-blue-900">
                                    <p className="font-semibold mb-1">Use Cases:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        <li>Create shareable chat links for email campaigns</li>
                                        <li>Pre-fill user information from your app</li>
                                        <li>Pass context data for personalized conversations</li>
                                        <li>Track source via URL parameters</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Configuration */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hook ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={hookId}
                                        onChange={(e) => setHookId(e.target.value)}
                                        placeholder="your-hook-id"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                            placeholder="user@example.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Name
                                        </label>
                                        <input
                                            type="text"
                                            value={contact.name}
                                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Context (JSON)
                                    </label>
                                    <textarea
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                        placeholder={'{\n  "userId": "12345",\n  "plan": "premium"\n}'}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parameters (JSON)
                                    </label>
                                    <textarea
                                        value={params}
                                        onChange={(e) => setParams(e.target.value)}
                                        placeholder={'{\n  "source": "email-campaign",\n  "campaign": "summer-2024"\n}'}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={handleGenerate}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                                >
                                    <FiCheck size={18} />
                                    Generate URL
                                </button>
                            </div>
                        </div>

                        {/* Generated URL */}
                        {generatedUrl && (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Generated URL</h2>

                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                                    <p className="font-mono text-sm break-all text-gray-800">{generatedUrl}</p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCopy}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                                    >
                                        {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
                                        {copied ? 'Copied!' : 'Copy URL'}
                                    </button>
                                    <button
                                        onClick={handleOpenInNewTab}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <FiExternalLink size={18} />
                                        Open in New Tab
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Code Example */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Example</h2>
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                <code>{`import { CognipeerWebchat } from '@cognipeer/sdk';

const webchat = new CognipeerWebchat({
  hookId: '${hookId || 'your-hook-id'}'
});

// Generate URL with options
const url = webchat.generateUrl({
  contact: {
    email: '${contact.email || 'user@example.com'}',
    name: '${contact.name || 'John Doe'}'
  },
  context: ${context || '{ userId: "123" }'},
  params: ${params || '{ source: "website" }'}
});

// Use the URL
window.open(url, '_blank');

// Or redirect
window.location.href = url;`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </main>
    );
}
