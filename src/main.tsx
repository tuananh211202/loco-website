import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth-context.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChatProvider } from './context/chat-context.tsx'
import { PostProvider } from './context/post-context.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>,
)
