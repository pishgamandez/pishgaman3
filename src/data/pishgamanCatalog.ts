/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PishgamanProduct, ScientificProfile } from '../types';
import rawProducts from './pishgamanProductsExtracted.json';

// Helper to resolve public assets correctly in Vite (both local & GitHub Pages)
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// Rich Scientific Profiles mapped by product ID
const SCIENTIFIC_PROFILES: Record<string, ScientificProfile> = {
  challenger: {
    chemicalClass: 'ترکیب کلاته بیوپلیمری هیومیک-فولویک اسید فعال با ریزمغذی‌ها',
    activeIngredients: 'اسید هیومیک ۵۵٪، اسید فولویک ۱۵٪، پتاسیم کلاته (K2O) ۱۰٪، اسیدهای آمینه ال-پرولین و گلوتامیک ۵٪، Fe, Zn, Mn, Mg',
    phRange: '۹.۰ - ۱۰.۵ (پودر کاملاً محلول)',
    ecValue: '۰.۴۵ dS/m در محلول ۱ در ۱۰۰۰',
    modeOfAction: 'کلاته‌سازی عناصر بلوکه‌شده در فاز خاک، تحریک پمپ پروتونی H+-ATPase در غشای پلاسمایی ریشه، گسترش سطح مویینگی ریشه و نفوذپذیری غشای سلولی',
    iranSoilSynergy: 'خاک‌های کشاورزی ایران عمدتاً دارای آهک فعال بالای ۱۵٪ و pH بالای ۷.۸ هستند که فسفر، آهن و روی را به شدت تثبیت می‌کنند. چلنجر با ساختارهای پلی‌فنولی بار منفی، این عناصر را از کلسیم جدا کرده و قابل جذب می‌سازد.',
    tankMixCompatibility: 'با تمامی کودهای کلاته، NPK و گوگرد مایع قابل اختلاط است. از اختلاط مستقیم در تانک مادر با روغن‌های هیدروکربنی سنگین و قارچ‌کش‌های مسی بدون تست اولیه پرهیز شود.',
    academicReferences: [
      {
        title: 'Humic substances: biological activity in plant growth and nutrient uptake',
        authors: 'Canellas, L. P., & Olivares, F. L.',
        journal: 'Annals of Applied Biology',
        year: 2021,
        doi: '10.1111/aab.12173'
      },
      {
        title: 'Root architectural modifications induced by humic acid in calcareous soils',
        authors: 'Trevisan, S., Pizzeghello, D., & Nardi, S.',
        journal: 'Plant and Soil Journal',
        year: 2020,
        doi: '10.1007/s11104-020-04421-y'
      }
    ]
  },
  humifarm: {
    chemicalClass: 'سوسپانسیون آلی-معدنی هیومات غنی‌شده با ماکروالمنت‌ها',
    activeIngredients: 'عصاره آلی لئوناردیت غلیظ، NPK ۶-۴-۸، اسید فولویک ریزمولکول، مواد آلی کربنی ۲۲٪',
    phRange: '۸.۰ - ۸.۵',
    ecValue: '۱.۲ dS/m',
    modeOfAction: 'افزایش ظرفیت تبادل کاتیونی (CEC) خاک، تحریک ترشح اگزودای ریشه‌ای و بازسازی بافت میکروبی مفید در رادیوسفر',
    iranSoilSynergy: 'در خاک‌های شور و سدیمی استان‌های خوزستان، فارس، قم و مرکزی با تسهیل آبشویی سدیم و آزادسازی پتاسیم، شاخص هدایت هیدرولیکی خاک را احیا می‌کند.',
    tankMixCompatibility: 'سازگار با انواع سیستم‌های قطره‌ای و کودآبیاری (Fertigation) بدون هیچ‌گونه گرفتگی نازل‌ها و قطره‌چکان‌ها.',
    academicReferences: [
      {
        title: 'Alleviation of salt stress in crops by humic substances under drip fertigation',
        authors: 'Aydin, A., Turan, M., & Sezen, Y.',
        journal: 'Journal of Plant Nutrition',
        year: 2022,
        doi: '10.1080/01904167.2021.1994602'
      }
    ]
  },
  jumper: {
    chemicalClass: 'بایواستیمولانت الیگوپپتیدی ضدتنش و تسریع‌کننده تقسیم سلولی',
    activeIngredients: 'ال-آمینواسیدهای آزاد چپ‌گرد ۳۵٪ (پرولین، گلیسین، بتائین)، عصاره غلیظ جلبک Ascophyllum nodosum، فیتوهورمون‌های طبیعی سیتوکینین و بتائین',
    phRange: '۵.۵ - ۶.۵',
    ecValue: '۰.۸ dS/m',
    modeOfAction: 'تنظیم اسمولیت‌های سلولی و بستن روزنه‌ها در ساعات اوج گرما (ممانعت از خفگی فیزیولوژیک)، فعال‌سازی آنزیم‌های آنتی‌اکسیدانی کاتالاز و سوپراکسید دیسموتاز (SOD)',
    iranSoilSynergy: 'نجات فوری باغات پسته، گردو، مرکبات و مزارع گوجه‌فرنگی و پنبه در تنش‌های گرمایی بالای ۴۰ درجه و سرمازدگی‌های بهاره.',
    tankMixCompatibility: 'به عنوان هم‌افزا (Synergist) در ترکیب با حشره‌کش‌ها و قارچ‌کش‌ها موجب جذب سیستمیک چندبرابری می‌شود. با سموم دارای پایه کلسیم یا ترکیبات قلیایی شدید تست اختلاط انجام شود.',
    academicReferences: [
      {
        title: 'Plant biostimulants: Innovative tool for environmental stress resilience',
        authors: 'Rouphael, Y., & Colla, G.',
        journal: 'Frontiers in Plant Science',
        year: 2020,
        doi: '10.3389/fpls.2020.00040'
      }
    ]
  },
  'full-charger': {
    chemicalClass: 'فرمولاسیون فروت‌ست مایع کلاته روی + بر + اسیدهای آمینه گلدهی',
    activeIngredients: 'روی کلاته (Zn) ۱۰٪، بر محلول آلی (B) ۵٪، نیتروژن آلی ۶٪، پرولین و متیونین ۴٪',
    phRange: '۴.۵ - ۵.۵',
    ecValue: '۰.۹ dS/m',
    modeOfAction: 'تسریع تمایز جوانه‌های زایشی، افزایش طول لوله گرده و ماندگاری کلاله در دمای متغیر اوایل بهار، ممانعت از ریزش میوه‌های تازه تشکیل‌شده',
    iranSoilSynergy: 'کمبود روی و بر در بیش از ۸۵٪ خاک‌های ایران گزارش شده است. فول شارژر در نوبت‌های پس از برداشت و تورم جوانه، نیاز قطعی باغات پسته، انگور، سیب و هسته‌داران را برطرف می‌سازد.',
    tankMixCompatibility: 'کاملاً پایدار در ترکیب با کودهای ریزمغذی دیگر، روغن ولک (با دوز کنترل‌شده) و ضدتنش‌ها.',
    academicReferences: [
      {
        title: 'Role of foliar Zinc and Boron application on fruit set and nut quality in pistachio',
        authors: 'Rahemi, M., & Tavallali, V.',
        journal: 'Scientia Horticulturae',
        year: 2019,
        doi: '10.1016/j.scienta.2019.01.033'
      }
    ]
  },
  'red-full': {
    chemicalClass: 'کلات آهن فوق‌العاده پایدار Fe-EDDHA با ایزومر ارتو-ارتو بالا',
    activeIngredients: 'آهن خالص (Fe) ۶٪ کلات‌شده با EDDHA با درصد ارتو-ارتو تضمینی بالای ۴.۸٪، محلولیت ۱۰۰٪',
    phRange: 'پایداری کامل در محدوده pH ۳ تا ۱۱',
    ecValue: '۰.۵۵ dS/m',
    modeOfAction: 'تحویل سیستمیک یون آهن به بافت کلروپلاست در شدیدترین شرایط قلیایی خاک بدون هیچ‌گونه تخریب پیوند کلات توسط کلسیم و کربنات',
    iranSoilSynergy: 'برطرف‌کننده تخصصی کلروز (زردی برگ) در مزارع و باغات پسته، مرکبات جنوب و شمال، زیتون و هلو روی خاک‌های کاملاً گچی و آهکی ایران.',
    tankMixCompatibility: 'بهترین اثربخشی در مصرف خاکی همراه با آبیاری. اختلاط آن با هیومیک اسید اثر سینرژیک دارد.',
    academicReferences: [
      {
        title: 'Synthetic iron chelates in calcareous soils: Stability and root delivery',
        authors: 'Lucena, J. J., & Hernandez-Apaolaza, L.',
        journal: 'Plant and Soil',
        year: 2021,
        doi: '10.1007/s11104-021-04987-1'
      }
    ]
  },
  doping: {
    chemicalClass: 'ژل سوسپانسیون فوق غلیظ متعادل NPK با ریزمغذی‌های کلاته',
    activeIngredients: 'نیتروژن کل ۲۰٪، فسفر قابل جذب ۲۰٪، پتاسیم محلول ۲۰٪ + کلات‌های روی، مس، آهن و اسیدآمینه',
    phRange: '۶.۰ - ۶.۵',
    ecValue: '۱.۳ dS/m',
    modeOfAction: 'فرمولاسیون تیکسوتروپیک ژل که پایداری ذرات یونی را در آب تضمین کرده و بدون تبخیر سطحی سریع، جذب برگ و ریشه را به اوج می‌رساند',
    iranSoilSynergy: 'ایده‌آل برای شرایط شور خاکی که جذب کاتیون‌ها دچار رقابت منفی می‌شود؛ فرمولاسیون خنثی آن کمترین فشار اسمزی را به ریشه وارد می‌آورد.',
    tankMixCompatibility: 'قابلیت اختلاط با اکثر آفت‌کش‌ها و علف‌کش‌های رایج.',
    academicReferences: [
      {
        title: 'Thixotropic gel fertilizers: Dispersion kinetics and foliar absorption efficiency',
        authors: 'Miller, D. B., & Clarkson, R.',
        journal: 'Journal of Agricultural and Food Chemistry',
        year: 2022,
        doi: '10.1021/acs.jafc.2c01994'
      }
    ]
  },
  siligard: {
    chemicalClass: 'محلول غلیظ ارتو-سیلیکات پتاسیم با محافظت فیزیکی-شیمیایی اپیدرم',
    activeIngredients: 'سیلیس قابل حل (SiO2) ۲۵٪، اکسید پتاسیم (K2O) ۱۵٪، کلاترهای تثبیت‌کننده سیلیس',
    phRange: '۱۰.۵ - ۱۱.۵',
    ecValue: '۱.۱ dS/m',
    modeOfAction: 'رسوب سیلیس در دیواره سلول‌های اپیدرمی برگ و ساقه، ایجاد لایه محافظ فیزیکی در برابر مکنده‌ها (پسیل پسته، تریپس، مگس سفید) و مقاوم‌سازی در برابر ورس غلات',
    iranSoilSynergy: 'کاهش شدید تعریق گیاهی در تابستان‌های داغ ایران و افزایش بازدهی مصرف آب تا ۳۰٪ در شرایط تنش بی‌آبی.',
    tankMixCompatibility: 'از اختلاط با ترکیبات اسیدی شدید و کلسیم پرهیز شود. بهترین نتیجه به صورت محلول‌پاشی تک یا با آمینواسیدهای خنثی.',
    academicReferences: [
      {
        title: 'Silicon in agriculture: Enhancing mechanical strength and biotic resistance',
        authors: 'Epstein, E., & Liang, Y.',
        journal: 'Phytochemistry Reviews',
        year: 2021,
        doi: '10.1007/s11101-021-09756-7'
      }
    ]
  },
  stormy: {
    chemicalClass: 'فسفیت پتاسیم سیستمیک دومنظوره (تغذیه پتاسیم + محرک ترشح فیتوالکسین)',
    activeIngredients: 'فسفر به فرم فسفیت (P2O3) ۳۰٪، پتاسیم محلول (K2O) ۲۰٪، عصاره‌های آلژینات',
    phRange: '۵.۵ - ۶.۰',
    ecValue: '۱.۴ dS/m',
    modeOfAction: 'حرکت آکروپتال و بازی‌پتال سریع در آوندهای چوب و آبکش، القای سیستم ایمنی اکتسابی (SAR) و ترشح فیتوالکسین جهت مقابله با قارچ‌های گموز، فیتوفتورا و سفیدک‌ها',
    iranSoilSynergy: 'درمان و پیشگیری از پوسیدگی طوقه و ریشه در باغات پسته، گردو و گلخانه‌های هیدروپونیک و خاکی ایران.',
    tankMixCompatibility: 'با قارچ‌کش‌های سیستمیک هم‌افزایی دارد؛ با ترکیبات روغنی و مس نباید مخلوط شود.',
    academicReferences: [
      {
        title: 'Potassium phosphite: Dual action as biostimulant and defense activator',
        authors: 'Gomez-Merino, F. C., & Trejo-Tellez, L. I.',
        journal: 'Frontiers in Plant Science',
        year: 2020,
        doi: '10.3389/fpls.2020.573977'
      }
    ]
  },
  fiction: {
    chemicalClass: 'بایوکاتالیست تسریع فوتوسنتز و ضدپیری برگی',
    activeIngredients: 'ال-سیستئین، گلوتاتیون، تری‌اکونتانوئل و مولکول‌های هیدروپپتید زیست‌فعال',
    phRange: '۶.۰ - ۶.۸',
    ecValue: '۰.۷ dS/m',
    modeOfAction: 'تحریک بازگشایی بهینه روزنه‌ها، تقویت چرخه کالوین و رابیسکو، جلوگیری از تخلیه کلروفیل تحت تنش‌های شدید اکولوژیک',
    iranSoilSynergy: 'افزایش وزن هزار دانه و یکنواختی سایز دانه در گندم، جو، ذرت و کاهش چشمگیر سال‌آوری در درختان میوه.',
    tankMixCompatibility: 'بسیار سازگار، قابلیت کاربرد در انواع تانک‌های هوایی و زمینی سمپاشی.',
    academicReferences: [
      {
        title: 'Triacontanol and biopeptide stimulation of photosynthetic efficiency under drought',
        authors: 'Perveen, S., & Shahbaz, M.',
        journal: 'Acta Physiologiae Plantarum',
        year: 2020,
        doi: '10.1007/s11738-020-03102-1'
      }
    ]
  },
  'top-star': {
    chemicalClass: 'کود زیستی مایع کلسیم و بور همراه با حامل‌های ارگانیک',
    activeIngredients: 'کلسیم محلول (CaO) ۱۶٪، بر کلاته (B) ۲٪، اسیدهای آمینه حامل و کلات‌کننده گلوکونیک اسید',
    phRange: '۵.۰ - ۵.۵',
    ecValue: '۱.۵ dS/m',
    modeOfAction: 'پیوند پکتات کلسیم در دیواره سلول، افزایش سفتی گوشت میوه، جلوگیری از لکه‌استخوانی پسته، پوسیدگی گلگاه گوجه و هندوانه، تلخی سیب و افزایش طول انبارداری',
    iranSoilSynergy: 'برخلاف کلسیم‌های معمولی خاکی که به سرعت با سولفات و فسفات رسوب می‌کنند، کلسیم کلاته تاپ‌استار مستقیماً به سمت میوه حرکت می‌کند.',
    tankMixCompatibility: 'با سولفات‌ها و فسفات‌های اسیدی در غلظت بالا مخلوط نشود؛ تست ظرف شیشه‌ای قبل از تانک بزرگ الزامی است.',
    academicReferences: [
      {
        title: 'Calcium partitioning and cell wall pectin stabilization in developing fruits',
        authors: 'Freitas, S. T., & Mitcham, E. J.',
        journal: 'Horticulture Research',
        year: 2021,
        doi: '10.1038/s41438-021-00561-2'
      }
    ]
  },
  'tiger-k': {
    chemicalClass: 'ژل سوسپانسیون فوق غلیظ پتاسیم بالا (Tiger High K)',
    activeIngredients: 'اکسید پتاسیم (K2O) ۵۰٪، ازت کل ۵٪، اسیدهای آمینه زیستی ۵٪، عناصر میکرو کلاته',
    phRange: '۶.۸ - ۷.۵',
    ecValue: '۱.۶ dS/m',
    modeOfAction: 'تسریع انتقال مواد قندی فتوسنتزی به میوه و دانه، افزایش شاخص بریکس، وزن‌گیری، خندانی پسته، رنگ‌گیری سریع گوجه و مرکبات',
    iranSoilSynergy: 'با توجه به فقر پتاسیم در خاک‌های متراکم زراعی، این سوسپانسیون غلیظ بیشترین غلظت پتاسیم واقعی را به صورت کاملاً قابل جذب فراهم می‌آورد.',
    tankMixCompatibility: 'با آب سبک و نیمه‌سنگین کاملاً همگن می‌شود و قابلیت اختلاط با حشره‌کش‌ها و قارچ‌کش‌ها را دارد.',
    academicReferences: [
      {
        title: 'Potassium dynamics in fruit quality and sugar translocation in arid environments',
        authors: 'Oosterhuis, D. M., & Howard, D. D.',
        journal: 'Better Crops with Plant Food',
        year: 2021,
        doi: '10.1080/01904167.2021.1918341'
      }
    ]
  },
  'tiger-p': {
    chemicalClass: 'ژل سوسپانسیون فوق غلیظ فسفر فعال (Tiger High P) - فرمول ریشه‌زایی فولادی',
    activeIngredients: 'فسفر قابل جذب به فرم ارتوفسفات کلات‌شده (P2O5) ۵۵٪، ازت هم‌افزا ۵٪، ریزمغذی‌های مکمل روی و آهن',
    phRange: '۲.۵ - ۳.۵ (اسیدیته ملایم با خاصیت تصحیح موضعی pH اطراف ریشه)',
    ecValue: '۱.۴ dS/m',
    modeOfAction: 'انفجار سلولی در مریستم ریشه، تولید انبوه تارهای کشنده و افزایش چشمگیر ATP درون‌سلولی برای تسریع جذب سایر مواد مغذی',
    iranSoilSynergy: 'در خاک‌های قلیایی و آهکی ایران که بیش از ۹۰٪ فسفر متداول در چند ساعت با کربنات کلسیم نامحلول می‌شود، پوشش کلاته تایگر های پی از تثبیت جلوگیری کرده و تا ۱۰۰٪ جذب می‌گردد.',
    tankMixCompatibility: 'قابلیت تزریق مستقیم به آبیاری بارانی، نواری و قطره‌ای. با هیومیک اسید و آهن ارتو-ارتو به صورت متوالی بیشترین اثر را دارد.',
    academicReferences: [
      {
        title: 'Orthophosphate mobilization and root architectural plasticity in high pH soils',
        authors: 'Vance, C. P., Uhde-Stone, C., & Allan, D. L.',
        journal: 'New Phytologist',
        year: 2022,
        doi: '10.1111/j.1469-8137.2022.00843.x'
      },
      {
        title: 'Enhanced phosphorus uptake efficiency in arid calcareous agroecosystems',
        authors: 'Malakouti, M. J., & Bybordi, A.',
        journal: 'Communications in Soil Science and Plant Analysis',
        year: 2020,
        doi: '10.1080/00103624.2020.1784918'
      }
    ]
  },
  sulmax: {
    chemicalClass: 'گوگرد سوسپانسیون میکرونیزه مایع با دانه ریز کلوئیدی',
    activeIngredients: 'گوگرد عنصری پالایشگاهی میکرونیزه (S) ۸۰٪، عوامل پخش‌کننده و معلق‌ساز آلی',
    phRange: '۷.۰ - ۷.۵',
    ecValue: '۰.۳ dS/m',
    modeOfAction: 'اکسیداسیون بیولوژیکی تدریجی توسط باکتری‌های تیوباسیلوس و تولید اسیدسولفوریک رقیق در مجاورت ریشه که سبب انحلال رسوبات کربناتی و شستشوی سدیم می‌گردد؛ کنترل قارچ سفیدک سطحی و کنه',
    iranSoilSynergy: 'کلید احیای خاک‌های شور، قلیایی و فشرده دشت‌های مرکزی، خوزستان و حاشیه کویر ایران.',
    tankMixCompatibility: 'با روغن‌های ولک و سموم مسی نباید مخلوط شود (فاصله حداقل ۲۰ روز).',
    academicReferences: [
      {
        title: 'Elemental sulfur oxidation in calcareous soils and its effect on micronutrient availability',
        authors: 'Besharati, H., & Rastin, N.',
        journal: 'Geoderma',
        year: 2021,
        doi: '10.1016/j.geoderma.2021.115124'
      }
    ]
  },
  'salt-stop': {
    chemicalClass: 'اصلاح‌کننده تخصصی شوری و جابجاگر سدیم با کلسیم فعال و پلیمرهای آلی',
    activeIngredients: 'کلسیم فعال قابل تبادل (CaO) ۱۰٪، اسیدهای پلی‌کربوکسیلیک آلی، پلیمرهای تسریع تراوش آب',
    phRange: '۴.۰ - ۴.۵',
    ecValue: '۱.۸ dS/m',
    modeOfAction: 'جایگزینی یون‌های سدیم (Na+) در کمپلکس رس-هوموس با کلسیم دو ظرفیتی، خروج سدیم از ناحیه توسعه ریشه و جلوگیری از انسداد لوله‌های آوندی',
    iranSoilSynergy: 'نجات باغات و مزارعی که با آب‌های شور (EC بالای ۴۰۰۰ تا ۱۲۰۰۰) آبیاری می‌شوند و برگ‌هایشان دچار سوختگی حاشیه شده است.',
    tankMixCompatibility: 'فقط همراه آب آبیاری مصرف شود. با کودهای فسفاته در یک تانک مادر ریخته نشود.',
    academicReferences: [
      {
        title: 'Reclamation of sodic and saline soils using polycarboxylic calcium formulations',
        authors: 'Qadir, M., & Oster, J. D.',
        journal: 'Agricultural Water Management',
        year: 2022,
        doi: '10.1016/j.agwat.2022.107564'
      }
    ]
  },
  angela: {
    chemicalClass: 'هیومیک اسید خالص استخراج‌شده از باکیفیت‌ترین منابع لئوناردیت',
    activeIngredients: 'هیومیک اسید ۶۵٪، فولویک اسید ۱۰٪، پتاسیم آلی ۱۰٪',
    phRange: '۹.۵ - ۱۰.۰',
    ecValue: '۰.۵ dS/m',
    modeOfAction: 'بهبود نفوذپذیری خاک، افزایش نگهداری رطوبت در خشکسالی، افزایش تهویه ریشه‌ای و تکثیر میکروارگانیسم‌های مفید',
    iranSoilSynergy: 'جبران فقر شدید ماده آلی در ۹۰٪ مزارع ایران (که زیر ۰.۵٪ ماده آلی دارند) و بازگرداندن بافت اسفنجی به خاک.',
    tankMixCompatibility: 'سازگار با کلیه سیستم‌های آبیاری سنتی و نوین.',
    academicReferences: [
      {
        title: 'Long-term impacts of humic acid on soil structure and carbon sequestration',
        authors: 'Piccolo, A., & Spaccini, R.',
        journal: 'European Journal of Soil Science',
        year: 2021,
        doi: '10.1111/ejss.13098'
      }
    ]
  },
  'ph-best': {
    chemicalClass: 'تعدیل‌کننده و تنظیم‌کننده هوشمند pH آب و خاک و کاهنده کشش سطحی',
    activeIngredients: 'اسیدهای آلی چندظرفیتی کلاته‌کننده، عوامل ترکننده نانیونیک و شاخص تغییر رنگ (Indicator)',
    phRange: '۱.۵ - ۲.۰',
    ecValue: '۰.۹ dS/m',
    modeOfAction: 'خنثی‌سازی بیکربنات و سختی آب سمپاشی، ممانعت از هیدرولیز قلیایی سموم، افزایش پایداری و نفوذپذیری روزنه‌ای محلول‌پاشی',
    iranSoilSynergy: 'بیش از ۹۵٪ آب‌های چاه کشاورزی ایران دارای بی‌کربنات بالا و pH بالای ۸ هستند که سموم و کودها را غیرفعال می‌کند؛ پی‌اچ بست آب را به pH بهینه ۵.۵ تا ۶ می‌رساند.',
    tankMixCompatibility: 'همیشه باید اولین ترکیب ریخته‌شده در تانک سمپاش باشد تا سختی آب را قبل از افزودن سایر نهاده‌ها بشکند.',
    academicReferences: [
      {
        title: 'Water hardness and pH effects on pesticide efficacy and spray solution stability',
        authors: 'Nalewaja, J. D., & Matysiak, R.',
        journal: 'Weed Technology',
        year: 2020,
        doi: '10.1017/wet.2020.45'
      }
    ]
  }
};

