import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import AddTransaction from '../pages/add-transaction';

// Mockup Pages (Nanti kita buat file aslinya)
const Dashboard = () => <div className="p-4">Halaman Dashboard</div>;
const Transactions = () => <div className="p-4">Daftar Transaksi</div>;


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AppLayout akan membungkus semua halaman utama */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="add" element={<AddTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}