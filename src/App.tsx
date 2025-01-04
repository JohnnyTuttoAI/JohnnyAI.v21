import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProviders } from './providers/WalletProviders';
import AppRoutes from './routes';
import Background from './components/layout/Background';

export default function App() {
  return (
    <WalletProviders>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white relative">
          <Background />
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </WalletProviders>
  );
}