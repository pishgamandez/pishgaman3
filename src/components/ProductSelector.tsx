/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Upload,
  Plus,
  CheckCircle,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  FileImage,
  Tag
} from 'lucide-react';
import { PishgamanProduct } from '../types';
import { PRODUCT_CATEGORIES, createCustomProduct } from '../data/pishgamanCatalog';

interface ProductSelectorProps {
  products: PishgamanProduct[];
  selectedProduct: PishgamanProduct;
  onSelectProduct: (product: PishgamanProduct) => void;
  onAddCustomProduct: (product: PishgamanProduct) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProduct,
  onSelectProduct,
  onAddCustomProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload modal state
  const [customNameFa, setCustomNameFa] = useState('');
  const [customNameEn, setCustomNameEn] = useState('');
  const [customCategoryTitle, setCustomCategoryTitle] = useState('تغذیه و محرک اختصاصی');
  const [customTagline, setCustomTagline] = useState('');
  const [customImagePreview, setCustomImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'custom') return p.isCustom;
    return p.category === selectedCategory;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCustom = () => {
    if (!customNameFa.trim() || !customImagePreview) {
      alert('لطفاً نام محصول و عکس را مشخص کنید.');
      return;
    }

    const newProd = createCustomProduct({
      nameFa: customNameFa.trim(),
      nameEn: customNameEn.trim() || undefined,
      imageUrl: customImagePreview,
      categoryTitle: customCategoryTitle,
      tagline: customTagline.trim() || undefined
    });

    onAddCustomProduct(newProd);
    onSelectProduct(newProd);
    setIsUploadModalOpen(false);

    // Reset modal
    setCustomNameFa('');
    setCustomNameEn('');
    setCustomTagline('');
    setCustomImagePreview('');
  };

  return (
    <div className="bg-[#0b1324] border-b border-slate-800/80 pb-4 pt-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Category Filters Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PRODUCT_CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all'
                  ? products.length
                  : cat.id === 'custom'
                  ? products.filter((p) => p.isCustom).length
                  : products.filter((p) => p.category === cat.id).length;

              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 bg-slate-900/40 border border-slate-800/60'
                  }`}
                >
                  <span>{cat.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Upload Custom Product Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>آپلود محصول دلخواه (عکس + نام)</span>
          </button>
        </div>

        {/* Horizontal Products Carousel */}
        <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
            {/* First Card: Quick Add Custom */}
            <div
              onClick={() => setIsUploadModalOpen(true)}
              className="w-36 h-48 rounded-2xl border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/15 hover:bg-emerald-950/30 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all shrink-0 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-300">آپلود عکس جدید</span>
              <span className="text-[10px] text-slate-400 mt-1 leading-tight">
                پرده سبز یا پس‌زمینه سفید
              </span>
            </div>

            {/* List of Products */}
            {filteredProducts.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className={`w-36 h-48 rounded-2xl p-2.5 flex flex-col justify-between cursor-pointer transition-all shrink-0 relative group select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-900/60 to-slate-900 border-2 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/70'
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Product thumbnail container */}
                  <div className="w-full h-24 rounded-xl bg-slate-950/60 flex items-center justify-center overflow-hidden p-1 relative">
                    <img
                      src={p.imageUrl}
                      alt={p.nameFa}
                      className="max-h-full max-w-full object-contain filter drop-shadow transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product details */}
                  <div className="text-center mt-1">
                    <div className="text-xs font-black text-white truncate">{p.nameFa}</div>
                    <div className="text-[10px] font-mono text-emerald-400/90 truncate uppercase tracking-tight">
                      {p.nameEn}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate mt-0.5">
                      {p.categoryTitle}
                    </div>
                  </div>

                  {/* Packaging tag */}
                  <div className="text-[9px] font-medium text-center text-slate-400 bg-slate-950/40 rounded-lg py-0.5 truncate">
                    {p.packaging || 'بسته‌بندی رسمی'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upload Custom Product Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">آپلود محصول جدید</h3>
                  <p className="text-xs text-slate-400">
                    عکس محصول (پرده سبز یا سفید) را بارگذاری کرده و نام آن را وارد کنید
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image Dropzone / Upload Area */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                عکس محصول (پیشنهادی: پرده سبز کد #00FF41 یا پس‌زمینه سفید)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-4 bg-slate-950/60 flex flex-col items-center justify-center cursor-pointer min-h-[140px] transition-all group"
              >
                {customImagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={customImagePreview}
                      alt="Preview"
                      className="max-h-28 object-contain rounded-lg shadow-md"
                    />
                    <span className="text-xs text-emerald-400 font-semibold">
                      کلیک برای تغییر عکس
                    </span>
                  </div>
                ) : (
                  <>
                    <FileImage className="w-10 h-10 text-slate-500 group-hover:text-emerald-400 transition-colors mb-2" />
                    <span className="text-xs font-bold text-slate-300">
                      برای انتخاب عکس کلیک کنید یا عکس را اینجا رها کنید
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      فرمت‌های PNG، JPG، WEBP با هر اندازه‌ای
                    </span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  نام فارسی محصول *
                </label>
                <input
                  type="text"
                  value={customNameFa}
                  onChange={(e) => setCustomNameFa(e.target.value)}
                  placeholder="مثلاً: گوگرد فسفاته زاگرس"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  نام انگلیسی (اختیاری)
                </label>
                <input
                  type="text"
                  value={customNameEn}
                  onChange={(e) => setCustomNameEn(e.target.value)}
                  placeholder="e.g. PHOSPHO SULFUR MAX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Category and Tagline */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">دسته‌بندی</label>
                <input
                  type="text"
                  value={customCategoryTitle}
                  onChange={(e) => setCustomCategoryTitle(e.target.value)}
                  placeholder="مثلاً: کودهای بیولوژیک و آلی"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  شعار تبلیغاتی یا ویژگی کلیدی (اختیاری)
                </label>
                <input
                  type="text"
                  value={customTagline}
                  onChange={(e) => setCustomTagline(e.target.value)}
                  placeholder="مثلاً: فرمولاسیون ویژه برای حداکثر جذب در خاک‌های شور"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                انصراف
              </button>
              <button
                onClick={handleCreateCustom}
                disabled={!customNameFa.trim() || !customImagePreview}
                className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all ${
                  customNameFa.trim() && customImagePreview
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>ساخت خودکار پوستر، مقاله و کپشن</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
