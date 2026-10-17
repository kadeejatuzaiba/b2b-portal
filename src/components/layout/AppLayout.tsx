import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import CreateOrderModal from '../../features/orders/pages/CreateOrderModal';

export interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Reusable Dashboard Layout Component
 * Responsible only for shared application layout: Sidebar, Header, main content area.
 * The Create New Order modal is imported from its own dedicated component.
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-sans">
      {/* Reusable Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Reusable Header */}
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onCreateOrderClick={() => setIsCreateModalOpen(true)}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5">
          <div className="mx-auto max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>

      {/* Create New Order Modal */}
      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
