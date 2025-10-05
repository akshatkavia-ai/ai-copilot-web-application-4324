import React, { useEffect, useRef, useState } from "react";
import { api } from "../services/api.js";
import MessageBubble from "./MessageBubble.jsx";

/**
 * PUBLIC_INTERFACE
 * Chat window providing conversation UI and send interaction.
 */
export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI Copilot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", { messages: newMessages });
      const reply = res?.data?.reply ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred contacting the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="chat-card shadow-md">
      <div className="chat-header">Conversation</div>
      <div className="chat-body">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
        ))}
        {loading && <div className="typing">AI is thinking…</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={2}
        />
        <button className="send-btn" onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </section>
  );
}
