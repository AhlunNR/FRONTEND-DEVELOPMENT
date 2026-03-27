import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Bell, Lock, UserPlus, ChevronRight, 
  ChevronLeft, Check, Languages 
} from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useMode } from "@/contexts/ModeContext";

export default function DesktopSettings() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useMode();
  const [showLangModal, setShowLangModal] = useState(false);

  const languages = [
    { name: "Indonesia", flag: "🇮🇩" },
    { name: "English (US)", flag: "🇺🇸" },
    { name: "English (British)", flag: "🇬🇧" },
    { name: "Malay", flag: "🇲🇾" },
    { name: "Japanese", flag: "🇯🇵" }
  ];

  const handleSelectLanguage = (langName) => {
    setLanguage(langName);
    setShowLangModal(false);
  };

  return (
    <div className="p-10 space-y-8 max-w-4xl relative z-[100] animate-in fade-in duration-500 bg-background text-foreground transition-colors duration-300">
      
      {/* Header */}
      <header className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate("/profile")} 
          className="p-2 hover:bg-accent rounded-full border border-border cursor-pointer active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1> 
          <p className="text-sm text-muted-foreground mt-1">{t('profile')}</p>
        </div>
      </header>

      <div className="space-y-8">
        {/* GRUP UMUM */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">{t('general')}</h3>
          <Card className="border-border bg-card shadow-sm divide-y divide-border overflow-hidden">
            <button 
              onClick={() => setShowLangModal(true)}
              className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold">{t('lang_name')}</p>
                  <p className="text-xs text-muted-foreground">{t('desc_lang')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-4 py-1.5 rounded-full">{language}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-all text-left group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold">{t('notif')}</p>
                  <p className="text-xs text-muted-foreground">{t('desc_notif')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>

        {/* GRUP KEAMANAN */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2">{t('security')}</h3>
          <Card className="border-border bg-card shadow-sm divide-y divide-border overflow-hidden">
            <button className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-all text-left group cursor-pointer">
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold">{t('privacy')}</p>
                  <p className="text-xs text-muted-foreground">{t('desc_privacy')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button 
              onClick={() => alert("Fitur Ganti Akun segera hadir jirr!")}
              className="w-full flex items-center justify-between p-6 hover:bg-accent/50 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold">{t('change_acc')}</p>
                  <p className="text-xs text-muted-foreground">{t('desc_change_acc')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </Card>
        </div>
      </div>

      {/* MODAL BAHASA */}
      {showLangModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLangModal(false)} />
          
          <Card className="relative w-full md:w-[400px] bg-card rounded-2xl p-6 animate-in zoom-in-95 duration-200 border-border shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{t('select_lang')}</h2>
              <button onClick={() => setShowLangModal(false)} className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors">✕</button>
            </div>
            
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => handleSelectLanguage(lang.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${language === lang.name ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'hover:bg-accent border border-transparent'}`}
                >
                  <span className="font-bold text-sm">{lang.flag} &nbsp; {lang.name}</span>
                  {language === lang.name && <Check className="w-5 h-5 text-emerald-600" />}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}