import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardSidebar from './dashboard/DashboardSidebar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
