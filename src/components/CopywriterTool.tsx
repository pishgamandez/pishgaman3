/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Copy,
  Check,
  Sparkles,
  Share2,
  Video,
  TrendingUp,
  AlertTriangle,
  FlaskConical,
  DollarSign,
  Tag
} from 'lucide-react';
import { PishgamanProduct } from '../types';
import { generateCopyAnglesForProduct } from '../services/aiGenerator';

interface CopywriterToolProps {
  product: PishgamanProduct;
}

export const CopywriterTool: React.FC<CopywriterToolProps> = ({ product }) => {
  const [seed, setSeed] = useState(0);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const angles = generateCopyAnglesForProduct(product, seed);
  const currentAngle = angles[activeAngleIndex] || angles[0];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAngleIcon = (index: number) => {
    switch (index) {
      case 0:
        return TrendingUp;
      case 1:
        return AlertTriangle;
      case 2:
        return FlaskConical;
      case 3:
        return DollarSign;
      case 4:
        return Video;
      default:
        return MessageSquare;
    }
  };

  const fullCopyText = `${currentAngle.hook}\n\n${currentAngle.body}\n\n📢 ${currentAngle.callToAction}\n\n${currentAngle.hashtags.join(' ')}`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white">
              سیستم تولید خودکار کپشن و محتوای شبکه‌های اجتماعی
            </h2>
            <p className="text-xs text-slate-400">
              ۵ زاویه بازاریابی هوشمند برای محصول:{' '}
              <span className="font-bold text-emerald-400">
                {product.nameFa} ({product.nameEn})
              </span>
            </p>
          </div>
        </div>

        {/* Re-roll inspiration button */}
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>تولید زوایای نو و لحن‌های تازه</span>
        </button>
      </div>

      {/* Angle Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {angles.map((angle, idx) => {
          const Icon = getAngleIcon(idx);
          const isSelected = activeAngleIndex === idx;
          return (
            <button
              key={angle.id}
              onClick={() => setActiveAngleIndex(idx)}
              className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}
                />
                <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
              </div>
              <span
                className={`text-xs font-bold leading-snug ${
                  isSelected ? 'text-white' : 'text-slate-300'
                }`}
              >
                {angle.angleName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Copy Viewer & Details */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Angle Meta info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white">{currentAngle.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentAngle.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-950 text-indigo-300 border border-indigo-500/30">
              فرمت پیشنهادی: {currentAngle.recommendedFormat}
            </span>
            <button
              onClick={() => handleCopyText(fullCopyText, currentAngle.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                copiedId === currentAngle.id
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30'
              }`}
            >
              {copiedId === currentAngle.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>کپی کل متن و هشتگ‌ها</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1. The Hook */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
              قلاب جذب مخاطب (Hook / خط اول):
            </span>
            <button
              onClick={() => handleCopyText(currentAngle.hook, `${currentAngle.id}_hook`)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>کپی قلاب</span>
            </button>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 text-amber-200 font-bold text-sm leading-relaxed">
            {currentAngle.hook}
          </div>
        </div>

        {/* 2. The Body */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">
              بدنه و پیام اصلی (Body Content):
            </span>
            <button
              onClick={() => handleCopyText(currentAngle.body, `${currentAngle.id}_body`)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>کپی بدنه</span>
            </button>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {currentAngle.body}
          </div>
        </div>

        {/* 3. Call to Action */}
        <div className="space-y-1.5">
          <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
            دعوت به اقدام (Call To Action):
          </span>
          <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            {currentAngle.callToAction}
          </div>
        </div>

        {/* 4. Hashtags */}
        <div className="space-y-2">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
            هشتگ‌های تخصصی و پربازدید:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentAngle.hashtags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
