'use client';

import React from 'react';
import { FiUser, FiCpu } from 'react-icons/fi';

interface ChatMessageProps {
  message: {
    isUser: boolean;
    content: string;
    tools: {
      action: string;
    }[];
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = 'isUser' in message && message.isUser;

  return (
    <div className={`flex mb-5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center mr-3">
          <FiCpu className="text-white" size={18} />
        </div>
      )}

      <div
        className={`px-4 py-3 rounded-lg max-w-[80%] ${
          isUser
            ? 'bg-teal-600 text-white rounded-tr-none shadow-sm'
            : 'bg-white text-gray-800 rounded-tl-none shadow-md'
        }`}>
        <p className={`${isUser ? 'text-white' : 'text-gray-800'} text-sm font-medium whitespace-pre-wrap`}>
          {message.content}
        </p>

        {message.tools && message.tools.length > 0 && (
          <div className={`mt-2 text-xs ${isUser ? 'text-teal-100' : 'text-gray-600'}`}>
            <div className="italic">
              {message.tools.map((tool, index: number) => (
                <span key={index} className="mr-2">
                  {tool.action}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
          <FiUser className="text-gray-600" size={18} />
        </div>
      )}
    </div>
  );
}
