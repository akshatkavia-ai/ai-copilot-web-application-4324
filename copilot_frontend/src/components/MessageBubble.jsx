import React from "react";

/**
 * PUBLIC_INTERFACE
 * Renders a single message bubble styled by role.
 */
export default function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`bubble-row ${isUser ? "right" : "left"}`}>
      <div className={`bubble ${isUser ? "user" : "assistant"}`}>
        <div className="bubble-role">{isUser ? "You" : "Assistant"}</div>
        <div className="bubble-content">{content}</div>
      </div>
    </div>
  );
}
