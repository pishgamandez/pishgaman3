/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PosterConfig } from '../types';

export const DEFAULT_PRODUCT_IMG = '/assets/aistudio/pishgaman_tiger_greenscreen.png';
export const WHITE_PRODUCT_IMG = '/assets/aistudio/IMG_20261104_175024_313_84b08693.jpg';
export const GREEN_PRODUCT_IMG = '/assets/aistudio/pishgaman_tiger_greenscreen.png';

export const POSTER_TEMPLATES: PosterConfig[] = [
  {
    id: 'roots-explosion-corteva',
    name: 'سبک کورتوا: انفجار ریشه‌زایی در خاک',
    aspectRatio: '4:5',
    bgType: 'image',
    bgImageUrl: '/assets/templates/roots_soil_vitality_1793964642631.jpg',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    overlayOpacity: 0.35,
    overlayColor: '#000000',
    vignette: true,
    sunFlare: true,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.88,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.85,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#10b981',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'PISHGAMAN AGROSCIENCE & ADVANCED PLANT NUTRITION',
    
    headline: 'ریشه‌زایی فولادی در اعماق خاک',
    headlineHighlight: 'انفجار تارهای کشنده با فسفر فعال',
    subheadline: 'کود مایع سوسپانسیون غلیظ تایگر های‌پی (TIGER High P)',
    description: 'تحریک تقسیم سلولی در ریشه، جذب مواد غذایی حتی در خاک‌های شدیداً آهکی و قلیایی، و مقاومت بی‌نظیر در برابر تنش‌ها.',
    
    features: [
      'جذب ۱۰۰٪ برگی و ریشه‌ای بدون رسوب',
      'توسعه سریع شبکه موئین ریشه در ۷۲ ساعت',
      'فرمولاسیون محافظت‌شده در برابر کلسیم خاک',
      'کاملاً فاقد کلر، سدیم و فلزات سنگین'
    ],
    badges: [
      { id: 'b1', text: 'فسفر بالا (High P)', icon: 'Zap', color: 'emerald' },
      { id: 'b2', text: 'فرمولاسیون اختصاصی', icon: 'ShieldCheck', color: 'amber' },
      { id: 'b3', text: 'بسته‌بندی ۶ لیتری', icon: 'PackageCheck', color: 'blue' }
    ],
    
    callToAction: 'تحولی شگرف در توان باردهی خاک‌های کشاورزی',
    contactInfo: 'تأمین سراسری | مشاوره فنی: شرکت پرواز نهاده پیشگامان',
    volumeTag: 'بسته‌بندی ویژه ۶ لیتری با غلظت حداکثری',
    
    theme: 'corteva',
    primaryColor: '#059669',
    accentColor: '#34d399'
  },
  {
    id: 'golden-harvest-syngenta',
    name: 'سبک سینجنتا: برداشت طلایی و جهش تناژ',
    aspectRatio: '1:1',
    bgType: 'image',
    bgImageUrl: '/assets/templates/wheat_golden_sunset_1793964628810.jpg',
    bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
    overlayOpacity: 0.32,
    overlayColor: '#0f172a',
    vignette: true,
    sunFlare: true,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.85,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.9,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#f59e0b',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'PISHGAMAN PREMIER AGRICULTURAL INPUTS',
    
    headline: 'برداشت طلایی، رکوردی نو در تناژ',
    headlineHighlight: 'تضمین دانه‌بندی سنگین و پر شدن سنبله‌ها',
    subheadline: 'کود اختصاصی فسفاته تایگر High P پیشگامان',
    description: 'تأمین بی‌وقفه انرژی سلولی (ATP) در مراحل حساس پنجه‌زنی و گل‌دهی غلات و باغات برای دستیابی به بالاترین راندمان اقتصادی.',
    
    features: [
      'افزایش وزن هزاردانه و جلوگیری از پوکی',
      'تقویت چشمگیر پنجه‌زنی و انشعابات بوته',
      'حلالیت ۱۰۰٪ در انواع سیستم‌های آبیاری نوار تیپ',
      'جلوگیری از خوابیدگی (ورس) ساقه با استحکام طوقه'
    ],
    badges: [
      { id: 'b1', text: 'جهش تناژ محصول', icon: 'TrendingUp', color: 'amber' },
      { id: 'b2', text: 'انرژی خالص ATP', icon: 'Flame', color: 'red' },
      { id: 'b3', text: 'استاندارد جهانی', icon: 'Award', color: 'emerald' }
    ],
    
    callToAction: 'انتخاب اول کشاورزان پیشرو و مزارع نمونه کشور',
    contactInfo: 'ارسال فوری به سراسر کشور | پیشگامان نهاده',
    volumeTag: '۶ لیتری صنعتی | خلوص ممتاز صادراتی',
    
    theme: 'syngenta',
    primaryColor: '#d97706',
    accentColor: '#fbbf24'
  },
  {
    id: 'modern-orchard-yara',
    name: 'سبک یارا: پادشاه باغات پسته و مرکبات',
    aspectRatio: '9:16',
    bgType: 'image',
    bgImageUrl: '/assets/templates/high_tech_orchard_1793964656967.jpg',
    bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    overlayOpacity: 0.38,
    overlayColor: '#064e3b',
    vignette: true,
    sunFlare: true,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.82,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.85,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#10b981',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'ADVANCED CROP NUTRITION FOR ORCHARDS & PISTACHIO',
    
    headline: 'معجزه باردهی در باغات پسته و میوه',
    headlineHighlight: 'کاهش شدید پوکی، افزایش انس و خندانی',
    subheadline: 'کود فسفر بالا TIGER High P فرمولاسیون اختصاصی',
    description: 'تحریک ریشه‌زایی پس از خواب زمستانه و تثبیت خوشه‌ها در زمان تورم جوانه‌ها. انتخابی بی‌رقیب برای مناطق پسته‌کاری با آب و خاک شور.',
    
    features: [
      'کاهش شدید پدیده سال‌آوری در درختان میوه',
      'افزایش درصد تبدیل گل به میوه و لقاح موفق',
      'عدم ایجاد سمیت کلر در درختان حساس پسته',
      'مقاومت عالی به سرمای دیررس بهاره'
    ],
    badges: [
      { id: 'b1', text: 'ویژه پسته و مرکبات', icon: 'Sparkles', color: 'emerald' },
      { id: 'b2', text: 'ضد شوک سرمایی', icon: 'Shield', color: 'blue' },
      { id: 'b3', text: 'کیفیت صادراتی', icon: 'CheckCheck', color: 'amber' }
    ],
    
    callToAction: 'پوستری پرقدرت برای استوری، تبلیغات تلگرام و فروشگاه‌ها',
    contactInfo: 'توزیع نمایندگی‌های مجاز نهاده‌های کشاورزی | پیشگامان',
    volumeTag: 'بسته‌بندی ۶ لیتری اورجینال شرکت پرواز نهاده پیشگامان',
    
    theme: 'yara',
    primaryColor: '#059669',
    accentColor: '#10b981'
  },
  {
    id: 'haifa-dark-luxury',
    name: 'سبک حیفا دارک: تکنولوژی لوکس و پرقدرت ببر',
    aspectRatio: '1:1',
    bgType: 'gradient',
    bgImageUrl: '',
    bgGradient: 'radial-gradient(circle at 50% 35%, #064e3b 0%, #022c22 45%, #050b14 100%)',
    overlayOpacity: 0.2,
    overlayColor: '#000000',
    vignette: true,
    sunFlare: false,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.92,
    productPosX: 50,
    productPosY: 66,
    productShadowIntensity: 0.95,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#34d399',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'TIGER HIGH-P AGRO CHEMICAL INNOVATIONS',
    
    headline: 'قدرت ببر در ریشه‌های گیاه شما',
    headlineHighlight: 'فرمولاسیون پیشرفته با حداکثر فسفر قابل جذب',
    subheadline: 'راهکار تخصصی شکستن قفل فسفر در خاک‌های آهکی',
    description: 'طراحی شده بر اساس پیشرفته‌ترین تکنولوژی کلاته و اسیدی‌کننده منطقه ریشه جهت آزادسازی فسفات رسوب‌کرده و تحریک فوری رشد.',
    
    features: [
      'شاخص شوری (EC) بسیار پایین',
      'پایداری فوق‌العاده در آب‌های سنگین و سخت',
      'جذب بی‌درنگ توسط روزنه‌های برگی',
      'تضمین سلامت و شادابی بافت گیاهی'
    ],
    badges: [
      { id: 'b1', text: 'بدون رسوب در خاک', icon: 'LockOpen', color: 'emerald' },
      { id: 'b2', text: 'سرعت جذب فوق‌العاده', icon: 'Zap', color: 'purple' },
      { id: 'b3', text: 'پادشاه ریشه‌زایی', icon: 'Crown', color: 'amber' }
    ],
    
    callToAction: 'علمی‌ترین انتخاب برای راندمان بی‌نهایت در هر هکتار',
    contactInfo: 'تلفن مشاوره و سفارش عمده: پرواز نهاده پیشگامان',
    volumeTag: 'سطل ۶ لیتری نفوذناپذیر صنعتی',
    
    theme: 'haifa-dark',
    primaryColor: '#10b981',
    accentColor: '#6ee7b7'
  },
  {
    id: 'scientific-dossier-bayer',
    name: 'سبک بایر آلمان: تحلیل علمی و اینفوگرافیک',
    aspectRatio: '4:5',
    bgType: 'gradient',
    bgImageUrl: '',
    bgGradient: 'linear-gradient(135deg, #091322 0%, #0d2137 50%, #06302b 100%)',
    overlayOpacity: 0.25,
    overlayColor: '#000000',
    vignette: true,
    sunFlare: true,
    particles: false,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.85,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.85,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#38bdf8',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'SCIENTIFIC FORMULATION & AGRONOMIC PRECISION',
    
    headline: '۹۰٪ جذب واقعی در برابر رسوب سنتی',
    headlineHighlight: 'انقلاب بیوشیمیایی در تغذیه فسفاته با تایگر High P',
    subheadline: 'کاهش هزینه‌های کوددهی با افزایش راندمان مصرف',
    description: 'در روش‌های متداول بیش از ۷۵٪ فسفات در خاک قلیایی تثبیت و غیرقابل جذب می‌شود. تایگر پیشگامان تمام فسفر مصرفی را به بافت زنده هدایت می‌کند.',
    
    features: [
      'تست شده در آزمایشگاه‌های معتبر خاک‌شناسی',
      'افزایش ۳۰ تا ۵۰ درصدی سطح ریشه‌های فعال',
      'حاوی محرک‌های بیولوژیک انتقال درون‌سلولی',
      'کاهش مصرف سموم قارچ‌کش با تقویت دیواره سلول'
    ],
    badges: [
      { id: 'b1', text: 'آزمایش‌شده در مزارع', icon: 'Microscope', color: 'blue' },
      { id: 'b2', text: 'حلالیت ۱۰۰٪', icon: 'Droplets', color: 'emerald' },
      { id: 'b3', text: 'کیفیت پریمیوم', icon: 'Sparkles', color: 'purple' }
    ],
    
    callToAction: 'دانش روز اگروشیمی در خدمت باروری مزارع ایران',
    contactInfo: 'تولید و بسته‌بندی: شرکت پرواز نهاده پیشگامان',
    volumeTag: '۶ لیتر خالص | گرید آزمایشگاهی کشاورزی',
    
    theme: 'corteva',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8'
  },
  {
    id: 'saffron-potato-specialist',
    name: 'سبک زعفران و غده‌بندی سیب‌زمینی',
    aspectRatio: '1:1',
    bgType: 'image',
    bgImageUrl: '/assets/templates/roots_soil_vitality_1793964642631.jpg',
    bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
    overlayOpacity: 0.45,
    overlayColor: '#1e1b4b',
    vignette: true,
    sunFlare: false,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.84,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.9,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#c084fc',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'SPECIALIZED TUBER & BULB ACCELERATOR',
    
    headline: 'درشت شدن پیاز زعفران و غده‌های سیب‌زمینی',
    headlineHighlight: 'تغذیه استراتژیک در مرحله زاج‌آب و استولون‌زایی',
    subheadline: 'کود فسفر بالای تایگر High P پیشگامان',
    description: 'تکثیر پیازچه‌های دختری سنگین و درشت برای جهش گل‌دهی سال آینده زعفران و یکنواختی خیره‌کننده سایز خوراکی سیب‌زمینی.',
    
    features: [
      'پر کردن سریع مخازن انرژی غده و پیاز',
      'افزایش وزن و ماندگاری انبارداری پس از برداشت',
      'ایده‌آل برای زاج‌آب زعفران در پاییز و زمستان',
      'محافظت از بافت غده در برابر بیماری‌های پوسیدگی'
    ],
    badges: [
      { id: 'b1', text: 'ویژه زعفران و سیب‌زمینی', icon: 'Sparkles', color: 'purple' },
      { id: 'b2', text: 'غده‌بندی متراکم', icon: 'CircleDot', color: 'amber' },
      { id: 'b3', text: 'تضمین بازدهی', icon: 'Check', color: 'emerald' }
    ],
    
    callToAction: 'سرمایه‌گذاری روی غده‌های پربار با بازگشت تضمینی سود',
    contactInfo: 'مشاوره با گیاه‌پزشکان شرکت پیشگامان',
    volumeTag: 'سطل ۶ لیتری با غلظت سنگین',
    
    theme: 'haifa-dark',
    primaryColor: '#9333ea',
    accentColor: '#c084fc'
  },
  {
    id: 'greenhouse-hydroponic',
    name: 'سبک گلخانه‌ای: صیفی‌جات پربازده و نوار تیپ',
    aspectRatio: '16:9',
    bgType: 'image',
    bgImageUrl: '/assets/templates/high_tech_orchard_1793964656967.jpg',
    bgGradient: 'from-teal-950 via-slate-900 to-slate-950',
    overlayOpacity: 0.35,
    overlayColor: '#042f2e',
    vignette: true,
    sunFlare: true,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.78,
    productPosX: 25,
    productPosY: 65,
    productShadowIntensity: 0.88,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#2dd4bf',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'PRECISION DRIP & HYDROPONIC GREENHOUSE NUTRITION',
    
    headline: 'تضمین گل‌نشینی مداوم و تناژ بالا در گلخانه',
    headlineHighlight: 'بدون گرفتگی قطره‌چکان‌ها و بدون نمک اضافی',
    subheadline: 'کود فسفر بالا TIGER High P فرمولاسیون خالص',
    description: 'مناسب‌ترین گزینه برای بوته‌های گوجه‌فرنگی، خیار و فلفل دلمه‌ای از زمان انتقال نشا تا اواخر فصل برداشت جهت حفظ تعادل رویشی و زایشی.',
    
    features: [
      'صفر درصد گرفتگی در نوار تیپ و لوله‌های قطره‌ای',
      'حفظ قدرت گل‌انگیزی در گرمای شدید تابستان',
      'افزایش ضخامت پوسته و بازارپسندی میوه',
      'تنظیم pH در محیط ریشه صیفی‌جات'
    ],
    badges: [
      { id: 'b1', text: '۱۰۰٪ حلال و بدون جرم', icon: 'Droplets', color: 'emerald' },
      { id: 'b2', text: 'مخصوص صیفی‌جات', icon: 'Sprout', color: 'blue' },
      { id: 'b3', text: 'بدون کلر', icon: 'CheckCheck', color: 'amber' }
    ],
    
    callToAction: 'پیشرو در تغذیه مدرن مزارع و کشت‌های متراکم گلخانه‌ای',
    contactInfo: 'شرکت پرواز نهاده پیشگامان | ارتباط با واحد فروش',
    volumeTag: 'بسته‌بندی ۶ لیتری با دوام بالا',
    
    theme: 'yara',
    primaryColor: '#0d9488',
    accentColor: '#2dd4bf'
  },
  {
    id: 'drone-aerial-farm',
    name: 'سبک پهپادی: نمای وسیع مزرعه هوشمند',
    aspectRatio: '16:9',
    bgType: 'image',
    bgImageUrl: '/assets/templates/drone_field_view_1793966717498.jpg',
    bgGradient: 'from-emerald-900 via-slate-900 to-slate-950',
    overlayOpacity: 0.3,
    overlayColor: '#064e3b',
    vignette: true,
    sunFlare: true,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.75,
    productPosX: 75,
    productPosY: 70,
    productShadowIntensity: 0.8,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#34d399',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'SMART PRECISION AGRICULTURE FERTILIZER',
    
    headline: 'نگاهی نو به بهره‌وری در مزارع وسیع',
    headlineHighlight: 'تایگر High P: راهکار تخصصی مزارع مکانیزه',
    subheadline: 'فسفر فعال برای مدیریت دقیق تغذیه (Precision Farming)',
    description: 'تأمین نیاز غذایی مزارع با استفاده از پهپاد و ماشین‌آلات کشاورزی هوشمند. راندمان بالا در هر هکتار با تایگر پیشگامان.',
    
    features: [
      'حلالیت فوق‌العاده برای محلول‌پاشی پهپادی',
      'فرمولاسیون پیشرفته برای خاک‌های شور و آهکی',
      'افزایش یکنواختی رشد محصول در سطح مزرعه',
      'کاهش هزینه‌های نهایی تولید با جذب بهینه'
    ],
    badges: [
      { id: 'b1', text: 'ویژه مزارع هوشمند', icon: 'Plane', color: 'blue' },
      { id: 'b2', text: 'جذب سریع در پهپاد', icon: 'Zap', color: 'emerald' },
      { id: 'b3', text: 'بازدهی حداکثری', icon: 'TrendingUp', color: 'amber' }
    ],
    
    callToAction: 'آینده کشاورزی، همین امروز با پیشگامان',
    contactInfo: 'ارسال به سراسر کشور | واحد فروش عمده',
    volumeTag: 'بسته‌بندی ۶ لیتری صنعتی',
    
    theme: 'yara',
    primaryColor: '#0d9488',
    accentColor: '#2dd4bf'
  },
  {
    id: 'lab-scientific-research',
    name: 'سبک آزمایشگاهی: دانش پیشرفته اگروشیمی',
    aspectRatio: '4:5',
    bgType: 'image',
    bgImageUrl: '/assets/templates/scientific_lab_phosphorus_1793966730592.jpg',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    overlayOpacity: 0.4,
    overlayColor: '#020617',
    vignette: true,
    sunFlare: false,
    particles: true,
    
    productImgUrl: DEFAULT_PRODUCT_IMG,
    removeBg: true,
    bgRemoveSensitivity: 38,
    productScale: 0.82,
    productPosX: 50,
    productPosY: 72,
    productShadowIntensity: 0.9,
    productReflection: true,
    productGlow: true,
    productGlowColor: '#38bdf8',
    
    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: 'SCIENTIFIC AGRO-CHEMICAL RESEARCH',
    
    headline: 'فراتر از یک کود ساده: یک دستاورد علمی',
    headlineHighlight: 'تایگر High P: علم پیشرفته در خدمت کشاورزی',
    subheadline: 'فرمولاسیون کلاته ارگانیک برای حل معضل تثبیت فسفر',
    description: 'نتیجه سال‌ها تحقیق در آزمایشگاه‌های تخصصی برای رسیدن به بالاترین نرخ جذب زیستی فسفر در پیچیده‌ترین شرایط خاکی.',
    
    features: [
      'تولید بر پایه استانداردهای آزمایشگاهی جهانی',
      'حاوی ترکیبات کلات‌کننده تخصصی فسفر',
      'تضمین کیفیت با آنالیزهای دقیق آزمایشگاهی',
      'سازگاری با انواع روش‌های نوین تغذیه'
    ],
    badges: [
      { id: 'b1', text: 'دستاورد علمی نوآورانه', icon: 'FlaskConical', color: 'blue' },
      { id: 'b2', text: 'جذب ۹۰ درصدی', icon: 'CheckCircle', color: 'emerald' },
      { id: 'b3', text: 'کیفیت تضمین‌شده', icon: 'Award', color: 'amber' }
    ],
    
    callToAction: 'انتخاب علمی برای کشاورزی دانش‌بنیان',
    contactInfo: 'تلفن کارشناس فنی شرکت پیشگامان',
    volumeTag: '۶ لیتر خالص آزمایشگاهی',
    
    theme: 'haifa-dark',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8'
  }
];

