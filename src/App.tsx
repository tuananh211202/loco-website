import GuestLayout from './components/GuestLayout';
import MainLayout from './components/MainLayout';
import { useAuth } from './context/auth-context';

const App = () => {
  const { state: authState } = useAuth();
  return authState.isLogin ? <MainLayout /> : <GuestLayout />;
}

export default App
