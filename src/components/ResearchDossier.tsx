/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  TreePine,
  Wheat,
  Flower2,
  Sprout,
  Apple,
  CircleDot,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  PISHGAMAN_PRODUCT_SPECS,
  PHOSPHORUS_RESEARCH_SECTIONS,
  CROP_APPLICATION_GUIDE,
  DEFICIENCY_SYMPTOMS,
  ADVANTAGE_COMPARISON
} from '../data/researchData';

export const ResearchDossier: React.FC = () => {
  // Fertilizer Dosage Calculator state
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [hectares, setHectares] = useState<number>(5);
  const [method, setMethod] = useState<'soil' | 'foliar'>('soil');

  const currentCrop = CROP_APPLICATION_GUIDE[selectedCropIndex];

  // Calculate required liters
  const soilRatePerHectare = selectedCropIndex === 0 ? 6.5 : selectedCropIndex === 1 ? 4 : selectedCropIndex === 2 ? 5 : 5;
  const foliarRatePerHectare = 2.5;

  const totalLitersNeeded = method === 'soil'
    ? Math.round(hectares * soilRatePerHectare)
    : Math.round(hectares * foliarRatePerHectare);

  const bucketsNeeded = Math.ceil(totalLitersNeeded / 6); // 6 Liter buckets

  return (
    <div className="space-y-8 text-slate-100">
      {/* Hero Research Header */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>پرونده تحقیقات علمی و فیزیولوژیک فسفر</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            چرا فسفر فعال و محصول <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">تایگر های‌پی (TIGER High P) پیشگامان</span> بی‌رقیب است؟
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-normal">
            فسفر (Phosphorus) دومین عنصر پرمصرف ماکرو در فیزیولوژی گیاهی و کلید اصلی تولید انرژی سلولی (ATP) است. در خاک‌های آهکی و قلیایی ایران با pH بالای ۷.۸، بیش از ۸۰٪ فسفات سنتی با کلسیم پیوند خورده و قفل می‌شود. محصول تایگر پیشگامان با فرمولاسیون اختصاصی این مانع را می‌شکند.
          </p>

          {/* Key Specs Pills */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400">نام تجاری محصول</div>
              <div className="text-sm font-bold text-white mt-0.5">{PISHGAMAN_PRODUCT_SPECS.name}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400">شرکت تولیدکننده</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{PISHGAMAN_PRODUCT_SPECS.company}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400">بسته‌بندی رسمی</div>
              <div className="text-sm font-bold text-white mt-0.5">{PISHGAMAN_PRODUCT_SPECS.volume}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[11px] text-slate-400">وضعیت کلر و شوری</div>
              <div className="text-sm font-bold text-teal-300 mt-0.5">۱۰۰٪ بدون کلر (Chloride-Free)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Table: Pishgaman TIGER vs Conventional Phosphorus */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">مقایسه علمی: تایگر های‌پی پیشگامان در برابر فسفات‌های سنتی بازار</h3>
              <p className="text-xs text-slate-400">تفاوت راندمان زیستی و اقتصادی در مزارع و باغات</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">شاخص مقایسه</th>
                <th className="py-3 px-4 font-bold text-emerald-400 bg-emerald-950/20 rounded-t-xl">
                  تایگر های‌پی پیشگامان (TIGER High P)
                </th>
                <th className="py-3 px-4 font-semibold text-slate-400">کودهای فسفاته معمولی (سوپرفسفات، DAP، کودهای وارداتی بی‌کیفیت)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ADVANTAGE_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-200">{row.factor}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-300 bg-emerald-950/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{row.pishgamanTiger}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{row.conventional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep Scientific Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PHOSPHORUS_RESEARCH_SECTIONS.map((sec) => (
          <div key={sec.id} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{sec.title}</span>
            </h4>
            <p className="text-xs text-emerald-300/90 font-medium mb-3 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/20">
              {sec.summary}
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mb-4 leading-relaxed">
              {sec.details.map((detail, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2.5 border-t border-slate-800 text-[10px] text-slate-500 flex items-center gap-1.5 font-mono">
              <BookOpen className="w-3 h-3 text-slate-400" />
              <span>منبع علمی: {sec.scientificRef}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Fertilizer Dosage Calculator */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">ماشین حساب مهندسی مصرف TIGER High P</h3>
            <p className="text-xs text-slate-400">محاسبه آنلاین میزان سطل ۶ لیتری مورد نیاز بر اساس نوع محصول و متراژ زمین</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">۱. انتخاب نوع محصول کشاورزی:</label>
              <select
                value={selectedCropIndex}
                onChange={(e) => setSelectedCropIndex(Number(e.target.value))}
                className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {CROP_APPLICATION_GUIDE.map((crop, idx) => (
                  <option key={idx} value={idx}>{crop.name} ({crop.category})</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>۲. مساحت زیر کشت (هکتار):</span>
                <span className="font-mono text-indigo-400 font-bold">{hectares} هکتار</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>۱ هکتار</span>
                <span>۲۵ هکتار</span>
                <span>۵۰ هکتار</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">۳. روش مصرف کودی:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('soil')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    method === 'soil'
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  کودآبیاری (آب اول / قطره‌ای)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('foliar')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    method === 'foliar'
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  محلول‌پاشی برگی (Foliar)
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-medium">حجم کل مورد نیاز</span>
                <div className="text-3xl font-black text-white mt-1">
                  {totalLitersNeeded} <span className="text-sm font-normal text-slate-300">لیتر</span>
                </div>
                <div className="mt-3 text-xs text-slate-300">
                  معادل <strong className="text-amber-400 font-bold text-lg">{bucketsNeeded}</strong> سطل ۶ لیتری رسمی پیشگامان
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-500/20 text-[11px] text-indigo-200">
                دوز پیشنهادی: {method === 'soil' ? currentCrop.soilDose : currentCrop.foliarDose}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>زمان طلایی مصرف برای {currentCrop.name}:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {currentCrop.timing}
                </p>
                <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  💡 {currentCrop.notes}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-300 font-semibold">
                اثر شاخص: {currentCrop.keyBenefit}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Diagnostics: Signs of Low Phosphorus in Farm & Orchard */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">راهنمای اورژانسی: علائم کمبود فسفر در مزرعه و باغ</h3>
            <p className="text-xs text-slate-400">نشانه‌هایی که به شما می‌گویند بوته‌ها و درختان تشنه TIGER High P هستند</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEFICIENCY_SYMPTOMS.map((sym, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                    خسارت: {sym.severity}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1.5">{sym.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{sym.description}</p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-800/80 text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>درمان با ۱ دوره مصرف تایگر پیشگامان</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
