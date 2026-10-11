'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X } from 'lucide-react';

const starterMessage = {
  role: 'assistant',
  content: 'Hi! Ask me about Hamza’s experience, projects, or technical stack.',
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([starterMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, open]);

  async function submit(event) {
    event.preventDefault();
    const question = message.trim();
    if (!question || loading) return;

    setMessage('');
    setMessages((current) => [...current, { role: 'user', content: question }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.answer || data.error || 'No answer was returned.' },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'I could not reach the knowledge service. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 flex h-[min(32rem,calc(100vh-8rem))] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151515] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm font-semibold text-white">Ask Hamza.dev</p>
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Hybrid search assistant</p>
              </div>
            </div>
            <button aria-label="Close chatbot" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${item.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}>
                  {item.content}
                </p>
              </div>
            ))}
            {loading && <p className="text-xs text-gray-500">Searching the portfolio...</p>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-white/10 p-3">
            <input value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1000} placeholder="Ask a question..." aria-label="Chat message" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0f0f0f] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500" />
            <button disabled={loading || !message.trim()} aria-label="Send message" className="rounded-lg bg-blue-600 px-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button aria-label={open ? 'Close chatbot' : 'Open chatbot'} onClick={() => setOpen((value) => !value)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition hover:scale-105 hover:bg-blue-500">
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
