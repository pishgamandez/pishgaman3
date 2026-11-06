/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PosterConfig } from '../types';

interface PosterCanvasProps {
  config: PosterConfig;
  onExportReady?: (exportFn: () => void) => void;
  className?: string;
}

export const PosterCanvas: React.FC<PosterCanvasProps> = ({
  config,
  onExportReady,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRendering, setIsRendering] = useState(true);
  
  // Cache processed product image data to avoid re-keying background on every small slider change
  const cachedProcessedImgRef = useRef<{ url: string; sensitivity: number; removeBg: boolean; img: HTMLCanvasElement | HTMLImageElement | null }>({
    url: '',
    sensitivity: -1,
    removeBg: false,
    img: null
  });

  // Determine canvas width and height based on aspect ratio
  const getCanvasDimensions = useCallback(() => {
    switch (config.aspectRatio) {
      case '1:1':
        return { width: 1200, height: 1200 };
      case '9:16':
        return { width: 1080, height: 1920 };
      case '4:5':
        return { width: 1200, height: 1500 };
      case '16:9':
        return { width: 1920, height: 1080 };
      default:
        return { width: 1200, height: 1500 };
    }
  }, [config.aspectRatio]);

  // Process product image (remove white studio background if enabled)
  const getProcessedProductImage = useCallback(async (
    imgUrl: string,
    removeBg: boolean,
    sensitivity: number
  ): Promise<HTMLCanvasElement | HTMLImageElement> => {
    // Check cache
    if (
      cachedProcessedImgRef.current.url === imgUrl &&
      cachedProcessedImgRef.current.removeBg === removeBg &&
      cachedProcessedImgRef.current.sensitivity === sensitivity &&
      cachedProcessedImgRef.current.img
    ) {
      return cachedProcessedImgRef.current.img;
    }

    const rawImg = new Image();
    rawImg.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      rawImg.onload = () => resolve();
      rawImg.onerror = () => reject(new Error('Failed to load product image'));
      rawImg.src = imgUrl;
    });

    if (!removeBg) {
      cachedProcessedImgRef.current = { url: imgUrl, removeBg, sensitivity, img: rawImg };
      return rawImg;
    }

    // Process on offscreen canvas to remove white background with edge preservation
    const offCanvas = document.createElement('canvas');
    offCanvas.width = rawImg.naturalWidth || rawImg.naturalHeight; // Using width/height or natural
    offCanvas.height = rawImg.naturalHeight || rawImg.naturalWidth;
    offCanvas.width = rawImg.naturalWidth;
    offCanvas.height = rawImg.naturalHeight;
    const ctx = offCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return rawImg;

    ctx.drawImage(rawImg, 0, 0);
    const imgData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    const data = imgData.data;

    // Much higher default threshold (less aggressive)
    // Dark pixels protection: If pixel is 'dark enough', keep it, regardless of brightness.
    // The user mentioned text was being erased, which is dark.
    const darknessThreshold = 100; // Protection for text/labels

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const darkness = (r + g + b) / 3;

      // If it's dark, keep it! (This protects the green/black text)
      if (darkness < darknessThreshold) continue;

      // Only remove if it's very bright (background)
      const threshold = 235 + (sensitivity / 5); // 235-255 range

      if (r > threshold && g > threshold && b > threshold) {
        data[i + 3] = 0; // Transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    cachedProcessedImgRef.current = { url: imgUrl, removeBg, sensitivity, img: offCanvas };
    return offCanvas;
  }, []);

  // Main render routine
  const renderCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);
    const { width, height } = getCanvasDimensions();
    canvas.width = width;
    canvas.height = height;

    // 1. Draw Background
    if (config.bgType === 'image' && config.bgImageUrl) {
      try {
        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        await new Promise<void>((res) => {
          bgImg.onload = () => res();
          bgImg.onerror = () => res();
          bgImg.src = config.bgImageUrl;
        });

        // Cover fit
        const scale = Math.max(width / bgImg.width, height / bgImg.height);
        const x = (width - bgImg.width * scale) / 2;
        const y = (height - bgImg.height * scale) / 2;
        ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
      } catch {
        // Fallback gradient if image fails
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#06281e');
        grad.addColorStop(1, '#02120e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    } else {
      // Custom gradient background
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 100,
        width * 0.5, height * 0.5, Math.max(width, height)
      );
      if (config.theme === 'syngenta' || config.theme === 'gold-harvest') {
        grad.addColorStop(0, '#78350f');
        grad.addColorStop(0.5, '#291305');
        grad.addColorStop(1, '#0b0804');
      } else if (config.theme === 'haifa-dark') {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(0.45, '#022c22');
        grad.addColorStop(1, '#050b14');
      } else {
        grad.addColorStop(0, '#04382c');
        grad.addColorStop(0.5, '#021a14');
        grad.addColorStop(1, '#030806');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Overlay tint for readability
    if (config.overlayOpacity > 0) {
      ctx.fillStyle = config.overlayColor || '#000000';
      ctx.globalAlpha = config.overlayOpacity;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;
    }

    // 3. Cinematic Vignette
    if (config.vignette) {
      const vGrad = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.35,
        width / 2, height / 2, Math.max(width, height) * 0.75
      );
      vGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vGrad.addColorStop(1, 'rgba(0,0,0,0.72)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 4. Sun flare / God rays
    if (config.sunFlare) {
      const flareX = width * 0.85;
      const flareY = height * 0.12;
      const flareGrad = ctx.createRadialGradient(flareX, flareY, 10, flareX, flareY, width * 0.65);
      flareGrad.addColorStop(0, 'rgba(255, 245, 200, 0.45)');
      flareGrad.addColorStop(0.2, 'rgba(251, 191, 36, 0.22)');
      flareGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
      flareGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = flareGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // 5. Floating nutrient / bio particles
    if (config.particles) {
      ctx.save();
      const seed = 42;
      for (let i = 0; i < 40; i++) {
        const px = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280 * width;
        const py = ((seed * (i + 7) * 49297 + 9301) % 233280) / 233280 * height;
        const pr = (i % 4) + 1.5;
        const pAlpha = 0.2 + ((i % 5) * 0.12);

        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? `rgba(52, 211, 153, ${pAlpha})` : `rgba(251, 191, 36, ${pAlpha})`;
        ctx.shadowColor = i % 2 === 0 ? '#34d399' : '#fbbf24';
        ctx.shadowBlur = pr * 3;
        ctx.fill();
      }
      ctx.restore();
    }

    // 6. Draw Product Image with high-fidelity studio shadow & positioning
    try {
      const productAsset = await getProcessedProductImage(
        config.productImgUrl,
        config.removeBg,
        config.bgRemoveSensitivity
      );

      const pNaturalWidth = 'naturalWidth' in productAsset ? productAsset.naturalWidth : productAsset.width;
      const pNaturalHeight = 'naturalHeight' in productAsset ? productAsset.naturalHeight : productAsset.height;
      const aspectRatio = pNaturalWidth / pNaturalHeight;

      // Base target height relative to canvas height
      const targetHeight = height * 0.48 * config.productScale;
      const targetWidth = targetHeight * aspectRatio;

      const pX = (width * (config.productPosX / 100)) - (targetWidth / 2);
      const pY = (height * (config.productPosY / 100)) - (targetHeight / 2);

      // Floor Shadow
      if (config.productShadowIntensity > 0) {
        ctx.save();
        const shadowY = pY + targetHeight * 0.94;
        const shadowWidth = targetWidth * 0.95;
        const shadowHeight = targetHeight * 0.12;
        const shadowCenterX = pX + targetWidth / 2;

        // Soft ambient floor shadow
        const shadowGrad = ctx.createRadialGradient(
          shadowCenterX, shadowY, shadowWidth * 0.1,
          shadowCenterX, shadowY, shadowWidth * 0.55
        );
        shadowGrad.addColorStop(0, `rgba(0, 0, 0, ${0.9 * config.productShadowIntensity})`);
        shadowGrad.addColorStop(0.4, `rgba(0, 0, 0, ${0.5 * config.productShadowIntensity})`);
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.ellipse(shadowCenterX, shadowY, shadowWidth * 0.55, shadowHeight * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Contact occlusion shadow (tight dark line right under bucket base)
        ctx.fillStyle = `rgba(0, 0, 0, ${0.95 * config.productShadowIntensity})`;
        ctx.beginPath();
        ctx.ellipse(shadowCenterX, pY + targetHeight * 0.96, shadowWidth * 0.38, targetHeight * 0.025, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Product Back Glow
      if (config.productGlow) {
        ctx.save();
        const glowGrad = ctx.createRadialGradient(
          pX + targetWidth / 2, pY + targetHeight / 2, targetWidth * 0.2,
          pX + targetWidth / 2, pY + targetHeight / 2, targetWidth * 0.75
        );
        glowGrad.addColorStop(0, `${config.productGlowColor}55`);
        glowGrad.addColorStop(0.5, `${config.productGlowColor}1f`);
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(pX - targetWidth * 0.5, pY - targetHeight * 0.3, targetWidth * 2, targetHeight * 1.6);
        ctx.restore();
      }

      // Subtle floor reflection
      if (config.productReflection) {
        ctx.save();
        ctx.translate(0, pY + targetHeight * 1.95);
        ctx.scale(1, -0.25);
        ctx.globalAlpha = 0.18;
        ctx.drawImage(productAsset, pX, pY, targetWidth, targetHeight);
        ctx.restore();
      }

      // Draw the pristine product bucket
      ctx.drawImage(productAsset, pX, pY, targetWidth, targetHeight);
    } catch (err) {
      console.error('Error drawing product:', err);
    }

    // 7. Typography and Layout (RTL Persian / International style)
    ctx.save();
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    const marginX = width * 0.08;
    const topMargin = height * 0.06;

    // Header: Brand / Company Name
    ctx.font = 'bold 34px Vazirmatn, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(config.companyName, width - marginX, topMargin);

    // Company Subtitle / English Tag
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = config.accentColor || '#34d399';
    ctx.fillText(config.companySubtext, width - marginX, topMargin + 44);

    // Subtle Brand Divider Line
    const lineGrad = ctx.createLinearGradient(width - marginX - 350, topMargin + 75, width - marginX, topMargin + 75);
    lineGrad.addColorStop(0, 'rgba(255,255,255,0)');
    lineGrad.addColorStop(1, config.accentColor || '#34d399');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(width - marginX - 350, topMargin + 72);
    ctx.lineTo(width - marginX, topMargin + 72);
    ctx.stroke();

    // Main Headline
    let textY = topMargin + 105;
    ctx.font = '900 48px Vazirmatn, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 15;
    ctx.fillText(config.headline, width - marginX, textY);
    ctx.shadowBlur = 0;

    // Headline Highlight (Golden or Emerald glowing subtitle)
    textY += 62;
    ctx.font = '800 36px Vazirmatn, sans-serif';
    ctx.fillStyle = config.accentColor || '#fbbf24';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 10;
    ctx.fillText(config.headlineHighlight, width - marginX, textY);
    ctx.shadowBlur = 0;

    // Sub-headline / Product Model Tag
    textY += 56;
    ctx.font = '700 24px Vazirmatn, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(config.subheadline, width - marginX, textY);

    // Feature bullet cards (rendered on upper-right or side depending on aspect ratio)
    textY += 50;
    const maxFeatures = config.aspectRatio === '16:9' ? 2 : 4;
    config.features.slice(0, maxFeatures).forEach((feature, idx) => {
      const itemY = textY + (idx * 38);

      // Icon bullet
      ctx.beginPath();
      ctx.arc(width - marginX - 10, itemY + 12, 6, 0, Math.PI * 2);
      ctx.fillStyle = config.primaryColor || '#10b981';
      ctx.shadowColor = config.primaryColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Text
      ctx.font = '600 20px Vazirmatn, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(feature, width - marginX - 28, itemY);
    });

    // Badges / Quality Seals (on top-left)
    const badgeStartX = marginX;
    let badgeY = topMargin + 20;
    config.badges.forEach((badge) => {
      const badgeWidth = 220;
      const badgeHeight = 44;

      // Badge background pill
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.strokeStyle = badge.color === 'amber' ? '#f59e0b' : badge.color === 'emerald' ? '#10b981' : '#38bdf8';
      ctx.lineWidth = 1.5;

      // Rounded rect
      ctx.beginPath();
      const r = 12;
      ctx.roundRect(badgeStartX, badgeY, badgeWidth, badgeHeight, r);
      ctx.fill();
      ctx.stroke();

      // Badge text
      ctx.font = 'bold 18px Vazirmatn, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(badge.text, badgeStartX + badgeWidth / 2, badgeY + badgeHeight / 2);
      ctx.restore();

      badgeY += badgeHeight + 14;
    });

    // Volume Tag pill on lower-left
    if (config.volumeTag) {
      ctx.save();
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const volY = height - 120;
      const volWidth = 320;
      const volHeight = 46;

      ctx.fillStyle = 'rgba(6, 78, 59, 0.85)';
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(marginX, volY, volWidth, volHeight, 14);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 18px Vazirmatn, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(config.volumeTag, marginX + 20, volY + volHeight / 2);
      ctx.restore();
    }

    // Bottom Bar (Footer banner with CTA & Contact Info)
    const bottomBarHeight = height * 0.085;
    const bottomBarY = height - bottomBarHeight;

    // Bottom bar background
    const footerGrad = ctx.createLinearGradient(0, bottomBarY, width, bottomBarY);
    footerGrad.addColorStop(0, 'rgba(12, 20, 36, 0.95)');
    footerGrad.addColorStop(0.5, 'rgba(6, 40, 30, 0.95)');
    footerGrad.addColorStop(1, 'rgba(12, 20, 36, 0.95)');
    ctx.fillStyle = footerGrad;
    ctx.fillRect(0, bottomBarY, width, bottomBarHeight);

    // Accent top border on footer
    ctx.strokeStyle = config.accentColor || '#34d399';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, bottomBarY);
    ctx.lineTo(width, bottomBarY);
    ctx.stroke();

    // Footer CTA and Contact info
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 22px Vazirmatn, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(config.callToAction, width - marginX, bottomBarY + bottomBarHeight / 2);

    ctx.textAlign = 'left';
    ctx.font = '600 18px Vazirmatn, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(config.contactInfo, marginX, bottomBarY + bottomBarHeight / 2);

    ctx.restore();
    setIsRendering(false);
  }, [config, getCanvasDimensions, getProcessedProductImage]);

  // Re-render when config changes
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Export high-res PNG
  const handleExport = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    const safeTitle = (config.name || 'pishgaman-tiger-poster')
      .replace(/[^\w\u0600-\u06FF]/g, '_')
      .slice(0, 35);
    link.download = `${safeTitle}-${config.aspectRatio}.png`;
    link.href = dataUrl;
    link.click();
  }, [config.name, config.aspectRatio]);

  // Provide export function to parent
  useEffect(() => {
    if (onExportReady) {
      onExportReady(handleExport);
    }
  }, [onExportReady, handleExport]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-slate-700/60 bg-slate-950 transition-all duration-200"
      />
      {isRendering && (
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center rounded-2xl">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span>در حال رندر استودیویی با کیفیت رتینا...</span>
          </div>
        </div>
      )}
    </div>
  );
};
