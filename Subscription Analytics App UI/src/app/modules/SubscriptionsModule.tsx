import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../screens/Dashboard';
import { Analytics } from '../screens/Analytics';
import { AddSubscription } from '../screens/AddSubscription';
import { History } from '../screens/History';
import { Reminders } from '../screens/Reminders';
import { ServiceDetails } from '../screens/ServiceDetails';

export function SubscriptionsModule() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/add" element={<AddSubscription />} />
      <Route path="/history" element={<History />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/service/:serviceName" element={<ServiceDetails />} />
    </Routes>
  );
}
