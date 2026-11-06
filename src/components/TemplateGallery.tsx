/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Download,
  Eye,
  Sliders,
  CheckCircle2,
  Share2,
  Shield,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { PosterConfig } from '../types';
import { POSTER_TEMPLATES } from '../data/defaultPosters';
import { PosterCanvas } from './PosterCanvas';

interface TemplateGalleryProps {
  onSelectTemplate: (template: PosterConfig) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<PosterConfig | null>(null);

  const filteredTemplates = POSTER_TEMPLATES.filter(t => {
    if (filter === 'all') return true;
    return t.theme === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>گالری پوسترهای برتر بین‌المللی</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            مجموعه پوسترهای تبلیغاتی TIGER High P پیشگامان
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            طراحی شده بر اساس هویت بصری غول‌های اگروشیمی جهان (Corteva, Syngenta, Yara, Haifa) بدون تغییر ظاهر سطل
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            همه سبک‌ها
          </button>
          <button
            onClick={() => setFilter('corteva')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'corteva'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            کورتوا (ریشه)
          </button>
          <button
            onClick={() => setFilter('syngenta')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'syngenta'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            سینجنتا (مزرعه طلایی)
          </button>
          <button
            onClick={() => setFilter('yara')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'yara'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            یارا (باغات پسته)
          </button>
          <button
            onClick={() => setFilter('haifa-dark')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filter === 'haifa-dark'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            حیفا (دارک مود لوکس)
          </button>
        </div>
      </div>

      {/* Grid of Posters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/60 overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Visual Canvas Thumbnail */}
            <div className="relative p-3 bg-slate-950 flex items-center justify-center overflow-hidden">
              <PosterCanvas
                config={template}
                className="w-full max-h-[320px] transition-transform duration-300 group-hover:scale-[1.02]"
              />

              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-[11px] font-medium text-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: template.accentColor }} />
                <span>{template.aspectRatio}</span>
              </div>
            </div>

            {/* Poster Info & Specs */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                  <span>{template.name}</span>
                </h3>
                <p className="text-xs text-emerald-400 font-semibold mb-2">
                  {template.headline}
                </p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {template.badges.map((b) => (
                    <span
                      key={b.id}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>شخصی‌سازی در استودیو</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
