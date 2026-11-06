/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Image as ImageIcon,
  ExternalLink,
  Plus,
  RefreshCw,
  Droplet
} from 'lucide-react';
import { PishgamanProduct, PosterConfig } from './types';
import { PISHGAMAN_CATALOG } from './data/pishgamanCatalog';
import { generatePosterConfigForProduct } from './services/aiGenerator';
import { ProductSelector } from './components/ProductSelector';
import { PosterStudio } from './components/PosterStudio';
import { CopywriterTool } from './components/CopywriterTool';
import { ResearchDossier } from './components/ResearchDossier';
import { DosageGuide } from './components/DosageGuide';

export default function App() {
  const [productsList, setProductsList] = useState<PishgamanProduct[]>(PISHGAMAN_CATALOG);
  
  // Default to Tiger High P or first product
  const defaultInitialProd =
    productsList.find((p) => p.slug === 'tiger-p') || productsList[0];
  const [selectedProduct, setSelectedProduct] = useState<PishgamanProduct>(defaultInitialProd);

  const [activeTab, setActiveTab] = useState<'poster' | 'copywriter' | 'research' | 'dosage'>('poster');
  const [seed, setSeed] = useState<number>(0);
  const [posterConfig, setPosterConfig] = useState<PosterConfig>(() =>
    generatePosterConfigForProduct(defaultInitialProd, { seed: 0 })
  );

  // When selected product changes or seed changes, update the poster config
  const handleSelectProduct = (product: PishgamanProduct) => {
    setSelectedProduct(product);
    setPosterConfig(generatePosterConfigForProduct(product, { seed: 0 }));
  };

  const handleAddCustomProduct = (newProduct: PishgamanProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
    setSelectedProduct(newProduct);
    setPosterConfig(generatePosterConfigForProduct(newProduct, { seed: 0 }));
  };

  const handleReroll = () => {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    setPosterConfig(
      generatePosterConfigForProduct(selectedProduct, {
        seed: nextSeed,
        aspectRatio: posterConfig.aspectRatio,
        theme: posterConfig.theme
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navbar with Pishgaman Official Branding */}
      <header className="border-b border-slate-800/80 bg-[#090e1a]/95 backdrop-blur-md sticky top-0 z-40 shadow-xl">
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
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {selectedProduct.nameFa} ({selectedProduct.nameEn})
                </span>
              </div>
              <p className="text-xs text-slate-400">
                پلتفرم هوشمند اتوماتیک تبلیغات بین‌المللی، تولید پوستر، کپشن، مقالات علمی و رفرنس برای تمام محصولات
              </p>
            </div>
          </div>

          {/* Quick Links & Live Site */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="https://pishgamandez.github.io/pishgaman/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>وبسایت اصلی پیشگامان</span>
            </a>

            <button
              onClick={handleReroll}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>تولید ایده جدید</span>
            </button>
          </div>
        </div>
      </header>

      {/* Product Selector Carousel (16 Official Products + Custom Upload) */}
      <ProductSelector
        products={productsList}
        selectedProduct={selectedProduct}
        onSelectProduct={handleSelectProduct}
        onAddCustomProduct={handleAddCustomProduct}
      />

      {/* Main Studio Navigation Tabs */}
      <div className="border-b border-slate-800/80 bg-[#090e1a]/80 sticky top-18 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            <button
              onClick={() => setActiveTab('poster')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'poster'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>پوستر تبلیغاتی بین‌المللی</span>
            </button>

            <button
              onClick={() => setActiveTab('copywriter')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'copywriter'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>کپشن و سناریوی شبکه‌های اجتماعی (۵ زاویه)</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'research'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>مقاله پژوهشی و رفرنس علمی دانشگاهی</span>
            </button>

            <button
              onClick={() => setActiveTab('dosage')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === 'dosage'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Droplet className="w-4 h-4" />
              <span>کاتالوگ فنی و راهنمای مصرف</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'poster' && (
          <PosterStudio
            product={selectedProduct}
            config={posterConfig}
            onChangeConfig={setPosterConfig}
            onReroll={handleReroll}
          />
        )}

        {activeTab === 'copywriter' && <CopywriterTool product={selectedProduct} />}

        {activeTab === 'research' && <ResearchDossier product={selectedProduct} />}

        {activeTab === 'dosage' && <DosageGuide product={selectedProduct} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b14] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-slate-300">
              شرکت پیشگامان پایدار فلات نیک / برند پرواز نهاده
            </span>
            <span>—</span>
            <span>استودیوی یکپارچه هوشمند تبلیغات و پژوهش‌های کشاورزی</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://pishgamandez.github.io/pishgaman/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              کاتالوگ رسمی شرکت
            </a>
            <a
              href="https://pishgamandez.github.io/pishgaman3/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              نسخه آنلاین گیت‌هاب پیجز
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
