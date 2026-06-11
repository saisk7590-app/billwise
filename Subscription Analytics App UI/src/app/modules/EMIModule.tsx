import { Routes, Route } from 'react-router-dom';
import { EMIDashboard } from '../screens/emi/EMIDashboard';
import { EMIAnalytics } from '../screens/emi/EMIAnalytics';
import { AddEMI } from '../screens/emi/AddEMI';
import { EMIHistory } from '../screens/emi/EMIHistory';
import { EMIReminders } from '../screens/emi/EMIReminders';
import { EMIDetails } from '../screens/emi/EMIDetails';

export function EMIModule() {
  return (
    <Routes>
      <Route path="/" element={<EMIDashboard />} />
      <Route path="/analytics" element={<EMIAnalytics />} />
      <Route path="/add" element={<AddEMI />} />
      <Route path="/history" element={<EMIHistory />} />
      <Route path="/reminders" element={<EMIReminders />} />
      <Route path="/details/:emiId" element={<EMIDetails />} />
    </Routes>
  );
}
