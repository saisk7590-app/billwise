import { Routes, Route } from 'react-router-dom';
import { DashboardOverview } from '../screens/dashboard/DashboardOverview';
import { DashboardAnalytics } from '../screens/dashboard/DashboardAnalytics';
import { DashboardInsights } from '../screens/dashboard/DashboardInsights';
import { DashboardStats } from '../screens/dashboard/DashboardStats';

export function DashboardModule() {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/analytics" element={<DashboardAnalytics />} />
      <Route path="/insights" element={<DashboardInsights />} />
      <Route path="/stats" element={<DashboardStats />} />
    </Routes>
  );
}
