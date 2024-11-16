import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VitalsData } from '@/types/vitallens'
import type { ChatMessage } from '@/types/components'
import { DEFAULT_VITALS_DATA } from '@/components/vitals/DefaultVitalsData'

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Hello! I can help you understand your vital signs and provide general health information. How can I assist you today?"
};

interface DashboardState {
  vitalsData: VitalsData
  chatMessages: ChatMessage[]
  conversationId?: string
  setVitalsData: (data: VitalsData) => void
  setConversationId: (id: string | undefined) => void
  addChatMessage: (message: ChatMessage) => void
  clearData: () => void
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      vitalsData: DEFAULT_VITALS_DATA,
      chatMessages: [INITIAL_MESSAGE], // Initialize with welcome message
      conversationId: undefined,
      
      setVitalsData: (data) => set({ vitalsData: data }),
      setConversationId: (id) => set({ conversationId: id }),
      
      addChatMessage: (message) => 
        set((state) => ({ 
          chatMessages: [...state.chatMessages, message] 
        })),
      
      clearData: () => set({
        vitalsData: DEFAULT_VITALS_DATA,
        chatMessages: [INITIAL_MESSAGE], // Reset to initial message when clearing
        conversationId: undefined
      }),
    }),
    {
      name: 'healthpulse-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
)