import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function AddTransaction() {
  const [type, setType] = useState("expense"); // 'income' atau 'expense'

  return (
    <div className="p-4 md:p-8 max-w-lg mx-auto w-full">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Catat Transaksi</h1>

      {/* Toggle Pemasukan / Pengeluaran */}
      <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
        <button
          onClick={() => setType("expense")}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
            type === "expense" ? "bg-white text-red-600 shadow-sm" : "text-slate-500"
          }`}
        >
          Pengeluaran
        </button>
        <button
          onClick={() => setType("income")}
          className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
            type === "income" ? "bg-white text-green-600 shadow-sm" : "text-slate-500"
          }`}
        >
          Pemasukan
        </button>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-slate-500">
            Nominal {type === "expense" ? "Pengeluaran" : "Pemasukan"}
          </CardTitle>
          <div className="flex items-center text-3xl font-bold">
            <span className="mr-2 text-slate-400">Rp</span>
            {/* Input Nominal yang besar agar mudah ditekan */}
            <input
              type="number"
              placeholder="0"
              className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300"
              autoFocus
            />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 border-t border-slate-100 pt-4">
          {/* Input Kategori */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Kategori</label>
            <Input placeholder="Contoh: Bahan Baku, Listrik, dll" className="bg-slate-50" />
          </div>

          {/* Input Catatan Opsional */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Catatan (Opsional)</label>
            <Input placeholder="Tulis detail transaksi..." className="bg-slate-50" />
          </div>

          {/* Tombol Simpan Besar */}
          <Button className="w-full mt-6 h-12 text-md font-bold" size="lg">
            Simpan Transaksi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}