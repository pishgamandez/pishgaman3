/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PishgamanProduct, PosterConfig, CopyAngle, AspectRatio } from '../types';

// Visual themes available
export type PosterThemeType = 'corteva' | 'syngenta' | 'yara' | 'haifa-dark' | 'bayer-lab' | 'precision-drone';

export interface ThemeOption {
  id: PosterThemeType;
  title: string;
  subtitle: string;
  companyVibe: string;
  gradient: string;
  primaryColor: string;
  accentColor: string;
  particles: boolean;
  sunFlare: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'corteva',
    title: 'کورتوا اگروساینس (Corteva Style)',
    subtitle: 'افق ریشه‌زایی در اعماق خاک و ذرات فعال معدنی',
    companyVibe: 'CORTEVA AGROSCIENCE STYLE',
    gradient: 'linear-gradient(180deg, #021226 0%, #032541 45%, #02161b 100%)',
    primaryColor: '#00e5ff',
    accentColor: '#10b981',
    particles: true,
    sunFlare: false
  },
  {
    id: 'syngenta',
    title: 'سینجنتا گلدن (Syngenta Golden Harvest)',
    subtitle: 'نور طلایی صبحگاهی در مزارع سرسبز گندم و ذرت',
    companyVibe: 'SYNGENTA GLOBAL CROP PROTECTION',
    gradient: 'linear-gradient(180deg, #1f1402 0%, #3d2805 40%, #0c1809 100%)',
    primaryColor: '#fbbf24',
    accentColor: '#22c55e',
    particles: true,
    sunFlare: true
  },
  {
    id: 'yara',
    title: 'یارا پرسیژن نوتریشن (Yara Precision)',
    subtitle: 'سبز باطراوت باغات و استانداردهای تغذیه اروپایی',
    companyVibe: 'YARA INTERNATIONAL ADVANCED CROP NUTRITION',
    gradient: 'linear-gradient(180deg, #031c19 0%, #06392c 45%, #021815 100%)',
    primaryColor: '#34d399',
    accentColor: '#38bdf8',
    particles: true,
    sunFlare: true
  },
  {
    id: 'haifa-dark',
    title: 'حیفا نایت های‌تک (Haifa Dark Luxury)',
    subtitle: 'پس‌زمینه گرافیتی مدرن با درخشش نئونی مواد کلاته',
    companyVibe: 'HAIFA PIONEERING THE FUTURE',
    gradient: 'linear-gradient(180deg, #0a0e14 0%, #151b23 50%, #07090d 100%)',
    primaryColor: '#a855f7',
    accentColor: '#22c55e',
    particles: true,
    sunFlare: false
  },
  {
    id: 'bayer-lab',
    title: 'بایر کراپ ساینس (Bayer Science Lab)',
    subtitle: 'بیوتکنولوژی سلولی، بیولومینسانس و کلینیک گیاه‌پزشکی',
    companyVibe: 'BAYER CROPSCIENCE BIOTECH',
    gradient: 'linear-gradient(180deg, #031424 0%, #092642 50%, #04101d 100%)',
    primaryColor: '#38bdf8',
    accentColor: '#a3e635',
    particles: true,
    sunFlare: false
  },
  {
    id: 'precision-drone',
    title: 'مزارع هوشمند ماهواره‌ای (Precision Ag)',
    subtitle: 'پایش ماهواره‌ای NDVI، حسگرهای خاک و کشاورزی دیجیتال',
    companyVibe: 'SMART DIGITAL PRECISION AGRICULTURE',
    gradient: 'linear-gradient(180deg, #081a17 0%, #0e2e28 50%, #041210 100%)',
    primaryColor: '#4ade80',
    accentColor: '#f59e0b',
    particles: true,
    sunFlare: true
  }
];

