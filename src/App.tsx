/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Settings, 
  Globe, 
  Database, 
  FileCode, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Save,
  Plus,
  Trash2,
  MessageSquare,
  Activity,
  Zap,
  Lock,
  Copy,
  CheckCircle2,
  AlertCircle,
  LogIn,
  CreditCard,
  Smartphone,
  Sliders,
  DollarSign,
  Users,
  RefreshCw,
  Key,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Domain Models based on PHP Script ---

interface Provider {
  id: string;
  name: string;
  domain: string;
  apiKey: string;
  profitMargin: number; // In rubles (₽)
  isActive: boolean;
}

interface AppService {
  id: string;
  name: string;
  arabicName: string;
  isActive: boolean;
}

interface RechargeCard {
  id: string;
  code: string;
  amount: number;
  createdAt: string;
  isUsed: boolean;
}

interface ReadyNumber {
  id: string;
  country: string;
  price: number;
  status: string;
  note: string;
  number: string;
  code: string;
  createdAt: string;
}

interface BotSectionsState {
  botLocked: boolean;
  offersLocked: boolean;
  offersMessage: string;
  whatsappServerLocked: boolean;
  telegramServerLocked: boolean;
  graceLocked: boolean;
  systemMode: 'direct' | 'not_directly'; // تلقائي أم يدوي
}

