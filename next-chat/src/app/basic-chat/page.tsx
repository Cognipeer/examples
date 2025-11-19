'use client';

import { useState } from 'react';
import PeerList from '@/components/PeerList';
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { FiMenu, FiX } from 'react-icons/fi';

export default function BasicChatPage() {
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
            <Chat />
        </div>
      </div>
    </main>
  );
}