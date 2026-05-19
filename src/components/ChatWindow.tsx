"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Headset, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'human';
  timestamp: Date;
}

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm the AstroLabs assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isHumanRequested, setIsHumanRequested] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response or lead collection
    setTimeout(() => {
      if (isHumanRequested) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "A team member has been notified and will be with you shortly.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's interesting! To help you better, could you tell me what type of business you have?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    }, 1000);
  };

  const requestHuman = () => {
    setIsHumanRequested(true);
    const msg: Message = {
      id: Date.now().toString(),
      text: "I'd like to speak with a human, please.",
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Connecting you to a specialist...",
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }, 800);
  };

  return (
    <div className="absolute bottom-20 left-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-fade-up">
      {/* Header */}
      <div className="bg-deep p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm">AstroLabs Support</h3>
            <p className="text-[10px] text-white/70 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI Assistant Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-2 max-w-[85%]",
                m.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                m.sender === 'user' ? "bg-steel text-white" : "bg-navy/10 text-navy"
              )}>
                {m.sender === 'user' ? <User size={16} /> : m.sender === 'bot' ? <Bot size={16} /> : <Headset size={16} />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-sm",
                m.sender === 'user' 
                  ? "bg-deep text-white rounded-tr-none" 
                  : "bg-muted text-foreground rounded-tl-none"
              )}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-background">
        {!isHumanRequested && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={requestHuman}
            className="w-full mb-3 text-xs text-navy hover:text-deep hover:bg-navy/5"
          >
            <Headset size={14} className="mr-2" />
            Speak to a human
          </Button>
        )}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} className="bg-deep hover:bg-navy">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;