// Creative headline pools per category & tone
const HEADLINE_TEMPLATES = {
  general: [
    {
      headline: 'انقلاب در بازدهی و باروری خاک',
      highlight: 'قدرت بلامنازع در جذب و تغذیه سلولی',
      sub: 'فرمولاسیون اختصاصی شرکت پرواز نهاده پیشگامان'
    },
    {
      headline: 'جهش تناژ با تکنولوژی پیشرفته',
      highlight: 'پایداری کامل در شرایط بحرانی اقلیم ایران',
      sub: 'دستیابی به بالاترین استاندارد صادراتی محصولات کشاورزی'
    },
    {
      headline: 'کلید فتح رکوردهای عملکرد',
      highlight: 'تحولی شگرف در تغذیه تخصصی و ریشه‌زایی',
      sub: 'توسعه‌یافته بر پایه جدیدترین دستاوردهای فیزیولوژی گیاهی'
    },
    {
      headline: 'حداکثر راندمان با حداقل دوز مصرف',
      highlight: 'سرعت جذب فوق‌العاده در کمتر از ۲۴ ساعت',
      sub: 'اوج بهره‌وری اقتصادی برای کشاورزان و باغداران پیشرو'
    }
  ],
  phosphate: [
    {
      headline: 'ریشه‌زایی فولادی در اعماق خاک',
      highlight: 'انفجار تارهای کشنده با فسفر فعال و کلاته',
      sub: 'کود مایع سوسپانسیون غلیظ و بدون رسوب در لوله‌ها'
    },
    {
      headline: 'پایان تثبیت فسفر در خاک‌های آهکی',
      highlight: 'جذب ۱۰۰٪ ریشه‌ای بدون ذره‌ای قفل‌شدگی',
      sub: 'توسعه انفجاری سطح جذب مویرگی در باغات و مزارع'
    }
  ],
  potassium: [
    {
      headline: 'انفجار قند، بریکس و وزن‌گیری',
      highlight: 'پتاسیم فوق خالص برای درشتی و خندانی بی‌نظیر',
      sub: 'سوسپانسیون فوق غلیظ مخصوص باردهی سنگین'
    },
    {
      headline: 'رنگ‌گیری یکدست و ماندگاری صادراتی',
      highlight: 'بیشترین خلوص پتاسیم فعال در هر قطره',
      sub: 'افزایش چشمگیر وزن هزار دانه و تناژ نهایی'
    }
  ],
  humic: [
    {
      headline: 'احیای خاک‌های خسته و متراکم',
      highlight: 'فعال‌سازی بافت اسفنجی خاک و توسعه ریشه',
      sub: 'معجون سرشار از هیومیک، فولویک و مواد آلی فعال'
    },
    {
      headline: 'تزریق حیات به بستر ریشه',
      highlight: 'آزادسازی عناصر بلوکه‌شده و ممانعت از تنش شوری',
      sub: 'استاندارد ممتاز خلوص و محلولیت کامل در آب'
    }
  ],
  antistress: [
    {
      headline: 'سپر پولادین در برابر تنش‌های کشنده',
      highlight: 'عبور ایمن از گرمای سوزان و سرمازدگی بهاره',
      sub: 'بایواستیمولانت غنی از آمینواسیدهای آزاد و جلبک دریایی'
    },
    {
      headline: 'نجات فوری مزرعه از شوک محیطی',
      highlight: 'تقسیم سلولی بدون وقفه حتی در اوج تنش گرما',
      sub: 'افزایش ایمنی سیستمیک و حفظ شادابی پایدار شاخ و برگ'
    }
  ],
  silicon: [
    {
      headline: 'زره بیومکانیکی ضدآفت و ضدتنش',
      highlight: 'استحکام دیواره سلولی و کاهش تبخیر و تعریق',
      sub: 'سیلیکات پتاسیم محلول با نفوذپذیری سریع برگی'
    }
  ],
  iron: [
    {
      headline: 'پایان زردی برگ‌ها در آهکی‌ترین خاک‌ها',
      highlight: 'آهن کلاته ارتو-ارتو با پایداری تا pH ۱۱',
      sub: 'سبزینگی درخشان و سنتز سریع کلروفیل فعال'
    }
  ],
  calcium: [
    {
      headline: 'پایان لکه استخوانی و پوسیدگی گلگاه',
      highlight: 'استحکام بافت میوه و افزایش چشمگیر ماندگاری انبار',
      sub: 'کلسیم کلاته زیست‌فعال همراه با بر هم‌افزا'
    }
  ]
};

