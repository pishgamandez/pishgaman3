/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Copy,
  Check,
  Send,
  Sparkles,
  FileText,
  Share2,
  Instagram,
  PhoneCall
} from 'lucide-react';
import { PISHGAMAN_PRODUCT_SPECS } from '../data/researchData';

export const CopywriterTool: React.FC = () => {
  const [tone, setTone] = useState<'scientific' | 'marketing' | 'sms' | 'story'>('marketing');
  const [targetCrop, setTargetCrop] = useState<string>('پسته و باغات');
  const [copied, setCopied] = useState(false);

  const getGeneratedCopy = () => {
    if (tone === 'marketing') {
      return `🌾 ریشه‌زایی فولادی و افزایش چشمگیر تناژ با تایگر های‌پی (TIGER High P) پیشگامان!

آیا از رسوب فسفات در خاک‌های آهکی و شور خسته شده‌اید؟
بیش از ۸۰٪ کودهای فسفاته معمولی به محض ورود به خاک قفل می‌شوند، اما فرمولاسیون انقلابی شرکت «پرواز نهاده پیشگامان» جذب ۱۰۰٪ برگی و ریشه‌ای را ممکن ساخته است!

🌟 چرا کشاورزان پیشرو تایگر های‌پی را انتخاب می‌کنند؟
✅ تحریک انفجاری ریشه‌های موئین در کمتر از ۷۲ ساعت
✅ بدون رسوب در لوله‌های آبیاری و نوار تیپ
✅ کاملاً فاقد کلر، سدیم و فلزات سنگین
✅ افزایش باروری خوشه‌ها، کاهش شدید پوکی و درشت شدن محصول
✅ ایده‌آل برای ${targetCrop}

📦 بسته‌بندی مقاوم ۶ لیتری با غلظت سنگین صنعتی
🚚 ارسال فوری به سراسر کشور با ضمانت اصالت
📞 جهت مشاوره رایگان با کارشناسان پیشگامان و استعلام قیمت دایرکت پیام دهید یا تماس بگیرید.

#کشاورزی_مدرن #تایگر_پیشگامان #کود_فسفات #ریشه_زایی #پسته #گندم #زعفران #صیفی_جات #کود_مایع #باغداری #نهاده_های_کشاورزی`;
    }

    if (tone === 'scientific') {
      return `🔬 گزارش فنی اگروشیمی: مکانیزم رهایش پیوسته و جلوگیری از تثبیت فسفر

محصول: TIGER High P (سوسپانسیون غلیظ فسفاته)
تولیدکننده: شرکت پرواز نهاده پیشگامان

در خاک‌های قلیایی و آهکی حوزه کشاورزی کشور (pH > 7.8)، پدیده Phosphate Fixation بزرگ‌ترین مانع بیولوژیک در راندمان کوددهی است.
تایگر های‌پی پیشگامان با فناوری کلاتاسیون ارگانیک و خاصیت بافری اسیدی، از پیوند یون‌های ارتوکسید فسفات با کربنات کلسیم ممانعت به عمل می‌آورد.

نتایج فارم تست:
- افزایش ۳۸٪ چگالی تارهای کشنده در فاز رویشی
- ارتقای شاخص انتقال انرژی سلولی (ATP synthesis)
- سازگاری کامل با آب‌های با EC و بی‌کربنات بالا
- صفر درصد خطر سوختگی روزنه‌ها در محلول‌پاشی برگی (Foliar Application)

دوز توصیه شده برای ${targetCrop}: ۲ تا ۳ لیتر در هزار لیتر آب / ۴ تا ۶ لیتر در هکتار کودآبیاری.`;
    }

    if (tone === 'sms') {
      return `پادشاه ریشه‌زایی در باغات و مزارع!
کود فسفر بالای TIGER High P پیشگامان؛
جذب ۱۰۰٪ بدون رسوب در خاک‌های آهکی و بدون کلر.
افزایش باردهی و تناژ تضمینی ${targetCrop}.
سطل ۶ لیتری اصلی.
مشاوره و خرید: شرکت پرواز نهاده پیشگامان`;
    }

    // story
    return `⚡️ استوری اینستاگرام:
اسلاید ۱: «چرا پسته و گندم امسال به پتاس و فسفر سنتی جواب نمیده؟»
اسلاید ۲: خاک آهکی فسفر رو قفل کرده! راهکار چیه؟ 👇
اسلاید ۳: تصویر سطل TIGER High P پیشگامان + تگ «انفجار ریشه‌زایی در اعماق خاک»
اسلاید ۴: لینک استعلام قیمت و دایرکت فروشگاه شرکت پیشگامان!`;
  };

  const currentText = getGeneratedCopy();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              دستیار هوشمند نگارش کپشن و تبلیغات کشاورزی
            </h3>
            <p className="text-xs text-slate-400">
              تولید اتوماتیک متن پست اینستاگرام، کانال‌های کشاورزی، پیامک فروشگاهی و کاتالوگ
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'متن کپی شد!' : 'کپی کل متن در حافظه'}</span>
        </button>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">لحن و فرمت متن:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTone('marketing')}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                tone === 'marketing'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              کپشن تبلیغاتی اینستاگرام
            </button>
            <button
              onClick={() => setTone('scientific')}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                tone === 'scientific'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              متن علمی و کاتالوگ فنی
            </button>
            <button
              onClick={() => setTone('sms')}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                tone === 'sms'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              پیامک کوتاه تبلیغاتی (SMS)
            </button>
            <button
              onClick={() => setTone('story')}
              className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                tone === 'story'
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              سناریوی استوری تعاملی
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">محصول هدف در متن:</label>
          <select
            value={targetCrop}
            onChange={(e) => setTargetCrop(e.target.value)}
            className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="پسته و باغات خشکبار">باغات پسته و خشکبار</option>
            <option value="گندم و جو آبی و دیم">مزارع گندم و جو</option>
            <option value="زعفران و پیازهای زراعی">زعفران و گیاهان دارویی</option>
            <option value="صیفی‌جات و محصولات گلخانه‌ای">صیفی‌جات و گلخانه</option>
            <option value="سیب‌زمینی و پیاز">سیب‌زمینی و پیاز غده‌ای</option>
            <option value="مرکبات و باغات انار">مرکبات، انار و باغات میوه</option>
          </select>
        </div>
      </div>

      {/* Copy Output Area */}
      <div className="relative">
        <textarea
          readOnly
          value={currentText}
          rows={12}
          className="w-full bg-slate-950 text-slate-200 text-xs sm:text-sm p-4 rounded-2xl border border-slate-800 focus:outline-none leading-relaxed font-mono select-all"
        />
      </div>
    </div>
  );
};
