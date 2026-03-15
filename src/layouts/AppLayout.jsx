import { Outlet, Link } from 'react-router-dom';

export default function AppLayout() {
  return (
    // Base layout: tinggi full layar, background abu-abu terang (cocok untuk app keuangan)
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* DESKTOP SIDEBAR (Disembunyikan di Mobile, Muncul di layar 'md' ke atas) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">KasFlow</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-slate-100 p-2 rounded-md">Dashboard</Link>
          <Link to="/transactions" className="hover:bg-slate-100 p-2 rounded-md">Transaksi</Link>
          <Link to="/add" className="hover:bg-slate-100 p-2 rounded-md">Tambah</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {/* Konten Halaman akan di-render di dalam Outlet ini */}
        <Outlet />
      </main>

      {/* MOBILE BOTTOM NAV (Muncul di Mobile, Disembunyikan di layar 'md' ke atas) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around p-3 md:hidden">
        <Link to="/dashboard" className="text-sm flex flex-col items-center">
          <span>🏠</span> {/* Nanti ganti pakai icon Lucide/Heroicons */}
          Beranda
        </Link>
        <Link to="/add" className="text-sm flex flex-col items-center text-blue-600 font-bold -mt-4 bg-white p-2 rounded-full shadow-lg border">
          <span>➕</span>
          Tambah
        </Link>
        <Link to="/transactions" className="text-sm flex flex-col items-center">
          <span>📄</span>
          Transaksi
        </Link>
      </nav>

    </div>
  );
}