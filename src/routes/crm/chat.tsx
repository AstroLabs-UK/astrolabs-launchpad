import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Headset, User, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/crm/chat" as any)({
  component: WorkerChatPanel,
});

function WorkerChatPanel() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Mock data for demonstration
  const activeChats = [
    { id: '1', name: 'John Doe', lastMsg: 'I need a quote for a bakery site.', time: '2m ago', status: 'waiting' },
    { id: '2', name: 'Sarah Smith', lastMsg: 'How long does it take?', time: '5m ago', status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-navy">Customer Chat</h1>
            <p className="text-foreground/60">Manage active customer inquiries and AI handovers.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-navy">Worker Session</p>
              <p className="text-xs text-green-500">Connected to Supabase</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-deep flex items-center justify-center text-white">
              <User size={20} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">
          {/* Sidebar */}
          <Card className="lg:col-span-4 flex flex-col overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input placeholder="Search chats..." className="pl-9" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="divide-y">
                {activeChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 text-left hover:bg-muted transition-colors flex items-start gap-3 ${selectedChat === chat.id ? 'bg-muted' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-steel/20 flex items-center justify-center text-navy shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm truncate">{chat.name}</span>
                        <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                    </div>
                    {chat.status === 'waiting' && (
                      <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-8 flex flex-col overflow-hidden">
            {selectedChat ? (
              <>
                <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-steel/20 flex items-center justify-center text-navy">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">John Doe</h3>
                      <p className="text-[10px] text-muted-foreground">Inquiry: Web Design</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    End Session
                  </Button>
                </div>
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy shrink-0">
                        <MessageSquare size={14} />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">
                        Hello! I'm looking for a website for my new bakery in Maidstone.
                      </div>
                    </div>
                    <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-deep text-white flex items-center justify-center shrink-0">
                        <User size={14} />
                      </div>
                      <div className="bg-deep text-white p-3 rounded-2xl rounded-tr-none text-sm">
                        Hi John! I'd be happy to help with that. What kind of features are you looking for?
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Type your response..." className="flex-1" />
                    <Button className="bg-deep hover:bg-navy">Send</Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                <Headset size={48} className="mb-4 opacity-20" />
                <h3 className="font-display font-bold text-xl text-navy/40">No Chat Selected</h3>
                <p className="max-w-xs text-sm">Select a customer from the sidebar to start assisting them.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}