'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Loader2, Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  clientId?: number;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [clientId, setClientId] = useState<number | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);



  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN || isConnectingRef.current) return;

    isConnectingRef.current = true;
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
      setReconnectAttempts(0);
      isConnectingRef.current = false;
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        if (response.type === 'connection') {
          setClientId(response.clientId);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: 'Connected to chat server',
            timestamp: new Date(),
            clientId: response.clientId
          }]);
        } else if (response.type === 'response') {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: response.message,
            timestamp: new Date(),
            clientId: response.clientId
          }]);
          setIsLoading(false);
        } else if (response.type === 'error') {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: 'Error: ' + response.message,
            timestamp: new Date(),
            clientId: response.clientId
          }]);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        setIsLoading(false);
      }
    };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    //   setIsConnected(false);
    //   isConnectingRef.current = false;
    //   handleReconnect();
    // };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
      isConnectingRef.current = false;
      handleReconnect();
    };

    wsRef.current = ws;
  };

  const handleReconnect = () => {
    if (reconnectAttempts >= 5) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Failed to reconnect after multiple attempts. Please refresh the page.',
        timestamp: new Date()
      }]);
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
    setReconnectAttempts(prev => prev + 1);

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, delay);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (!input.trim() || !wsRef.current || !isConnected || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message = input.trim();
    setInput('');
    setIsLoading(true);

    setMessages(prev => [...prev, {
      type: 'user',
      content: message,
      timestamp: new Date(),
      clientId: clientId || undefined
    }]);

    try {
      wsRef.current.send(JSON.stringify({
        type: 'chat',
        message: message,
        clientId: clientId
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Error sending message. Please try again.',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col overflow-hidden">
      <CardHeader className="border-b flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Chat with AI Assistant
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            {!isConnected && reconnectAttempts > 0 && (
              <span className="text-sm text-gray-500">
                Reconnecting... ({reconnectAttempts}/5)
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 break-words ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>AI is typing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mt-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            disabled={!isConnected}
          />
          <Button
            onClick={handleSend}
            disabled={!isConnected || !input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 