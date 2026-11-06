/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Sliders,
  Type,
  Sun,
  Eye,
  CheckCircle,
  Copy,
  Layers,
  Wand2,
  Shield,
  Zap,
  Palette,
  Ratio,
  Maximize2
} from 'lucide-react';
import { PosterConfig, AspectRatio, PishgamanProduct } from '../types';
import { PosterCanvas } from './PosterCanvas';
import { THEME_OPTIONS, PosterThemeType } from '../services/aiGenerator';

interface PosterStudioProps {
  product: PishgamanProduct;
  config: PosterConfig;
  onChangeConfig: (newConfig: PosterConfig) => void;
  onReroll: () => void;
}

export const PosterStudio: React.FC<PosterStudioProps> = ({
  product,
  config,
  onChangeConfig,
  onReroll
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'product' | 'text' | 'effects'>('themes');
  const [exportFn, setExportFn] = useState<(() => void) | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    onChangeConfig({
      ...config,
      aspectRatio: ratio
    });
  };

  const handleThemeChange = (themeId: PosterThemeType) => {
    const selectedTheme = THEME_OPTIONS.find((t) => t.id === themeId);
    if (!selectedTheme) return;

    onChangeConfig({
      ...config,
      theme: themeId,
      bgGradient: selectedTheme.gradient,
      primaryColor: selectedTheme.primaryColor,
      accentColor: selectedTheme.accentColor,
      sunFlare: selectedTheme.sunFlare,
      particles: selectedTheme.particles,
      productGlowColor: selectedTheme.primaryColor
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...config.features];
    updated[index] = value;
    onChangeConfig({
      ...config,
      features: updated
    });
  };

  const handleBadgeChange = (index: number, text: string) => {
    const updated = [...config.badges];
    if (updated[index]) {
      updated[index] = { ...updated[index], text };
      onChangeConfig({
        ...config,
        badges: updated
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Column: Canvas Preview & Quick Action Bar (7 cols on lg) */}
      <div className="lg:col-span-7 flex flex-col items-center space-y-4">
        {/* Top Control Header */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
          {/* Active Product Label */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">محصول فعال:</span>
            <span className="text-xs font-black text-white bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              {product.nameFa} ({product.nameEn})
            </span>
          </div>

          {/* Re-roll Ideas Button */}
          <button
            onClick={() => {
              onReroll();
              showToast('ایده‌ها و چیدمان جدید با موفقیت ایجاد شد ✨');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>تولید ایده‌های نو و متون تازه</span>
          </button>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="w-full flex items-center justify-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800/80">
          <span className="text-[11px] text-slate-400 ml-2 font-medium">قطع پوستر:</span>
          {[
            { id: '4:5', label: 'عمودی اینستاگرام (4:5)' },
            { id: '1:1', label: 'مربع (1:1)' },
            { id: '9:16', label: 'استوری و ریلز (9:16)' },
            { id: '16:9', label: 'افقی وبسایت (16:9)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleAspectRatioChange(item.id as AspectRatio)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                config.aspectRatio === item.id
                  ? 'bg-emerald-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Live Canvas Viewport */}
        <div className="w-full flex justify-center bg-[#070b14] border border-slate-800/90 rounded-3xl p-4 shadow-2xl overflow-hidden relative group">
          <div className="max-w-full flex justify-center">
            <PosterCanvas
              config={config}
              onExportReady={(fn) => setExportFn(() => fn)}
              className="max-h-[620px] w-auto object-contain rounded-2xl shadow-2xl transition-all"
            />
          </div>
        </div>

        {/* Download & Export Button */}
        <div className="w-full flex items-center gap-3">
          <button
            onClick={() => {
              if (exportFn) {
                exportFn();
                showToast('پوستر با کیفیت بالا دانلود شد 📥');
              }
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 active:scale-98 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>دانلود پوستر با کیفیت فوق‌العاده چاپ (Ultra HD PNG)</span>
          </button>
        </div>
      </div>

      {/* Right Column: Multi-Tab Customization Controls (5 cols on lg) */}
      <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-5">
        {/* Tabs Bar */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
          {[
            { id: 'themes', label: 'سبک‌های بین‌المللی', icon: Palette },
            { id: 'text', label: 'متن و شعار', icon: Type },
            { id: 'product', label: 'تنظیم تصویر', icon: Sliders },
            { id: 'effects', label: 'نور و اتمسفر', icon: Sun }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: International Themes */}
        {activeTab === 'themes' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-medium">
              یکی از سبک‌های بین‌المللی طراحی را انتخاب کنید:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = config.theme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-950/30 shadow-lg shadow-emerald-500/10'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-white">{theme.title}</span>
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-slate-700"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {theme.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Text & Slogan Editor */}
        {activeTab === 'text' && (
          <div className="space-y-4 text-xs">
            {/* Headline */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">تیتر اصلی پوستر</label>
              <input
                type="text"
                value={config.headline}
                onChange={(e) => onChangeConfig({ ...config, headline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Headline Highlight */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">
                تیتر درخشان دوم (تاکید طلایی/زمردی)
              </label>
              <input
                type="text"
                value={config.headlineHighlight}
                onChange={(e) =>
                  onChangeConfig({ ...config, headlineHighlight: e.target.value })
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">توضیح کوتاه زیر تیتر</label>
              <input
                type="text"
                value={config.subheadline}
                onChange={(e) => onChangeConfig({ ...config, subheadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* 4 Feature Bullet Points */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-300">
                ۴ ویژگی کلیدی درج‌شده روی پوستر
              </label>
              {config.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-black">•</span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Badges Editor */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-300">نشان‌ها و بج‌های اعتبار</label>
              <div className="grid grid-cols-2 gap-2">
                {config.badges.map((b, idx) => (
                  <input
                    key={b.id || idx}
                    type="text"
                    value={b.text}
                    onChange={(e) => handleBadgeChange(idx, e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Product Image & Background Removal */}
        {activeTab === 'product' && (
          <div className="space-y-4 text-xs">
            {/* Background Removal Switcher */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">حذف هوشمند پس‌زمینه</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.removeBg}
                    onChange={(e) =>
                      onChangeConfig({ ...config, removeBg: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {config.removeBg && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  {/* Mode options */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'auto', label: 'تشخیص خودکار' },
                      { id: 'green', label: 'پرده سبز #00FF41' },
                      { id: 'white', label: 'سفید آتلیه‌ای' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() =>
                          onChangeConfig({ ...config, bgRemoveMode: m.id as any })
                        }
                        className={`py-1.5 px-1 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${
                          (config.bgRemoveMode || 'auto') === m.id
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Sensitivity Slider */}
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>حساسیت جداسازی لبه‌ها:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {config.bgRemoveSensitivity}٪
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="85"
                      value={config.bgRemoveSensitivity}
                      onChange={(e) =>
                        onChangeConfig({
                          ...config,
                          bgRemoveSensitivity: Number(e.target.value)
                        })
                      }
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  {/* Despill Green toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400 text-[11px]">
                      حذف بازتاب رنگ سبز از لبه‌های ظرف (Despill):
                    </span>
                    <input
                      type="checkbox"
                      checked={config.despillGreen !== false}
                      onChange={(e) =>
                        onChangeConfig({ ...config, despillGreen: e.target.checked })
                      }
                      className="accent-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scale & Position Sliders */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>اندازه کالا در پوستر:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {Math.round(config.productScale * 100)}٪
                  </span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.3"
                  step="0.02"
                  value={config.productScale}
                  onChange={(e) =>
                    onChangeConfig({ ...config, productScale: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>موقعیت عمودی:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {config.productPosY}٪
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="90"
                  value={config.productPosY}
                  onChange={(e) =>
                    onChangeConfig({ ...config, productPosY: Number(e.target.value) })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Lighting & Atmosphere */}
        {activeTab === 'effects' && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-3">
              {/* Floor Shadow */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>شدت سایه کف ۳ بعدی:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {Math.round(config.productShadowIntensity * 100)}٪
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.productShadowIntensity}
                  onChange={(e) =>
                    onChangeConfig({
                      ...config,
                      productShadowIntensity: Number(e.target.value)
                    })
                  }
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">انعکاس شیشه‌ای کف (Floor Reflection)</span>
                  <input
                    type="checkbox"
                    checked={config.productReflection}
                    onChange={(e) =>
                      onChangeConfig({ ...config, productReflection: e.target.checked })
                    }
                    className="accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">هاله درخشان پشت محصول (Glow Aura)</span>
                  <input
                    type="checkbox"
                    checked={config.productGlow}
                    onChange={(e) =>
                      onChangeConfig({ ...config, productGlow: e.target.checked })
                    }
                    className="accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">ذرات معلق کلاته و کود (Particles)</span>
                  <input
                    type="checkbox"
                    checked={config.particles}
                    onChange={(e) =>
                      onChangeConfig({ ...config, particles: e.target.checked })
                    }
                    className="accent-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-slate-300">نور تابشی خورشید (Sun Flare)</span>
                  <input
                    type="checkbox"
                    checked={config.sunFlare}
                    onChange={(e) =>
                      onChangeConfig({ ...config, sunFlare: e.target.checked })
                    }
                    className="accent-emerald-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
