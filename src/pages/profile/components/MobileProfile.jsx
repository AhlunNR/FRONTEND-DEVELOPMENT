import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, NavLink } from "react-router-dom";

import {
  User,
  Settings,
  Bell,
  CircleHelp,
  LogOut,
  ChevronRight,
  Shield,
  Store,
  Moon,
  Sun,
  Pencil,
  Trophy,
  Flame,
  Medal,
  WalletCards,
  Languages // Tambah icon bahasa biar keren
} from "lucide-react";
import { useMode } from "@/contexts/ModeContext";

export default function MobileProfile() {
  const {
    mode,
    theme,
    notifications,
    toggleMode,
    toggleTheme,
    toggleNotifications,
    t // Panggil fungsi t()
  } = useMode();
  const navigate = useNavigate();

  const isPersonal = mode === "personal";
  const isDark = theme === "dark";

  const themeColor = isPersonal
    ? "text-purple-600"
    : "text-blue-600";

  const themeBg = isPersonal
    ? "bg-purple-100 dark:bg-purple-900/30"
    : "bg-blue-100 dark:bg-blue-900/30";

  return (
    <div className="pb-24 p-4 md:p-6 max-w-xl mx-auto w-full space-y-6 
    bg-background text-foreground animate-in fade-in transition-colors duration-300">

      {/* HEADER */}
      <header>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {t('profile')}
        </h1>
      </header>

      {/* USER INFO */}
      <Card className="border-border bg-card shadow-sm overflow-hidden">
        <CardContent className="p-4 flex items-center gap-4">
          
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold ${themeBg} ${themeColor}`}>
            AN
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">
              Ahlun Najarrudin
            </h2>
            <p className="text-xs text-muted-foreground mb-1">
              ahlun.idcamp@gmail.com
            </p>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${themeBg} ${themeColor}`}>
              {isPersonal ? t('mode_p_short') : t('mode_u_short')}
            </span>
          </div>

          <button className="p-2 rounded-lg hover:bg-accent transition text-muted-foreground">
            <Pencil className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>

      {/* USER STATS */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
              <WalletCards className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-foreground">124</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{t('transactions')}</p>
          </div>
        </Card>
        <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">
              <Medal className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-foreground">12</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{t('badges')}</p>
          </div>
        </Card>
        <Card className="border-border bg-card shadow-sm overflow-hidden text-center py-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
              <Flame className="w-4 h-4" />
            </div>
            <p className="text-lg font-black text-foreground">5</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{t('streak')}</p>
          </div>
        </Card>
      </div>

      {/* SETTINGS */}
      <div className="space-y-4">

        {/* PREFERENSI */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {t('general')}
          </h3>

          <Card className="border-border bg-card shadow-sm overflow-hidden">
            <div className="flex flex-col divide-y divide-border">

              {/* MODE */}
              <button
                onClick={toggleMode}
                className="flex items-center justify-between p-4 hover:bg-accent transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${themeBg} ${themeColor}`}>
                    {isPersonal ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Store className="w-4 h-4" />
                    )}
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">
                      {t('app_mode')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isPersonal ? t('mode_p') : t('mode_u')}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* LANGUAGE SETTINGS (TAMBAHAN BIAR BISA GANTI BAHASA DI MOBILE) */}
              <NavLink 
                to="/profile/language"
                className="flex items-center justify-between p-4 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">
                      {t('lang_name')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('select_lang')}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </NavLink>

              {/* THEME */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between p-4 hover:bg-accent transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    {isDark ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">
                      {t('theme_title')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isDark ? t('theme_d') : t('theme_l')}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-bold ${isDark ? "text-blue-500" : "text-muted-foreground"}`}>
                  {isDark ? "ON" : "OFF"}
                </span>
              </button>

              {/* NOTIFICATIONS */}
              <button
                onClick={toggleNotifications}
                className="flex items-center justify-between p-4 hover:bg-accent transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Bell className="w-4 h-4" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">
                      {t('notif')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('desc_notif')}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-bold ${notifications ? "text-blue-500" : "text-muted-foreground"}`}>
                  {notifications ? "ON" : "OFF"}
                </span>
              </button>

              {/* ACHIEVEMENTS */}
              <Link
                to="/gamification"
                className="flex items-center justify-between p-4 hover:bg-accent transition block w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted text-foreground">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground">
                      {t('achievements')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('achievements_desc')}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </Card>
        </div>

        {/* KEAMANAN */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {t('security')}
          </h3>

          <Card className="border-border bg-card shadow-sm overflow-hidden">
            <div className="flex flex-col divide-y divide-border text-foreground">

              <NavLink 
                to="/profile/settings"
                className="flex items-center justify-between p-4 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Shield className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold">
                    {t('privacy')}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </NavLink>

              <NavLink 
                to="/profile/settings"
                className="flex items-center justify-between p-4 hover:bg-accent transition text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Settings className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold">
                    {t('settings')}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </NavLink>
            </div>
          </Card>
        </div>

        {/* BANTUAN */}
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {t('help')}
          </h3>

          <Card className="border-border bg-card shadow-sm overflow-hidden">
            <div className="flex flex-col divide-y divide-border text-foreground">

              <button className="flex items-center justify-between p-4 hover:bg-accent transition text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <CircleHelp className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold">
                    {t('faq')}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <button className="flex items-center justify-between p-4 hover:bg-accent transition text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <CircleHelp className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold">
                    {t('about')}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* LOGOUT */}
      <Button
        variant="destructive"
        className="w-full h-12 mt-6 font-bold text-md gap-2"
        onClick={() => navigate("/login")}
      >
        <LogOut className="w-5 h-5" />
        {t('logout')}
      </Button>

      {/* VERSION */}
      <p className="text-center text-xs text-muted-foreground mt-8 mb-4">
        KasFlow v1.0.0
      </p>
    </div>
  );
}