/**
 * badgeTextureGenerator.ts
 *
 * Luxury Platinum / Clean White procedural Canvas texture generator for the 3D Lanyard ID Badge.
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
 * Renders the luxury platinum front and back badge faces onto a 2048x2048 canvas atlas.
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

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);

  // 1. Render FRONT FACE (Left UV Half: X = 0..1024, Y = 0..1546)
  renderFrontFace(ctx, 0, 0, 1024, 1546, avatarImg, profile);

  // 2. Render BACK FACE (Right UV Half: X = 1024..2048, Y = 0..1546)
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
  const radius = 42;
  const centerX = cardX + cardW / 2;

  ctx.save();
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  // Pure Luxury OLED Obsidian Background
  const cardBg = ctx.createLinearGradient(centerX, cardY, centerX, cardY + cardH);
  cardBg.addColorStop(0, '#18181b');
  cardBg.addColorStop(0.4, '#09090b');
  cardBg.addColorStop(1, '#000000');
  ctx.fillStyle = cardBg;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Radial Monochrome Glow behind avatar
  const glowY = cardY + 410;
  const radGlow = ctx.createRadialGradient(centerX, glowY, 40, centerX, glowY, 440);
  radGlow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  radGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
  radGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radGlow;
  ctx.fillRect(cardX, cardY, cardW, 800);

  // Minimal Punch Hole Slot Indicator
  const slotW = 150, slotH = 20;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
  drawRoundedRectPath(ctx, centerX - slotW / 2, cardY + 28, slotW, slotH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header text on LEFT and RIGHT (away from center clip)
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.university, cardX + 50, cardY + 70);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#d4d4d8';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(profile.major, cardX + cardW - 50, cardY + 70);

  // Header divider line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 115);
  ctx.lineTo(cardX + cardW - 40, cardY + 115);
  ctx.stroke();

  // Large Circular Portrait Frame
  const avatarR = 250;
  const avatarY = cardY + 395;

  // Outer Glow Ring
  ctx.save();
  ctx.shadowColor = 'rgba(255, 255, 255, 0.35)';
  ctx.shadowBlur = 35;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, avatarY, avatarR + 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner White Ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(centerX, avatarY, avatarR + 2, 0, Math.PI * 2);
  ctx.stroke();

  // Draw Avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, avatarY, avatarR, 0, Math.PI * 2);
  ctx.clip();

  if (avatarImg) {
    const aW = avatarImg.naturalWidth || avatarImg.width || 460;
    const aH = avatarImg.naturalHeight || avatarImg.height || 460;
    const cropW = aW * 0.68;
    const cropH = aH * 0.68;
    const cropX = (aW - cropW) / 2;
    const cropY = aH * 0.05;
    ctx.drawImage(avatarImg, cropX, cropY, cropW, cropH, centerX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
  } else {
    ctx.fillStyle = '#18181b';
    ctx.fillRect(centerX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO', centerX, avatarY);
  }
  ctx.restore();

  // Big, Clean, Ultra-Bold Name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 102px "Inter", "Segoe UI", sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 24;
  ctx.fillText('RIZKILLAH', centerX, cardY + 775);

  ctx.fillStyle = '#e4e4e7';
  ctx.font = '900 102px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('RAMANDA', centerX, cardY + 885);
  ctx.shadowBlur = 0;

  // Prominent Role Pill
  const pillW = 560, pillH = 72;
  const pillX = centerX - pillW / 2;
  const pillY = cardY + 975;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, pillX, pillY, pillW, pillH, 36);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 30px "JetBrains Mono", monospace';
  ctx.fillText(profile.title, centerX, pillY + pillH / 2);

  // Bottom Detail Row
  const metaY = cardY + 1115;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.fillRect(cardX + 80, metaY, cardW - 160, 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px "JetBrains Mono", monospace';
  ctx.fillText('● VERIFIED DEVELOPER', centerX, metaY + 60);

  ctx.fillStyle = '#a1a1aa';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(`@Diki04 • NIM: ${profile.idNumber}`, centerX, metaY + 105);

  // Bottom watermark
  ctx.fillStyle = '#71717a';
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillText('PEKANBARU, RIAU • INDONESIA // 2026', centerX, cardY + cardH - 50);

  // Outer border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 4;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

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
  const radius = 42;
  const backCenter = cardX + cardW / 2;

  ctx.save();
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  const cardBg = ctx.createLinearGradient(backCenter, cardY, backCenter, cardY + cardH);
  cardBg.addColorStop(0, '#18181b');
  cardBg.addColorStop(0.3, '#09090b');
  cardBg.addColorStop(1, '#000000');
  ctx.fillStyle = cardBg;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Magnetic Stripe across top
  ctx.fillStyle = '#000000';
  ctx.fillRect(cardX, cardY + 40, cardW, 95);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX, cardY + 70);
  ctx.lineTo(cardX + cardW, cardY + 70);
  ctx.stroke();

  // Header
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Inter", sans-serif';
  ctx.fillText('DEVELOPER IDENTITY PASS', backCenter, cardY + 190);

  ctx.fillStyle = '#a1a1aa';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('PORTFOLIO & SYSTEM CREDENTIALS', backCenter, cardY + 225);

  // QR Code
  const qrSize = 360;
  const qrX = backCenter - qrSize / 2;
  const qrY = cardY + 270;

  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, qrX, qrY, qrSize, qrSize, 20);
  ctx.fill();

  const qPad = 26;
  const qTgt = 68;
  drawQRTarget(ctx, qrX + qPad, qrY + qPad, qTgt);
  drawQRTarget(ctx, qrX + qrSize - qPad - qTgt, qrY + qPad, qTgt);
  drawQRTarget(ctx, qrX + qPad, qrY + qrSize - qPad - qTgt, qTgt);

  ctx.fillStyle = '#000000';
  const dotSize = 8;
  for (let r = 0; r < qrSize - qPad * 2; r += dotSize * 1.5) {
    for (let c = 0; c < qrSize - qPad * 2; c += dotSize * 1.5) {
      if ((r < qTgt + 12 && c < qTgt + 12) || (r < qTgt + 12 && c > qrSize - qPad * 2 - qTgt - 12) || (r > qrSize - qPad * 2 - qTgt - 12 && c < qTgt + 12)) continue;
      const v = (Math.sin(r * 12.98 + c * 78.23) * 43758.54) % 1;
      if (Math.abs(v) > 0.44) {
        ctx.fillRect(qrX + qPad + c, qrY + qPad + r, dotSize, dotSize);
      }
    }
  }

  const qLogo = 60;
  ctx.fillStyle = '#000000';
  drawRoundedRectPath(ctx, backCenter - qLogo / 2, qrY + qrSize / 2 - qLogo / 2, qLogo, qLogo, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('RR', backCenter, qrY + qrSize / 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Inter", sans-serif';
  ctx.fillText(profile.name, backCenter, qrY + qrSize + 50);

  ctx.fillStyle = '#d4d4d8';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText(profile.github, backCenter, qrY + qrSize + 88);

  ctx.fillStyle = '#a1a1aa';
  ctx.font = '600 16px "JetBrains Mono", monospace';
  ctx.fillText(profile.website, backCenter, qrY + qrSize + 118);

  // Contact Info Pills on Back
  const backPillsY = cardY + 830;
  const backSpecs = [
    { k: 'LOCATION', v: profile.location },
    { k: 'EMAIL', v: profile.email }
  ];
  backSpecs.forEach((bs, i) => {
    const by = backPillsY + i * 50;
    const bw = 700;
    const bx = backCenter - bw / 2;
    ctx.fillStyle = 'rgba(24, 24, 27, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    drawRoundedRectPath(ctx, bx, by, bw, 42, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(bs.k, bx + 20, by + 21);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(bs.v, bx + bw - 20, by + 21);
  });

  // Signature Strip
  const sigW = 700;
  const sigH = 80;
  const sigX = backCenter - sigW / 2;
  const sigY = cardY + 950;
  ctx.fillStyle = '#f4f4f5';
  drawRoundedRectPath(ctx, sigX, sigY, sigW, sigH, 12);
  ctx.fill();

  ctx.fillStyle = '#71717a';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE', sigX + 20, sigY + 22);

  ctx.fillStyle = '#09090b';
  ctx.font = 'italic bold 28px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rizkillah Ramanda', backCenter, sigY + 54);

  // Bottom Disclaimer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#71717a';
  ctx.font = '13px "Inter", sans-serif';
  ctx.fillText('This pass authenticates Rizkillah Ramanda Sinyo as a verified developer.', backCenter, cardY + 1070);
  ctx.fillText('Universitas Riau • Department of Informatics Engineering', backCenter, cardY + 1095);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  ctx.restore();
}

function drawQRTarget(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = '#000000';
  drawRoundedRectPath(ctx, x, y, s, s, 10);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x + 10, y + 10, s - 20, s - 20, 6);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  drawRoundedRectPath(ctx, x + 20, y + 20, s - 40, s - 40, 4);
  ctx.fill();
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