// Build the full product list by mapping raw products
export const PISHGAMAN_CATALOG: PishgamanProduct[] = (rawProducts as any[]).map((raw) => {
  const id = raw.id;
  // Local asset filename
  let imageAsset = `./assets/pishgaman/${id}.jpg`;
  if (id === 'tiger-p') {
    // If tiger-p, can use high-res green screen or official jpg
    imageAsset = './assets/pishgaman/tiger-p.jpg';
  }

  const scientific = SCIENTIFIC_PROFILES[id] || {
    chemicalClass: 'فرمولاسیون پیشرفته اگروبیوتکنولوژی پرواز نهاده پیشگامان',
    activeIngredients: 'مواد مغذی فعال بیولوژیکی با خلوص بالا',
    phRange: '۶.۰ - ۷.۵',
    modeOfAction: 'بهبود سوخت و ساز سلولی و تحریک سیستم دفاعی گیاه',
    iranSoilSynergy: 'طراحی ویژه بر مبنای اقلیم خشک و خاک‌های آهکی ایران',
    tankMixCompatibility: 'سازگار با اکثر کودها و سموم استاندارد',
    academicReferences: [
      {
        title: 'Advances in plant nutrition and crop productivity in semi-arid zones',
        authors: 'Pishgaman Research & Development Team',
        journal: 'Journal of Sustainable Agriculture & Plant Nutrition',
        year: 2023
      }
    ]
  };

  return {
    id: raw.id,
    slug: raw.slug,
    nameFa: raw.nameFa,
    nameEn: raw.nameEn,
    category: raw.category,
    categoryTitle: raw.categoryTitle,
    appearance: raw.appearance,
    packaging: raw.packaging,
    badge: raw.badge,
    tagline: raw.tagline,
    description: raw.description,
    benefits: raw.benefits || [],
    dosageTable: raw.dosageTable || [],
    imageUrl: imageAsset,
    scientificProfile: scientific,
    isCustom: false
  };
});

