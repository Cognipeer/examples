'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import CognipeerClient from '@cognipeer/client-js';

// Types from the new client package
type Peer = any; // Will use the types from the package dynamically
type Conversation = any;
type Message = any;

// Get environment variables with fallbacks
const API_BASE_URL = process.env.NEXT_PUBLIC_COGNIPEER_API_URL || 'https://api.cognipeer.com/v1/client';
const API_TOKEN = process.env.NEXT_PUBLIC_COGNIPEER_API_TOKEN || '';

interface CognipeerContextType {
  client: CognipeerClient | null;
  peers: Peer[];
  selectedPeer: Peer | null;
  conversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  loadPeers: () => Promise<void>;
  selectPeer: (peer: Peer) => void;
  createConversation: (peerId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
}

const CognipeerContext = createContext<CognipeerContextType | undefined>(undefined);

export const CognipeerProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<CognipeerClient | null>(null);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize client once on component mount
  useEffect(() => {
    if (!isInitialized) {
      try {
        const newClient = new CognipeerClient({ 
          baseUrl: API_BASE_URL, 
          token: API_TOKEN
        });
        setClient(newClient);
        setIsInitialized(true);
      } catch (err) {
        setError('Failed to initialize Cognipeer client');
        console.error(err);
      }
    }
  }, [isInitialized]);

  const loadPeers = async () => {
    if (!client || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Using the new client's peer.list method
      const peersList = await client.peer.list();
      setPeers(peersList);
    } catch (err) {
      setError('Failed to load peers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load peers once after client is initialized
  useEffect(() => {
    if (client && !peers.length) {
      loadPeers();
    }
  }, [client]);

  const selectPeer = (peer: Peer) => {
    setSelectedPeer(peer);
    setConversation(null);
    setMessages([]);
  };

  const createConversation = async (peerId: string) => {
    if (!client) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Using the new client's conversation.create method
      const newConversation = await client.conversation.create(peerId);
      setConversation(newConversation);
      setMessages([]);
    } catch (err) {
      setError('Failed to create conversation');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!client || !conversation) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to UI immediately
      const userMessage: Message = {
        content,
        id: `user-${Date.now()}`,
        isUser: true,
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // Send to API and get response with the new client's conversation.sendMessage method
      const response = await client.conversation.sendMessage(conversation._id, content);
      
      // Add AI response to messages
      setMessages(prevMessages => [...prevMessages, response]);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    client,
    peers,
    selectedPeer,
    conversation,
    messages,
    isLoading,
    error,
    loadPeers,
    selectPeer,
    createConversation,
    sendMessage,
  };

  return (
    <CognipeerContext.Provider value={value}>
      {children}
    </CognipeerContext.Provider>
  );
};

export const useCognipeer = () => {
  const context = useContext(CognipeerContext);
  if (context === undefined) {
    throw new Error('useCognipeer must be used within a CognipeerProvider');
  }
  return context;
};