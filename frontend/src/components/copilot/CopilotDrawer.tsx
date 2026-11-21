import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Bot, Send, Sparkles, X, ChevronRight, AlertTriangle, ShieldCheck, CornerDownLeft } from 'lucide-react';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (screenId: string) => void;
}

interface Message {
  id: string;
  sender: 'USER' | 'COPILOT';
  text: string;
  timestamp: string;
  citations?: string[];
  riskLevel?: string;
  suggestedAction?: string;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'COPILOT',
      text: "Resilience Intelligence Copilot initialized. I have synthesized telemetry across 13 global infrastructure assets, 10 dependency edges, and 8 active autonomous agents. How can I assist your operational posture?",
      timestamp: 'Just now',
      citations: ['Global Infrastructure Operations Group Telemetry Core'],
      riskLevel: 'LOW'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What are our highest-risk assets?",
    "What happens if Rhine-Main substation trips?",
    "Which infrastructure failures cause cascading disruption?",
    "What is the best recovery strategy for Frankfurt?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'USER',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await api.askCopilot(q);
      const copilotMsg: Message = {
        id: `cop-${Date.now()}`,
        sender: 'COPILOT',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations,
        riskLevel: response.riskLevel,
        suggestedAction: response.suggestedAction,
      };
      setMessages(prev => [...prev, copilotMsg]);
    } catch {
      // fallback
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-[#0A0E14] border-l border-[#202B38] shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 bg-[#111923] border-b border-[#202B38] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 text-[#8B7CFF]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-[#E8EDF5]">RESILIENCE COPILOT</h3>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#8B7CFF]/20 text-[#8B7CFF] border border-[#8B7CFF]/30">
                AI ENGINE
              </span>
            </div>
            <p className="text-[11px] text-[#8492A6]">Autonomous Infrastructure Intelligence</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-[#202B38] text-[#8492A6] hover:text-[#E8EDF5]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-[#0D121A] border-b border-[#202B38] overflow-x-auto flex gap-1.5 no-scrollbar">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="whitespace-nowrap px-2.5 py-1 rounded bg-[#111923] border border-[#202B38] hover:border-[#8B7CFF]/50 text-[11px] text-[#8492A6] hover:text-[#E8EDF5] transition-all flex items-center gap-1 font-mono"
          >
            <Sparkles className="w-3 h-3 text-[#8B7CFF]" />
            {p}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8492A6] mb-1">
              {msg.sender === 'COPILOT' ? (
                <>
                  <Bot className="w-3.5 h-3.5 text-[#8B7CFF]" />
                  <span className="text-[#8B7CFF] font-semibold">Resilience Copilot</span>
                </>
              ) : (
                <span>Commander B. Vance</span>
              )}
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-3 rounded-lg max-w-[92%] leading-relaxed ${
                msg.sender === 'USER'
                  ? 'bg-[#35D6C5]/15 border border-[#35D6C5]/30 text-[#E8EDF5] font-sans'
                  : 'bg-[#111923] border border-[#202B38] text-[#E8EDF5] font-sans'
              }`}
            >
              <p>{msg.text}</p>

              {/* Citations & Context references */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-[#202B38]/80 text-[11px] font-mono">
                  <span className="text-[#8492A6] block text-[10px] uppercase mb-1">EVIDENCE CITATIONS:</span>
                  <div className="flex flex-wrap gap-1">
                    {msg.citations.map((cite, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-[#0A0E14] border border-[#202B38] text-[#35D6C5]">
                        {cite}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Action Pill */}
              {msg.suggestedAction && (
                <div className="mt-2.5 p-2 rounded bg-[#0A0E14] border border-[#8B7CFF]/30 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B7CFF] shrink-0 mt-0.5" />
                  <div className="text-[11px]">
                    <span className="text-[#8B7CFF] font-mono font-semibold block text-[10px]">RECOMMENDED INTERVENTION:</span>
                    <span className="text-[#E8EDF5] font-sans">{msg.suggestedAction}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#8B7CFF] p-2 bg-[#111923] rounded border border-[#202B38] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#8B7CFF] animate-ping" />
            Synthesizing digital twin topology & risk matrix...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-[#111923] border-t border-[#202B38]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask contextual questions about infrastructure..."
            className="w-full bg-[#0A0E14] border border-[#202B38] rounded-md pl-3 pr-10 py-2.5 text-xs text-[#E8EDF5] placeholder-[#526071] focus:outline-none focus:border-[#8B7CFF]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="absolute right-1.5 p-1.5 rounded bg-[#8B7CFF] disabled:bg-[#202B38] text-[#080B10] disabled:text-[#526071] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#526071] font-mono">
          <span>Connected to Spring Boot REST Core</span>
          <span>Shift+Enter for newline</span>
        </div>
      </div>
    </div>
  );
};
