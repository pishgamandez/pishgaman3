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
  Layers,
  Type,
  Sun,
  Eye,
  CheckCircle,
  Copy,
  Share2,
  Maximize2,
  Minimize2,
  Wand2,
  Shield,
  Zap,
  Image as ImageIcon
} from 'lucide-react';
import { PosterConfig, AspectRatio } from '../types';
import { PosterCanvas } from './PosterCanvas';
import { POSTER_TEMPLATES, DEFAULT_PRODUCT_IMG, GREEN_PRODUCT_IMG, WHITE_PRODUCT_IMG } from '../data/defaultPosters';

interface PosterStudioProps {
  initialConfig?: PosterConfig;
  onApplyTemplate?: (template: PosterConfig) => void;
}

export const PosterStudio: React.FC<PosterStudioProps> = ({
  initialConfig = POSTER_TEMPLATES[0]
}) => {
  const [config, setConfig] = useState<PosterConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<'product' | 'text' | 'atmosphere' | 'layout'>('product');
  const [exportFn, setExportFn] = useState<(() => void) | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Quick template selection handler
  const handleSelectTemplate = (templateId: string) => {
    const selected = POSTER_TEMPLATES.find(t => t.id === templateId);
    if (selected) {
      setConfig({ ...selected });
    }
  };

  // Upload custom product image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setConfig(prev => ({
            ...prev,
            productImgUrl: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset to original TIGER bucket
  const handleResetProduct = () => {
    setConfig(prev => ({
      ...prev,
      productImgUrl: DEFAULT_PRODUCT_IMG,
      productScale: 0.85,
      productPosX: 50,
      productPosY: 68,
      removeBg: true,
      bgRemoveSensitivity: 38
    }));
  };

  // Generate Instagram & Telegram Promotional Copy
  const generateSocialCopy = () => {
    return `🔥 ${config.headline} | ${config.headlineHighlight}

🌱 کود فسفر بالای ${config.companyName} مدل ${config.subheadline}
حاوی بالاترین درصد فسفر قابل جذب و کلاته، بدون رسوب در خاک‌های آهکی و شور ایران!

✨ مهم‌ترین ویژگی‌های تایگر های‌پی (TIGER High P):
${config.features.map(f => `✔️ ${f}`).join('\n')}

📦 ${config.volumeTag}
🚚 ${config.callToAction}
📞 ${config.contactInfo}

#کشاورزی_مدرن #فسفات_کشاورزی #کود_فسفر #پیشگامان #تایگر_های_پی #ریشه_زایی #پسته_کاران #باغداری #گندمکاران #زعفران #کود_مایع #تغذیه_گیاهی`;
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(generateSocialCopy());
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Presets Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>استودیوی طراحی پوستر تبلیغاتی پیشگامان</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                سبک شرکت‌های برتر جهان
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              تولید اتوماتیک پوستر بدون کوچک‌ترین تغییر در ظاهر و مشخصات فیزیکی سطل تایگر
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleCopyCaption}
            className="flex-1 md:flex-initial px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Copy className="w-4 h-4 text-amber-400" />
            <span>{copiedCaption ? 'کپشن کپی شد!' : 'کپی متن تبلیغاتی'}</span>
          </button>
          
          <button
            onClick={() => exportFn && exportFn()}
            className="flex-1 md:flex-initial px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>دانلود پوستر کیفیت بالا (PNG)</span>
          </button>
        </div>
      </div>

      {/* Preset Carousel Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 shrink-0 ml-1">قالب‌های برندینگ:</span>
        {POSTER_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => handleSelectTemplate(tmpl.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              config.id === tmpl.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tmpl.accentColor }} />
            <span>{tmpl.name}</span>
          </button>
        ))}
      </div>

      {/* Recommended Green Screen Color Code Banner */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00FF41] shadow-md shadow-[#00FF41]/30 border border-white/20 shrink-0" />
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>کد رنگ پیشنهادی برای پس‌زمینه عکاسی محصولات (Green Screen):</span>
              <span className="font-mono text-emerald-300 font-extrabold bg-slate-900 px-2 py-0.5 rounded border border-emerald-500/40 select-all">#00FF41</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              اگر محصولتان را روی پرده یا کاغذی با این رنگ عکاسی کنید، سیستم به شکل خودکار و با دقت ۱۰۰٪ آن را بدون هیچ هاله یا محوشدگی جدا می‌کند.
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText('#00FF41');
            alert?.('#00FF41 کپی شد');
          }}
          className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>کپی کد رنگ #00FF41</span>
        </button>
      </div>

      {/* Main Studio Grid: Left Canvas, Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: High-Res Interactive Canvas Display */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-[#070b13] p-4 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">نمای زنده پوستر</span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                  {config.aspectRatio}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>شکل و مشخصات کالا دست‌نخورده</span>
              </div>
            </div>

            {/* Poster Canvas Component */}
            <PosterCanvas
              config={config}
              onExportReady={setExportFn}
              className="w-full"
            />
          </div>

          {/* Aspect Ratio Switcher under Canvas */}
          <div className="mt-4 flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 w-full max-w-md">
            {(['1:1', '4:5', '9:16', '16:9'] as AspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setConfig(prev => ({ ...prev, aspectRatio: ratio }))}
                className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  config.aspectRatio === ratio
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {ratio === '1:1' && 'مربع اینستاگرام (1:1)'}
                {ratio === '4:5' && 'پوستر عمودی (4:5)'}
                {ratio === '9:16' && 'استوری / ریلز (9:16)'}
                {ratio === '16:9' && 'افقی وب (16:9)'}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Studio Customization Tabs & Controls */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl border border-slate-800 p-5 shadow-xl space-y-5">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800/80">
            <button
              onClick={() => setActiveTab('product')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'product'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>تنظیم محصول</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'text'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>متن و شعار</span>
            </button>
            <button
              onClick={() => setActiveTab('atmosphere')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'atmosphere'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>نور و اتمسفر</span>
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'layout'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>ویژگی‌ها</span>
            </button>
          </div>

          {/* TAB 1: PRODUCT SETTINGS */}
          {activeTab === 'product' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">انتخاب و آپلود تصویر محصول</span>
                  <button
                    onClick={handleResetProduct}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>بازنشانی به سطل تایگر</span>
                  </button>
                </div>

                {/* Quick Selection between uploaded Green Screen and White bucket */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConfig(prev => ({
                      ...prev,
                      productImgUrl: GREEN_PRODUCT_IMG,
                      bgRemoveMode: 'green',
                      removeBg: true
                    }))}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      config.productImgUrl === GREEN_PRODUCT_IMG
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
                    <span>سطل با پرده سبز (#00FF41)</span>
                  </button>

                  <button
                    onClick={() => setConfig(prev => ({
                      ...prev,
                      productImgUrl: WHITE_PRODUCT_IMG,
                      bgRemoveMode: 'white',
                      removeBg: true
                    }))}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      config.productImgUrl === WHITE_PRODUCT_IMG
                        ? 'bg-slate-800 border-slate-500 text-slate-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-white border border-slate-400" />
                    <span>سطل با زمینه سفید</span>
                  </button>
                </div>

                <label className="w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500 bg-slate-900 text-center cursor-pointer transition-colors block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>آپلود عکس جدید کالا از گالری</span>
                  </div>
                </label>
              </div>

              {/* Advanced Chroma Key & Background Remover Controls */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>جداسازی خودکار پس‌زمینه (Chroma Key)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      حذف پرده سبز #00FF41 یا زمینه سفید بدون دست خوردن سطل
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.removeBg}
                    onChange={(e) => setConfig(prev => ({ ...prev, removeBg: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.removeBg && (
                  <div className="space-y-3 pt-2 border-t border-slate-800/80">
                    {/* Mode Selector */}
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1.5">حالت حذف پس‌زمینه:</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, bgRemoveMode: 'green' }))}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1 ${
                            (config.bgRemoveMode === 'green' || !config.bgRemoveMode)
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#00FF41]" />
                          <span>پرده سبز (#00FF41)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, bgRemoveMode: 'white' }))}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1 ${
                            config.bgRemoveMode === 'white'
                              ? 'bg-slate-700 border-slate-500 text-white shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-white" />
                          <span>زمینه سفید</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, bgRemoveMode: 'auto' }))}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all flex items-center justify-center gap-1 ${
                            config.bgRemoveMode === 'auto'
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Wand2 className="w-2.5 h-2.5" />
                          <span>تشخیص خودکار</span>
                        </button>
                      </div>
                    </div>

                    {/* Despill Green Reflection Switch */}
                    <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                      <div>
                        <div className="text-[11px] font-bold text-slate-200">حذف بازتاب رنگ سبز (Despill)</div>
                        <div className="text-[9px] text-slate-400">پاک کردن انعکاس سبز پرده از روی لبه‌های سفید سطل</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.despillGreen !== false}
                        onChange={(e) => setConfig(prev => ({ ...prev, despillGreen: e.target.checked }))}
                        className="w-3.5 h-3.5 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                      />
                    </div>

                    {/* Sensitivity Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>دقت و حساسیت جداسازی:</span>
                        <span className="font-mono text-emerald-400">{config.bgRemoveSensitivity}%</span>
                      </div>
                      <input
                        type="range"
                        min="15"
                        max="75"
                        value={config.bgRemoveSensitivity}
                        onChange={(e) => setConfig(prev => ({ ...prev, bgRemoveSensitivity: Number(e.target.value) }))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Scale & Position Sliders */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white mb-2">اندازه و موقعیت دقیق سطل در پوستر</div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>اندازه (مقیاس):</span>
                    <span className="font-mono text-emerald-400">{Math.round(config.productScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.25"
                    step="0.02"
                    value={config.productScale}
                    onChange={(e) => setConfig(prev => ({ ...prev, productScale: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>موقعیت عمودی (Y):</span>
                    <span className="font-mono text-emerald-400">{config.productPosY}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="85"
                    value={config.productPosY}
                    onChange={(e) => setConfig(prev => ({ ...prev, productPosY: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>موقعیت افقی (X):</span>
                    <span className="font-mono text-emerald-400">{config.productPosX}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={config.productPosX}
                    onChange={(e) => setConfig(prev => ({ ...prev, productPosX: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 3D Floor Shadow & Reflection */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white">سایه‌پردازی سه‌بعدی و انعکاس استودیویی</div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>عمق سایه کف:</span>
                    <span className="font-mono text-emerald-400">{Math.round(config.productShadowIntensity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={config.productShadowIntensity}
                    onChange={(e) => setConfig(prev => ({ ...prev, productShadowIntensity: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">انعکاس شیشه‌ای کف (Floor Reflection)</span>
                  <input
                    type="checkbox"
                    checked={config.productReflection}
                    onChange={(e) => setConfig(prev => ({ ...prev, productReflection: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">هاله نوری پشت محصول (Energy Glow)</span>
                  <input
                    type="checkbox"
                    checked={config.productGlow}
                    onChange={(e) => setConfig(prev => ({ ...prev, productGlow: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEXT & COPYWRITING */}
          {activeTab === 'text' && (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">تیتر اصلی پوستر</label>
                <input
                  type="text"
                  value={config.headline}
                  onChange={(e) => setConfig(prev => ({ ...prev, headline: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">تیتر برجسته و رنگی (نورانی)</label>
                <input
                  type="text"
                  value={config.headlineHighlight}
                  onChange={(e) => setConfig(prev => ({ ...prev, headlineHighlight: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 text-amber-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">زیرعنوان و نام مدل محصول</label>
                <input
                  type="text"
                  value={config.subheadline}
                  onChange={(e) => setConfig(prev => ({ ...prev, subheadline: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">تگ حجم و بسته‌بندی</label>
                <input
                  type="text"
                  value={config.volumeTag}
                  onChange={(e) => setConfig(prev => ({ ...prev, volumeTag: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">متن نوار پایین پوستر (فراخوان اقدام)</label>
                <input
                  type="text"
                  value={config.callToAction}
                  onChange={(e) => setConfig(prev => ({ ...prev, callToAction: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">اطلاعات تماس و نمایندگی</label>
                <input
                  type="text"
                  value={config.contactInfo}
                  onChange={(e) => setConfig(prev => ({ ...prev, contactInfo: e.target.value }))}
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ATMOSPHERE & LIGHTING */}
          {activeTab === 'atmosphere' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-white mb-2">انتخاب پس‌زمینه سینمایی</div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    bgType: 'image',
                    bgImageUrl: '/assets/templates/roots_soil_vitality_1793964642631.jpg',
                    theme: 'corteva',
                    accentColor: '#34d399'
                  }))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-right transition-colors"
                >
                  <div className="text-xs font-bold text-white">ریشه‌زایی ماکرو</div>
                  <div className="text-[10px] text-slate-400">خاک و ریشه‌های عمیق</div>
                </button>

                <button
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    bgType: 'image',
                    bgImageUrl: '/assets/templates/wheat_golden_sunset_1793964628810.jpg',
                    theme: 'syngenta',
                    accentColor: '#fbbf24'
                  }))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-right transition-colors"
                >
                  <div className="text-xs font-bold text-white">غروب طلایی مزارع</div>
                  <div className="text-[10px] text-slate-400">گندم و برداشت سنگین</div>
                </button>

                <button
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    bgType: 'image',
                    bgImageUrl: '/assets/templates/high_tech_orchard_1793964656967.jpg',
                    theme: 'yara',
                    accentColor: '#10b981'
                  }))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-right transition-colors"
                >
                  <div className="text-xs font-bold text-white">باغات مدرن میوه</div>
                  <div className="text-[10px] text-slate-400">آبیاری قطره‌ای و شبنم</div>
                </button>

                <button
                  onClick={() => setConfig(prev => ({
                    ...prev,
                    bgType: 'gradient',
                    bgImageUrl: '',
                    theme: 'haifa-dark',
                    accentColor: '#6ee7b7'
                  }))}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500 text-right transition-colors"
                >
                  <div className="text-xs font-bold text-white">استودیوی لوکس دارک</div>
                  <div className="text-[10px] text-slate-400">سبک پریمیوم Haifa</div>
                </button>
              </div>

              {/* Atmosphere sliders */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>تیرگی پس‌زمینه (خوانایی متن):</span>
                    <span className="font-mono text-emerald-400">{Math.round(config.overlayOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={config.overlayOpacity}
                    onChange={(e) => setConfig(prev => ({ ...prev, overlayOpacity: Number(e.target.value) }))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">پرتوهای خورشید (Sun Flare)</span>
                  <input
                    type="checkbox"
                    checked={config.sunFlare}
                    onChange={(e) => setConfig(prev => ({ ...prev, sunFlare: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">ذرات معلق درخشان (Nutrient Sparks)</span>
                  <input
                    type="checkbox"
                    checked={config.particles}
                    onChange={(e) => setConfig(prev => ({ ...prev, particles: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-300">سایه لبه‌های تصویر (Vignette)</span>
                  <input
                    type="checkbox"
                    checked={config.vignette}
                    onChange={(e) => setConfig(prev => ({ ...prev, vignette: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BULLETS & BADGES */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-white mb-2">ویژگی‌های کلیدی درج شده در پوستر</div>
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-[11px] font-bold">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const updated = [...config.features];
                      updated[idx] = e.target.value;
                      setConfig(prev => ({ ...prev, features: updated }));
                    }}
                    className="flex-1 bg-slate-950 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}

              <div className="pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-white mb-2">بج‌ها و نشان‌های کیفیت (بالای چپ)</div>
                {config.badges.map((badge, idx) => (
                  <div key={badge.id} className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-slate-400 w-12">بج {idx + 1}:</span>
                    <input
                      type="text"
                      value={badge.text}
                      onChange={(e) => {
                        const updated = [...config.badges];
                        updated[idx].text = e.target.value;
                        setConfig(prev => ({ ...prev, badges: updated }));
                      }}
                      className="flex-1 bg-slate-950 text-white text-xs px-3 py-1.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
