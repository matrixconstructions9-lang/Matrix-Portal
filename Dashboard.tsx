import React from 'react';
import { User, UserRole } from '../types';
import { LayoutDashboard, HardHat, FileText, Calendar, LogOut, Construction, UserCheck, User as UserIcon } from 'lucide-react'; // Renamed User to UserIcon

interface LayoutProps {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, children, onLogout, activeView, setActiveView }) => {
  const isOwner = user.role === UserRole.OWNER;

  const navItems = isOwner ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Construction },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'reports', label: 'Daily Logs', icon: FileText },
  ] : [
    { id: 'engineer-dashboard', label: 'My Projects', icon: HardHat },
    { id: 'daily-update', label: 'Daily Update', icon: FileText },
    { id: 'my-timeline', label: 'My Timeline', icon: Calendar }, // Changed label for clarity
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Dark Green Background */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-emerald-900">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Construction className="text-teal-400" />
            Matrix <span className="text-teal-400">Constructions</span>
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === item.id ? 'bg-teal-600 text-white' : 'hover:bg-emerald-900 text-emerald-100/60'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-emerald-400 uppercase">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-emerald-400 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {navItems.find(i => i.id === activeView)?.label || 'Overview'}
          </h2>
          <div className="flex items-center gap-4">
             <span className="text-sm text-slate-500">{new Date().toDateString()}</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;