import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/app/router';
import { AppProvider } from '@/app/provider';

/**
 * Main Application Root
 * Sets up BrowserRouter and top-level routing.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