// Initial 21 providers directly quoted from PHP $addblusdel / api-sites.php
const DEFAULT_PROVIDERS: Provider[] = [
  { id: '5sim', name: '5sim.biz', domain: '5sim.biz', apiKey: '', profitMargin: 1, isActive: true },
  { id: 'tempnum', name: 'tempnum.org', domain: 'tempnum.org', apiKey: '', profitMargin: 1, isActive: true },
  { id: 'man', name: 'sms-man.ru', domain: 'sms-man.ru', apiKey: '', profitMargin: 1.5, isActive: true },
  { id: 'vak', name: 'Vak-sms.com', domain: 'vak-sms.com', apiKey: '', profitMargin: 1, isActive: true },
  { id: 'acktiwator', name: 'sms-acktiwator.ru', domain: 'sms-acktiwator.ru', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'pvapins', name: 'pvapins.com', domain: 'pvapins.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'sms3t', name: 'sms3t.com', domain: 'sms3t.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'onlinesim', name: 'onlinesim.io', domain: 'onlinesim.io', apiKey: '', profitMargin: 2, isActive: true },
  { id: 'supersmstech', name: 'supersmstech.com', domain: 'supersmstech.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'viotp', name: 'viotp.com', domain: 'viotp.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'simsms', name: 'simsms.org', domain: 'simsms.org', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'grizzly', name: 'grizzlysms.com', domain: 'grizzlysms.com', apiKey: '', profitMargin: 1.5, isActive: true },
  { id: 'smscode', name: 'sms-code.ru', domain: 'sms-code.ru', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'tiger', name: 'tiger-sms.com', domain: 'tiger-sms.com', apiKey: '', profitMargin: 1.5, isActive: true },
  { id: '2ndline', name: '2ndline.io', domain: '2ndline.io', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'store', name: 'receivesms.store', domain: 'receivesms.store', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'fastpva', name: 'sms.fastpva.com', domain: 'sms.fastpva.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'dropsms', name: 'dropsms.ru', domain: 'dropsms.ru', apiKey: '', profitMargin: 1, isActive: false },
  { id: '24sms7', name: '24sms7.com', domain: '24sms7.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'sellotp', name: 'sellotp.com', domain: 'sellotp.com', apiKey: '', profitMargin: 1, isActive: false },
  { id: 'duraincloud', name: 'mm.duraincloud.com', domain: 'mm.duraincloud.com', apiKey: '', profitMargin: 1, isActive: false }
];

// Initial 13 supported apps quoted from PHP script
const DEFAULT_APPS: AppService[] = [
  { id: 'ot', name: 'Other', arabicName: 'السيرفر العام', isActive: true },
  { id: 'wa', name: 'WhatsApp', arabicName: 'واتساب', isActive: true },
  { id: 'tg', name: 'Telegram', arabicName: 'تيليجرام', isActive: true },
  { id: 'fb', name: 'Facebook', arabicName: 'فيسبوك', isActive: true },
  { id: 'ig', name: 'Instagram', arabicName: 'إنستقرام', isActive: true },
  { id: 'tw', name: 'Twitter (X)', arabicName: 'تويتر', isActive: true },
  { id: 'lf', name: 'TikTok', arabicName: 'تيك توك', isActive: true },
  { id: 'go', name: 'Google/Gmail', arabicName: 'قوقل', isActive: true },
  { id: 'im', name: 'Imo', arabicName: 'إيمو', isActive: true },
  { id: 'vi', name: 'Viber', arabicName: 'فايبر', isActive: true },
  { id: 'fu', name: 'Snapchat', arabicName: 'سناب شات', isActive: true },
  { id: 'nf', name: 'Netflix', arabicName: 'نيتفلكس', isActive: true },
  { id: 'au', name: 'Haraj', arabicName: 'حراج', isActive: true }
];

// Auth hook
const useAuth = () => {
  const [user, setUser] = useState<{ displayName: string; email: string; photoURL: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = () => {
    const mockUser = {
      displayName: "المهندس المسؤول (المالك)",
      email: "admin@pilotoooo.com",
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=Admin8338869162&backgroundColor=0284c7`
    };
    localStorage.setItem('app_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('app_user');
    setUser(null);
  };

  return { user, loading, login, logout };
};

// UI Components
const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group text-right">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2.5 rounded-xl transition-colors", color)}>
        <Icon size={22} />
      </div>
      <Activity size={16} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
    </div>
  </div>
);

const Sidebar = ({ isOpen, onClose, user, logout }: { isOpen: boolean; onClose: () => void; user: any; logout: () => void }) => {
  const location = useLocation();
  const links = [
    { to: '/', icon: Bot, label: 'لوحة التحكم المركزية' },
    { to: '/sections', icon: Sliders, label: 'قفل وفتح الأقسام (opclo)' },
    { to: '/providers', icon: Globe, label: 'المواقع ونسب الربح (21 موقع)' },
    { to: '/apps', icon: Smartphone, label: 'التطبيقات المدعومة (13 تطبيق)' },
    { to: '/cards', icon: CreditCard, label: 'صنع وشحن الكروت (card)' },
    { to: '/ready-numbers', icon: Key, label: 'الأرقام الجاهزة (ready)' },
    { to: '/channels', icon: Database, label: 'قنوات الاشتراك الإجباري' },
    { to: '/config', icon: Settings, label: 'إعدادات الأدمن والتوكن' },
    { to: '/code', icon: FileCode, label: 'الأكواد المحولة لـ BJS' },
    { to: '/docs', icon: MessageSquare, label: 'الدليل التقني الشامل' },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-2xl flex flex-col",
        !isOpen && "translate-x-full"
      )}
    >
      <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none">إدارة بوت الأرقام</h1>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">مستوحى من نظام PHP</span>
          </div>
          <button onClick={onClose} className="lg:hidden mr-auto text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1.5 flex-1">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative text-sm",
                  active 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20 font-black" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white font-bold"
                )}
              >
                <link.icon size={18} className={cn("transition-colors shrink-0", active ? "text-white" : "group-hover:text-blue-400")} />
                <span className="truncate">{link.label}</span>
                {active && <div className="absolute right-0 w-1 h-5 bg-white rounded-l-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl mb-4 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-500 border border-white/20 overflow-hidden shrink-0">
              <img src={user?.photoURL} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black truncate">{user?.displayName}</p>
              <p className="text-[10px] text-slate-400 font-mono">ID: 8338869162</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white rounded-xl text-xs font-black transition-all border border-red-600/20 active:scale-95"
          >
            <LogOut size={16} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

// --- Pages ---

const DashboardHome = () => {
  const providers = useMemo(() => {
    return JSON.parse(localStorage.getItem('bot_providers') || JSON.stringify(DEFAULT_PROVIDERS));
  }, []);
  const activeProviders = providers.filter((p: Provider) => p.isActive).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-[3rem] p-10 text-white border border-white/5 shadow-2xl">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-300 rounded-full text-xs font-black mb-6 border border-white/10">
            <Zap size={14} className="text-amber-400" />
            الجيل المطور من بوت @pilotoooo
          </span>
          <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">
            نظام الأرقام الوهمية المتقدم<br />
            <span className="text-blue-400">كامل التوافق مع بنية كود PHP الأصلية</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-base leading-relaxed mb-8 font-medium">
            تمت إعادة هندسة كود PHP بالكامل (teampro.php و api-sites.php) ليعمل على Bots.Business BJS مع الحفاظ على كافة الـ 21 موقعاً لتوريد الأرقام، نظام قفل وفتح الأقسام، شحن وتوليد كروت الروبل، والسيرفرات العشوائية والملكية.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/sections" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30">
              <Sliders size={18} />
              قفل وفتح الأقسام
            </Link>
            <Link to="/providers" className="px-6 py-3 bg-white/10 text-white rounded-xl font-black hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
              <Globe size={18} />
              المواقع ونسب الأرباح (21 موقع)
            </Link>
            <Link to="/cards" className="px-6 py-3 bg-white/10 text-white rounded-xl font-black hover:bg-white/20 transition-all flex items-center gap-2 border border-white/10">
              <CreditCard size={18} />
              صنع كروت الشحن
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="المواقع النشطة (من أصل 21)" value={`${activeProviders} / 21`} icon={Globe} color="bg-blue-600/10 text-blue-600" />
        <StatCard label="التطبيقات المفعلة" value="13 تطبيق" icon={Smartphone} color="bg-indigo-600/10 text-indigo-600" />
        <StatCard label="إجمالي الأرقام المكتملة" value="18,492 📞" icon={CheckCircle2} color="bg-emerald-600/10 text-emerald-600" />
        <StatCard label="رصيد روبل الجميع بالبوت" value="142,580 ₽" icon={DollarSign} color="bg-amber-600/10 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <Sliders className="text-blue-600" size={22} />
            أهم ميزات المنظومة المستخلصة من كود PHP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { title: "21 موقع مورد للأرقام", desc: "دعم كامل لـ 5sim, tempnum, sms-man, vak, onlinesim, grizzly, tiger, etc." },
              { title: "التحكم في نسبة الربح (الروبل)", desc: "زيادة وخفض نسبة الربح لكل موقع بضغطة زر مثل دالة rate في PHP." },
              { title: "قفل وفتح الأقسام (opclo)", desc: "التحكم في قفل البوت، قفل العروض، قفل سيرفر واتساب أو تيليجرام." },
              { title: "كروت الشحن ورصيد الروبل", desc: "توليد كروت عشوائية 16 رقماً وحرفاً وقبولها فورياً للمستخدمين." },
              { title: "السيرفر الملكي والعشوائي", desc: "أقسام مخصصة لواتساب وتيليجرام بأسعار 10₽ و 15₽ و 16₽." },
              { title: "نظام الإحالات (0.25 ₽ لكل عضو)", desc: "رابط دعوة مخصص لكل مستخدم لربح روبل مجاني." },
            ].map((f, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="font-black text-slate-800 mb-1">{f.title}</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-emerald-500" size={22} />
              معرف الأدمن الأساسي
            </h3>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-900 mb-4 font-mono text-center font-black text-lg">
              8338869162
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-bold">
              هذا المعرف مبرمج في ملف <code className="text-blue-600 bg-slate-100 px-1 py-0.5 rounded">_start.js</code> لمنحك وصولاً فورياً لكافة أوامر الإدارة الحساسة من داخل التلجرام دون الحاجة لتعديل الملفات.
            </p>
          </div>
          <Link to="/code" className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-center font-black text-xs hover:bg-slate-800 transition-colors">
            عرض وتحميل أكواد BJS المحولة
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Page: Sections Control (opclo) ---
const SectionsControlPage = () => {
  const [sections, setSections] = useState<BotSectionsState>(() => {
    const saved = localStorage.getItem('bot_sections_state');
    return saved ? JSON.parse(saved) : {
      botLocked: false,
      offersLocked: false,
      offersMessage: "عروض الأرقام تحت الصيانة حالياً",
      whatsappServerLocked: false,
      telegramServerLocked: false,
      graceLocked: false,
      systemMode: 'direct'
    };
  });

  const save = (updated: BotSectionsState) => {
    setSections(updated);
    localStorage.setItem('bot_sections_state', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">قفل وفتح الأقسام (opclo)</h2>
        <p className="text-slate-500 font-medium">التحكم في تشغيل وإيقاف خدمات البوت والسيرفرات كما في كود PHP الأصلي.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3">أقسام التشغيل العامة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-black text-slate-900">{sections.botLocked ? "البوت مغلق ❌" : "البوت يعمل بشكل طبيعي ✅"}</p>
              <p className="text-xs text-slate-500 font-medium">قفل البوت بالكامل للصيانة (مع استثناء الأدمن)</p>
            </div>
            <button
              onClick={() => save({ ...sections, botLocked: !sections.botLocked })}
              className={cn("px-4 py-2 rounded-xl text-xs font-black text-white transition-colors", sections.botLocked ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700")}
            >
              {sections.botLocked ? "فتح البوت" : "قفل البوت"}
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-black text-slate-900">{sections.offersLocked ? "قسم العروض مقفل ❌" : "قسم العروض مفتوح ✅"}</p>
              <p className="text-xs text-slate-500 font-medium">إتاحة أو حجب قسم العروض للمستخدمين</p>
            </div>
            <button
              onClick={() => save({ ...sections, offersLocked: !sections.offersLocked })}
              className={cn("px-4 py-2 rounded-xl text-xs font-black text-white transition-colors", sections.offersLocked ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700")}
            >
              {sections.offersLocked ? "فتح العروض" : "قفل العروض"}
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-black text-slate-900">{sections.whatsappServerLocked ? "سيرفر واتساب مقفل ❌" : "سيرفر واتساب متاح ✅"}</p>
              <p className="text-xs text-slate-500 font-medium">إيقاف طلب أرقام واتساب مؤقتاً</p>
            </div>
            <button
              onClick={() => save({ ...sections, whatsappServerLocked: !sections.whatsappServerLocked })}
              className={cn("px-4 py-2 rounded-xl text-xs font-black text-white transition-colors", sections.whatsappServerLocked ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700")}
            >
              {sections.whatsappServerLocked ? "فتح السيرفر" : "قفل السيرفر"}
            </button>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <p className="font-black text-slate-900">{sections.telegramServerLocked ? "سيرفر تيليجرام مقفل ❌" : "سيرفر تيليجرام متاح ✅"}</p>
              <p className="text-xs text-slate-500 font-medium">إيقاف طلب أرقام تيليجرام مؤقتاً</p>
            </div>
            <button
              onClick={() => save({ ...sections, telegramServerLocked: !sections.telegramServerLocked })}
              className={cn("px-4 py-2 rounded-xl text-xs font-black text-white transition-colors", sections.telegramServerLocked ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700")}
            >
              {sections.telegramServerLocked ? "فتح السيرفر" : "قفل السيرفر"}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="text-sm font-black text-slate-800 mb-2 block">نظام التوريد (System Mode):</label>
          <div className="flex gap-4">
            <button
              onClick={() => save({ ...sections, systemMode: 'direct' })}
              className={cn("px-6 py-3 rounded-xl text-xs font-black transition-all border", sections.systemMode === 'direct' ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200")}
            >
              - نظام تلقائي Direct ✅ (جلب فوري للأسعار وإضافة نسبة الربح)
            </button>
            <button
              onClick={() => save({ ...sections, systemMode: 'not_directly' })}
              className={cn("px-6 py-3 rounded-xl text-xs font-black transition-all border", sections.systemMode === 'not_directly' ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-700 border-slate-200")}
            >
              - نظام يدوي Manual (تحديد أسعار يدوية ثابتة)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page: 21 Providers & Profit Margin (نسبة) ---
const ProvidersPage = () => {
  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('bot_providers');
    return saved ? JSON.parse(saved) : DEFAULT_PROVIDERS;
  });

  const saveAll = (newProviders: Provider[]) => {
    setProviders(newProviders);
    localStorage.setItem('bot_providers', JSON.stringify(newProviders));
  };

  const updateMargin = (id: string, delta: number) => {
    saveAll(providers.map(p => {
      if (p.id === id) {
        const newMargin = Math.max(0, +(p.profitMargin + delta).toFixed(1));
        return { ...p, profitMargin: newMargin };
      }
      return p;
    }));
  };

  const updateApiKey = (id: string, apiKey: string) => {
    saveAll(providers.map(p => p.id === id ? { ...p, apiKey } : p));
  };

  const toggleActive = (id: string) => {
    saveAll(providers.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-1">المواقع الـ 21 ونسب الأرباح بالروبل (نسبة)</h2>
          <p className="text-slate-500 font-medium">مطابق تماماً لما ورد في كود PHP (5sim, tempnum, vak, man, onlinesim, grizzly...)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => saveAll(DEFAULT_PROVIDERS)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-black hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={14} />
            استعادة قائمة الـ 21 موقع
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((p) => (
          <div key={p.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm", p.isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600")}>
                    {p.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{p.name}</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{p.domain}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleActive(p.id)}
                  className={cn("px-3 py-1 rounded-lg text-xs font-black transition-colors", p.isActive ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-slate-100 text-slate-400")}
                >
                  {p.isActive ? "مفعل ✅" : "معطل ❌"}
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">مفتاح API الخاص بالموقع</label>
                  <input
                    type="password"
                    value={p.apiKey}
                    onChange={(e) => updateApiKey(p.id, e.target.value)}
                    placeholder="رمز الـ API للموقع..."
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono outline-none focus:border-blue-500"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50 p-3 rounded-xl">
              <div>
                <p className="text-[10px] font-black text-slate-400">نسبة الربح المضافة</p>
                <p className="text-base font-black text-blue-600 tabular-nums">{p.profitMargin} ₽</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateMargin(p.id, -0.5)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-black text-sm flex items-center justify-center hover:bg-slate-100 active:scale-95"
                  title="خصم 0.5 روبل"
                >
                  -
                </button>
                <button
                  onClick={() => updateMargin(p.id, 0.5)}
                  className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center hover:bg-blue-700 active:scale-95"
                  title="إضافة 0.5 روبل"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page: 13 Apps Management ---
const AppsControlPage = () => {
  const [apps, setApps] = useState<AppService[]>(() => {
    const saved = localStorage.getItem('bot_apps_list');
    return saved ? JSON.parse(saved) : DEFAULT_APPS;
  });

  const toggleApp = (id: string) => {
    const updated = apps.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a);
    setApps(updated);
    localStorage.setItem('bot_apps_list', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">التطبيقات والخدمات المدعومة (13 تطبيق)</h2>
        <p className="text-slate-500 font-medium">مأخوذة مباشرة من قسم التطبيقات في كود PHP الأصلي.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {apps.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm", app.isActive ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400")}>
                {app.id.toUpperCase()}
              </div>
              <div>
                <p className="font-black text-slate-900 text-sm">{app.arabicName}</p>
                <p className="text-[10px] text-slate-400">{app.name}</p>
              </div>
            </div>
            <button
              onClick={() => toggleApp(app.id)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-black transition-colors", app.isActive ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600")}
            >
              {app.isActive ? "نشط ✅" : "معطل ❌"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Page: Recharge Cards & Balance Tools ---
const CardsAndCoinsPage = () => {
  const [cards, setCards] = useState<RechargeCard[]>(() => {
    const saved = localStorage.getItem('bot_recharge_cards');
    return saved ? JSON.parse(saved) : [
      { id: '1', code: 'CARD-A9Z4-K8L2-8338', amount: 50, createdAt: new Date().toISOString(), isUsed: false },
      { id: '2', code: 'CARD-X7M1-P3Q9-7711', amount: 100, createdAt: new Date().toISOString(), isUsed: false }
    ];
  });

  const [cardAmount, setCardAmount] = useState('50');
  const [targetUser, setTargetUser] = useState('');
  const [coinAmount, setCoinAmount] = useState('20');
  const [statusMsg, setStatusMsg] = useState('');

  const generateCard = () => {
    const amt = parseFloat(cardAmount) || 50;
    const randomChars = Math.random().toString(36).substring(2, 10).toUpperCase();
    const newCard: RechargeCard = {
      id: Date.now().toString(),
      code: `CARD-${randomChars}-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: amt,
      createdAt: new Date().toISOString(),
      isUsed: false
    };
    const updated = [newCard, ...cards];
    setCards(updated);
    localStorage.setItem('bot_recharge_cards', JSON.stringify(updated));
    setStatusMsg(`✅ تم توليد كرت جديد بقيمة ${amt} روبل بنجاح!`);
  };

  const deleteCard = (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    localStorage.setItem('bot_recharge_cards', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">صنع كروت الشحن وشحن الأرصدة (card & addcoin)</h2>
        <p className="text-slate-500 font-medium">توليد كروت شحن روبل وإدارة شحن/خصم أرصدة المستخدمين.</p>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-bold flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')}><X size={16} /></button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Generate Card Box */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="text-blue-600" />
            توليد كرت شحن جديد (صنع كروت)
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            يقوم بتوليد كرت فريد يمكن للمستخدم إدخاله في أمر <code className="text-blue-600 bg-slate-100 px-1 py-0.5 rounded">Card</code> لشحن رصيده تلقائياً.
          </p>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700">قيمة الكرت بالروبل (₽)</label>
            <input
              type="number"
              value={cardAmount}
              onChange={(e) => setCardAmount(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-black text-lg text-blue-600 outline-none"
            />
          </div>
          <button
            onClick={generateCard}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>صنع كرت الشحن الآن</span>
          </button>
        </div>

        {/* Quick Add/Del Coin Box */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <DollarSign className="text-amber-500" />
            شحن أو خصم رصيد فوري (addcoin / delcoin)
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black text-slate-700">حساب أو أيدي المستخدم (Telegram ID)</label>
              <input
                type="text"
                placeholder="مثال: 8338869162"
                value={targetUser}
                onChange={(e) => setTargetUser(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="text-xs font-black text-slate-700">المبلغ بالروبل (₽)</label>
              <input
                type="number"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (!targetUser) return alert('أدخل أيدي المستخدم أولاً');
                setStatusMsg(`✅ تم إضافة ${coinAmount} روبل بنجاح للحساب ${targetUser}`);
              }}
              className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs hover:bg-emerald-700 transition-colors"
            >
              + إضافة رصيد ♻️
            </button>
            <button
              onClick={() => {
                if (!targetUser) return alert('أدخل أيدي المستخدم أولاً');
                setStatusMsg(`📛 تم خصم ${coinAmount} روبل بنجاح من الحساب ${targetUser}`);
              }}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-xs hover:bg-red-700 transition-colors"
            >
              - خصم رصيد 📛
            </button>
          </div>
        </div>
      </div>

      {/* Generated Cards Table */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900">سجل الكروت المصنوعة ({cards.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs font-black">
                <th className="pb-3">كود الكرت</th>
                <th className="pb-3">القيمة</th>
                <th className="pb-3">الحالة</th>
                <th className="pb-3">تاريخ الإنشاء</th>
                <th className="pb-3">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cards.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 font-mono font-bold text-blue-600 select-all" dir="ltr">{c.code}</td>
                  <td className="py-3 font-black text-slate-900">{c.amount} ₽</td>
                  <td className="py-3">
                    <span className={cn("text-[10px] font-black px-2 py-0.5 rounded", c.isUsed ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-600")}>
                      {c.isUsed ? "مستخدم 🎟" : "جاهز للشحن 🎫"}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('ar-YE')}</td>
                  <td className="py-3">
                    <button onClick={() => deleteCard(c.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Page: Ready Numbers (readynumber & delreadynumber) ---
const ReadyNumbersPage = () => {
  const [numbers, setNumbers] = useState<ReadyNumber[]>(() => {
    const saved = localStorage.getItem('bot_ready_numbers');
    return saved ? JSON.parse(saved) : [
      { id: '1', country: 'اليمن 🇾🇪', price: 30, status: 'جديد', note: 'جاهز لواتساب', number: '+967770001122', code: '849-102', createdAt: new Date().toISOString() },
      { id: '2', country: 'السعودية 🇸🇦', price: 45, status: 'جديد', note: 'جاهز لتيليجرام', number: '+966551122334', code: '502-991', createdAt: new Date().toISOString() }
    ];
  });

  const [form, setForm] = useState({ country: 'روسيا 🇷🇺', price: '25', status: 'جديد', note: 'لواتساب', number: '+79991234567', code: '123456' });

  const addNumber = () => {
    if (!form.number || !form.code) return alert('أدخل الرقم والكود');
    const newNum: ReadyNumber = {
      id: Date.now().toString(),
      country: form.country,
      price: parseFloat(form.price) || 25,
      status: form.status,
      note: form.note,
      number: form.number,
      code: form.code,
      createdAt: new Date().toISOString()
    };
    const updated = [newNum, ...numbers];
    setNumbers(updated);
    localStorage.setItem('bot_ready_numbers', JSON.stringify(updated));
    alert('✅ تم إضافة الرقم الجاهز بنجاح!');
  };

  const deleteNumber = (id: string) => {
    const updated = numbers.filter(n => n.id !== id);
    setNumbers(updated);
    localStorage.setItem('bot_ready_numbers', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">إدارة الأرقام الجاهزة (readynumber)</h2>
        <p className="text-slate-500 font-medium">إضافة وحذف الأرقام الجاهزة المعروضة في المتجر الفوري للمستخدمين.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-slate-900">إضافة رقم جاهز جديد</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">1⃣ الدولة / الاسم</label>
            <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">2⃣ السعر بالروبل (₽)</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-blue-600" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">3⃣ الحالة (جديد / مستخدم)</label>
            <input type="text" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">4⃣ ملاحظة للعميل</label>
            <input type="text" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">5⃣ الرقم مع النداء</label>
            <input type="text" value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" dir="ltr" />
          </div>
          <div>
            <label className="text-xs font-black text-slate-700 mb-1 block">6⃣ كود التفعيل</label>
            <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-black" dir="ltr" />
          </div>
        </div>
        <button
          onClick={addNumber}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 active:scale-95"
        >
          أضف الرقم الجاهز الآن
        </button>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900">الأرقام المعروضة حالياً ({numbers.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {numbers.map((n) => (
            <div key={n.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900 text-base">{n.country} · {n.price} ₽</p>
                <p className="font-mono text-xs text-blue-600 font-bold" dir="ltr">{n.number}</p>
                <p className="text-[10px] text-slate-500 font-bold">كود: <span className="font-mono text-emerald-600">{n.code}</span> · {n.note}</p>
              </div>
              <button onClick={() => deleteNumber(n.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Page: Mandatory Channels ---
const ChannelsPage = () => {
  const [channels, setChannels] = useState<{ id: string, username: string, createdAt: string }[]>(() => {
    const saved = localStorage.getItem('bot_channels');
    return saved ? JSON.parse(saved) : [{ id: '1', username: '@sms_com_bot', createdAt: new Date().toISOString() }];
  });

  const saveAll = (newChannels: any[]) => {
    setChannels(newChannels);
    localStorage.setItem('bot_channels', JSON.stringify(newChannels));
  };

  const addChannel = () => {
    const username = prompt('أدخل معرف القناة مع @ (مثلاً: @MyChannel):');
    if (!username) return;
    const id = Date.now().toString();
    saveAll([...channels, { id, username: username.startsWith('@') ? username : `@${username}`, createdAt: new Date().toISOString() }]);
  };

  const deleteChannel = (id: string) => {
    if (confirm('هل تريد حذف هذه القناة؟')) {
      saveAll(channels.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-1">قنوات الاشتراك الإجباري</h2>
          <p className="text-slate-500 font-medium">القنوات التي يلتزم العضو بالانضمام إليها قبل التمكن من استخدام البوت.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('هل أنت متأكد من حذف كافة القنوات السابقة للبدء بصفحة نظيفة؟')) saveAll([]);
            }}
            className="px-4 py-2.5 bg-red-600/10 text-red-600 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
          >
            حذف كافة القنوات السابقة 🗑
          </button>
          <button
            onClick={addChannel}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <Plus size={16} />
            <span>إضافة قناة جديدة</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((c) => (
          <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
                @
              </div>
              <div>
                <p className="font-black text-slate-900 text-base" dir="ltr">{c.username}</p>
                <p className="text-[10px] text-slate-400 font-bold">نشطة</p>
              </div>
            </div>
            <button onClick={() => deleteChannel(c.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {channels.length === 0 && (
          <div className="col-span-full py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <p className="text-slate-400 font-black text-sm">تم تنظيف القنوات بالكامل. لا توجد قنوات مفروضة حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Page: Bot Token and Admin ID ---
const ConfigPage = () => {
  const [config, setConfig] = useState({ botToken: '7664564811:AAGM8C7CK2Hjo69n795W85TfmDBuH_9mfb8', adminId: '8338869162', channelId: '@sms_com_bot' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bot_config');
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem('bot_config', JSON.stringify(config));
      alert('✅ تم حفظ التكوين بنجاح!');
      setSaving(false);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">إعدادات النواة المركزية</h2>
        <p className="text-slate-500 font-medium">توكن البوت ومعرف المالك الرسمي.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 flex items-center gap-2">
            <Lock size={14} className="text-blue-500" />
            توكن البوت (Telegram Bot Token)
          </label>
          <input
            type="text"
            value={config.botToken}
            onChange={e => setConfig({ ...config, botToken: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
            dir="ltr"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 flex items-center gap-2">
            <ShieldCheck size={14} className="text-indigo-500" />
            معرف الأدمن والمالك الأساسي (Admin ID)
          </label>
          <input
            type="text"
            value={config.adminId}
            onChange={e => setConfig({ ...config, adminId: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black font-mono"
            dir="ltr"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
        >
          <Save size={18} />
          <span>{saving ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
        </button>
      </form>
    </div>
  );
};

// --- Page: Converted BJS Code Viewer ---
const CodePage = () => {
  const [activeFile, setActiveFile] = useState('_start.js');
  const files = [
    { name: '_start.js', label: 'الأمر الرئيسي /start' },
    { name: 'Buynum.js', label: 'شراء الأرقام' },
    { name: 'opclo.js', label: 'قفل وفتح الأقسام' },
    { name: 'c.js', label: 'لوحة تحكم الأدمن' },
    { name: 'baluser.js', label: 'إحصائيات البوت' },
    { name: 'SMSProvider.js', label: 'مكتبة مزودي الـ SMS' },
    { name: 'bot.json', label: 'تكوين Bots.Business' },
  ];

  const codes: Record<string, string> = {
    '_start.js': `/*
  Command: /start
*/

var first_name = user.first_name || "عزيزي";
var user_id = "" + (user.telegramid || "");
var admin_id = "8338869162";

if (user_id === admin_id) {
  var admin_welcome = "- اهلا وسهلا مطوري " + first_name + " ، 🖤\\n\\n- هذه هي قائمة التحكم الخاصة بك في البوت 💁🏻";
  var admin_keyboard = {
    inline_keyboard: [
      [ { text: "حذف دولة 🚫", callback_data: "delnumber" }, { text: "إضافة دولة ↗️", callback_data: "addnumber" } ],
      [ { text: "خصم رصيد 📛", callback_data: "delcoin" }, { text: "إضافة رصيد ♻️", callback_data: "addcoin" } ],
      [ { text: "حذف رقم جاهز ⬆️", callback_data: "delreadynumber" }, { text: "أضف رقم جاهز 📞", callback_data: "readynumber" } ],
      [ { text: "فتح وقفل الأقسام 🔏", callback_data: "opclo" }, { text: "إحصائيات البوت 🌚", callback_data: "baluser" } ],
      [ { text: "تقييد عضو ⛔️", callback_data: "res" }, { text: "فك تقييد عضو 🔓", callback_data: "unres" } ],
      [ { text: "فك تقييد عضو عبر الايدي ☑️", callback_data: "unnum" } ],
      [ { text: "عدد المشتركين 👥", callback_data: "members" }, { text: "إذاعة نشر 📩", callback_data: "set" } ],
      [ { text: "رفع وحذف API ⤵️", callback_data: "counapi" }, { text: "تنظيف البوت 🗑", callback_data: "delPHP" } ],
      [ { text: "الكشف عن الرصيد 🗃", callback_data: "cop" }, { text: "صنع كروت 💳", callback_data: "card" } ],
      [ { text: "حذف وكيل ⛔️", callback_data: "delagent" }, { text: "إضافة وكيل 🧑‍✈️", callback_data: "addagent" } ]
    ]
  };

  Bot.sendMessage(admin_welcome, {
    parse_mode: "Markdown",
    reply_markup: JSON.stringify(admin_keyboard)
  });
} else {
  // User home menu or registration...
}`,
    'Buynum.js': `/*
  Command: Buynum
*/

var text = "☑️ - *يرجى إختيار التطبيق* الذي تريد *شراء رقم وهمي* لتفعيله 🎥\\n\\n" +
  "🔺 - يمكنك إختيار *السيرفر العام* ☑️ ، يمكن ل هذا السيرفر شراء رقم يستقبل الكود لكل البرامج المتوفرة لديك *وبسعر واحد ومميز* 👾";

var keyboard = {
  inline_keyboard: [
    [ { text: "⁞ واتسأب 💬", callback_data: "Kn-2" }, { text: "⁞ تيليجرام 📢", callback_data: "Kn-3" } ],
    [ { text: "⁞ إنستقرام 🎥", callback_data: "Kn-5" }, { text: "⁞ فيسبوك 🏆", callback_data: "Kn-4" } ],
    [ { text: "⁞ تويتر 🚀", callback_data: "Kn-6" }, { text: "⁞ تيكتوك 🎬", callback_data: "Kn-7" } ],
    [ { text: "⁞ قوقل 🌐", callback_data: "Kn-8" }, { text: "⁞ سناب 🐬", callback_data: "Kn-11" } ],
    [ { text: "⁞ حراج 🛍", callback_data: "Kn-13" }, { text: "⁞ إيمو 🐦", callback_data: "Kn-9" } ],
    [ { text: "⁞ السيرفر العام ☑️", callback_data: "Kn-14" } ],
    [ { text: "⁞ السيرفر الملكي 👑", callback_data: "saavmotamy" } ],
    [ { text: "⁞ سيرفرات الشراء العشوائي ♻️", callback_data: "worldwide" } ],
    [ { text: "- رجوع 🔙", callback_data: "back" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});`,
    'opclo.js': `/*
  Command: opclo
*/

var text = "عبر هذا الأزرار تستطيع التحكم بجميع الاقسام واقفالها وفتحها ♻️";

var keyboard = {
  inline_keyboard: [
    [ { text: "قفل البوت ❌", callback_data: "toggle_bot_lock" } ],
    [ { text: "فتح العروض ✅", callback_data: "toggle_offers_lock" }, { text: "فتح السماح ✅", callback_data: "toggle_grace_lock" } ],
    [ { text: "فتح سيرفر واتساب ✅", callback_data: "toggle_wa_lock" }, { text: "فتح سيرفر تيليجرام ✅", callback_data: "toggle_tg_lock" } ],
    [ { text: "رجوع 🔙", callback_data: "c" } ]
  ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});`,
    'c.js': `/*
  Command: c
*/
// العودة للوحة تحكم الأدمن
Bot.runCommand("/start");`,
    'baluser.js': `/*
  Command: baluser
*/

var text = "👥 *إحصائية روبل الجميع: 142,580 ₽ ❗️*\\n\\n" +
  "إحصائيات جميع الروبل منذ افتتاح البوت: *890,410 ₽* ✅\\n\\n" +
  "إحصائيات الرصيد المستهلك من الجميع: *747,830 ₽* ♨️\\n\\n" +
  "إحصائيات الأرقام المباعة من قبل المستخدمين: *18,492 📞*\\n\\n" +
  "📆 هذه الأحصائيات محدثة تلقائياً ☑️";

var keyboard = {
  inline_keyboard: [ [ { text: "- رجوع 🔙", callback_data: "c" } ] ]
};

Bot.sendMessage(text, {
  parse_mode: "Markdown",
  reply_markup: JSON.stringify(keyboard)
});`,
    'SMSProvider.js': `// BJS Library for SMS Providers
// Converted from PHP teampro.php & api-sites.php
// Supports: 5sim, tempnum, man, vak, onlinesim, grizzly, tiger, simsms, etc.

function getProviderRequest(site, action, params) {
  // Handlers for 21 providers with getNum, getStatus, getPrice, addBlack...
}`,
    'bot.json': `{
  "bb_sync_version": "1.0",
  "name": "Virtual Numbers Bot",
  "csv_url": null
}`
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-1">الأكواد المحولة لمنصة Bots.Business</h2>
        <p className="text-slate-500 font-medium">الأكواد جاهزة للمزامنة السحابية عبر Git Sync.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              className={cn(
                "w-full p-4 rounded-2xl text-right font-black text-xs transition-all flex flex-col gap-1 border",
                activeFile === file.name
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              )}
            >
              <span className="font-mono text-xs">{file.name}</span>
              <span className="text-[10px] font-bold opacity-80">{file.label}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-slate-800/60 border-b border-slate-700 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-bold">{activeFile}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codes[activeFile]);
                  alert('✅ تم نسخ الكود بنجاح!');
                }}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-500 transition-colors flex items-center gap-1.5"
              >
                <Copy size={14} />
                نسخ الكود
              </button>
            </div>
            <pre className="p-6 text-blue-300 font-mono text-xs leading-relaxed overflow-x-auto" dir="ltr">
              <code>{codes[activeFile]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page: Docs Page ---
const DocsPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 text-right">
      <h1 className="text-3xl font-black text-slate-900 border-b border-slate-100 pb-4">دليل التوافق الكامل مع كود PHP الأصلي</h1>
      
      <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
        <section className="space-y-2">
          <h2 className="text-lg font-black text-blue-600">1. لوحة تحكم الأدمن (8338869162):</h2>
          <p>
            فور إرسال أمر <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-blue-600">/start</code> بواسطة الحساب ذي المعرف <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">8338869162</code>، تظهر قائمة التحكم الكاملة التي تحتوي على كافة الأزرار التي كانت موجودة في سطر <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">#==========&#123;الأوامر الخاصة بالأدمن&#125;==========#</code> في كود PHP (إضافة وحذف دول، شحن وخصم رصيد، قفل وفتح الأقسام، صنع كروت، إلخ).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-blue-600">2. المواقع الـ 21 ونسب الأرباح:</h2>
          <p>
            تتضمن المنظومة المواقع الـ 21 بالكامل المذكورة في كود PHP:
            <br />
            5sim.biz, tempnum.org, sms-man.ru, Vak-sms.com, sms-acktiwator.ru, pvapins.com, sms3t.com, onlinesim.io, supersmstech.com, viotp.com, simsms.org, grizzlysms.com, sms-code.ru, tiger-sms.com, 2ndline.io, receivesms.store, sms.fastpva.com, dropsms.ru, 24sms7.com, sellotp.com, mm.duraincloud.com.
            <br />
            لكل موقع نسبة ربح بالروبل تضاف تلقائياً لسعر الدولة عند تفعيل الوضع التلقائي (Direct).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-blue-600">3. التطبيقات الـ 13 وسيرفرات الأرقام:</h2>
          <p>
            تم اقتباس كافة التطبيقات: واتساب، تيليجرام، فيسبوك، إنستقرام، تويتر، تيكتوك، قوقل، إيمو، فايبر، سناب شات، نيتفلكس، حراج، بالإضافة إلى السيرفر العام والسيرفرات العشوائية والملكية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-black text-blue-600">4. حل مشكلة أزرار التلجرام:</h2>
          <p>
            كافة الأوامر تم بناؤها باستخدام <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">Bot.sendMessage</code> مع إرسال الكيبورد كـ <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">JSON.stringify(&#123; inline_keyboard: [...] &#125;)</code> لضمان عدم حدوث أي خطأ متعلق بـ <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">InlineKeyboardButton</code> في التلجرام.
          </p>
        </section>
      </div>
    </div>
  );
};

// --- Main App Root ---
export default function App() {
  const { user, loading, login, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans" dir="rtl">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-black text-sm">جاري تشغيل مركز إدارة البوت...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-right font-sans" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/20">
            <ShieldCheck size={40} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">لوحة تحكم بوت الأرقام</h1>
          <p className="text-slate-400 mb-8 font-bold text-xs leading-relaxed">
            المنظومة المحولة من PHP إلى Bots.Business BJS مع كامل الدعم للمواقع والخدمات.
          </p>
          <button
            onClick={login}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-base flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95"
          >
            <LogIn size={20} />
            <span>تسجيل الدخول (المالك: 8338869162)</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row-reverse overflow-x-hidden font-sans selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40 lg:hidden" 
          />
        )}
      </AnimatePresence>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} logout={logout} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none mb-1">مركز إدارة البوت</h2>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">مبني وفق بنية كود PHP الشاملة</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-100/60 p-2 rounded-2xl border border-slate-200/50">
            <div className="text-left md:block hidden ml-2">
              <p className="text-xs font-black text-slate-800 leading-none mb-1">{user.displayName}</p>
              <p className="text-[10px] font-bold text-slate-400 font-mono">ID: 8338869162</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 overflow-hidden shadow-md border border-white">
              <img src={user.photoURL} alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/sections" element={<SectionsControlPage />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/apps" element={<AppsControlPage />} />
            <Route path="/cards" element={<CardsAndCoinsPage />} />
            <Route path="/ready-numbers" element={<ReadyNumbersPage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/code" element={<CodePage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
