'use client';

import React, { useEffect, useRef } from 'react';
import { useCognipeer } from '@/context/CognipeerContext';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { FiMessageSquare } from 'react-icons/fi';

export default function Chat() {
  const { selectedPeer, messages } = useCognipeer();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!selectedPeer) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <FiMessageSquare size={48} className="mx-auto mb-4 text-teal-500 opacity-50" />
          <h2 className="text-xl font-medium text-gray-700 mb-2">No conversation selected</h2>
          <p className="text-gray-500">Select a peer from the list to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-300 p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">{selectedPeer.name}</h2>
        <p className="text-sm text-gray-500">{selectedPeer.shortDescription}</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="text-center max-w-md">
              <FiMessageSquare size={36} className="mx-auto mb-3 text-teal-500 opacity-50" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Start the conversation</h3>
              <p className="text-gray-500">Send a message to begin chatting with {selectedPeer.name}</p>
            </div>
          </div>
        ) : (
          messages.map((message) => <ChatMessage key={message.id} message={message} />)
        )}
        <div ref={chatEndRef} />
      </div>

      <MessageInput />
    </div>
  );
}
