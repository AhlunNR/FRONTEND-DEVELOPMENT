import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useMode } from "@/contexts/ModeContext";

export default function AddTransaction() {
  const { t } = useMode();
  const location = useLocation();

  // State Formulir
  const [type, setType] = useState("expense"); 
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // KATEGORI DIBUAT DINAMIS BERDASARKAN KEY DI MODECONTEXT
  const incomeCategories = [
    { id: "cat_sales", name: t('cat_sales') },
    { id: "cat_service", name: t('cat_service') },
    { id: "cat_capital", name: t('cat_capital') },
    { id: "cat_others", name: t('cat_others') }
  ];

  const expenseCategories = [
    { id: "cat_raw", name: t('cat_raw') },
    { id: "cat_ops", name: t('cat_ops') },
    { id: "cat_marketing", name: t('cat_marketing') },
    { id: "cat_salary", name: t('cat_salary') },
    { id: "cat_bills", name: t('cat_bills') },
    { id: "cat_rent", name: t('cat_rent') },
    { id: "cat_others", name: t('cat_others') }
  ];

  // Sinkronisasi dengan Router State
  useEffect(() => {
    if (location.state && location.state.type) {
      setType(location.state.type);
      setCategory(""); 
    }
    // Jika ada data dari OCR (Scan Struk)
    if (location.state && location.state.amount) {
      setAmount(location.state.amount);
      if (location.state.description) setNotes(location.state.description);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error(t('error_name') || "Nama transaksi belum diisi!");
    if (!amount || amount <= 0) return toast.error(t('error_amount') || "Nominal tidak boleh kosong!");
    if (!category.trim()) return toast.error(t('error_category') || "Kategori belum diisi!");

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      toast.success(`${t('success_save')} ${type === 'income' ? t('income') : t('expense')}!`);
      setName("");
      setAmount("");
      setCategory("");
      setNotes("");
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      toast.error(t('error_save') || "Gagal menyimpan transaksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 max-w-xl mx-auto w-full animate-in fade-in zoom-in-95 duration-300 transition-colors">
      <header className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">{t('add_title')}</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{t('add_desc') || "Masukkan nominal kas baru di sini."}</p>
      </header>

      {/* Toggle Tipe Transaksi */}
      <div className="flex p-1.5 bg-muted rounded-xl mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => { setType("expense"); setCategory(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            type === "expense" 
              ? "bg-card text-rose-500 shadow-md transform scale-[1.02]" 
              : "text-muted-foreground hover:bg-background/50"
          }`}
        >
          <ArrowDownCircle className="w-4 h-4" /> {t('expense')}
        </button>
        
        <button
          type="button"
          onClick={() => { setType("income"); setCategory(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${
            type === "income" 
              ? "bg-card text-emerald-500 shadow-md transform scale-[1.02]" 
              : "text-muted-foreground hover:bg-background/50"
          }`}
        >
          <ArrowUpCircle className="w-4 h-4" /> {t('income')}
        </button>
      </div>

      {/* FORM INPUT */}
      <form onSubmit={handleSubmit}>
        <Card className={`border-border shadow-sm overflow-hidden transition-colors duration-500 ${type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              {t('amount')} {type === "expense" ? t('expense') : t('income')}
            </CardTitle>
            <div className="flex items-center text-4xl font-extrabold tracking-tighter">
              <span className={`mr-2 ${type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>Rp</span>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/30"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 border-t border-border/50 pt-4 bg-card">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('date_time')}</label>
              <Input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isSubmitting}
                className="bg-background h-12 rounded-xl border-border" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('trans_name') || "Nama Transaksi"}</label>
              <Input 
                type="text"
                placeholder={t('placeholder_name') || "Contoh: Beli Token Listrik..."}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="bg-background h-12 rounded-xl border-border px-3" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('category')}</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-background h-12 rounded-xl border border-border px-3 text-sm text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary transition-shadow"
              >
                <option value="" disabled className="bg-card">{t('select_category') || "Pilih Kategori"}</option>
                {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-card">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('notes')}</label>
              <textarea 
                rows={2}
                placeholder={t('placeholder_notes') || "Tulis detail transaksi..."} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-background rounded-xl border border-border p-3 text-sm text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary transition-shadow resize-none" 
              />
            </div>

            <Button 
              type="submit" 
              className={`w-full mt-6 h-12 text-md font-bold rounded-xl transition-all border-none text-white ${
                type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
              }`} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('saving') || "Menyimpan..."}
                </>
              ) : (
                `${t('save')} ${type === 'income' ? t('income') : t('expense')}`
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}