import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Khởi tạo kiểu cho trạng thái
interface PostState {
  isOpen: boolean;
  postId: number;
}

// Actions
const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

// Actions types
type PostAction = {
  type: string,
  payload?: {
    postId: number,
  }
}

// Reducer
const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case OPEN:
      return { ...state, postId: action?.payload?.postId ?? 0, isOpen: true };
    case CLOSE:
      return { ...state, postId: 0, isOpen: false };
    default:
      return state;
  }
};

// Khởi tạo trạng thái mặc định
const initialState: PostState = {
  postId: 0,
  isOpen: false,
};

// Khởi tạo Context
const PostContext = createContext<{
  state: PostState;
  dispatch: React.Dispatch<PostAction>;
} | undefined>(undefined);

// Tạo Provider
interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

// Tạo custom hook để sử dụng trạng thái và hàm trong component
export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within an PostProvider');
  }
  return context;
};