// Generate an automated dynamic poster configuration for ANY product
export function generatePosterConfigForProduct(
  product: PishgamanProduct,
  options?: {
    theme?: PosterThemeType;
    aspectRatio?: AspectRatio;
    seed?: number;
  }
): PosterConfig {
  const seed = options?.seed ?? Math.floor(Math.random() * 1000);
  const themeKey = options?.theme || 'corteva';
  const theme = THEME_OPTIONS.find((t) => t.id === themeKey) || THEME_OPTIONS[0];
  const aspectRatio = options?.aspectRatio || '4:5';

  // Choose appropriate headline template based on product properties
  let pool = HEADLINE_TEMPLATES.general;
  const nameLower = (product.nameEn + ' ' + product.nameFa + ' ' + product.category).toLowerCase();

  if (nameLower.includes('tiger-p') || nameLower.includes('فسفر') || nameLower.includes('p high')) {
    pool = [...HEADLINE_TEMPLATES.phosphate, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('tiger-k') || nameLower.includes('پتاسیم') || nameLower.includes('k high')) {
    pool = [...HEADLINE_TEMPLATES.potassium, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('challenger') || nameLower.includes('humifarm') || nameLower.includes('angela') || nameLower.includes('هیومیک')) {
    pool = [...HEADLINE_TEMPLATES.humic, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('jumper') || nameLower.includes('fiction') || nameLower.includes('تنش')) {
    pool = [...HEADLINE_TEMPLATES.antistress, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('siligard') || nameLower.includes('سیلیس')) {
    pool = [...HEADLINE_TEMPLATES.silicon, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('red-full') || nameLower.includes('آهن') || nameLower.includes('eddha')) {
    pool = [...HEADLINE_TEMPLATES.iron, ...HEADLINE_TEMPLATES.general];
  } else if (nameLower.includes('top-star') || nameLower.includes('کلسیم')) {
    pool = [...HEADLINE_TEMPLATES.calcium, ...HEADLINE_TEMPLATES.general];
  }

  const selectedHead = pool[seed % pool.length];

  // Pick top 4 benefits or create strong points
  const features = product.benefits && product.benefits.length >= 3
    ? product.benefits.slice(0, 4)
    : [
        'افزایش جذب و نفوذپذیری ریشه‌ای و برگی تا ۱۰۰٪',
        'فرمولاسیون محافظت‌شده و پایدار در خاک‌های شور و آهکی',
        'توسعه سریع شبکه بافت زنده و تارهای کشنده',
        'کاملاً عاری از سدیم، کلر و ناخالصی‌های مضر'
      ];

  // Build badges
  const badges = [
    {
      id: 'b1',
      text: product.badge || product.categoryTitle || 'فرمولاسیون صادراتی',
      icon: 'Award',
      color: 'emerald' as const
    },
    {
      id: 'b2',
      text: product.packaging || 'بسته‌بندی مقاوم استاندارد',
      icon: 'Shield',
      color: 'blue' as const
    },
    {
      id: 'b3',
      text: product.appearance || 'خلوص و اثرگذاری تضمینی',
      icon: 'Zap',
      color: 'amber' as const
    }
  ];

  return {
    id: `poster_${product.id}_${theme.id}_${seed}`,
    name: `پوستر بین‌المللی ${product.nameFa} (${theme.title})`,
    aspectRatio,

    bgType: 'gradient',
    bgImageUrl: '',
    bgGradient: theme.gradient,
    overlayOpacity: 0.15,
    overlayColor: '#000000',
    vignette: true,
    sunFlare: theme.sunFlare,
    particles: theme.particles,

    productImgUrl: product.imageUrl,
    removeBg: false,
    bgRemoveMode: 'auto',
    customKeyColor: '#00FF41',
    despillGreen: false,
    bgRemoveSensitivity: 25,
    productScale: 0.78,
    productPosX: 50,
    productPosY: 68,
    productShadowIntensity: 0.85,
    productReflection: true,
    productGlow: true,
    productGlowColor: theme.primaryColor,

    companyName: 'پرواز نهاده پیشگامان',
    companySubtext: `PISHGAMAN AGROSCIENCE • ADVANCED PLANT NUTRITION • ${product.nameEn}`,
    logoUrl: '',

    headline: selectedHead.headline,
    headlineHighlight: selectedHead.highlight,
    subheadline: `${product.nameFa} (${product.nameEn}) - ${product.tagline}`,
    description: product.description.slice(0, 180) + '...',

    features,
    badges,

    callToAction: 'تحولی شگرف در توان باردهی خاک‌های کشاورزی',
    contactInfo: 'تأمین سراسری | مشاوره فنی و بازرگانی: شرکت پرواز نهاده پیشگامان',
    volumeTag: product.packaging || 'فرمولاسیون اختصاصی',

    theme: theme.id,
    primaryColor: theme.primaryColor,
    accentColor: theme.accentColor
  };
}

// Generate 5 distinct marketing copy angles for ANY product
export function generateCopyAnglesForProduct(product: PishgamanProduct, seed: number = 0): CopyAngle[] {
  const cropList = product.dosageTable.map(d => d.crop).join('، ') || 'پسته، مرکبات، گندم، گوجه‌فرنگی و گلخانه‌ها';

  return [
    {
      id: 'angle_yield',
      title: '۱. زاویه رکورد تناژ و عملکرد کشاورز نمونه',
      angleName: 'رکورد عملکرد و تناژ بالا (Yield Breaker)',
      recommendedFormat: 'پست اسلایدی اینستاگرام / پیام کانال تلگرام کشاورزی',
      description: 'مناسب برای کشاورزان بلندپرواز و باغدارانی که هدفشان بیشترین باردهی و برداشت صادراتی است.',
      hook: `🔥 چطور با مصرف ${product.nameFa} رکوردهای برداشت منطقه را جابجا کنیم؟`,
      body: `اگر به تناژهای معمولی راضی نیستید و می‌خواهید پتانسیل ژنتیکی واقعی باغات و مزارعتان را لمس کنید، فرمولاسیون ${product.nameFa} (${product.nameEn}) برگ برنده شماست.

✅ این نهاده تخصصی شرکت پرواز نهاده پیشگامان، دقیقاً برای پر کردن خلاءهای تغذیه‌ای بحرانی فرموله شده است:
• ${product.benefits[0] || 'تحریک حداکثری جذب ریشه و بافت سبز'}
• ${product.benefits[1] || 'افزایش وزن‌گیری، سایز و شاخص‌های کیفی محصول'}
• عدم رسوب و هدررفت حتی در خاک‌های متراکم و سنگین

🎯 نتایج ثبت‌شده در مزارع آزمایشی:
رشد چشمگیر عملکرد در هکتار روی محصولات: ${cropList}.`,
      callToAction: `جهت ثبت سفارش با کیفیت تضمینی و دریافت تقویم اختصاصی تغذیه، دایرکت پیام دهید یا با واحد فنی پیشگامان تماس بگیرید. 📞`,
      hashtags: [
        '#پرواز_نهاده_پیشگامان',
        `#${product.nameFa.replace(/\s+/g, '_')}`,
        `#${product.nameEn.replace(/\s+/g, '_')}`,
        '#کشاورزی_مدرن',
        '#افزایش_تناژ',
        '#کود_کشاورزی',
        '#باغداری_پیشرفته'
      ]
    },
    {
      id: 'angle_stress',
      title: '۲. زاویه حل بحران، شوری و تنش‌های اقلیمی',
      angleName: 'نجات مزرعه در شرایط تنش (Stress & Salinity Rescue)',
      recommendedFormat: 'هشدار فوری ترویجی / پیامک گروهی به کشاورزان منطقه',
      description: 'تاکید بر غلبه بر خاک‌های آهکی، شوری آب، سرمای بهاره و خشکسالی‌های شدید تابستان.',
      hook: `⚠️ در این خاک‌های آهکی و آب‌های شور، چرا کودهای معمولی جواب نمی‌دهند؟ راه نجات با ${product.nameFa}`,
      body: `یکی از بزرگترین چالش‌های کشاورزان زحمتکش در اقلیم ایران، بلوکه شدن عناصر به دلیل pH بالا و تثبیت کربنات کلسیم است. 

💡 راهکار علمی پیشگامان:
فرمولاسیون پیشرفته ${product.nameFa} (${product.nameEn}) به گونه‌ای محافظت شده که:
۱. در برابر آهک فعال خاک مقاومت کامل دارد و جذب آن متوقف نمی‌شود.
۲. فشار اسمزی ناشی از املاح شور را خنثی کرده و جذب آب و مواد مغذی را تسهیل می‌کند.
۳. ${product.benefits[2] || 'تنش‌های دمایی و خشکی را به حداقل ممکن می‌رساند.'}

اگر مزرعه یا باغ شما علائم توقف رشد، رنگ‌پریدگی یا ریزش ناشی از تنش نشان می‌دهد، هم‌اکنون زمان اقدام است.`,
      callToAction: `مشاوره رایگان اصلاح و تغذیه با کارشناسان خاک‌شناسی پیشگامان: تماس یا پیام در واتساپ. 🌿`,
      hashtags: [
        '#اصلاح_خاک',
        '#خاک_شور',
        '#تنش_خشکی',
        `#${product.nameFa.replace(/\s+/g, '_')}`,
        '#کشاورزی_علمی',
        '#پرواز_نهاده'
      ]
    },
    {
      id: 'angle_biotech',
      title: '۳. زاویه تخصصی بیوشیمی و فرمولاسیون',
      angleName: 'بررسی فیزیولوژیک و بیوشیمیایی (Agronomy & Biotech)',
      recommendedFormat: 'مقاله لینکدین / پست تحلیلی کارشناسان گیاه‌پزشکی',
      description: 'مناسب برای کارشناسان ترویج، مهندسان کشاورزی، کارگزاری‌ها و فروشگاه‌های سم و کود.',
      hook: `🔬 آنالیز بیوشیمیایی ${product.nameFa}: بررسی رفتار سلولی و مکانیسم جذب در رادیوسفر`,
      body: `برای مهندسان و کشاورزان پیشرو که به علم پشت هر قطره کود اهمیت می‌دهند:

📋 مشخصات فرمولاسیون:
• رده بیوشیمیایی: ${product.scientificProfile.chemicalClass}
• ترکیبات و مواد موثره: ${product.scientificProfile.activeIngredients}
• محدوده بهینه اسیدیته: pH = ${product.scientificProfile.phRange}

🧪 مکانیسم عمل سلولی (Mode of Action):
${product.scientificProfile.modeOfAction}

🌱 رفتار در خاک‌های آهکی و قلیایی ایران:
${product.scientificProfile.iranSoilSynergy}

⚗️ راهنمای اختلاط تانک:
${product.scientificProfile.tankMixCompatibility}`,
      callToAction: `دریافت برگه آنالیز رسمی آزمایشگاهی (CoA) و فایل PDF مشخصات فنی در وبسایت رسمی شرکت پیشگامان.`,
      hashtags: [
        '#تغذیه_گیاهی',
        '#فیزیولوژی_گیاهی',
        '#بیوتکنولوژی_کشاورزی',
        `#${product.nameEn}`,
        '#گیاهپزشکی',
        '#مهندسی_کشاورزی'
      ]
    },
    {
      id: 'angle_roi',
      title: '۴. زاویه اقتصادی و توجیه سودآوری کشاورز',
      angleName: 'محاسبه سود خالص و توجیه اقتصادی (Economic ROI)',
      recommendedFormat: 'پست عددی و اینفوگرافیک اینستاگرام / بروشور فروشگاهی',
      description: 'اثبات اینکه هزینه کردن برای این محصول، یک سرمایه‌گذاری چندبرابری در سود خالص نهایی است.',
      hook: `💰 به ازای هر ۱ میلیون تومان سرمایه‌گذاری روی ${product.nameFa}، چقدر سود برداشت می‌کنید؟`,
      body: `یک حساب سرانگشتی اما واقعی برای هر هکتار مزرعه یا باغ:

کود ارزان اما بی‌کیفیت:
❌ بیش از ۷۰٪ آن در خاک آهکی تثبیت می‌شود و به هدر می‌رود.
❌ تناژ پایین، میوه‌های ریز و درجه دو و افزایش هزینه‌های سمپاشی جبرانی.

انتخاب حرفه‌ای با ${product.nameFa}:
✅ دوز مصرف بسیار کمتر به دلیل راندمان جذب نزدیک به ۱۰۰٪.
✅ افزایش میانگین باردهی تجاری، کیفیت رنگ و درشتی دانه‌ها و میوه‌ها.
✅ کاهش چشمگیر تلفات ناشی از تنش‌های فصلی و انبارداری.

سودآوری یعنی: هزینه‌ای که با افزایش چند درصدی تناژ و درجه‌بندی ممتاز، در همان چین اول به جیب کشاورز برمی‌گردد.`,
      callToAction: `برای محاسبه دقیق دوز مصرف اقتصادی هکتاری ویژه باغ یا زمین خود، نام محصول زراعی را کامنت کنید.`,
      hashtags: [
        '#اقتصاد_کشاورزی',
        '#سودآوری_باغ',
        '#پسته_کاری',
        '#کشت_گوجه',
        `#${product.nameFa.replace(/\s+/g, '_')}`,
        '#پروازنهاده'
      ]
    },
    {
      id: 'angle_reels',
      title: '۵. سناریوی ویدیویی ریلز / استوری اینستاگرام (۳۰ ثانیه)',
      angleName: 'سناریوی ویدیویی ریلز و استوری (Viral Video Script)',
      recommendedFormat: 'ویدئوی عمودی ۹:۱۶ با تصویر مزرعه و کلوزآپ بسته‌بندی',
      description: 'فیلمنامه قدم‌به‌قدم برای بلاگرها و صفحات تبلیغاتی کشاورزی همراه با راهنمای تصویر و صدا.',
      hook: `🎬 [ثانیه ۰ تا ۳ - قلاب شوک‌آور]: دوربین سریع وارد ریشه‌های غرق در خاک یا میوه‌های پربار می‌شود. متن درشت: «این اشتباه سالانه ۵۰ میلیون تومن به هر هکتار ضرر می‌زنه!»`,
      body: `🎥 [ثانیه ۳ تا ۱۰ - بیان مشکل]:
«خیلی از کشاورزا فکر می‌کنن اگه دوز کود رو ببرن بالا محصول بیشتر میشه! درحالی که تو خاک آهکی ایران، کود معمولی قفل میشه و ریشه رو خفه می‌کنه...»

📦 [ثانیه ۱۰ تا ۲۰ - معرفی شگفت‌انگیز راهکار]:
دوربین روی محصول ${product.nameFa} (${product.nameEn}) زوم می‌کند. ظرف کود در نور روز می‌درخشد.
نریشین: «اینجاست که معجزه ${product.nameFa} از شرکت پرواز نهاده وارد بازی میشه. فرمولاسیونی با خلوص بالا که ${product.benefits[0] || 'مستقیماً جذب سلول‌های ریشه و برگ میشه'}.»

🌾 [ثانیه ۲۰ تا ۲۷ - نمایش نتیجه درخشان]:
تصویر باغات پربار، خوشه‌های طلایی یا سبزی و صیفی صادراتی.
نریشین: «تغییر رنگ برگ‌ها و رشد تارهای کشنده رو فقط توی ۴۸ ساعت با چشم خودتون می‌بینید!»

📲 [ثانیه ۲۸ تا ۳۰ - کال تو اکشن نهایی]:
لوگوی پرواز نهاده پیشگامان با متن: «همین الان کلمه «${product.nameFa}» رو کامنت کن تا نسخه اختصاصی زمینت رو برات بفرستیم!»`,
      callToAction: `این سناریو را ضبط کرده و در ریلز اینستاگرام منتشر کنید تا بیشترین نرخ تعامل (Engagement) و فروش را تجربه کنید!`,
      hashtags: [
        '#ریلز_کشاورزی',
        '#ترفند_کشاورزی',
        `#${product.nameFa.replace(/\s+/g, '_')}`,
        '#باغداری',
        '#کشاورز_نمونه'
      ]
    }
  ];
}

// Generate a complete scholarly academic research paper dossier
export function generateScientificArticle(product: PishgamanProduct, seed: number = 0): string {
  const dateStr = new Date().toLocaleDateString('fa-IR');
  const cropRows = product.dosageTable
    .map(
      (d) => `| ${d.crop} | ${d.method} | ${d.timing || 'مراحل رشد رویشی/زایشی'} | ${d.rate} |`
    )
    .join('\n');

  const refs = product.scientificProfile.academicReferences
    .map(
      (ref, i) =>
        `[${i + 1}] ${ref.authors} (${ref.year}). "${ref.title}". *${ref.journal}*${ref.doi ? `, DOI: ${ref.doi}` : ''}.`
    )
    .join('\n\n');

  return `# مقاله و گزارش تحقیقاتی تخصصی: ارزیابی اگروفیزیولوژیک فرمولاسیون ${product.nameFa} (${product.nameEn})

**تهیه‌شده در:** دپارتمان تحقیق و توسعه (R&D) شرکت پرواز نهاده پیشگامان  
**تاریخ انتشار و ثبت سند:** ${dateStr}  
**شناسه پژوهشی:** PISHGAMAN-RD-${product.slug.toUpperCase()}-2024  
**محور پژوهش:** فیزیولوژی گیاهی، سینتیک جذب عناصر در خاک‌های قلیایی و مدیریت پایدار تغذیه مزارع و باغات  

---

## ۱. چکیده علمی (Scientific Abstract)
این پژوهش به بررسی جامع خصوصیات بیوشیمیایی و اثرات اگرونومیک نهاده کشاورزی **${product.nameFa} (${product.nameEn})** در شرایط اقلیمی خشک و نیمه‌خشک فلات ایران می‌پردازد. خاک‌های زراعی کشور به دلیل وجود مقادیر قابل توجه کربنات کلسیم و واکنش قلیایی (pH > 7.8)، با پدیده شدید تثبیت عناصر غذایی و بازدارندگی توسعه تارهای کشنده ریشه مواجه هستند. فرمولاسیون ${product.nameFa} با دارا بودن ساختار مولکولی اختصاصی، موجب افزایش ضریب نفوذپذیری غشاهای سلولی، تحریک ترشح اسیدهای آلی توسط مریستم ریشه و تسریع انتقال عناصر در آوندهای چوبی و آبکشی می‌گردد. نتایج ارزیابی‌های میدانی نشان‌دهنده ارتقای چشمگیر شاخص کلروفیل (SPAD)، کاهش تنش‌های اسمزی و افزایش شاخص راندمان مصرف آب و عناصر غذایی (NUE) می‌باشد.

---

## ۲. مشخصات شیمیایی و ویژگی‌های فرمولاسیون
- **نام تجاری محصول:** ${product.nameFa} (${product.nameEn})
- **رده فرمولاسیون و کاتالوگ:** ${product.categoryTitle}
- **شکل ظاهری و حالت فیزیکی:** ${product.appearance}
- **کلاس ترکیبی:** ${product.scientificProfile.chemicalClass}
- **ماده مؤثره و درصد ترکیبات تضمین‌شده:** ${product.scientificProfile.activeIngredients}
- **محدوده اسیدیته فعال (pH):** ${product.scientificProfile.phRange}
- **هدایت الکتریکی (EC):** ${product.scientificProfile.ecValue || 'استاندارد فیزیولوژیک بدون تحمیل شوک اسمزی'}
- **نوع بسته‌بندی:** ${product.packaging}

---

## ۳. مکانیسم سلولی و فیزیولوژی اثر در بافت گیاه (Mode of Action)
${product.scientificProfile.modeOfAction}

در سطح سلولی، ورود این فرمولاسیون موجب فعال‌سازی مسیرهای متابولیکی مرتبط با ساخت پروتئین‌های شوک حرارتی (HSPs)، تثبیت ترکیبات غشایی و جلوگیری از اکسیداسیون لیپیدها در شرایط استرس می‌گردد. همچنین با بهینه‌سازی گرادیان الکتروشیمیایی پروتون در سلول‌های مویین، راندمان جذب کاتیون‌ها و آنیون‌های ضروری تا چندین برابر کودهای متداول افزایش می‌یابد.

---

## ۴. رفتار بیوشیمیایی در خاک‌های آهکی، گچی و شور ایران
${product.scientificProfile.iranSoilSynergy}

بیش از ۸۰ درصد اراضی زراعی استان‌های مرکزی، فارس، کرمان، خوزستان، خراسان و دشت قزوین از کمبود شدید مواد آلی فعال و حضور لایه‌های متراکم آهک رنج می‌برند. محصول ${product.nameFa} با ایجاد یک ریزمحیط شیمیایی بهینه (Micro-environment) در اطراف ریشه، پدیده کمپلکس‌شدگی را مهار کرده و عناصر تثبیت‌شده پیشین خاک را نیز آزاد و آماده مصرف گیاه می‌نماید.

---

## ۵. تقویم فنولوژیک و پروتکل دوز مصرفی در محصولات راهبردی

| محصول کشاورزی | روش مصرف پیشنهادی | زمان بهینه کاربرد در تقویم رشد | دوز مصرف توصیه‌شده |
| :--- | :--- | :--- | :--- |
${cropRows}

*نکته ترویجی: دوزهای فوق بر اساس شرایط میانگین مزارع ارائه گردیده است؛ در شرایط تنش حاد یا بر اساس آزمون خاک و آب، دوز مصرف قابل تطبیق توسط کارشناس معتمد می‌باشد.*

---

## ۶. پروتکل اختلاط و سازگاری تانک (Tank Mix Guide)
${product.scientificProfile.tankMixCompatibility}

### توصیه‌های کلیدی هنگام آماده‌سازی محلول:
۱. همواره مخزن سمپاش را تا نیمه با آب باکیفیت پر نموده و سیستم همزن را روشن نگه دارید.
۲. قبل از افزودن به تانک‌های بزرگ، انجام «آزمون ظرف شیشه‌ای» (Jar Test) با دوز متناسب در یک لیتر آب الزامی است.
۳. از محلول‌پاشی در ساعات اوج تابش آفتاب و دمای بالای ۳۵ درجه سانتی‌گراد اکیداً خودداری شود (بهترین زمان: اوایل صبح یا هنگام غروب).

---

## ۷. منابع و ارجاعات آکادمیک بین‌المللی (Peer-Reviewed References)
${refs}

---
**حقوق مالکیت معنوی و مسئولیت فنی:**  
کلیه اطلاعات و فرمولاسیون‌های این سند تحت نظارت دپارتمان تحقیق و توسعه و آزمایشگاه تخصصی **شرکت پرواز نهاده پیشگامان** مستندسازی گردیده است.`;
}
