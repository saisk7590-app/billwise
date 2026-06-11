import { useState } from 'react';
import { MobileContainer } from '../../components/MobileContainer';
import { EMIBottomNav } from '../../components/EMIBottomNav';
import { emiPayments, emis } from '../../data/emiData';
import { Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

export function EMIHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('2026');
  const [loanTypeFilter, setLoanTypeFilter] = useState('All');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showLoanTypePicker, setShowLoanTypePicker] = useState(false);

  const years = ['2024', '2025', '2026'];
  const loanTypes = ['All', ...Array.from(new Set(emis.map(e => e.loanType)))];

  // Filter payments
  const filteredPayments = emiPayments.filter(payment => {
    const matchesYear = payment.date.startsWith(yearFilter);
    const matchesLoanType = loanTypeFilter === 'All' || payment.loanType === loanTypeFilter;
    const matchesSearch = payment.emiName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesLoanType && matchesSearch;
  });

  // Sort by date (most recent first)
  const sortedPayments = [...filteredPayments].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by month
  const groupedByMonth = sortedPayments.reduce((acc: any, payment) => {
    const month = new Date(payment.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(payment);
    return acc;
  }, {});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Paid') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'Delayed') return <Clock className="w-4 h-4 text-amber-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return 'bg-green-50 text-green-700';
    if (status === 'Delayed') return 'bg-amber-50 text-amber-700';
    return 'bg-red-50 text-red-700';
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
        <p className="text-blue-100 text-sm mt-1 ml-14">Payment history</p>
      </div>

      <div className="px-4 py-6 pb-24 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search EMI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowLoanTypePicker(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{yearFilter}</span>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showYearPicker && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => {
                      setYearFilter(year);
                      setShowYearPicker(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                      yearFilter === year ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowLoanTypePicker(!showLoanTypePicker);
                setShowYearPicker(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium truncate">{loanTypeFilter}</span>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLoanTypePicker && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                {loanTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setLoanTypeFilter(type);
                      setShowLoanTypePicker(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                      loanTypeFilter === type ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment History */}
        {Object.keys(groupedByMonth).length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500 mb-2">No payments found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByMonth).map(([month, payments]: [string, any]) => (
              <div key={month}>
                <h3 className="text-gray-900 font-semibold mb-3 px-1">{month}</h3>
                <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
                  {payments.map((payment: any) => (
                    <div key={payment.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-gray-900 font-semibold">{payment.emiName}</p>
                            {getStatusIcon(payment.status)}
                          </div>
                          <p className="text-gray-500 text-sm">{formatDate(payment.date)}</p>
                        </div>
                        <p className="text-gray-900 font-bold text-lg">₹{payment.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Principal: ₹{payment.principalPaid.toLocaleString()}</span>
                          <span>Interest: ₹{payment.interestPaid.toLocaleString()}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Remaining: ₹{(payment.remainingBalance / 100000).toFixed(2)}L</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EMIBottomNav />
    </MobileContainer>
  );
}
