'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CognipeerClient } from '@cognipeer/sdk';

export type Peer = {
  _id: string;
  name: string;
  shortDescription: string;
};
type Conversation = {
  _id: string;
  peerId?: string;
  peer?: Peer;
};

type Message = {
  content: string;
  tools?: any[];
  id: string;
  isUser: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_COGNIPEER_API_URL || 'https://api.cognipeer.com';
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
  initializeClient: (baseUrl?: string, token?: string) => void;
  apiToken: string;
  apiUrl: string;
  peerId: string;
  setPeerId: (id: string) => void;
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
  const [apiToken, setApiToken] = useState(API_TOKEN);
  const [peerId, setPeerId] = useState('');

  useEffect(() => {
    if (!isInitialized) {
      initializeClient();
    }
  }, [isInitialized]);

  const initializeClient = (baseUrl?: string, token?: string) => {
    try {
      const newClient = new CognipeerClient({
        apiUrl: baseUrl || API_BASE_URL,
        token: token || API_TOKEN,
      });
      setClient(newClient);
      setApiToken(token || API_TOKEN);
      setIsInitialized(true);
    } catch (err) {
      setError('Failed to initialize cognipeer client');
      console.error(err);
    }
  };

  const loadPeers = async () => {
    if (!client || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const peersList = await client.peers.list();
      setPeers(peersList);
    } catch (err) {
      setError('Failed to load peers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (client && !peers.length) {
      loadPeers();
    }
  }, [client]);

  const selectPeer = (peer: Peer) => {
    setSelectedPeer(peer);
    setPeerId(peer._id);
    setConversation(null);
    setMessages([]);
  };

  const createConversation = async (peerId: string) => {
    if (!client) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await client.conversations.create({ peerId });
      setConversation({ _id: response.conversationId || '', peerId });
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
      const userMessage: Message = {
        content,
        id: `user-${Date.now()}`,
        isUser: true,
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await client.conversations.sendMessage({
        conversationId: conversation._id,
        content
      });

      const aiMessage: Message = {
        content: response.content || '',
        tools: response.tools,
        id: `ai-${Date.now()}`,
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
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
    initializeClient,
    apiToken,
    peerId,
    setPeerId,
    apiUrl: API_BASE_URL
  };

  return <CognipeerContext.Provider value={value}>{children}</CognipeerContext.Provider>;
};

export const useCognipeer = () => {
  const context = useContext(CognipeerContext);
  if (context === undefined) {
    throw new Error('useCognipeer must be used within a CognipeerProvider');
  }
  return context;
};
