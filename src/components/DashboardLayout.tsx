import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardSidebar from './dashboard/DashboardSidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen page-surface flex">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 min-w-0 md:ml-64 flex flex-col">
        <header className="h-16 bg-[#f9f8f4]/95 backdrop-blur-md border-b border-[#e2e9e4] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open staff menu"
            aria-controls="staff-navigation"
            aria-expanded={isSidebarOpen}
            className="md:hidden w-11 h-11 flex items-center justify-center text-[#142825] hover:bg-white rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{profile?.name || user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{profile?.role || 'Staff'}</p>
            </div>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {profile?.name?.charAt(0).toUpperCase() || 'S'}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1500px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
