import { Home, Bell, CreditCard, Zap, ShoppingCart, Settings, LogOut, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface DrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerNav({ isOpen, onClose }: DrawerNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/' },
    { id: 'subscriptions', icon: Bell, label: 'Subscriptions', path: '/subscriptions' },
    { id: 'emi', icon: CreditCard, label: 'EMI', path: '/emi' },
    { id: 'utilities', icon: Zap, label: 'Utilities', path: '/utilities' },
    { id: 'groceries', icon: ShoppingCart, label: 'Groceries', path: '/groceries' },
  ];

  const isModuleActive = (path: string) => {
    if (path === '/') {
      // Dashboard is active for /, /analytics, /insights, /stats
      return location.pathname === '/' ||
             location.pathname === '/analytics' ||
             location.pathname === '/insights' ||
             location.pathname === '/stats';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-gray-900 font-bold text-lg">Sai Kiran</h2>
          <p className="text-gray-500 text-sm mt-1">Recurring spending stable this month.</p>
        </div>

        {/* Modules */}
        <div className="py-4 px-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-3">Modules</p>
          <div className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = isModuleActive(module.path);

              return (
                <button
                  key={module.id}
                  onClick={() => handleNavigate(module.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {module.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white space-y-1">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Settings</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
