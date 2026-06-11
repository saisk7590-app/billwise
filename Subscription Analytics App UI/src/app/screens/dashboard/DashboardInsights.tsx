import { MobileContainer } from '../../components/MobileContainer';
import { DashboardBottomNav } from '../../components/DashboardBottomNav';
import { Sparkles, TrendingDown, AlertTriangle, CheckCircle, Lightbulb, DollarSign } from 'lucide-react';

export function DashboardInsights() {
  const insights = [
    {
      id: 1,
      type: 'savings',
      icon: DollarSign,
      title: 'Duplicate OTT subscription detected',
      description: 'You have both individual Netflix (₹649) and family plan (₹799). Consolidate to save ₹649/month.',
      action: 'Review subscriptions',
      color: 'green',
      priority: 'high',
    },
    {
      id: 2,
      type: 'optimization',
      icon: Sparkles,
      title: 'Bundle opportunity found',
      description: 'Combine your internet and DTH services with Airtel Black to save ₹350/month.',
      action: 'Explore bundles',
      color: 'purple',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      title: 'Price increase detected',
      description: 'Netflix increased from ₹649 to ₹799 this month. Your annual spending will increase by ₹1,800.',
      action: 'View details',
      color: 'amber',
      priority: 'medium',
    },
    {
      id: 4,
      type: 'trend',
      icon: TrendingDown,
      title: 'Spending decreased this month',
      description: 'Your recurring expenses are 8% lower than last month. Good financial discipline!',
      action: null,
      color: 'blue',
      priority: 'low',
    },
    {
      id: 5,
      type: 'success',
      icon: CheckCircle,
      title: 'All payments on track',
      description: 'No overdue payments detected. Your recurring expense management is excellent.',
      action: null,
      color: 'green',
      priority: 'low',
    },
    {
      id: 6,
      type: 'recommendation',
      icon: Lightbulb,
      title: 'Consider annual billing',
      description: 'Switching Spotify to annual billing could save you ₹240/year (2 months free).',
      action: 'Learn more',
      color: 'indigo',
      priority: 'medium',
    },
  ];

  const getColorClasses = (color: string, priority: string) => {
    const isPriority = priority === 'high';

    const colorMap: any = {
      green: {
        bg: isPriority ? 'from-green-50 to-emerald-50' : 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-100',
        iconColor: 'text-green-600',
        title: 'text-green-900',
        text: 'text-green-700',
        button: 'bg-green-600 hover:bg-green-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100',
        iconColor: 'text-purple-600',
        title: 'text-purple-900',
        text: 'text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700',
      },
      amber: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'bg-amber-100',
        iconColor: 'text-amber-600',
        title: 'text-amber-900',
        text: 'text-amber-700',
        button: 'bg-amber-600 hover:bg-amber-700',
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100',
        iconColor: 'text-blue-600',
        title: 'text-blue-900',
        text: 'text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700',
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        icon: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        title: 'text-indigo-900',
        text: 'text-indigo-700',
        button: 'bg-indigo-600 hover:bg-indigo-700',
      },
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
        <p className="text-gray-300 text-sm mt-1 ml-14">Smart insights & recommendations</p>
      </div>

      <div className="px-4 py-6 pb-24 space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          const colors = getColorClasses(insight.color, insight.priority);

          return (
            <div
              key={insight.id}
              className={`${colors.bg} border ${colors.border} rounded-2xl p-5 shadow-sm`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`${colors.title} font-semibold mb-2`}>{insight.title}</h3>
                  <p className={`${colors.text} text-sm leading-relaxed`}>{insight.description}</p>
                  {insight.action && (
                    <button className={`mt-4 px-4 py-2 ${colors.button} text-white text-sm font-medium rounded-lg transition-colors`}>
                      {insight.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DashboardBottomNav />
    </MobileContainer>
  );
}
