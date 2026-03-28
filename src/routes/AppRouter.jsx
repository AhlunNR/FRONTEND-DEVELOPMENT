import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import OAuthCallback from '../pages/auth/OAuthCallback';
import AppLayout from '../layouts/AppLayout';
import AddTransaction from '../pages/add-transaction';
import Dashboard from '../pages/dashboard';
import Transactions from '../pages/transactions';
import Insights from '../pages/insights';
import Profile from '../pages/profile';
import Settings from '../pages/profile/settings';
import Gamification from '../pages/gamification';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute publik */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* Rute internal aplikasi */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Settings />} /> 
        </Route>

        {/* Fallback jika rute tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}