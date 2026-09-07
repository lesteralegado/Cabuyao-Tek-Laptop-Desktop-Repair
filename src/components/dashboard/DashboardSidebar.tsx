import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Wrench, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Repairs', path: '/repairs', icon: Wrench },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wrench className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">Cabuyao Tek</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
              <span className="text-xl font-bold">✕</span>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-grow p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all font-medium"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer / Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
