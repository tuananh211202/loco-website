import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Khởi tạo kiểu cho trạng thái
interface ChatState {
  isOpen: boolean;
  chatId: number;
  chatAvatar: string;
  chatName: string;
}

// Actions
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

// Actions types
type ChatAction = {
  type: string,
  payload?: {
    userId: number,
    avatar: string,
    name: string,
  }
}

// Reducer
const authReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case OPEN:
      return { chatId: action?.payload?.userId ?? 0, isOpen: true, chatAvatar: action?.payload?.avatar ?? '', chatName: action?.payload?.name ?? '' };
    case CLOSE:
      return { ...state, chatId: 0, isOpen: false, chatAvatar: '', chatName: '' };
    default:
      return state;
  }
};

// Khởi tạo trạng thái mặc định
const initialState: ChatState = {
  chatId: 0,
  isOpen: false,
  chatAvatar: '',
  chatName: '',
};

// Khởi tạo Context
const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | undefined>(undefined);

// Tạo Provider
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

// Tạo custom hook để sử dụng trạng thái và hàm trong component
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};