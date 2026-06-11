import { useState } from 'react';
import { MobileContainer } from '../../components/MobileContainer';
import { DashboardBottomNav } from '../../components/DashboardBottomNav';
import { subscriptions, yearlySpendingData } from '../../data/mockData';
import { Search, Bell, CreditCard, Zap, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';

export function DashboardStats() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026');

  const currentYear = new Date().getFullYear();

  // Calculate yearly totals
  const monthlySpend = subscriptions.reduce((sum, sub) => {
    return sum + (sub.billingType === 'Yearly' ? sub.price / 12 : sub.price);
  }, 0);

  const yearlyTotal = Math.round(monthlySpend * 12);
  const previousYearData = yearlySpendingData.find(d => d.year === String(currentYear - 1));
  const currentYearData = yearlySpendingData.find(d => d.year === String(currentYear));

  const yearChange = previousYearData && currentYearData
    ? currentYearData.amount - previousYearData.amount
    : 0;
  const yearChangePercent = previousYearData
    ? ((yearChange / previousYearData.amount) * 100).toFixed(1)
    : '0.0';

  // Module totals
  const moduleTotals = [
    {
      id: 'subscriptions',
      icon: Bell,
      name: 'Subscriptions',
      monthly: Math.round(monthlySpend),
      yearly: yearlyTotal,
      items: subscriptions.length,
      color: 'purple',
    },
    {
      id: 'emi',
      icon: CreditCard,
      name: 'EMI',
      monthly: 0,
      yearly: 0,
      items: 0,
      color: 'blue',
    },
    {
      id: 'utilities',
      icon: Zap,
      name: 'Utilities',
      monthly: 0,
      yearly: 0,
      items: 0,
      color: 'amber',
    },
    {
      id: 'groceries',
      icon: ShoppingCart,
      name: 'Groceries',
      monthly: 0,
      yearly: 0,
      items: 0,
      color: 'green',
    },
  ];

  // Top expenses
  const topExpenses = subscriptions
    .map(sub => ({
      ...sub,
      monthlyAmount: sub.billingType === 'Yearly' ? Math.round(sub.price / 12) : sub.price,
      yearlyAmount: sub.billingType === 'Yearly' ? sub.price : sub.price * 12,
    }))
    .filter(sub => sub.serviceName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.yearlyAmount - a.yearlyAmount);

  // Category breakdown
  const categoryBreakdown = subscriptions.reduce((acc: any, sub) => {
    const yearlyPrice = sub.billingType === 'Yearly' ? sub.price : sub.price * 12;
    if (!acc[sub.category]) {
      acc[sub.category] = { count: 0, yearly: 0 };
    }
    acc[sub.category].count += 1;
    acc[sub.category].yearly += yearlyPrice;
    return acc;
  }, {});

  const getColorClasses = (color: string) => {
    const colorMap: any = {
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
    };
    return colorMap[color] || colorMap.blue;
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
        <p className="text-gray-300 text-sm mt-1 ml-14">Detailed statistics</p>
      </div>

      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
          />
        </div>

        {/* Year Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Year Summary {currentYear}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Monthly Average</p>
              <p className="text-gray-900 text-2xl font-bold">₹{Math.round(monthlySpend).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Yearly Total</p>
              <p className="text-gray-900 text-2xl font-bold">₹{yearlyTotal.toLocaleString()}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">vs {currentYear - 1}</span>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                yearChange >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {yearChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{yearChange >= 0 ? '+' : ''}₹{Math.abs(yearChange).toLocaleString()} ({yearChangePercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Module Totals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Module Breakdown</h2>
          <div className="space-y-4">
            {moduleTotals.map((module) => {
              const Icon = module.icon;
              const colors = getColorClasses(module.color);

              return (
                <div key={module.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{module.name}</p>
                      <p className="text-gray-500 text-sm">{module.items} {module.items === 1 ? 'item' : 'items'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold">₹{module.monthly.toLocaleString()}/mo</p>
                    <p className="text-gray-500 text-sm">₹{module.yearly.toLocaleString()}/yr</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Insights */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Category Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown).map(([category, data]: [string, any]) => (
              <div key={category} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-900 font-medium">{category}</p>
                  <p className="text-gray-500 text-sm">{data.count} {data.count === 1 ? 'subscription' : 'subscriptions'}</p>
                </div>
                <p className="text-gray-900 font-bold">₹{Math.round(data.yearly).toLocaleString()}/yr</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">
            {searchQuery ? 'Search Results' : 'All Expenses'}
          </h2>
          {topExpenses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No results found</p>
              <p className="text-gray-400 text-sm">Try a different search term</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900 font-medium">{expense.serviceName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {expense.category}
                      </span>
                      <span className="text-xs text-gray-500">{expense.billingType}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold">₹{expense.monthlyAmount}/mo</p>
                    <p className="text-gray-500 text-sm">₹{expense.yearlyAmount}/yr</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Long-term Intelligence */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Long-term Trends</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">3-year total (2024-2026)</span>
              <span className="text-gray-900 font-bold">₹{(yearlyTotal * 3).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">Average annual growth</span>
              <span className="text-gray-900 font-bold">+5.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">Most stable category</span>
              <span className="text-gray-900 font-bold">OTT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-sm">Potential lifetime savings</span>
              <span className="text-green-600 font-bold">₹28,800</span>
            </div>
          </div>
        </div>
      </div>

      <DashboardBottomNav />
    </MobileContainer>
  );
}
