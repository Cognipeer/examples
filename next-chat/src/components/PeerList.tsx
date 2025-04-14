'use client';

import React from 'react';
import { Peer, useCognipeer } from '@/context/CognipeerContext';
import { FiUser } from 'react-icons/fi';

interface PeerListProps {
  onPeerSelect?: () => void;
}

export default function PeerList({ onPeerSelect }: PeerListProps) {
  const { peers, isLoading, error, loadPeers, selectedPeer, selectPeer, createConversation } = useCognipeer();

  const handlePeerClick = async (peer: Peer) => {
    selectPeer(peer);
    await createConversation(peer._id);
    if (onPeerSelect) {
      onPeerSelect();
    }
  };

  if (isLoading && peers.length === 0) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        <p className="mt-2 text-gray-600">Loading peers...</p>
      </div>
    );
  }

  if (error && peers.length === 0) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-4 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => loadPeers()}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-300">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-300 bg-gray-50 text-gray-800">Peers</h3>

      <ul className="divide-y divide-gray-200">
        {peers.map((peer) => (
          <li key={peer._id} className="hover:bg-gray-50 transition-colors">
            <button
              onClick={() => handlePeerClick(peer)}
              className={`cursor-pointer w-full text-left py-4 px-4 flex items-center border-l-0 transition-all ${
                selectedPeer?._id === peer._id ? 'bg-teal-50 border-l-4 border-teal-500' : ''
              }`}>
              <div className="w-10 h-10 rounded-full bg-teal-400 text-white flex items-center justify-center mr-3 flex-shrink-0">
                <FiUser size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="font-medium text-gray-900 truncate">{peer.name}</h3>
                <p className="text-sm text-gray-500 truncate">{peer.shortDescription}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
