'use client';

import { useState } from 'react';
import PeerList from '@/components/PeerList';
import Chat from '@/components/Chat';
import { FiMenu, FiX } from 'react-icons/fi';
import { CognipeerProvider } from '@/context/CognipeerContext';
import Image from 'next/image';

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <CognipeerProvider>
      <main className="h-full flex flex-col">
        <header className="bg-white border-b-1 border-gray-300 text-white p-4 flex items-center justify-between">
          <div className="pointer-events-none select-none">
            <Image src="/cognipeer-logo-d-beta.png" width={189} height={42} alt="cognipeer-logo" />
          </div>

          <button className="md:hidden text-teal-600 p-2" onClick={toggleSidebar} aria-label="Toggle sidebar">
            {showSidebar ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>

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
            <Chat />
          </div>
        </div>
      </main>
    </CognipeerProvider>
  );
}
