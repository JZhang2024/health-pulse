import { Bot, SendHorizontal, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VitalsData } from "@/types/vitallens";
import { config } from "@/config";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface HealthAssistantProps {
  className?: string;
  vitalsData?: VitalsData;
}

interface ApiResponse {
  response: string;
  conversationId: string;
}

async function sendMessage(messages: Message[], vitalsData?: VitalsData, conversationId?: string) {
  const response = await fetch(`${config.api.baseUrl}/health-assistant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      vitalsData,
      conversationId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from health assistant');
  }

  return await response.json() as ApiResponse;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hello! I can help you understand your vital signs and provide general health information. How can I assist you today?"
};

const QUICK_ACTIONS = [
  {
    label: "Explain Vital Signs",
    message: "Can you explain what my current vital signs mean?",
  },
  {
    label: "Get Better Readings",
    message: "How can I improve the accuracy of my vital sign measurements?",
  }
];

export default function HealthAssistant({ className = '', vitalsData }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>();
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;
    
    setError(null);
    setIsLoading(true);
    
    // Create new message
    const userMessage: Message = { role: 'user', content: content.trim() };
    
    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    try {
      // Send only the new message to the API
      const data = await sendMessage([userMessage], vitalsData, conversationId);
      
      // Save conversation ID if it's new
      if (!conversationId) {
        setConversationId(data.conversationId);
      }
      
      // Add AI response to messages
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response }
      ]);
    } catch (err) {
      setError('Unable to get response. Please try again.');
      console.error('Health Assistant Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputMessage);
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur rounded-xl border border-sky-100 shadow-sm flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-sky-600" />
          <h3 className="text-lg font-semibold text-sky-950">Health Assistant</h3>
        </div>
        <div className="mt-2 flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-sky-700">
            This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'assistant'
                  ? 'bg-sky-50 border border-sky-100 text-sky-950'
                  : 'bg-sky-500 text-white ml-auto'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4 text-sky-600" />
                  <span className="text-xs font-medium text-sky-600">Health Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-sky-50 border border-sky-100 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 text-sky-600 animate-spin" />
                <span className="text-sm text-sky-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 border border-red-100 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-sky-100 bg-sky-50/50">
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button 
              key={action.label}
              className="text-xs text-sky-950 bg-white hover:bg-sky-50 border border-sky-100 rounded-md p-2 transition-colors flex items-center justify-center gap-1"
              onClick={() => handleSend(action.message)}
              disabled={isLoading}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-sky-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your health question..."
            disabled={isLoading}
            className="flex-1 bg-white border border-sky-100 rounded-lg px-4 py-2 text-sky-950 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 placeholder-sky-400 disabled:opacity-50"
          />
          <button 
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg p-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSend(inputMessage)}
            disabled={!inputMessage.trim() || isLoading}
          >
            <SendHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}