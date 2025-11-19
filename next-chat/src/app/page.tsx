'use client';

import { useState } from 'react';
import PeerList from '@/components/PeerList';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <main className="h-full flex flex-col">
      <Header 
        showMobileSidebar={showSidebar} 
        onToggleSidebar={toggleSidebar}
        showSidebarButton={true}
      />

      <Navigation />

        <div className="flex-grow flex overflow-hidden">
          <div
            className={`fixed md:static inset-y-0 left-0 w-90 md:w-1/3 transform ${
              showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            } transition-transform duration-300 ease-in-out md:translate-x-0 z-20 mt-19 md:mt-0`}>
            <div className="h-full">
              <PeerList onPeerSelect={() => setShowSidebar(false)} />
            </div>
          </div>

          {showSidebar && (
            <div className="md:hidden fixed inset-0 bg-[rgba(0,0,0,0.3)] z-10" onClick={() => setShowSidebar(false)} />
          )}

          <div className="flex-1 md:w-2/3 bg-gray-50">
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Cognipeer SDK Demo App
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Explore all features of the Cognipeer AI SDK with interactive examples
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-12">
                  <Link 
                    href="/basic-chat"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="text-teal-600 mb-3">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic Chat</h3>
                    <p className="text-gray-600 text-sm">
                      Simple conversation with AI peers using the SDK
                    </p>
                  </Link>

                  <Link 
                    href="/client-tools"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="text-teal-600 mb-3">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Client-Side Tools</h3>
                    <p className="text-gray-600 text-sm">
                      Let AI execute JavaScript functions in your app
                    </p>
                  </Link>

                  <Link 
                    href="/webchat-widget"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="text-teal-600 mb-3">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Floating Widget</h3>
                    <p className="text-gray-600 text-sm">
                      Add a chat button like Intercom or Drift
                    </p>
                  </Link>

                  <Link 
                    href="/webchat-url"
                    className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="text-teal-600 mb-3">
                      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Webchat URL</h3>
                    <p className="text-gray-600 text-sm">
                      Generate custom webchat links with parameters
                    </p>
                  </Link>
                </div>

                <div className="mt-12 p-6 bg-teal-50 rounded-lg border border-teal-200">
                  <h3 className="text-lg font-semibold text-teal-900 mb-2">Quick Start</h3>
                  <p className="text-teal-700 text-sm mb-4">
                    Configure your API credentials to get started
                  </p>
                  <Link 
                    href="/basic-chat"
                    className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Configure Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
