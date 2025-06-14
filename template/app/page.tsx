'use client';

import HorizontalNav from "@/components/HorizontalNav/HorizontalNav";
import UserHeader from "@/components/VerticalNav/UserHeader";
import MessageInput from "@/components/Chat/MessageInput";
import MessageList from "@/components/Chat/MessageList";
import { useState, useEffect, useRef } from "react";
import { useUserService } from "@/composables";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "1"; // Replace with actual logged-in user ID
  const { sendMessage } = useUserService();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    const newMsg = {
      text,
      senderId: currentUserId,
      receiverId: selectedUser?.ID,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    sendMessage(newMsg);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="h-screen bg-gray-100">
      <div className="h-full flex">
        {/* Left Sidebar */}
        <div className="w-1/3 max-w-sm bg-white border-r border-gray-300">
          <HorizontalNav selectUser={(user: any) => setSelectedUser(user)} />
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-chat bg-cover bg-center relative">
          {selectedUser ? (
            <>
              <UserHeader user={selectedUser} />
              <MessageList messages={messages} currentUserId={currentUserId} />
              <div ref={messagesEndRef} />
              <MessageInput onSend={handleSend} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
