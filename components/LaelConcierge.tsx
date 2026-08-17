"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

let messageIdCounter = 0;
function generateMessageId(): string {
  return `msg-${++messageIdCounter}`;
}

export function LaelConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I'm your personal LAEL stylist. I can help you find the perfect piece, answer questions about care and shipping, or just chat about jewellery. What brings you here today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: "Help me choose", emoji: "✨" },
    { label: "Gift ideas", emoji: "🎁" },
    { label: "Anti-tarnish care", emoji: "✦" },
    { label: "Shop earrings", emoji: "👂" },
  ];

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: generateMessageId(),
      role: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: generateMessageId(),
        role: "assistant",
        text: data.text || "I'm here to help. What would you like to know?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: generateMessageId(),
        role: "assistant",
        text: "Let me connect you with our team. Feel free to message us on WhatsApp for a quicker response!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F1E8] shadow-lg transition hover:scale-110 sm:bottom-32 sm:right-8 border border-[#29251F]/20"
      >
        <motion.span
          animate={{ scale: isOpen ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
          className="text-2xl"
        >
          ✦
        </motion.span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-40 right-6 z-40 w-[90vw] max-w-sm rounded-2xl border border-[#29251F]/10 bg-[#FFFDF8] shadow-2xl overflow-hidden flex flex-col h-[500px] sm:bottom-48 sm:right-8"
          >
            {/* Header */}
            <div className="border-b border-[#29251F]/10 bg-[#F7F1E8] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-medium text-[#29251F]">LAEL CONCIERGE</p>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B]">Your personal stylist</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#75695B] hover:text-[#29251F] text-xl transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#29251F] text-[#F7F1E8]"
                        : "bg-[#EFE5D6] text-[#29251F]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 p-2"
                >
                  <div className="h-2 w-2 rounded-full bg-[#B79A6A] animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-[#B79A6A] animate-bounce delay-100" />
                  <div className="h-2 w-2 rounded-full bg-[#B79A6A] animate-bounce delay-200" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions or Input */}
            {messages.length === 1 && !isLoading ? (
              <div className="border-t border-[#29251F]/10 p-4 space-y-2">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#75695B] mb-3">Quick actions</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleSendMessage(action.label)}
                      className="rounded-lg border border-[#29251F]/10 bg-[#F7F1E8] px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#29251F] transition hover:bg-[#EFE5D6]"
                    >
                      <span className="text-lg">{action.emoji}</span>
                      <p className="mt-1 text-xs leading-tight">{action.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-[#29251F]/10 p-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(input);
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#EFE5D6] text-[#29251F] placeholder-[#75695B] rounded-lg px-3 py-2 text-sm outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-[#29251F] text-[#F7F1E8] px-4 py-2 text-sm font-medium transition hover:bg-[#3d3530] disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
