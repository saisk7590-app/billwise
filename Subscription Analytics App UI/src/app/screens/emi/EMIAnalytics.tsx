import { useState } from 'react';
import { MobileContainer } from '../../components/MobileContainer';
import { EMIBottomNav } from '../../components/EMIBottomNav';
import { emis, emiYearlyData, remainingBalanceTrend, emiBurdenTrend } from '../../data/emiData';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function EMIAnalytics() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'stats'>('analytics');
  const [searchQuery, setSearchQuery] = useState('');
  const [yearlyFilter, setYearlyFilter] = useState('5Y');

  const currentYear = new Date().getFullYear();

  // EMI Distribution
  const emiDistribution = emis.reduce((acc: any[], emi) => {
    const existing = acc.find(item => item.name === emi.loanType);
    if (existing) {
      existing.value += emi.monthlyEMI;
    } else {
      acc.push({ name: emi.loanType, value: emi.monthlyEMI });
    }
    return acc;
  }, []);

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  // Interest vs Principal data
  const interestPrincipalData = emis.map(emi => ({
    name: emi.name.substring(0, 10),
    principal: Math.round((emi.monthlyEMI / (1 + emi.interestRate / 1200)) * 100) / 100,
    interest: Math.round((emi.monthlyEMI - (emi.monthlyEMI / (1 + emi.interestRate / 1200))) * 100) / 100,
  }));

  // Stats tab data
  const monthlyEMI = emis.reduce((sum, emi) => sum + emi.monthlyEMI, 0);
  const totalPaid = emis.reduce((sum, emi) => sum + emi.amountPaid, 0);
  const remainingBalance = emis.reduce((sum, emi) => sum + emi.remainingBalance, 0);
  const totalInterest = emis.reduce((sum, emi) => sum + (emi.totalPayable - emi.totalAmount), 0);

  // Debt-free date
  const debtFreeDate = new Date(Math.max(...emis.map(e => new Date(e.endDate).getTime())));
  const debtFreeDateFormatted = debtFreeDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // EMI type totals
  const emiTypeTotals = emis.reduce((acc: any, emi) => {
    if (!acc[emi.loanType]) {
      acc[emi.loanType] = { amount: 0, count: 0, percentage: 0 };
    }
    acc[emi.loanType].amount += emi.monthlyEMI;
    acc[emi.loanType].count += 1;
    return acc;
  }, {});

  // Calculate percentages
  Object.keys(emiTypeTotals).forEach(type => {
    emiTypeTotals[type].percentage = Math.round((emiTypeTotals[type].amount / monthlyEMI) * 100);
  });

  // Filtered EMI list
  const filteredEMIs = emis
    .filter(emi =>
      emi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emi.lender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emi.loanType.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.monthlyEMI - a.monthlyEMI);

  // Previous year comparison
  const previousYearTotal = emiYearlyData.find(d => d.year === String(currentYear - 1))?.amount || 0;
  const currentYearTotal = emiYearlyData.find(d => d.year === String(currentYear))?.amount || 0;
  const yearChange = currentYearTotal - previousYearTotal;
  const yearChangePercent = previousYearTotal ? ((yearChange / previousYearTotal) * 100).toFixed(1) : '0.0';

  return (
    <MobileContainer>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleDrawer'))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-semibold">EMI</h1>
        </div>
        <p className="text-blue-100 text-sm mt-1 ml-14">Analytics & insights</p>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-blue-600 bg-opacity-30 text-white'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-blue-600 bg-opacity-30 text-white'
            }`}
          >
            Stats
          </button>
        </div>
      </div>

      <div className="px-4 py-6 pb-24 space-y-6">
        {activeTab === 'analytics' ? (
          <>
            {/* EMI Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">EMI Distribution</h2>
              <div style={{ height: '256px' }}>
                <ResponsiveContainer width="100%" height={256}>
                  <PieChart>
                    <Pie
                      data={emiDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {emiDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Yearly EMI Spending */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-gray-900 font-semibold text-lg">Yearly EMI Spending</h2>
                <div className="flex gap-1.5">
                  {['1Y', '3Y', '5Y', '10Y'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setYearlyFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        yearlyFilter === filter
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ height: '256px' }}>
                <ResponsiveContainer width="100%" height={256}>
                  <BarChart data={emiYearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      formatter={(value: any) => `₹${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Remaining Balance Trend */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">Remaining Balance Trend</h2>
              <div style={{ height: '256px' }}>
                <ResponsiveContainer width="100%" height={256}>
                  <LineChart data={remainingBalanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      formatter={(value: any) => `₹${(value / 100000).toFixed(2)}L`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: '#2563eb', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 text-sm text-center mt-3">Debt reducing over time</p>
            </div>

            {/* Interest vs Principal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">Interest vs Principal</h2>
              <div style={{ height: '256px' }}>
                <ResponsiveContainer width="100%" height={256}>
                  <BarChart data={interestPrincipalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      formatter={(value: any) => `₹${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="principal" stackId="a" fill="#2563eb" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="interest" stackId="a" fill="#93c5fd" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <span className="text-sm text-gray-700">Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-300 rounded-full" />
                  <span className="text-sm text-gray-700">Interest</span>
                </div>
              </div>
            </div>

            {/* EMI Burden Trend */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">EMI Burden Trend</h2>
              <div style={{ height: '256px' }}>
                <ResponsiveContainer width="100%" height={256}>
                  <LineChart data={emiBurdenTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      formatter={(value: any) => `₹${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="burden"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: '#2563eb', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-gray-600 text-sm text-center mt-3">Monthly EMI pressure reducing over years</p>
            </div>
          </>
        ) : (
          <>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search EMI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* EMI Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">EMI Summary {currentYear}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Monthly EMI</span>
                  <span className="text-gray-900 font-bold text-lg">₹{monthlyEMI.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="text-gray-900 font-bold text-lg">₹{(totalPaid / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Remaining Balance</span>
                  <span className="text-gray-900 font-bold text-lg">₹{(remainingBalance / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="text-gray-900 font-bold text-lg">₹{(totalInterest / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Debt-Free Projection</span>
                  <span className="text-green-600 font-bold text-lg">{debtFreeDateFormatted}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">vs {currentYear - 1}</span>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    yearChange >= 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {yearChange >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{yearChange >= 0 ? '+' : ''}₹{Math.abs(yearChange).toLocaleString()} ({yearChangePercent}%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Type Totals */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">EMI Type Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(emiTypeTotals).map(([type, data]: [string, any]) => (
                  <div key={type} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-gray-900 font-medium">{type}</p>
                      <p className="text-gray-500 text-sm">{data.count} {data.count === 1 ? 'EMI' : 'EMIs'} • {data.percentage}%</p>
                    </div>
                    <p className="text-gray-900 font-bold text-lg">₹{data.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
              <h3 className="text-blue-900 font-semibold mb-3">EMI Insights</h3>
              <div className="space-y-2">
                <p className="text-blue-700 text-sm">• Home Loan forms {emiTypeTotals['Home Loan']?.percentage || 0}% of debt</p>
                <p className="text-blue-700 text-sm">• Car EMI ends in {emis.find(e => e.loanType === 'Car Loan')?.remainingMonths || 0} months</p>
                <p className="text-blue-700 text-sm">• Interest burden will reduce as loans mature</p>
              </div>
            </div>

            {/* EMI List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">
                {searchQuery ? 'Search Results' : 'All EMIs'}
              </h2>
              {filteredEMIs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">No results found</p>
                  <p className="text-gray-400 text-sm">Try a different search term</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEMIs.map((emi) => (
                    <div key={emi.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{emi.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">{emi.loanType}</span>
                          <span className="text-xs text-gray-500">{emi.lender}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>{emi.remainingMonths} months left</span>
                          <span>•</span>
                          <span>{emi.interestRate}% interest</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-gray-900 font-bold text-lg">₹{emi.monthlyEMI.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">/month</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-semibold text-lg mb-5">Long-term Intelligence</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">Total lifetime EMI payments</span>
                  <span className="text-gray-900 font-bold">₹{(emis.reduce((sum, e) => sum + e.totalPayable, 0) / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">Interest-heavy loan</span>
                  <span className="text-gray-900 font-bold">{[...emis].sort((a, b) => b.interestRate - a.interestRate)[0].name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">Debt stability score</span>
                  <span className="text-green-600 font-bold">Good</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <EMIBottomNav />
    </MobileContainer>
  );
}
