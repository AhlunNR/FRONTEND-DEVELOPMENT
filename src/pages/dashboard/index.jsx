import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, Scan, Calendar, ChevronRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"; // UBAH IMPORT RECHARTS
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Link } from "react-router-dom";

// Data Grafik
const chartData = [
  { day: "Sen", income: 450, expense: 200 },
  { day: "Sel", income: 600, expense: 350 },
  { day: "Rab", income: 500, expense: 150 },
  { day: "Kam", income: 800, expense: 400 },
  { day: "Jum", income: 750, expense: 300 },
  { day: "Sab", income: 1200, expense: 600 },
  { day: "Min", income: 900, expense: 250 },
];

const chartConfig = {
  income: { label: "Pemasukan", color: "#10b981" }, // Emerald
  expense: { label: "Pengeluaran", color: "#f43f5e" }, // Rose
};

// Data Transaksi
const recentTransactions = [
  { id: 1, type: "expense", amount: 150000, category: "Bahan Baku", date: "2026-03-16T08:00:00" },
  { id: 2, type: "income", amount: 500000, category: "Penjualan", date: "2026-03-15T14:30:00" },
  { id: 3, type: "expense", amount: 50000, category: "Operasional", date: "2026-03-15T09:15:00" },
];

const formatIDR = (amount) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 max-w-xl mx-auto w-full space-y-5 animate-in fade-in zoom-in-95 duration-300">
      
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Halo, Ahlun! 👋</h1>
          <p className="text-xs text-slate-500 mt-0.5">Ringkasan kas UMKM-mu hari ini.</p>
        </div>
      </header>

      {/* Kartu Saldo Utama */}
      <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden rounded-2xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <CardContent className="p-5 relative z-10">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Wallet className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Total Saldo Aktif</span>
          </div>
          <div className="text-3xl font-extrabold tracking-tight mb-5">Rp 5.200.000</div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-1">
                <div className="bg-emerald-500/20 p-1 rounded-full"><ArrowUpRight className="w-3 h-3 text-emerald-400" /></div>
                PEMASUKAN
              </div>
              <div className="text-sm font-bold text-slate-100">Rp 5.200.000</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mb-1">
                <div className="bg-rose-500/20 p-1 rounded-full"><ArrowDownRight className="w-3 h-3 text-rose-400" /></div>
                PENGELUARAN
              </div>
              <div className="text-sm font-bold text-slate-100">Rp 2.250.000</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aksi Cepat (Quick Actions) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Tombol Pemasukan */}
        <Link to="/add" state={{ type: 'income' }} className="flex flex-col items-center justify-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all group">
          <div className="bg-emerald-100 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] font-bold text-slate-700">Pemasukan</span>
        </Link>

        {/* Tombol Pengeluaran */}
        <Link to="/add" state={{ type: 'expense' }} className="flex flex-col items-center justify-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all group">
          <div className="bg-rose-100 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
            <ArrowDownRight className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-[10px] font-bold text-slate-700">Pengeluaran</span>
        </Link>

        <button className="flex flex-col items-center justify-center p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-md shadow-blue-500/30 active:scale-95 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-b-full"></div>
          <div className="bg-white/20 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform relative z-10">
            <Scan className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold text-white relative z-10">Scan Struk</span>
        </button>
      </div>

      {/* Grafik Arus Kas */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800 px-1">Statistik Arus Kas</h2>
        <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-0 pt-4 pb-0 px-0">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <AreaChart accessibilityLayer data={chartData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                
                {/* Gradasi Warna Grafik */}
                <defs>
                  <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} fontSize={10} tick={{ fill: '#94a3b8' }} />
                
                {/* Tooltip Konfigurasi */}
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                
                {/* Area Grafik */}
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="var(--color-income)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#fillIncome)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="expense" 
                  stroke="var(--color-expense)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#fillExpense)" 
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaksi Terakhir */}
      <div className="pt-2 pb-6">
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-800">Transaksi Terakhir</h2>
          <Link to="/transactions" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center">
            Lihat Semua <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
        
        <div className="space-y-2">
          {recentTransactions.map((trx) => (
            <div key={trx.id} className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${trx.type === 'income' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                  {trx.type === 'income' ? <ArrowUpRight className="w-4 h-4 text-emerald-600" /> : <ArrowDownRight className="w-4 h-4 text-rose-600" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{trx.category}</p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                    <Calendar className="w-3 h-3" /> {formatDate(trx.date)}
                  </div>
                </div>
              </div>
              <p className={`text-xs font-bold ${trx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                {trx.type === 'income' ? '+' : '-'}{formatIDR(trx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}