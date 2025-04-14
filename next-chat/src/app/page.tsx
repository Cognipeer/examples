"use client";

import { useState } from "react";
import PeerList from "@/components/PeerList";
import Chat from "@/components/Chat";
import { FiMenu, FiX } from "react-icons/fi";
import { CognipeerProvider } from "@/context/CognipeerContext";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <CognipeerProvider>
      <main className="h-full flex flex-col">
        <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Cognipeer Chat Example</h1>
          <button 
            className="md:hidden text-white p-2" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {showSidebar ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </header>
        
        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar for peer list */}
          <div 
            className={`fixed md:static inset-y-0 left-0 w-64 md:w-1/3 transform ${
              showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            } transition-transform duration-300 ease-in-out md:translate-x-0 z-20 mt-16 md:mt-0`}
          >
            <div className="h-full">
              <PeerList onPeerSelect={() => setShowSidebar(false)} />
            </div>
          </div>
          
          {/* Overlay for closing sidebar on mobile */}
          {showSidebar && (
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-10"
              onClick={() => setShowSidebar(false)}
            />
          )}
          
          {/* Main chat area */}
          <div className="flex-1 md:w-2/3 bg-gray-50">
            <Chat />
          </div>
        </div>
      </main>
    </CognipeerProvider>
  );
}
