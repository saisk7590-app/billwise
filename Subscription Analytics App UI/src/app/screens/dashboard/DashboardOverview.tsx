import { MobileContainer } from '../../components/MobileContainer';
import { DashboardBottomNav } from '../../components/DashboardBottomNav';
import { subscriptions } from '../../data/mockData';
import { Bell, CreditCard, Zap, ShoppingCart, TrendingUp, AlertCircle, Sparkles, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function DashboardOverview() {
  const navigate = useNavigate();
  const [showFAB, setShowFAB] = useState(false);

  // Calculate monthly recurring spend
  const monthlySpend = subscriptions.reduce((sum, sub) => {
    return sum + (sub.billingType === 'Yearly' ? sub.price / 12 : sub.price);
  }, 0);

  const yearlyProjection = Math.round(monthlySpend * 12);
  const previousYearSpend = 26500;
  const growthPercentage = ((yearlyProjection - previousYearSpend) / previousYearSpend * 100).toFixed(1);

  // Financial health score (0-100)
  const healthScore = 78;

  // Sparkline data (last 6 months)
  const sparklineData = [
    { month: 'Jan', amount: 2200 },
    { month: 'Feb', amount: 2250 },
    { month: 'Mar', amount: 2280 },
    { month: 'Apr', amount: 2320 },
    { month: 'May', amount: 2330 },
    { month: 'Jun', amount: Math.round(monthlySpend) },
  ];

  // KPI Cards Data
  const upcomingDueAmount = subscriptions
    .filter(sub => {
      const daysUntil = Math.ceil((new Date(sub.nextDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    })
    .reduce((sum, sub) => sum + sub.price, 0);

  const activeItems = subscriptions.filter(sub => sub.status === 'Active').length;

  // Module Glance Data
  const moduleGlance = [
    {
      id: 'subscriptions',
      icon: Bell,
      title: 'Subscriptions',
      monthlySpend: Math.round(monthlySpend),
      metric: `${activeItems} active`,
      color: 'from-purple-500 to-indigo-600',
      path: '/subscriptions',
    },
    {
      id: 'emi',
      icon: CreditCard,
      title: 'EMI',
      monthlySpend: 0,
      metric: 'Not setup',
      color: 'from-blue-600 to-blue-700',
      path: '/emi',
    },
    {
      id: 'utilities',
      icon: Zap,
      title: 'Utilities',
      monthlySpend: 0,
      metric: 'Not setup',
      color: 'from-amber-500 to-orange-600',
      path: '/utilities',
    },
    {
      id: 'groceries',
      icon: ShoppingCart,
      title: 'Groceries',
      monthlySpend: 0,
      metric: 'Not setup',
      color: 'from-green-500 to-green-600',
      path: '/groceries',
    },
  ];

  // Monthly Burn Rate Graph
  const burnRateData = [
    { month: 'Jan', subscriptions: 2200, emi: 0, utilities: 0, groceries: 0 },
    { month: 'Feb', subscriptions: 2250, emi: 0, utilities: 0, groceries: 0 },
    { month: 'Mar', subscriptions: 2280, emi: 0, utilities: 0, groceries: 0 },
    { month: 'Apr', subscriptions: 2320, emi: 0, utilities: 0, groceries: 0 },
    { month: 'May', subscriptions: 2330, emi: 0, utilities: 0, groceries: 0 },
    { month: 'Jun', subscriptions: Math.round(monthlySpend), emi: 0, utilities: 0, groceries: 0 },
  ];

  // Upcoming Burden Timeline
  const upcomingBurden = [
    { date: '15 Jun', title: 'Netflix + Prime due', amount: 1148, urgency: 'high' },
    { date: '22 Jun', title: 'WiFi + DTH renewal', amount: 2598, urgency: 'medium' },
    { date: '30 Jun', title: 'Mobile recharge', amount: 719, urgency: 'low' },
  ];

  const getUrgencyColor = (urgency: string) => {
    if (urgency === 'high') return 'bg-red-100 border-red-300';
    if (urgency === 'medium') return 'bg-amber-100 border-amber-300';
    return 'bg-green-100 border-green-300';
  };

  const getUrgencyDot = (urgency: string) => {
    if (urgency === 'high') return 'bg-red-500';
    if (urgency === 'medium') return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <MobileContainer>
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 px-6 pt-8 pb-6 rounded-b-3xl">
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
        <p className="text-gray-300 text-sm mt-1 ml-14">Financial command center</p>
      </div>

      <div className="px-4 -mt-4 pb-24 space-y-5">
        {/* Hero Financial Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-gray-400 text-sm mb-2">Monthly Recurring</p>
              <p className="text-white text-4xl font-bold mb-1">₹{Math.round(monthlySpend).toLocaleString()}</p>
              <p className="text-gray-400 text-sm">₹{yearlyProjection.toLocaleString()}/year</p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
                parseFloat(growthPercentage) > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span>{growthPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Mini Sparkline */}
          <div className="mb-3" style={{ height: '64px' }}>
            <ResponsiveContainer width="100%" height={64}>
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="amount" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Health Score */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <span className="text-gray-400 text-sm">Financial Health</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${healthScore}%` }} />
              </div>
              <span className="text-white text-sm font-semibold">{healthScore}/100</span>
            </div>
          </div>
        </div>

        {/* KPI Cards (2x2 Grid) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">Due This Week</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">₹{upcomingDueAmount.toLocaleString()}</p>
            <p className="text-gray-400 text-xs">3 items</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">Active Items</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">{activeItems}</p>
            <p className="text-gray-400 text-xs">Recurring</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">This Month</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">₹{Math.round(monthlySpend).toLocaleString()}</p>
            <p className="text-green-600 text-xs font-medium">On track</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">Savings Found</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">₹800</p>
            <p className="text-purple-600 text-xs font-medium">Potential</p>
          </div>
        </div>

        {/* Main Insight Card */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-purple-900 font-semibold mb-1">Duplicate OTT bundle found</p>
              <p className="text-purple-700 text-sm">You're paying for Netflix in both individual and family plan. Save ₹800/month by consolidating.</p>
            </div>
          </div>
        </div>

        {/* Quick Module Glance */}
        <div>
          <h2 className="text-gray-900 font-semibold text-lg mb-3 px-1">Modules</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {moduleGlance.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => navigate(module.path)}
                  className="bg-white rounded-xl p-4 shadow-sm min-w-[160px] cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-900 font-semibold text-sm mb-1">{module.title}</p>
                  <p className="text-gray-900 text-xl font-bold mb-1">₹{module.monthlySpend.toLocaleString()}</p>
                  <p className="text-gray-500 text-xs">{module.metric}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Burn Rate Graph */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Monthly Burn Rate</h2>
          <div style={{ height: '192px' }}>
            <ResponsiveContainer width="100%" height={192}>
              <LineChart data={burnRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  formatter={(value: any) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="subscriptions" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="emi" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="utilities" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="groceries" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Burden Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Upcoming Dues</h2>
          <div className="space-y-3">
            {upcomingBurden.map((item) => (
              <div key={`${item.date}-${item.title}`} className={`border rounded-xl p-4 ${getUrgencyColor(item.urgency)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getUrgencyDot(item.urgency)}`} />
                    <div>
                      <p className="text-gray-900 font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-gray-600 text-xs">{item.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-900 font-bold">₹{item.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Preview */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-900 font-semibold mb-1">Potential Monthly Savings</p>
              <p className="text-green-700 text-sm">Based on optimization opportunities</p>
            </div>
            <p className="text-green-900 text-3xl font-bold">₹800</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowFAB(!showFAB)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-full shadow-lg flex items-center justify-center z-20 hover:scale-105 transition-transform"
      >
        <Plus className={`w-6 h-6 transition-transform ${showFAB ? 'rotate-45' : ''}`} />
      </button>

      {showFAB && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowFAB(false)}
          />
          <div className="fixed bottom-36 right-6 bg-white rounded-2xl shadow-xl p-3 z-20 space-y-2">
            <button
              onClick={() => {
                setShowFAB(false);
                navigate('/subscriptions/add');
              }}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
            >
              <Bell className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Add Subscription</span>
            </button>
            <button
              onClick={() => setShowFAB(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
            >
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Add EMI</span>
            </button>
            <button
              onClick={() => setShowFAB(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-900">Add Utility</span>
            </button>
            <button
              onClick={() => setShowFAB(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
            >
              <ShoppingCart className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Add Grocery</span>
            </button>
          </div>
        </>
      )}

      <DashboardBottomNav />
    </MobileContainer>
  );
}
