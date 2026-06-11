import { useParams, useNavigate } from 'react-router-dom';
import { MobileContainer } from '../../components/MobileContainer';
import { EMIBottomNav } from '../../components/EMIBottomNav';
import { emis } from '../../data/emiData';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function EMIDetails() {
  const { emiId } = useParams<{ emiId: string }>();
  const navigate = useNavigate();

  const emi = emis.find(e => e.id === emiId);

  if (!emi) {
    return (
      <MobileContainer>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">EMI not found</p>
        </div>
      </MobileContainer>
    );
  }

  // Generate payoff timeline data
  const generatePayoffTimeline = () => {
    const timeline = [];
    let balance = emi.remainingBalance;
    const monthlyPrincipal = emi.monthlyEMI / (1 + emi.interestRate / 1200);

    for (let i = 0; i <= Math.min(emi.remainingMonths, 24); i += 3) {
      const date = new Date();
      date.setMonth(date.getMonth() + i);
      timeline.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        balance: Math.max(0, Math.round(balance - (monthlyPrincipal * i))),
      });
    }

    return timeline;
  };

  const payoffTimeline = generatePayoffTimeline();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const totalInterest = emi.totalPayable - emi.totalAmount;
  const interestPaid = emi.amountPaid - (emi.totalAmount - emi.remainingBalance);
  const interestRemaining = totalInterest - interestPaid;

  return (
    <MobileContainer>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 pt-8 pb-6 rounded-b-3xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-white text-2xl font-semibold">{emi.name}</h1>
        <p className="text-blue-100 text-sm mt-1">{emi.lender}</p>
        <div className="mt-2">
          <span className="inline-block px-3 py-1 bg-blue-500 bg-opacity-30 text-white text-xs font-medium rounded-full">
            {emi.loanType}
          </span>
        </div>
      </div>

      <div className="px-4 py-6 pb-24 space-y-5">
        {/* Highlights */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Monthly EMI</p>
              <p className="text-gray-900 text-2xl font-bold">₹{emi.monthlyEMI.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Remaining Balance</p>
              <p className="text-gray-900 text-2xl font-bold">₹{(emi.remainingBalance / 100000).toFixed(1)}L</p>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-4 pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Next Due</p>
              <p className="text-gray-900 text-sm font-medium">
                {new Date().getDate() > emi.dueDay
                  ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, emi.dueDay).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
                  : new Date(new Date().getFullYear(), new Date().getMonth(), emi.dueDay).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Remaining Months</p>
              <p className="text-gray-900 text-sm font-medium">{emi.remainingMonths} months</p>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Financial Information</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Total Loan Amount</span>
              <span className="text-gray-900 font-semibold">₹{(emi.totalAmount / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Interest Rate</span>
              <span className="text-gray-900 font-semibold">{emi.interestRate}%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Total Payable</span>
              <span className="text-gray-900 font-semibold">₹{(emi.totalPayable / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Amount Paid</span>
              <span className="text-green-600 font-semibold">₹{(emi.amountPaid / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Amount Remaining</span>
              <span className="text-blue-600 font-semibold">₹{(emi.remainingBalance / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Total Interest</span>
              <span className="text-gray-900 font-semibold">₹{(totalInterest / 100000).toFixed(1)}L</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Interest Remaining</span>
              <span className="text-amber-600 font-semibold">₹{(interestRemaining / 100000).toFixed(1)}L</span>
            </div>
            {emi.downPayment > 0 && (
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Down Payment</span>
                <span className="text-gray-900 font-semibold">₹{(emi.downPayment / 100000).toFixed(1)}L</span>
              </div>
            )}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600 text-sm">Start Date</span>
              <span className="text-gray-900 font-semibold">{formatDate(emi.startDate)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600 text-sm">End Date</span>
              <span className="text-gray-900 font-semibold">{formatDate(emi.endDate)}</span>
            </div>
          </div>
        </div>

        {/* Payoff Timeline Graph */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-gray-900 font-semibold text-lg mb-4">Payoff Timeline</h2>
          <div style={{ height: '256px' }}>
            <ResponsiveContainer width="100%" height={256}>
              <LineChart data={payoffTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
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
          <p className="text-gray-600 text-sm text-center mt-3">Balance reducing over time</p>
        </div>

        {/* Reminder Settings */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-900 font-semibold mb-1">Payment Reminders</p>
              <p className="text-blue-700 text-sm">
                {emi.reminderEnabled
                  ? `Enabled - ${emi.reminderDaysBefore} days before due date`
                  : 'Disabled'}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              emi.reminderEnabled ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <svg className={`w-5 h-5 ${emi.reminderEnabled ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Repayment Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Principal Paid</span>
                <span className="text-gray-900 font-semibold">
                  {Math.round((emi.amountPaid / emi.totalAmount) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(emi.amountPaid / emi.totalAmount) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm">Time Elapsed</span>
                <span className="text-gray-900 font-semibold">
                  {Math.round(((new Date().getTime() - new Date(emi.startDate).getTime()) / (new Date(emi.endDate).getTime() - new Date(emi.startDate).getTime())) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{
                    width: `${((new Date().getTime() - new Date(emi.startDate).getTime()) / (new Date(emi.endDate).getTime() - new Date(emi.startDate).getTime())) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EMIBottomNav />
    </MobileContainer>
  );
}
