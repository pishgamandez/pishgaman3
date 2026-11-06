/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Wand2,
  BookOpen,
  LayoutGrid,
  Sparkles,
  Sliders,
  MessageSquare,
  Shield,
  Zap,
  FlaskConical,
  Award,
  Layers,
  Phone,
  CheckCircle2,
  Sprout,
  Image as ImageIcon
} from 'lucide-react';
import { PosterConfig } from './types';
import { POSTER_TEMPLATES } from './data/defaultPosters';
import { PosterStudio } from './components/PosterStudio';
import { TemplateGallery } from './components/TemplateGallery';
import { ResearchDossier } from './components/ResearchDossier';
import { CopywriterTool } from './components/CopywriterTool';
import { AutoResearcher } from './components/AutoResearcher';

// Optimal Green Screen color for best separation (high contrast to most products)
export const BG_REMOVE_GREEN_COLOR = '#00FF41'; 

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'gallery' | 'research' | 'copywriter' | 'researcher'>('studio');
// ... (rest of App component updated with researcher tab)
  const [currentConfig, setCurrentConfig] = useState<PosterConfig>(POSTER_TEMPLATES[0]);

  const handleSelectTemplateFromGallery = (template: PosterConfig) => {
    setCurrentConfig({ ...template });
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar with Pishgaman Branding */}
      <header className="border-b border-slate-800/80 bg-[#090e1a]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Logo Badge */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-500 p-0.5 shadow-lg shadow-emerald-600/25">
              <div className="w-full h-full bg-[#090e1a] rounded-[14px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">
                  پرواز نهاده پیشگامان
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  TIGER High P
                </span>
              </div>
              <p className="text-xs text-slate-400">
                پلتفرم هوشمند تبلیغات بین‌المللی و تحقیقات تخصصی فسفات کشاورزی
              </p>
            </div>
          </div>

          {/* Quick Info & Status */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>حفظ ۱۰۰٪ مشخصات فیزیکی محصول</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>کیفیت در حد Corteva & Syngenta</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tab Navigation Bar */}
      <div className="border-b border-slate-800/60 bg-[#090e1a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>استودیوی ساخت پوستر اتوماتیک</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>گالری پوسترهای برتر بین‌المللی ({POSTER_TEMPLATES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'research'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>تحقیقات جامع فسفات و مزایای TIGER</span>
            </button>

            <button
              onClick={() => setActiveTab('copywriter')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'copywriter'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>تولید متن تبلیغاتی و کپشن</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'studio' && (
          <PosterStudio
            initialConfig={currentConfig}
            onApplyTemplate={(tmpl) => setCurrentConfig(tmpl)}
          />
        )}

        {activeTab === 'gallery' && (
          <TemplateGallery
            onSelectTemplate={handleSelectTemplateFromGallery}
          />
        )}

        {activeTab === 'research' && (
          <ResearchDossier />
        )}

        {activeTab === 'copywriter' && (
          <CopywriterTool />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090e1a] py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">شرکت پرواز نهاده پیشگامان</span>
            <span>-</span>
            <span>تولیدکننده کودهای تخصصی کشاورزی و محرک‌های رشد گیاهی</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>کود سوسپانسیون تایگر های‌پی (TIGER High P)</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">بسته‌بندی رسمی ۶ لیتری</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
