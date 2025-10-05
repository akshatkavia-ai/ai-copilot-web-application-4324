import React from "react";
import ChatWindow from "./components/ChatWindow.jsx";

/**
 * PUBLIC_INTERFACE
 * Root application component for the AI Copilot frontend.
 */
export default function App() {
  return (
    <div className="app-container">
      <header className="app-header shadow-sm">
        <div className="brand">
          <span className="brand-accent">AI</span> Copilot
        </div>
        <div className="header-subtitle">Your Heritage Brown Assistant</div>
      </header>
      <main className="app-main">
        <ChatWindow />
      </main>
      <footer className="app-footer">© {new Date().getFullYear()} AI Copilot</footer>
    </div>
  );
}
