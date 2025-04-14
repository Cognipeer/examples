'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useCognipeer } from '@/context/CognipeerContext';

export default function CognipeerConfig() {
  const { initializeClient, client } = useCognipeer();
  const [baseUrl, setBaseUrl] = useState('https://api.cognipeer.com/v1/client');
  const [token, setToken] = useState('token');
  const [showConfig, setShowConfig] = useState(!client);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    initializeClient(baseUrl, token);
    setShowConfig(false);
  };

  const toggleConfig = () => {
    setShowConfig(!showConfig);
  };

  useEffect(() => {
    if (!client) {
      initializeClient(baseUrl, token);
    }
  }, [client, initializeClient, baseUrl, token]);

  return (
    <div className="bg-gray-100 border-b">
      <button
        onClick={toggleConfig}
        className="w-full py-2 px-4 text-sm text-gray-600 flex items-center justify-center hover:bg-gray-200">
        <span>{showConfig ? 'Hide Configuration' : 'Show Configuration'}</span>
      </button>

      {showConfig && (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">API Base URL</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="https://api.cognipeer.com/v1/client"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">API Token (optional)</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Leave empty if not required"
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
            Apply Configuration
          </button>
        </form>
      )}
    </div>
  );
}
