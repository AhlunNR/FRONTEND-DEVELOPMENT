import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMode } from "@/contexts/ModeContext";
import { Trophy, Sparkles, HeartPulse, Activity, Star, ChevronRight, CheckCircle, Flame, Medal, Lock } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { gamificationService } from "@/services/gamification.service";

// Fallback icon berdasarkan badge.type
const BADGE_ICON_MAP = {
  transaction:      <CheckCircle className="w-5 h-5" />,
  level:            <Trophy className="w-5 h-5" />,
  streak:           <Flame className="w-5 h-5" />,
  financial_health: <HeartPulse className="w-5 h-5" />,
};

const BADGE_COLOR_MAP = {
  transaction:      'bg-blue-500',
  level:            'bg-amber-500',
  streak:           'bg-orange-500',
  financial_health: 'bg-emerald-500',
};

export default function MobileGamification() {
  const { mode } = useMode(); 
  const isPersonal = mode === 'personal';
  const themeColor = isPersonal ? 'text-purple-600' : 'text-blue-600';

  // ── State: Data dari API ──
  const [summary, setSummary] = useState(null);
  const [badges, setBadges] = useState([]);
  const [missionsData, setMissionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [celebration, setCelebration] = useState({ show: false, title: "", message: "", type: "" });

  // ── Fetch Data ──
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const [summaryRes, badgesRes, missionsRes] = await Promise.all([
          gamificationService.getSummary(),
          gamificationService.getBadges(),
          gamificationService.getMissions(),
        ]);
        setSummary(summaryRes);
        setBadges(badgesRes);
        setMissionsData(missionsRes);
      } catch (err) {
        console.error('[Gamification] Fetch error:', err);
        setError(typeof err === 'string' ? err : 'Gagal memuat data gamifikasi');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── Animasi Confetti ──
  const triggerLevelUpAnimation = (levelName) => {
    setCelebration({ 
      show: true, 
      title: `Level Up! 🎉`, 
      message: `Selamat! Kamu mencapai peringkat ${levelName}!`, 
      type: "level" 
    });
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f59e0b', '#10b981', '#3b82f6'], zIndex: 9999 });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f59e0b', '#10b981', '#3b82f6'], zIndex: 9999 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => setCelebration(prev => ({...prev, show: false})), 4000);
  };

  const triggerAchievementAnimation = (badgeTitle) => {
    setCelebration({ 
      show: true, 
      title: `Pencapaian Terbuka! 🏆`, 
      message: `Satu lagi koleksi badge kamu: ${badgeTitle}`, 
      type: "achievement" 
    });
    const duration = 2000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 4, angle: 90, spread: 80, origin: { x: 0.5, y: 1 }, startVelocity: 45, colors: ['#eab308', '#3b82f6', '#ec4899', '#8b5cf6'], zIndex: 9999 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    setTimeout(() => setCelebration(prev => ({...prev, show: false})), 3000);
  };

  const triggerSmallConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
  };

  // ── Hitung nilai untuk SVG circle ──
  const getHealthCircleOffset = (score) => {
    const circumference = 2 * Math.PI * 42; // r=42 (mobile circle lebih kecil)
    return circumference - (score / 100) * circumference;
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getHealthLabelColor = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  // ── Loading & Error States ──
  if (loading) {
    return (
      <div className="w-full pb-20 pt-6 px-4 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-muted-foreground text-xs font-medium">Memuat data gamifikasi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pb-20 pt-6 px-4 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Star className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-red-500 font-medium text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // ── Destructure data ──
  const level = summary?.level ?? {};
  const streak = summary?.streak ?? {};
  const health = summary?.financial_health ?? {};
  const missions = missionsData?.missions ?? [];
  const streakDays = missionsData?.streak_days ?? streak.days ?? 0;

  const xpProgress = level.xp_needed ? Math.min((level.xp_progress / level.xp_needed) * 100, 100) : 100;
  const xpRemaining = level.xp_needed ? level.xp_needed - level.xp_progress : 0;
  const isMaxLevel = level.xp_for_next === null;
  const healthScore = health.score ?? 50;

  return (
    <div className="w-full pb-20 pt-6 px-4 space-y-6 bg-background text-foreground transition-colors relative" id="snap-main-container">
      {/* Header Halaman */}
      <AnimatedContent distance={20} delay={0.1} direction="vertical">
        <header className="mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight">Pencapaian</h1>
          <p className="text-sm text-muted-foreground mt-1">Lihat Level Finansial & Koleksi Lencana</p>
        </header>
      </AnimatedContent>

      {/* Bagian Level Finansial */}
      <div className="space-y-4">
        <AnimatedContent distance={30} delay={0.2} direction="vertical">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Trophy className={`w-4 h-4 ${themeColor}`} /> Level Finansial
          </h2>
          <Card className="border-none shadow-sm relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 w-full mt-3">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
            <CardContent className="p-5 flex flex-col gap-5 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 shrink-0 relative">
                  <span className="text-white font-black text-2xl">{level.current ?? 1}</span>
                  <div className="absolute -bottom-1.5 font-bold text-[8px] bg-white text-orange-600 px-1.5 py-0.5 rounded-full shadow-sm dark:bg-slate-800 dark:text-orange-400">
                    LEVEL
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{level.name ?? 'Pemula Finansial'}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 text-foreground">
                    {streakDays > 0 ? `${streakDays} hari streak aktif!` : 'Mulai bangun streak-mu!'} <Sparkles className="w-3 h-3 text-amber-500" />
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-foreground">
                  <span>{isMaxLevel ? 'Level Maksimal' : `Progres ke Level ${(level.current ?? 1) + 1}`}</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    {level.xp_current ?? 0} / {level.xp_for_next ?? level.xp_current ?? 0} XP
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner flex">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000" style={{ width: `${xpProgress}%` }}></div>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">
                  {isMaxLevel 
                    ? 'Selamat, kamu mencapai level maksimal!' 
                    : `Kumpulkan ${xpRemaining} XP lagi untuk naik level.`}
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedContent>

        {/* Misi Harian (Read-Only) */}
        <AnimatedContent distance={30} delay={0.3} direction="vertical">
          <Card className="bg-card border-border shadow-sm text-foreground">
            <CardHeader className="pb-2 p-4 flex flex-row items-center justify-between text-foreground">
              <CardTitle className="text-sm">Misi Harian</CardTitle>
              {streakDays > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                  <Flame className="w-3 h-3" /> {streakDays} Hari Beruntun!
                </span>
              )}
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              {missions.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-3">Belum ada misi hari ini.</p>
              ) : (
                missions.map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between bg-muted/50 p-2.5 rounded-lg border border-border">
                    <div className="flex items-center gap-2">
                      {mission.completed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0" />
                      )}
                      <span className={`text-xs font-bold ${mission.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {mission.title}
                      </span>
                    </div>
                    {mission.completed ? (
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full shrink-0">
                        Selesai
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-500 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 rounded-full shrink-0">
                        +{mission.xp_reward} XP
                      </span>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </AnimatedContent>
      </div>

      {/* Bagian Kesehatan Finansial */}
      <div className="space-y-4 pt-2">
        <AnimatedContent distance={30} delay={0.4} direction="vertical">
          <h2 className="text-base font-bold flex items-center gap-2 text-foreground">
            <HeartPulse className={`w-4 h-4 ${themeColor}`} /> Kesehatan Finansial
          </h2>
          <Card className="bg-card border-border shadow-sm mt-3 text-foreground">
            <CardContent className="p-5 flex flex-col items-center text-center space-y-3">
              {/* Circular Score Indicator */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="42" className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="10" fill="none" />
                  <circle 
                    cx="48" cy="48" r="42" 
                    className={`${getHealthColor(healthScore)} stroke-current`}
                    strokeWidth="10" 
                    fill="none" 
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={getHealthCircleOffset(healthScore)}
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${getHealthColor(healthScore)}`}>{healthScore}</span>
                  <span className="text-[8px] font-bold text-muted-foreground uppercase">Skor</span>
                </div>
              </div>
              <div>
                <h3 className={`text-base font-bold ${getHealthLabelColor(healthScore)}`}>{health.label ?? 'Memuat...'}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {healthScore >= 80 ? 'Pengeluaran terkendali. Lanjutkan kebiasaan ini.' :
                   healthScore >= 60 ? 'Keuangan cukup stabil. Terus tingkatkan!' :
                   healthScore >= 40 ? 'Perlu perhatian lebih terhadap pengeluaran.' :
                   'Pengeluaran melebihi pemasukan. Segera evaluasi!'}
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedContent>
      </div>

      {/* Bagian Badges & Achievements */}
      <div className="space-y-4 pt-2">
        <AnimatedContent distance={30} delay={0.6} direction="vertical">
          <h2 className="text-base font-bold flex items-center gap-2 text-foreground">
            <Medal className={`w-4 h-4 ${themeColor}`} /> Lencana
          </h2>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {badges.map((badge) => {
              const isActive = badge.unlocked;
              const badgeIcon = BADGE_ICON_MAP[badge.type] ?? <Star className="w-5 h-5" />;
              const displayColor = isActive ? (BADGE_COLOR_MAP[badge.type] ?? 'bg-blue-500') : 'bg-slate-200 dark:bg-slate-800';

              return (
                <Card 
                  key={badge.id} 
                  onClick={() => isActive && triggerSmallConfetti()} 
                  className="border-border shadow-sm overflow-hidden active:scale-95 transition-transform text-foreground"
                >
                  <CardContent className={`p-3 flex flex-col items-center text-center gap-2 relative transition-all duration-500 ${!isActive ? 'opacity-60 grayscale' : ''}`}>
                    {isActive && (
                      <div className="absolute top-1.5 right-1.5">
                        <Sparkles className={`w-2 h-2 ${badge.type === 'level' ? 'text-amber-500' : badge.type === 'financial_health' ? 'text-emerald-500' : 'text-blue-500'} animate-pulse`} />
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner transition-colors duration-500 ${displayColor}`}>
                      {isActive ? badgeIcon : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-foreground leading-tight">{badge.name}</h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{badge.description}</p>
                    </div>
                    <div className={`w-full py-0.5 rounded flex items-center justify-center transition-colors ${isActive ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
                      <span className="text-[9px] font-bold">
                        {isActive ? 'Selesai' : `${badge.progress.current}/${badge.progress.target}`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </AnimatedContent>
      </div>

      {/* Celebration Notification Modal Mobile */}
      {celebration.show && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background border-border border-2 p-6 rounded-3xl shadow-2xl flex flex-col items-center max-w-[85%] text-center mx-4 animate-in zoom-in-90 duration-500 text-foreground">
            <div className={`w-20 h-20 ${celebration.type === 'level' ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-gradient-to-br from-blue-400 to-indigo-500'} rounded-full flex items-center justify-center mb-5 shadow-xl border-4 border-background animate-bounce relative`}>
              {celebration.type === 'level' ? <Flame className="w-10 h-10 text-white" /> : <Trophy className="w-10 h-10 text-white" />}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
            </div>
            <h2 className={`text-2xl font-black mb-2 text-transparent bg-clip-text ${celebration.type === 'level' ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}>
              {celebration.title}
            </h2>
            <p className="text-muted-foreground font-medium text-sm leading-snug">
              {celebration.message}
            </p>
            <button 
              onClick={() => setCelebration(prev => ({...prev, show: false}))}
              className="mt-6 px-10 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-foreground font-bold rounded-xl transition-colors active:scale-95 text-sm"
            >
              Lanjutkan
            </button>
          </div>
        </div>, document.body
      )}
    </div>
  );
}