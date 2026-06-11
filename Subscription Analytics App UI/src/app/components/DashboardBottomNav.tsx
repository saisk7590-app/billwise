import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react';

export function DashboardBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'overview', icon: Home, label: 'Overview', path: '/' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { id: 'insights', icon: Lightbulb, label: 'Insights', path: '/insights' },
    { id: 'stats', icon: BarChart3, label: 'Stats', path: '/stats' },
  ];

  const isTabActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-30">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isTabActive(tab.path);

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] ${
                isActive
                  ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
