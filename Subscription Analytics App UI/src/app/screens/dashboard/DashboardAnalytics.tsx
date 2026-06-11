import { MobileContainer } from '../../components/MobileContainer';
import { DashboardBottomNav } from '../../components/DashboardBottomNav';
import { subscriptions, yearlySpendingData } from '../../data/mockData';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DashboardAnalytics() {
  // Calculate monthly spend by category
  const categoryData = subscriptions.reduce((acc: any[], sub) => {
    const existing = acc.find(item => item.name === sub.category);
    const monthlyPrice = sub.billingType === 'Yearly' ? sub.price / 12 : sub.price;

    if (existing) {
      existing.value += monthlyPrice;
    } else {
      acc.push({ name: sub.category, value: monthlyPrice });
    }
    return acc;
  }, []);

  const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

  // Monthly burn rate data
  const burnRateData = [
    { month: 'Jan', total: 2200 },
    { month: 'Feb', total: 2250 },
    { month: 'Mar', total: 2280 },
    { month: 'Apr', total: 2320 },
    { month: 'May', total: 2330 },
    { month: 'Jun', total: 2333 },
  ];

  // Expense stability score (0-100)
  const stabilityScore = 92;

  // Savings opportunities
  const savingsData = [
    { category: 'Duplicate OTT', amount: 800 },
    { category: 'Unused subscriptions', amount: 450 },
    { category: 'Bundle optimization', amount: 300 },
  ];

  const totalSavings = savingsData.reduce((sum, item) => sum + item.amount, 0);

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
        <p className="text-gray-300 text-sm mt-1 ml-14">Visual analytics</p>
      </div>

      <div className="px-4 py-6 pb-24 space-y-6">
        {/* Expense Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Expense Distribution</h2>
          <div style={{ height: '256px' }}>
            <ResponsiveContainer width="100%" height={256}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `₹${Math.round(value)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Burn Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Monthly Burn Rate</h2>
          <div style={{ height: '256px' }}>
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={burnRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  formatter={(value: any) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6b7280"
                  strokeWidth={3}
                  dot={{ fill: '#6b7280', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Growth Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Yearly Growth Trend</h2>
          <div style={{ height: '256px' }}>
            <ResponsiveContainer width="100%" height={256}>
              <BarChart data={yearlySpendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  formatter={(value: any) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="amount" fill="#6b7280" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Opportunity Analysis */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Savings Opportunities</h2>
          <div className="space-y-4">
            {savingsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="text-gray-900 font-medium text-sm">{item.category}</p>
                  <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(item.amount / totalSavings) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-900 font-bold text-lg ml-4">₹{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-gray-600 font-medium">Total Potential Savings</span>
            <span className="text-green-600 font-bold text-xl">₹{totalSavings}/month</span>
          </div>
        </div>

        {/* Expense Stability Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">Expense Stability Score</h2>
          <div className="flex flex-col items-center">
            <div className="relative" style={{ width: '192px', height: '192px' }}>
              <ResponsiveContainer width={192} height={192}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Score', value: stabilityScore },
                      { name: 'Remaining', value: 100 - stabilityScore }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900">{stabilityScore}</p>
                  <p className="text-gray-500 text-sm">out of 100</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 text-center">
              Your recurring expenses are highly stable with minimal fluctuation
            </p>
          </div>
        </div>
      </div>

      <DashboardBottomNav />
    </MobileContainer>
  );
}
