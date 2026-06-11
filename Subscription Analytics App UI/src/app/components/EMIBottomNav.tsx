import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Plus, History, Bell } from 'lucide-react';

export function EMIBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/emi' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', path: '/emi/analytics' },
    { id: 'add', icon: Plus, label: '', path: '/emi/add', isCenter: true },
    { id: 'history', icon: History, label: 'History', path: '/emi/history' },
    { id: 'reminders', icon: Bell, label: 'Reminders', path: '/emi/reminders' },
  ];

  const isTabActive = (path: string) => {
    if (path === '/emi') {
      return location.pathname === '/emi';
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-30">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(tab.path);

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="w-14 h-14 -mt-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
