import { MobileContainer } from '../components/MobileContainer';
import { useNavigate } from 'react-router-dom';
import { Bell, CreditCard, Zap, ShoppingCart, TrendingUp } from 'lucide-react';

export function MainDashboard() {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'subscriptions',
      icon: Bell,
      title: 'Subscriptions',
      description: 'Netflix, Spotify, WiFi',
      amount: '₹28,000',
      color: 'from-blue-500 to-blue-600',
      path: '/subscriptions',
    },
    {
      id: 'emi',
      icon: CreditCard,
      title: 'EMI',
      description: 'Loans & credit payments',
      amount: 'Coming soon',
      color: 'from-purple-500 to-purple-600',
      path: '/emi',
    },
    {
      id: 'utilities',
      icon: Zap,
      title: 'Utilities',
      description: 'Electricity, water, gas',
      amount: 'Coming soon',
      color: 'from-cyan-500 to-cyan-600',
      path: '/utilities',
    },
    {
      id: 'groceries',
      icon: ShoppingCart,
      title: 'Groceries',
      description: 'Household expenses',
      amount: 'Coming soon',
      color: 'from-green-500 to-green-600',
      path: '/groceries',
    },
  ];

  return (
    <MobileContainer>
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleDrawer'))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-semibold">Dashboard</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1 ml-14">Your recurring expense intelligence</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Overview Card */}
        <div className="bg-white rounded-2xl p-7 shadow-sm">
          <p className="text-gray-500 text-sm mb-3">Total Yearly Spending</p>
          <p className="text-5xl font-bold text-gray-900 mb-3">₹28,000</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-green-50 text-green-700">
            <TrendingUp className="w-4 h-4" />
            <span>Active modules: 1</span>
          </div>
        </div>

        {/* Module Cards */}
        <div>
          <h2 className="text-gray-900 font-semibold text-lg mb-4 px-1">Modules</h2>
          <div className="space-y-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => navigate(module.path)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-bold text-lg mb-1">{module.title}</h3>
                        <p className="text-gray-500 text-sm">{module.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-gray-500 text-sm">Yearly total</span>
                    <span className="text-gray-900 font-bold text-lg">{module.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
