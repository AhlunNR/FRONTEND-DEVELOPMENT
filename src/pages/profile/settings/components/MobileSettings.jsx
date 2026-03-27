import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Bell, Lock, UserPlus, ChevronLeft, ChevronRight, Check, Languages, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMode } from "@/contexts/ModeContext"; // Impor context jirr

export default function MobileSettings() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useMode(); // Ambil dari context
  const [showLangSheet, setShowLangSheet] = useState(false);

  // Daftar Bahasa
  const languages = [
    { name: "Indonesia", flag: "🇮🇩" },
    { name: "English (US)", flag: "🇺🇸" },
    { name: "English (British)", flag: "🇬🇧" },
    { name: "Malay", flag: "🇲🇾" },
    { name: "Japanese", flag: "🇯🇵" }
  ];

  // Logic ganti bahasa jirr
  const handleSelectLanguage = (langName) => {
    setLanguage(langName); // Ubah bahasa global
    setShowLangSheet(false);
    console.log(`Mobile Bahasa ganti ke: ${langName}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-24 relative z-[9999] animate-in slide-in-from-right duration-300">
      
      {/* Header - Tombol Kembali */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/profile")} 
          className="p-2 active:bg-accent rounded-full border border-border cursor-pointer transition-transform active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-foreground">{t('settings')}</h1>
      </div>

      <div className="space-y-6 pb-20">
        
        {/* GRUP UMUM */}
        <section className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">{t('general')}</p>
          <Card className="border-border bg-card overflow-hidden divide-y divide-border shadow-sm">
            
            {/* TOMBOL PILIH BAHASA */}
            <button 
              onClick={() => setShowLangSheet(true)}
              className="w-full flex items-center justify-between p-5 active:bg-accent transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-4 pointer-events-none">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <Languages className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm">{t('lang_name')}</p>
              </div>
              <div className="flex items-center gap-2 pointer-events-none">
                <p className="text-xs font-bold text-emerald-600">{language}</p>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>

            {/* NOTIFIKASI */}
            <button className="w-full flex items-center justify-between p-5 active:bg-accent transition-colors text-left group cursor-pointer">
              <div className="flex items-center gap-4 pointer-events-none">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm">{t('notif')}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </Card>
        </section>

        {/* GRUP KEAMANAN */}
        <section className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">{t('security')}</p>
          <Card className="border-border bg-card overflow-hidden divide-y divide-border shadow-sm">
            
            {/* PRIVASI */}
            <button className="w-full flex items-center justify-between p-5 active:bg-accent transition-colors text-left group cursor-pointer">
              <div className="flex items-center gap-4 pointer-events-none">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-500">
                  <Lock className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm">{t('privacy')}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            
            {/* TOMBOL GANTI AKUN */}
            <button 
              onClick={() => alert("Fitur Ganti Akun segera hadir jirr!")}
              className="w-full flex items-center justify-between p-5 active:bg-accent transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-4 pointer-events-none">
                <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-500">
                  <UserPlus className="w-5 h-5" />
                </div>
                <p className="font-bold text-sm">{t('change_acc')}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </Card>
        </section>

      </div>

      {/* BOTTOM SHEET BAHASA */}
      {showLangSheet && (
        <div className="fixed inset-0 z-[100000] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLangSheet(false)} />
          
          <div className="relative w-full bg-card rounded-t-[32px] p-6 pb-12 shadow-2xl border-t border-border animate-in slide-in-from-bottom duration-300">
            <div className="w-16 h-1 bg-muted rounded-full mx-auto mb-6" onClick={() => setShowLangSheet(false)} />
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-foreground">{t('select_lang')}</h2>
              <button onClick={() => setShowLangSheet(false)} className="p-2 bg-muted rounded-full text-muted-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => handleSelectLanguage(lang.name)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${language === lang.name ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'active:bg-accent border border-transparent'}`}
                >
                  <span className="font-bold text-sm">{lang.flag} &nbsp; {lang.name}</span>
                  {language === lang.name && <Check className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}