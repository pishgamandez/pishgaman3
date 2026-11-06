/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Printer,
  ShieldCheck,
  Microscope,
  Calendar,
  Layers
} from 'lucide-react';
import { PishgamanProduct } from '../types';
import { generateScientificArticle } from '../services/aiGenerator';

interface ResearchDossierProps {
  product: PishgamanProduct;
}

export const ResearchDossier: React.FC<ResearchDossierProps> = ({ product }) => {
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const articleMarkdown = generateScientificArticle(product, seed);

  const handleCopy = () => {
    navigator.clipboard.writeText(articleMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([articleMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Pishgaman_Research_${product.slug}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Dossier Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              سیستم تولید مقاله و رفرنس علمی دانشگاهی
            </h2>
            <p className="text-xs text-slate-400">
              ارزیابی اگروفیزیولوژیک، رفتار در خاک‌های آهکی ایران و رفرنس‌های آکادمیک برای:{' '}
              <span className="font-bold text-emerald-400">
                {product.nameFa} ({product.nameEn})
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>تولید زاویه پژوهشی جدید</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'کپی شد!' : 'کپی کل مقاله'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>دانلود فایل مقاله (MD)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>پرینت</span>
          </button>
        </div>
      </div>

      {/* Scientific Document Paper Viewport */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 text-slate-200 font-sans leading-relaxed">
        {/* Document Header Band */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>دپارتمان R&D شرکت پرواز نهاده پیشگامان</span>
            <span>کد سند: PISHGAMAN-RD-{product.slug.toUpperCase()}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            ارزیابی اگروفیزیولوژیک و دینامیک جذب فرمولاسیون {product.nameFa} ({product.nameEn}) در
            بوم‌نظام‌های زراعی کشور
          </h1>
          <div className="text-xs text-emerald-400 font-semibold pt-1">
            محور پژوهش: اصلاح تغذیه در خاک‌های قلیایی و کاهش استرس‌های اسمزی
          </div>
        </div>

        {/* Section 1: Abstract */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 className="text-sm font-black text-teal-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>چکیده علمی (Scientific Abstract)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            این مطالعه به بررسی اثرات فیزیولوژیک، سرعت متابولیسم سلولی و ضریب انتقال عناصر مغذی با
            کاربرد فرمولاسیون {product.nameFa} ({product.nameEn}) می‌پردازد. در خاک‌های زراعی ایران
            که مقادیر آهک فعال (Active CaCO3) بیش از ۱۵٪ و اسیدیته بالاتر از ۷.۸ است، استفاده از این
            نهاده به دلیل ساختار متمایز شیمیایی مانع از کمپلکس‌شدگی و غیرفعال‌شدن عناصر گردیده و
            فعالیت آنزیم‌های آنتی‌اکسیدانی کاتالاز و سوپراکسید دیسموتاز را به شکل محسوسی تشدید
            می‌نماید.
          </p>
        </div>

        {/* Section 2: Chemical & Physical Specs Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>ویژگی‌های فرمولاسیون و مشخصات شیمیایی</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">کلاس شیمیایی:</span>
              <span className="font-bold text-white">
                {product.scientificProfile.chemicalClass}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">مواد مؤثره:</span>
              <span className="font-bold text-emerald-300">
                {product.scientificProfile.activeIngredients}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">محدوده اسیدیته (pH):</span>
              <span className="font-bold text-amber-300 font-mono">
                {product.scientificProfile.phRange}
              </span>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">بسته‌بندی و ظاهر:</span>
              <span className="font-bold text-slate-200">
                {product.appearance} ({product.packaging})
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Mode of Action */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Microscope className="w-4 h-4 text-teal-400" />
            <span>مکانیسم سلولی و فیزیولوژی اثر در گیاه (Mode of Action)</span>
          </h3>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify space-y-2">
            <p>{product.scientificProfile.modeOfAction}</p>
            <p className="text-slate-400 text-xs">
              پژوهش‌های اگروشیمیایی ثابت کرده است که سرعت انتقال سیستمیک یون‌های این فرمولاسیون از
              طریق آوندهای آبکش (Phloem) و چوب (Xylem) نسبت به نمک‌های ساده معدنی تا ۳ برابر بیشتر بوده
              و تلفات شستشو یا رسوب سطحی به صفر میل می‌کند.
            </p>
          </div>
        </div>

        {/* Section 4: Iranian Calcareous Soils Dynamics */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>برهمکنش بیوشیمیایی در خاک‌های شور و آهکی ایران</span>
          </h3>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            {product.scientificProfile.iranSoilSynergy}
          </div>
        </div>

        {/* Section 5: Phenological Dosage Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>تقویم مصرف و پروتکل دوز کاربرد در محصولات منتخب</span>
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                <tr>
                  <th className="p-3">محصول زراعی / باغی</th>
                  <th className="p-3">شیوه مصرف</th>
                  <th className="p-3">زمان بهینه در تقویم رشد</th>
                  <th className="p-3">دوز مصرفی در هکتار</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {product.dosageTable.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-950/40">
                    <td className="p-3 font-bold text-white">{d.crop}</td>
                    <td className="p-3">{d.method}</td>
                    <td className="p-3 text-slate-400">
                      {d.timing || 'در طول فصل رشد و مراحل حساس'}
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{d.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Tank Mix & Compatibility */}
        <div className="space-y-2">
          <h3 className="text-sm font-black text-white">دستورالعمل سازگاری و اختلاط تانک</h3>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {product.scientificProfile.tankMixCompatibility}
          </div>
        </div>

        {/* Section 7: Academic References */}
        <div className="space-y-3 border-t border-slate-800 pt-6">
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-indigo-400" />
            <span>مراجع و مقالات آکادمیک بین‌المللی (Peer-Reviewed References)</span>
          </h3>
          <div className="space-y-2.5">
            {product.scientificProfile.academicReferences.map((ref, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono space-y-1"
              >
                <div className="font-bold text-indigo-300">
                  [{idx + 1}] {ref.title}
                </div>
                <div className="text-[11px] text-slate-400">
                  {ref.authors} ({ref.year}). <em>{ref.journal}</em>
                  {ref.doi && <span className="text-emerald-400 ml-2">DOI: {ref.doi}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
