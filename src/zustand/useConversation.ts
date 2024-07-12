import { create } from 'zustand';
import { Message, UserData } from '../utils/interfaces/interface';

interface ConversationState {
    selectedConversation: UserData | undefined;
    messages: Message[];
    reload: boolean;
    unreadMessages: Message[] | null
}

interface ConversationActions {
    setSelectedConversation: (selectedConversation: UserData | undefined) => void;
    setMessages: (messages: Message[]) => void;
    setReload: (reload: boolean) => void;
    setUnreadMessages: (unreadMessages: Message[] | null) => void;
    removeMessage:(messageId:string) => void
}

const useConversation = create<ConversationState & ConversationActions>((set) => ({
    selectedConversation: undefined,
    messages: [],
    reload: false,
    unreadMessages: null,
    setSelectedConversation: (selectedConversation) =>
        set((state) => ({ ...state, selectedConversation })),
    setMessages: (messages) => set((state) => ({ ...state, messages })),
    setReload: (reload) => set((state) => ({ ...state, reload })),
    setUnreadMessages: (unreadMessages) => set((state) => ({ ...state, unreadMessages })),
    removeMessage: (messageId) => set((state) => ({
        messages: state.messages.filter((message) => message._id !== messageId),
    })),
}));

export default useConversation;
