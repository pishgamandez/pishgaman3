/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sprout, CheckCircle2, ShieldAlert, Droplet, Clock, Award, Sparkles } from 'lucide-react';
import { PishgamanProduct } from '../types';

interface DosageGuideProps {
  product: PishgamanProduct;
}

export const DosageGuide: React.FC<DosageGuideProps> = ({ product }) => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-28 h-28 rounded-2xl bg-slate-950/80 p-2 border border-emerald-500/20 flex items-center justify-center shrink-0">
          <img
            src={product.imageUrl}
            alt={product.nameFa}
            className="max-h-full max-w-full object-contain filter drop-shadow"
          />
        </div>
        <div className="space-y-2 text-center md:text-right flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <h2 className="text-xl font-black text-white">{product.nameFa}</h2>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {product.nameEn}
            </span>
            <span className="text-xs text-slate-400">({product.categoryTitle})</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">حالت فیزیکی:</span>{' '}
              <strong className="text-white">{product.appearance}</strong>
            </div>
            <div>
              <span className="text-slate-500">نوع بسته‌بندی:</span>{' '}
              <strong className="text-white">{product.packaging}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>مزایای بارز و اثرات شاخص محصول</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-200 leading-relaxed font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Dosing Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <Droplet className="w-4 h-4 text-blue-400" />
          <span>جدول جامع دوز و شیوه مصرف در محصولات کشاورزی</span>
        </h3>
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
              <tr>
                <th className="p-4">محصول کشاورزی</th>
                <th className="p-4">روش کاربرد</th>
                <th className="p-4">زمان بهینه مصرف</th>
                <th className="p-4">دوز مصرفی هکتاری</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {product.dosageTable.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <span>{item.crop}</span>
                  </td>
                  <td className="p-4">{item.method}</td>
                  <td className="p-4 text-slate-400">
                    {item.timing || 'در طول دوره رشد رویشی و زایشی'}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono font-bold">
                      {item.rate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Precautions & Quality Guarantee */}
      <div className="p-4 rounded-2xl bg-amber-950/15 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">توصیه‌های مهم کاربرد:</div>
          <p className="leading-relaxed text-slate-300">
            دوزهای مندرج در جدول جنبه عمومی دارد؛ با توجه به نوع رقم، سن درختان، اقلیم و آزمون خاک،
            دوز نهایی می‌تواند با نظر کارشناسان فنی شرکت پرواز نهاده پیشگامان تعدیل گردد. قبل از
            محلول‌پاشی گسترده، در سطحی محدود تست انجام دهید.
          </p>
        </div>
      </div>
    </div>
  );
};
