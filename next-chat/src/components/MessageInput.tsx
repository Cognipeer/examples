"use client";

import React, { useState, FormEvent, KeyboardEvent } from "react";
import { useCognipeer } from "@/context/CognipeerContext";
import { FiSend } from "react-icons/fi";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading, conversation, selectedPeer } = useCognipeer();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !conversation) return;
    setMessage("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white border-t p-3 px-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-grow relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedPeer
                ? `Message ${selectedPeer.name}...`
                : "Select a peer to start chatting"
            }
            disabled={isLoading || !conversation}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
            rows={1}
            style={{ minHeight: "44px" }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !message.trim() || !conversation}
          className="bg-blue-600 text-white p-3 h-[44px] w-[44px] rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center flex-shrink-0"
        >
          {isLoading ? (
            <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
          ) : (
            <FiSend size={18} />
          )}
        </button>
      </form>
    </div>
  );
}