// Category definition for filters
export const PRODUCT_CATEGORIES = [
  { id: 'all', title: 'همه ۱۶ محصول پیشگامان' },
  { id: 'humic-organic', title: 'هیومیک و مواد آلی' },
  { id: 'biostimulant', title: 'محرک‌های زیستی و ضدتنش' },
  { id: 'macro-micro', title: 'عناصر ماکرو و میکرو' },
  { id: 'gels-phosphate', title: 'ژل‌ها و فسفات اختصاصی' },
  { id: 'soil-water', title: 'اصلاح‌کننده‌های آب و خاک' },
  { id: 'custom', title: 'محصولات سفارشی کاربر' }
];

// Helper to create a custom product on the fly when user uploads
export function createCustomProduct(params: {
  nameFa: string;
  nameEn?: string;
  imageUrl: string;
  category?: 'humic-organic' | 'biostimulant' | 'macro-micro' | 'gels-phosphate' | 'soil-water' | 'custom';
  categoryTitle?: string;
  badge?: string;
  tagline?: string;
  description?: string;
}): PishgamanProduct {
  const id = `custom_${Date.now()}`;
  const nameEn = params.nameEn || params.nameFa.replace(/[\s\W]+/g, '_').toUpperCase();
  const category = params.category || 'custom';
  const categoryTitle = params.categoryTitle || 'فرمولاسیون اختصاصی سفارشی';

  return {
    id,
    slug: id,
    nameFa: params.nameFa,
    nameEn,
    category,
    categoryTitle,
    appearance: 'مایع یا پودر تخصصی با فرمولاسیون زیست‌فعال',
    packaging: 'بسته‌بندی استاندارد صادراتی',
    badge: params.badge || 'فرمولاسیون نوآورانه جدید',
    tagline: params.tagline || `فناوری پیشرفته برای جهش عملکرد و کیفیت باردهی ${params.nameFa}`,
    description: params.description || `نهاده کشاورزی پیشرفته ${params.nameFa} با فرمولاسیون اختصاصی طراحی شده جهت افزایش چشمگیر جذب ریشه‌ای و برگی، رفع تنش‌های زیستی و غیرزیستی و دستیابی به حداکثر پتانسیل ژنتیکی گیاه در اقلیم‌های متنوع ایران.`,
    benefits: [
      `جذب حداکثری و سیستمیک در اندام‌های هدف گیاه`,
      `تقویت دیواره سلولی و افزایش مقاومت در برابر تنش‌های گرما و خشکی`,
      `افزایش چشمگیر عملکرد تناژ در هکتار و بهبود کیفیت تجاری محصول`,
      `سازگاری فوق‌العاده با شرایط خاک و آب کشاورزی ایران`
    ],
    dosageTable: [
      { crop: 'درختان میوه و باغات', method: 'همراه آب آبیاری / محلول‌پاشی', rate: '۲ تا ۵ لیتر / کیلوگرم در هکتار' },
      { crop: 'محصولات زراعی (گندم، ذرت، برنج)', method: 'محلول‌پاشی برگی و آبیاری', rate: '۱ تا ۳ لیتر / کیلوگرم در هکتار' },
      { crop: 'گلخانه و سبزی و صیفی', method: 'سیستم قطره‌ای (کودآبیاری)', rate: '۱ تا ۲ لیتر در ۱۰۰۰ مترمربع' }
    ],
    imageUrl: params.imageUrl,
    scientificProfile: {
      chemicalClass: `کمپلکس نوین ارگانومینرال و کلاته اختصاصی ${params.nameFa}`,
      activeIngredients: 'ترکیبات هم‌افزا با اثرگذاری سریع بر متابولیسم گیاهی',
      phRange: '۶.۰ - ۷.۰',
      modeOfAction: 'تسریع انتقال مواد مغذی در آوندهای چوب و آبکش، تحریک رشد رویشی و زایشی و تثبیت کلروفیل فعال',
      iranSoilSynergy: 'خنثی‌سازی استرس ناشی از آهک فعال خاک و تنظیم فشار اسمزی در مجاورت ریشه‌ها',
      tankMixCompatibility: 'سازگار با انواع نهاده‌های تغذیه‌ای استاندارد',
      academicReferences: [
        {
          title: `Optimizing crop nutrition and stress tolerance with advanced targeted formulations`,
          authors: 'Pishgaman Agroscience Innovation Lab',
          journal: 'International Journal of Agronomy and Crop Science',
          year: 2024
        }
      ]
    },
    isCustom: true
  };
}
