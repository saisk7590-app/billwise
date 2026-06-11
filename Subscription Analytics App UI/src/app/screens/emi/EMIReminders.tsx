import { MobileContainer } from '../../components/MobileContainer';
import { EMIBottomNav } from '../../components/EMIBottomNav';
import { emis } from '../../data/emiData';
import { Bell, PartyPopper, AlertTriangle } from 'lucide-react';

export function EMIReminders() {
  const today = new Date();

  // Calculate days until due
  const getDaysUntilDue = (dueDay: number) => {
    const nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);
    if (nextDue < today) {
      nextDue.setMonth(nextDue.getMonth() + 1);
    }
    return Math.ceil((nextDue.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  const formatDueDate = (dueDay: number) => {
    const nextDue = new Date(today.getFullYear(), today.getMonth(), dueDay);
    if (nextDue < today) {
      nextDue.setMonth(nextDue.getMonth() + 1);
    }
    return nextDue.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Get reminders (only enabled ones)
  const reminders = emis
    .filter(emi => emi.reminderEnabled)
    .map(emi => ({
      ...emi,
      daysUntil: getDaysUntilDue(emi.dueDay),
      dueDate: formatDueDate(emi.dueDay),
    }))
    .filter(emi => emi.daysUntil >= 0 && emi.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  // Separate urgent (3 days or less) from upcoming
  const urgentReminders = reminders.filter(r => r.daysUntil <= 3);
  const upcomingReminders = reminders.filter(r => r.daysUntil > 3);

  // Find EMI ending soon (within 3 months)
  const endingSoon = emis.find(emi => emi.remainingMonths <= 3 && emi.remainingMonths > 0);

  // Calculate total due this week
  const dueThisWeek = reminders.filter(r => r.daysUntil <= 7);
  const weeklyTotal = dueThisWeek.reduce((sum, r) => sum + r.monthlyEMI, 0);

  const getDaysText = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', dot: 'bg-red-500' };
    if (days <= 3) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', dot: 'bg-amber-500' };
    return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', dot: 'bg-green-500' };
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
        <p className="text-blue-100 text-sm mt-1 ml-14">Upcoming reminders</p>
      </div>

      <div className="px-4 py-6 pb-24 space-y-5">
        {/* Smart Reminder Cards */}
        {endingSoon && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <PartyPopper className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-green-900 font-semibold mb-1">{endingSoon.name} completing soon!</p>
                <p className="text-green-700 text-sm">Only {endingSoon.remainingMonths} month{endingSoon.remainingMonths !== 1 ? 's' : ''} left. You're almost debt-free on this loan!</p>
              </div>
            </div>
          </div>
        )}

        {weeklyTotal > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-blue-900 font-semibold mb-1">High EMI pressure this week</p>
                <p className="text-blue-700 text-sm">₹{weeklyTotal.toLocaleString()} total EMI due in the next 7 days from {dueThisWeek.length} loan{dueThisWeek.length !== 1 ? 's' : ''}.</p>
              </div>
            </div>
          </div>
        )}

        {/* Urgent Reminders */}
        {urgentReminders.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <Bell className="w-5 h-5 text-red-600" />
              <h2 className="text-gray-900 font-semibold text-lg">Urgent</h2>
            </div>
            <div className="space-y-3">
              {urgentReminders.map((reminder) => {
                const colors = getUrgencyColor(reminder.daysUntil);
                return (
                  <div
                    key={reminder.id}
                    className={`${colors.bg} border ${colors.border} rounded-2xl p-5 shadow-sm`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full mt-2 ${colors.dot}`} />
                        <div className="flex-1">
                          <p className={`font-semibold mb-1 ${colors.text}`}>{reminder.name}</p>
                          <p className="text-gray-600 text-sm">{reminder.lender}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${colors.text}`}>₹{reminder.monthlyEMI.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-600 text-sm">Due {getDaysText(reminder.daysUntil)}</span>
                      <span className="text-gray-500 text-sm">{reminder.dueDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming Reminders */}
        {upcomingReminders.length > 0 && (
          <div>
            <h2 className="text-gray-900 font-semibold text-lg mb-3 px-1">Upcoming</h2>
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => {
                const colors = getUrgencyColor(reminder.daysUntil);
                return (
                  <div
                    key={reminder.id}
                    className={`${colors.bg} border ${colors.border} rounded-2xl p-5 shadow-sm`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full mt-2 ${colors.dot}`} />
                        <div className="flex-1">
                          <p className={`font-semibold mb-1 ${colors.text}`}>{reminder.name}</p>
                          <p className="text-gray-600 text-sm">{reminder.lender}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${colors.text}`}>₹{reminder.monthlyEMI.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <span className="text-gray-600 text-sm">Due {getDaysText(reminder.daysUntil)}</span>
                      <span className="text-gray-500 text-sm">{reminder.dueDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Reminders */}
        {reminders.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-900 font-semibold mb-2">All clear!</p>
            <p className="text-gray-500 text-sm">No upcoming EMI payments in the next 30 days</p>
          </div>
        )}
      </div>

      <EMIBottomNav />
    </MobileContainer>
  );
}
