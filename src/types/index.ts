/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AspectRatio = '1:1' | '9:16' | '4:5' | '16:9';

export interface PosterBadge {
  id: string;
  text: string;
  icon: string;
  color: 'emerald' | 'amber' | 'blue' | 'purple' | 'red';
}

export interface PosterConfig {
  id: string;
  name: string;
  aspectRatio: AspectRatio;
  
  // Background
  bgType: 'image' | 'gradient';
  bgImageUrl: string;
  bgGradient: string;
  overlayOpacity: number;
  overlayColor: string;
  vignette: boolean;
  sunFlare: boolean;
  particles: boolean;
  
  // Product image
  productImgUrl: string;
  removeBg: boolean;
  bgRemoveSensitivity: number; // 0 to 100
  productScale: number; // 0.4 to 1.5
  productPosX: number; // 0 to 100 (%)
  productPosY: number; // 0 to 100 (%)
  productShadowIntensity: number; // 0 to 1
  productReflection: boolean;
  productGlow: boolean;
  productGlowColor: string;
  
  // Branding & Text
  companyName: string;
  companySubtext: string;
  logoUrl?: string;
  
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  description: string;
  
  features: string[];
  badges: PosterBadge[];
  
  // Call to action & Footer
  callToAction: string;
  contactInfo: string;
  volumeTag: string; // e.g. "حجم ۶ لیتر / وزن بالا"
  
  // Style theme
  theme: 'corteva' | 'syngenta' | 'yara' | 'haifa-dark' | 'emerald-bio' | 'gold-harvest';
  primaryColor: string;
  accentColor: string;
}

export interface CropGuideItem {
  name: string;
  category: 'باغی' | 'زراعی' | 'گلخانه‌ای';
  icon: string;
  timing: string;
  soilDose: string;
  foliarDose: string;
  keyBenefit: string;
  notes: string;
}

export interface ResearchSection {
  id: string;
  title: string;
  summary: string;
  details: string[];
  scientificRef: string;
}
