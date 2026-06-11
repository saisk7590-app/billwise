import { MobileContainer } from '../../components/MobileContainer';
import { EMIBottomNav } from '../../components/EMIBottomNav';
import { emis } from '../../data/emiData';
import { TrendingDown, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';

export function EMIDashboard() {
  const navigate = useNavigate();

  // Calculate totals
  const monthlyEMIBurden = emis.reduce((sum, emi) => sum + emi.monthlyEMI, 0);
  const remainingBalance = emis.reduce((sum, emi) => sum + emi.remainingBalance, 0);
  const activeEMIs = emis.filter(e => e.status === 'Active').length;
  const totalInterestRemaining = emis.reduce((sum, emi) => sum + (emi.totalPayable - emi.totalAmount - emi.amountPaid), 0);

  // Debt-free date (latest end date)
  const debtFreeDate = new Date(Math.max(...emis.map(e => new Date(e.endDate).getTime())));
  const debtFreeDateFormatted = debtFreeDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Sparkline data (simulated payoff trend)
  const sparklineData = [
    { month: 1, balance: 4500000 },
    { month: 2, balance: 4450000 },
    { month: 3, balance: 4400000 },
    { month: 4, balance: 4350000 },
    { month: 5, balance: 4300000 },
    { month: 6, balance: remainingBalance },
  ];

  // Highest EMI
  const highestEMI = [...emis].sort((a, b) => b.monthlyEMI - a.monthlyEMI)[0];

  // Ending soon
  const endingSoon = [...emis].sort((a, b) => a.remainingMonths - b.remainingMonths)[0];

  // Upcoming due (within 7 days)
  const today = new Date();
  const upcomingDue = emis.filter(emi => {
    const nextDue = new Date(today.getFullYear(), today.getMonth(), emi.dueDay);
    if (nextDue < today) {
      nextDue.setMonth(nextDue.getMonth() + 1);
    }
    const daysUntil = Math.ceil((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil >= 0 && daysUntil <= 7;
  });

  const upcomingDueAmount = upcomingDue.reduce((sum, emi) => sum + emi.monthlyEMI, 0);

  // EMI Distribution data
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

  // Top 3 EMIs
  const topEMIs = [...emis].sort((a, b) => b.monthlyEMI - a.monthlyEMI).slice(0, 3);

  // Upcoming dues sorted by urgency
  const getDaysUntilDue = (dueDay: number) => {
    const nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);
    if (nextDue < today) {
      nextDue.setMonth(nextDue.getMonth() + 1);
    }
    return Math.ceil((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const upcomingDues = emis
    .map(emi => ({
      ...emi,
      daysUntil: getDaysUntilDue(emi.dueDay),
    }))
    .filter(emi => emi.daysUntil >= 0 && emi.daysUntil <= 10)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'bg-red-100 border-red-300';
    if (days <= 3) return 'bg-amber-100 border-amber-300';
    return 'bg-green-100 border-green-300';
  };

  const getUrgencyDot = (days: number) => {
    if (days <= 1) return 'bg-red-500';
    if (days <= 3) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getUrgencyText = (days: number) => {
    if (days === 0) return 'Due Today';
    if (days === 1) return 'Due Tomorrow';
    return `Due In ${days} Days`;
  };

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
        <p className="text-blue-100 text-sm mt-1 ml-14">Loan intelligence</p>
      </div>

      <div className="px-4 -mt-4 pb-24 space-y-5">
        {/* Hero Card */}
        <div
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => navigate('/emi/analytics')}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-blue-100 text-sm mb-2">Monthly EMI Burden</p>
              <p className="text-white text-4xl font-bold mb-3">₹{monthlyEMIBurden.toLocaleString()}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-200 text-xs mb-1">Remaining Balance</p>
                  <p className="text-white text-lg font-semibold">₹{(remainingBalance / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-blue-200 text-xs mb-1">Active EMIs</p>
                  <p className="text-white text-lg font-semibold">{activeEMIs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Sparkline */}
          <div className="mb-3 -mx-2" style={{ height: '48px' }}>
            <ResponsiveContainer width="100%" height={48}>
              <LineChart data={sparklineData}>
                <Line type="monotone" dataKey="balance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Debt-Free Date */}
          <div className="flex items-center justify-between pt-3 border-t border-blue-500">
            <span className="text-blue-100 text-sm">Debt-Free Date</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-300" />
              <span className="text-white text-sm font-semibold">{debtFreeDateFormatted}</span>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/emi/details/${highestEMI.id}`)}
          >
            <p className="text-gray-500 text-xs mb-2">Highest EMI</p>
            <p className="text-gray-900 text-lg font-bold mb-1">{highestEMI.name}</p>
            <p className="text-blue-600 text-xl font-bold">₹{highestEMI.monthlyEMI.toLocaleString()}</p>
          </div>

          <div
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/emi/details/${endingSoon.id}`)}
          >
            <p className="text-gray-500 text-xs mb-2">Ending Soon</p>
            <p className="text-gray-900 text-lg font-bold mb-1">{endingSoon.name}</p>
            <p className="text-green-600 text-sm font-semibold">{endingSoon.remainingMonths} Month{endingSoon.remainingMonths !== 1 ? 's' : ''} Left</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">Interest Remaining</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">₹{(totalInterestRemaining / 100000).toFixed(1)}L</p>
            <p className="text-gray-400 text-xs">To be paid</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-xs mb-2">Upcoming Due</p>
            <p className="text-gray-900 text-2xl font-bold mb-1">₹{upcomingDueAmount.toLocaleString()}</p>
            <p className="text-amber-600 text-xs font-medium">This Week</p>
          </div>
        </div>

        {/* Insight Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-blue-900 font-semibold mb-1">
                {highestEMI.name} contributes {Math.round((highestEMI.monthlyEMI / monthlyEMIBurden) * 100)}% of EMI burden
              </p>
              <p className="text-blue-700 text-sm">Your largest monthly commitment at ₹{highestEMI.monthlyEMI.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* EMI Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-5">EMI Type Distribution</h2>
          <div className="mb-4" style={{ height: '192px' }}>
            <ResponsiveContainer width="100%" height={192}>
              <PieChart>
                <Pie
                  data={emiDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {emiDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {emiDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top EMIs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Top EMIs</h2>
          <div className="space-y-3">
            {topEMIs.map((emi, index) => (
              <div
                key={emi.id}
                onClick={() => navigate(`/emi/details/${emi.id}`)}
                className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-xl px-3 -mx-3 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{emi.name}</p>
                    <p className="text-gray-500 text-sm">{emi.lender}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold text-lg">₹{emi.monthlyEMI.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">/month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Dues */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Upcoming Dues</h2>
          {upcomingDues.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No upcoming dues in the next 10 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingDues.map((emi) => (
                <div key={emi.id} className={`border rounded-xl p-4 ${getUrgencyColor(emi.daysUntil)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getUrgencyDot(emi.daysUntil)}`} />
                      <div>
                        <p className="text-gray-900 font-medium text-sm mb-1">{emi.name}</p>
                        <p className="text-gray-600 text-xs">{getUrgencyText(emi.daysUntil)}</p>
                      </div>
                    </div>
                    <p className="text-gray-900 font-bold">₹{emi.monthlyEMI.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <EMIBottomNav />
    </MobileContainer>
  );
}
