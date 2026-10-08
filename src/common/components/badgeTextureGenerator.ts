/**
 * badgeTextureGenerator.ts
 *
 * Minimalist, high-end procedural Canvas texture generator for the 3D Lanyard ID Badge.
 * Focuses on prominent photo framing, large clean typography, and subtle micro-details.
 * Maps front face to UV rect [0, 0, 0.5, 0.755] and back face to [0.5, 0, 0.5, 0.757].
 */

export interface BadgeProfileData {
  name: string;
  nickname: string;
  title: string;
  idNumber: string;
  university: string;
  faculty: string;
  major: string;
  github: string;
  email: string;
  website: string;
  location: string;
}

export const DEFAULT_BADGE_PROFILE: BadgeProfileData = {
  name: 'RIZKILLAH RAMANDA',
  nickname: 'DIKI SINYO',
  title: 'SOFTWARE ENGINEER',
  idNumber: '2207112586',
  university: 'UNIVERSITAS RIAU',
  faculty: 'FAKULTAS TEKNIK',
  major: 'TEKNIK INFORMATIKA',
  github: 'github.com/Diki04',
  email: 'rizkillahramanda@gmail.com',
  website: 'rizkillahramanda.my.id',
  location: 'Pekanbaru, Riau, ID',
};

/**
 * Renders the front and back badge faces onto a 2048x2048 canvas atlas.
 */
export function generateBadgeAtlas(
  canvas: HTMLCanvasElement,
  baseImg: HTMLImageElement | null,
  avatarImg: HTMLImageElement | null,
  profile: BadgeProfileData = DEFAULT_BADGE_PROFILE
): void {
  const W = 2048;
  const H = 2048;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Draw base model texture as foundation (preserves metal clamp/bevel mappings)
  if (baseImg) {
    ctx.drawImage(baseImg, 0, 0, W, H);
  } else {
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, W, H);
  }

  // 2. Render FRONT FACE (Left UV Half: X = 0..1024, Y = 0..1546)
  renderFrontFace(ctx, 0, 0, 1024, 1546, avatarImg, profile);

  // 3. Render BACK FACE (Right UV Half: X = 1024..2048, Y = 0..1546)
  renderBackFace(ctx, 1024, 0, 1024, 1546, profile);
}

function renderFrontFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  avatarImg: HTMLImageElement | null,
  profile: BadgeProfileData
) {
  const pad = 36;
  const cardX = x + pad;
  const cardY = y + pad;
  const cardW = w - pad * 2;
  const cardH = h - pad * 2;
  const radius = 40;
  const centerX = cardX + cardW / 2;

  ctx.save();

  // Clip to rounded badge
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  // Clean, deep obsidian luxury background
  const bgGrad = ctx.createLinearGradient(centerX, cardY, centerX, cardY + cardH);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(0.35, '#090d16');
  bgGrad.addColorStop(1, '#06080e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Subtle clean border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  // Minimal corner tick accents
  drawMinimalCorners(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 20);

  // --- 1. TOP SUBTLE HEADER (Clear of metal clamp at center) ---
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 17px "JetBrains Mono", monospace';
  ctx.fillText('UNIVERSITAS RIAU', cardX + 44, cardY + 56);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748b';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText('DEV PASS // 2026', cardX + cardW - 44, cardY + 56);

  // --- 2. LARGE PROMINENT PHOTO OF USER ---
  // Large portrait squircle: width 540, height 560
  const photoW = 540;
  const photoH = 560;
  const photoX = centerX - photoW / 2;
  const photoY = cardY + 140;
  const photoRadius = 32;

  // Photo container shadow & border
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 15;
  ctx.fillStyle = '#111827';
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.fill();
  ctx.restore();

  // Clip photo inside container
  ctx.save();
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.clip();

  if (avatarImg) {
    const aW = avatarImg.naturalWidth || avatarImg.width || 460;
    const aH = avatarImg.naturalHeight || avatarImg.height || 460;

    // ZOOM & FRAME DIRECTLY ON USER'S FACE & SHOULDERS
    // In avatar.jpg, face center is around x=0.49, y=0.28 (head & shoulders occupy upper 60%)
    const cropW = aW * 0.58;
    const cropH = aH * 0.60;
    const cropX = (aW - cropW) / 2;
    const cropY = aH * 0.04; // Start near top to cleanly capture hair, face & suit collar

    ctx.drawImage(avatarImg, cropX, cropY, cropW, cropH, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO', centerX, photoY + photoH / 2);
  }
  ctx.restore();

  // Subtle clean border around photo
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 2.5;
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.stroke();

  // Minimal status indicator pill at bottom right of photo
  const statW = 120;
  const statH = 28;
  const statX = photoX + photoW - statW - 14;
  const statY = photoY + photoH - statH - 14;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, statX, statY, statW, statH, 14);
  ctx.fill();
  ctx.stroke();

  // Green active dot
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(statX + 16, statY + 14, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ACTIVE', statX + statW / 2 + 8, statY + 14);

  // --- 3. LARGE, CLEAN, BOLD NAME & TITLE ---
  // Big primary name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 62px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.name, centerX, cardY + 775);

  // Role subtitle
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.fillText(profile.title, centerX, cardY + 835);

  // University & Department subtext
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px "Inter", sans-serif';
  ctx.fillText('Teknik Informatika • Universitas Riau', centerX, cardY + 880);

  // --- 4. SUBTLE DIVIDER & MINIMAL DETAIL BARCODE ---
  const divY = cardY + 935;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 60, divY);
  ctx.lineTo(cardX + cardW - 60, divY);
  ctx.stroke();

  // Clean Slim Barcode
  const bcW = 560;
  const bcH = 65;
  const bcX = centerX - bcW / 2;
  const bcY = cardY + 965;
  drawCleanBarcode(ctx, bcX, bcY, bcW, bcH);

  // Serial & Microtext below barcode
  ctx.fillStyle = '#64748b';
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`ID // RR-${profile.idNumber}-UNRI`, centerX, cardY + 1060);

  // Bottom minimalist detail tag
  ctx.fillStyle = '#475569';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('OFFICIAL STUDENT & DEVELOPER CREDENTIAL', centerX, cardY + 1400);

  ctx.restore();
}

function renderBackFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  profile: BadgeProfileData
) {
  const pad = 36;
  const cardX = x + pad;
  const cardY = y + pad;
  const cardW = w - pad * 2;
  const cardH = h - pad * 2;
  const radius = 40;
  const centerX = cardX + cardW / 2;

  ctx.save();

  // Clip to rounded badge
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  // Clean, deep obsidian luxury background
  const bgGrad = ctx.createLinearGradient(centerX, cardY, centerX, cardY + cardH);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(0.35, '#090d16');
  bgGrad.addColorStop(1, '#06080e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Subtle clean border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  drawMinimalCorners(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 20);

  // Magnetic stripe across top
  const magY = cardY + 40;
  const magH = 90;
  ctx.fillStyle = '#05070d';
  ctx.fillRect(cardX, magY, cardW, magH);

  // Header
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('DEVELOPER IDENTITY PASS', centerX, cardY + 185);

  // Large Clean QR Code
  const qrSize = 380;
  const qrX = centerX - qrSize / 2;
  const qrY = cardY + 235;
  drawMinimalQRCode(ctx, qrX, qrY, qrSize, 'https://rizkillahramanda.my.id');

  // URL & Handle
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Inter", sans-serif';
  ctx.fillText(profile.name, centerX, qrY + qrSize + 48);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText(profile.github, centerX, qrY + qrSize + 85);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillText(profile.website, centerX, qrY + qrSize + 115);

  // Clean White Signature Strip
  const sigW = 600;
  const sigH = 80;
  const sigX = centerX - sigW / 2;
  const sigY = cardY + 940;
  ctx.fillStyle = '#f1f5f9';
  drawRoundedRectPath(ctx, sigX, sigY, sigW, sigH, 12);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE', sigX + 20, sigY + 22);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'italic bold 28px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rizkillah Ramanda', centerX, sigY + 54);

  // Bottom Return Notice
  ctx.textAlign = 'center';
  ctx.fillStyle = '#475569';
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('IF FOUND, PLEASE RETURN TO: rizkillahramanda@gmail.com', centerX, cardY + 1400);

  ctx.restore();
}

/**
 * Clean, modern slim barcode.
 */
function drawCleanBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

  const pattern = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2, 4, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1, 2, 3, 1, 1, 4];
  let curX = x;
  const maxX = x + w;
  let pIdx = 0;

  while (curX < maxX) {
    const barW = pattern[pIdx % pattern.length] * 2.2;
    const isGap = pIdx % 2 === 1;
    if (!isGap) {
      ctx.fillRect(curX, y, Math.min(barW, maxX - curX), h);
    }
    curX += barW + 1.6;
    pIdx++;
  }
  ctx.restore();
}

/**
 * Minimalist QR Code.
 */
function drawMinimalQRCode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  url: string
) {
  ctx.save();

  // White base plate with rounded corners
  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x, y, size, size, 20);
  ctx.fill();

  const pad = 28;
  const targetSize = 68;
  drawQRTarget(ctx, x + pad, y + pad, targetSize);
  drawQRTarget(ctx, x + size - pad - targetSize, y + pad, targetSize);
  drawQRTarget(ctx, x + pad, y + size - pad - targetSize, targetSize);

  // Data modules
  ctx.fillStyle = '#090d16';
  const dotSize = 8;
  const startX = x + pad;
  const startY = y + pad;
  const maxW = size - pad * 2;

  let hash = 2166136261;
  for (let i = 0; i < url.length; i++) {
    hash ^= url.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < maxW; r += dotSize * 1.5) {
    for (let c = 0; c < maxW; c += dotSize * 1.5) {
      const inTopLeft = r < targetSize + 12 && c < targetSize + 12;
      const inTopRight = r < targetSize + 12 && c > maxW - targetSize - 12;
      const inBottomLeft = r > maxW - targetSize - 12 && c < targetSize + 12;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      const val = (Math.sin((r + startX) * 12.9898 + (c + startY) * 78.233 + hash) * 43758.5453) % 1;
      if (Math.abs(val) > 0.44) {
        ctx.fillRect(startX + c, startY + r, dotSize, dotSize);
      }
    }
  }

  // Cyan Center Badge
  const centerW = 60;
  const centerH = 60;
  const cx = x + size / 2 - centerW / 2;
  const cy = y + size / 2 - centerH / 2;
  ctx.fillStyle = '#0f172a';
  drawRoundedRectPath(ctx, cx, cy, centerW, centerH, 12);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RR', x + size / 2, y + size / 2);

  ctx.restore();
}

function drawQRTarget(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = '#090d16';
  drawRoundedRectPath(ctx, x, y, s, s, 10);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x + 10, y + 10, s - 20, s - 20, 6);
  ctx.fill();

  ctx.fillStyle = '#090d16';
  drawRoundedRectPath(ctx, x + 20, y + 20, s - 40, s - 40, 4);
  ctx.fill();
}

function drawMinimalCorners(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number
) {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
