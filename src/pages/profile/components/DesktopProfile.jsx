import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, NavLink } from "react-router-dom";
import AnimatedContent from "@/components/ui/AnimatedContent";

import {
  User, Settings, Bell, CircleHelp, LogOut, ChevronRight, Shield, Store, Moon, Sun, Pencil, Trophy, Flame, Medal, WalletCards
} from "lucide-react";
import { useMode } from "@/contexts/ModeContext";

export default function DesktopProfile() {
  const { mode, theme, notifications, toggleMode, toggleTheme, toggleNotifications, t } = useMode();
  const navigate = useNavigate();

  const isPersonal = mode === "personal";
  const isDark = theme === "dark";

  const themeColor = isPersonal ? "text-purple-600" : "text-blue-600";
  const themeBg = isPersonal ? "bg-purple-100 dark:bg-purple-900/30" : "bg-blue-100 dark:bg-blue-900/30";

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-10 space-y-8 animate-in fade-in zoom-in-95 duration-500 bg-background text-foreground transition-colors" id="snap-main-container">
      <AnimatedContent distance={30} delay={0.1} direction="vertical">
        <header>
          {/* JUDUL DAN SUB-JUDUL SINKRON */}
          <h1 className="text-3xl font-bold tracking-tight">{t('profile')}</h1>
          <p className="text-sm text-muted-foreground mt-1 text-balance">
            {t('profile_desc')} {/* <--- Ganti teks manual lo pake ini jirr */}
          </p>
        </header>
      </AnimatedContent>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <AnimatedContent distance={40} delay={0.2} direction="horizontal" className="lg:col-span-4 space-y-6">
          <Card className="border-border bg-card shadow-sm overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center gap-4 relative">
              <button className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent transition text-muted-foreground">
                <Pencil className="w-5 h-5" />
              </button>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-extrabold ${themeBg} ${themeColor} shadow-inner`}>
                AN
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">LelouchViBritania</h2>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Lelouch@codingcamp.id</p>
                <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${themeBg} ${themeColor}`}>
                  {isPersonal ? t('mode_p') : t('mode_u')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STATS LABEL */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-4 hover:bg-accent/50 transition-colors cursor-default">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"><WalletCards className="w-6 h-6" /></div>
                <p className="text-2xl font-black text-foreground">124</p>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {t('transactions')}
                </p>
              </div>
            </Card>
            <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-4 hover:bg-accent/50 transition-colors cursor-default">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full"><Medal className="w-6 h-6" /></div>
                <p className="text-2xl font-black text-foreground">12</p>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {t('badges')}
                </p>
              </div>
            </Card>
            <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-4 hover:bg-accent/50 transition-colors cursor-default">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"><Flame className="w-6 h-6" /></div>
                <p className="text-2xl font-black text-foreground">5</p>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {t('streak')}
                </p>
              </div>
            </Card>
          </div>

          <Button variant="destructive" className="w-full h-14 font-bold text-lg gap-3 mt-4 shadow-sm hover:shadow-md transition-all">
            <LogOut className="w-5 h-5" /> {t('logout')}
          </Button>
        </AnimatedContent>

        <AnimatedContent distance={40} delay={0.3} direction="vertical" className="lg:col-span-8 space-y-6">
          <Card className="border-border bg-card shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 border-b border-border py-4 px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('general')}</CardTitle>
            </CardHeader>
            <div className="flex flex-col divide-y divide-border text-foreground">
              {/* MODE APLIKASI */}
              <button onClick={toggleMode} className="flex items-center justify-between p-6 hover:bg-accent transition text-left group">
                <div className="flex items-center gap-5">
                  <div className={`p-4 rounded-xl ${themeBg} ${themeColor} group-hover:scale-110 transition-transform`}>
                    {isPersonal ? <User className="w-6 h-6" /> : <Store className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{t('app_mode')}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isPersonal ? t('mode_p') : t('mode_u')}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* TEMA */}
              <button onClick={toggleTheme} className="flex items-center justify-between p-6 hover:bg-accent transition text-left group">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-xl bg-muted group-hover:scale-110 transition-transform">
                    {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{t('theme_title')}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isDark ? t('theme_d') : t('theme_l')}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-bold w-12 text-center ${isDark ? "text-blue-500" : "text-muted-foreground"}`}>{isDark ? "ON" : "OFF"}</span>
              </button>

              {/* NOTIFIKASI */}
              <button onClick={toggleNotifications} className="flex items-center justify-between p-6 hover:bg-accent transition text-left group">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-xl bg-muted group-hover:scale-110 transition-transform"><Bell className="w-6 h-6" /></div>
                  <div>
                    <p className="text-lg font-bold">{t('notif')}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('desc_notif')}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold w-12 text-center ${notifications ? "text-blue-500" : "text-muted-foreground"}`}>{notifications ? "ON" : "OFF"}</span>
              </button>

              {/* ACHIEVEMENTS */}
              <Link to="/gamification" className="flex items-center justify-between p-6 hover:bg-accent transition block w-full group">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-xl bg-muted group-hover:scale-110 transition-transform"><Trophy className="w-6 h-6 text-yellow-500" /></div>
                  <div className="text-left">
                    <p className="text-lg font-bold">{t('achievements')}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t('achievements_desc')}</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            </div>
          </Card>

          {/* SECURITY & HELP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card shadow-sm overflow-hidden flex flex-col h-full">
              <CardHeader className="bg-muted/30 border-b border-border py-4 px-6 relative overflow-hidden">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('security')}</CardTitle>
              </CardHeader>
              <div className="flex flex-col divide-y divide-border flex-1">
                <NavLink to="/profile/settings" className="flex items-center justify-between p-6 hover:bg-accent transition text-left group flex-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-muted group-hover:scale-110 transition-transform"><Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                    <p className="text-base font-bold">{t('privacy')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </NavLink>
                <NavLink to="/profile/settings" className="flex items-center justify-between p-6 hover:bg-accent transition text-left group flex-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-muted group-hover:scale-110 transition-transform"><Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" /></div>
                    <p className="text-base font-bold">{t('settings')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </NavLink>
              </div>
            </Card>

            <Card className="border-border bg-card shadow-sm overflow-hidden flex flex-col h-full text-foreground">
              <CardHeader className="bg-muted/30 border-b border-border py-4 px-6 relative overflow-hidden">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{t('help')}</CardTitle>
              </CardHeader>
              <div className="flex flex-col divide-y divide-border flex-1">
                <button className="flex items-center justify-between p-6 hover:bg-accent transition text-left group flex-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-muted group-hover:scale-110 transition-transform"><CircleHelp className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                    <p className="text-base font-bold">{t('faq')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
                <button className="flex items-center justify-between p-6 hover:bg-accent transition text-left group flex-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-muted group-hover:scale-110 transition-transform"><CircleHelp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                    <p className="text-base font-bold">{t('about')}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </div>
            </Card>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}