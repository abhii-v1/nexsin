"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Maximize2, Minimize2 } from "lucide-react";

// Message Type
interface Message {
  sender: "user" | "bot";
  text: string;
  options?: string[];
}

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { sender: "bot", text: "🤖 Hello! I’m your AI Assistant." },
        ]);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "How can I help you today?",
              options: [
                "💬 Chat with Support",
                "📦 Check Order Status",
                "🧾 View History",
                "📞 Contact Team",
              ],
            },
          ]);
        }, 700);
      }, 300);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Option clicked
  const handleOptionClick = (option: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: option }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Processing your request..." },
      ]);
    }, 700);
  };

  // Send message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it! I’ll forward this to the team 🔥" },
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating Robot Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[9999]"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.img
            src="/robot.png"
            alt="chat"
            className="w-20 h-20 drop-shadow-[0_0_12px_#00BFFF]"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              width: isFull ? "100%" : "22rem",
              height: isFull ? "100vh" : "520px",
              right: isFull ? 0 : "1.5rem",
              bottom: isFull ? 0 : "7rem",
              borderRadius: isFull ? "0px" : "1.4rem",
            }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bg-[#0A0F1D]/95 backdrop-blur-xl border border-[#1A2337] shadow-2xl flex flex-col z-[9999]"
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 
              bg-gradient-to-r from-[#162447] to-[#1F4068] shadow-md"
            >
              <div className="flex items-center gap-3">
                <motion.img
                  src="/robot.png"
                  alt="bot"
                  className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
                <h3 className="text-white font-semibold">AI Assistant</h3>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFull(!isFull)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg text-white"
                >
                  {isFull ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsFull(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-lg text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#0B1220] space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex w-full">
                    <motion.div
                      className={`
      px-4 py-2 rounded-2xl text-[0.9rem] shadow-lg leading-relaxed
      ${
        msg.sender === "user"
          ? "ml-auto bg-blue-600 text-white rounded-br-md max-w-[70%]"
          : "mr-auto bg-[#1C2333] text-gray-200 rounded-bl-md max-w-[70%]"
      }
    `}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {msg.text}
                    </motion.div>
                  </div>

                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-3 py-1 rounded-lg text-xs"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Field */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 p-4 bg-[#0A0F1D] border-t border-[#162032]"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#101A33] border border-[#1B2A47] text-white rounded-lg px-3 py-2 placeholder-gray-400"
              />

              <button
                type="submit"
                className="bg-[#1E88E5] hover:bg-[#1565C0] p-3 rounded-lg text-white shadow-md"
              >
                <Send size={22} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
