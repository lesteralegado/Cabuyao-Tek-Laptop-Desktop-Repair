import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wrench, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Repairs', path: '/repairs', icon: Wrench },
];

export default function DashboardSidebar({ isOpen, setIsOpen }: DashboardSidebarProps) {
  const { signOut } = useAuth();
  return (
    <>
      {isOpen && <button type="button" aria-label="Close staff menu" className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      <aside id="staff-navigation" aria-label="Staff navigation" className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#142825] text-white transition-transform duration-300 ${isOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'} md:visible md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2"><Wrench className="h-6 w-6 text-[#bfe0cc]" /><span className="text-lg font-bold">Cabuyao Tek</span></div>
            <button type="button" aria-label="Close staff menu" onClick={() => setIsOpen(false)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button>
          </div>
          <p className="px-8 pt-8 pb-2 text-xs font-bold uppercase tracking-[.16em] text-[#92afa0]">Workspace</p>
          <nav className="flex-grow px-4 space-y-2" aria-label="Staff pages">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive ? 'bg-[#d9ebe7] text-[#143c39]' : 'text-[#b4c9bd] hover:bg-white/10 hover:text-white'}`}>
                <item.icon className="h-5 w-5" /><span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button type="button" onClick={() => void signOut()} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#b4c9bd] hover:bg-white/10 hover:text-white transition-colors font-medium"><LogOut className="h-5 w-5" /><span>Sign out</span></button>
          </div>
        </div>
      </aside>
    </>
  );
}
