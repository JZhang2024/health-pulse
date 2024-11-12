import { Bot, SendHorizontal, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface HealthAssistantProps {
  className?: string;  // Allow custom classes for positioning/styling
}

export default function HealthAssistant({ className = '' }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I can help you understand your symptoms and provide general health information. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([
      ...messages,
      { role: 'user', content: inputMessage.trim() },
      // Demo response - would be replaced with actual LLM call
      { 
        role: 'assistant',
        content: "I understand your concern. While I can provide general information, remember to consult with healthcare professionals for personalized medical advice. What other questions do you have?"
      }
    ]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur rounded-xl border border-slate-600/30 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Health Assistant</h3>
        </div>
        <div className="mt-2 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300">
            This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'assistant'
                  ? 'bg-slate-700/50 text-white'
                  : 'bg-indigo-500/50 text-white ml-auto'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-400">Health Assistant</span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-slate-600/30 bg-slate-700/30">
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="text-xs text-white bg-slate-600/50 hover:bg-slate-500/50 rounded-md p-2 transition-colors flex items-center justify-center gap-1"
            onClick={() => setMessages([
              ...messages,
              { 
                role: 'user', 
                content: "I'd like to discuss my symptoms" 
              },
              {
                role: 'assistant',
                content: "I'll help you understand your symptoms. Please describe what you're experiencing, including when they started and their severity."
              }
            ])}
          >
            Discuss Symptoms
          </button>
          <button 
            className="text-xs text-white bg-slate-600/50 hover:bg-slate-500/50 rounded-md p-2 transition-colors flex items-center justify-center gap-1"
            onClick={() => setMessages([
              ...messages,
              { 
                role: 'user', 
                content: "Help me find a healthcare provider" 
              },
              {
                role: 'assistant',
                content: "I can help you find appropriate healthcare providers. What type of care are you looking for, and what's your location?"
              }
            ])}
          >
            Find Healthcare Provider
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-600/30">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your health question..."
            className="flex-1 bg-slate-700/50 border border-slate-600/30 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button 
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSend}
            disabled={!inputMessage.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}