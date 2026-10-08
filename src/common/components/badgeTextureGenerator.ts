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

  ctx.fillStyle = '#0f172a';
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

  // Luxury White / Platinum Card Surface
  const cardBg = ctx.createLinearGradient(centerX, cardY, centerX, cardY + cardH);
  cardBg.addColorStop(0, '#ffffff');
  cardBg.addColorStop(0.5, '#f8fafc');
  cardBg.addColorStop(1, '#f1f5f9');
  ctx.fillStyle = cardBg;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Top accent band (Navy / Blue)
  const topBandH = 110;
  const topBandGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
  topBandGrad.addColorStop(0, '#0f172a');
  topBandGrad.addColorStop(0.6, '#0369a1');
  topBandGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = topBandGrad;
  ctx.fillRect(cardX, cardY, cardW, topBandH);

  // Top Bar text
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.university, cardX + 36, cardY + 55);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText(profile.faculty, cardX + 36, cardY + 80);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.major, cardX + cardW - 36, cardY + 55);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('● OFFICIAL PASS 2026', cardX + cardW - 36, cardY + 80);

  // User Photo (Large, zoomed on head and shoulders)
  const photoW = 560;
  const photoH = 580;
  const photoX = centerX - photoW / 2;
  const photoY = cardY + 160;
  const photoR = 28;

  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.15)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoR);
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoR);
  ctx.clip();

  if (avatarImg) {
    const aW = avatarImg.naturalWidth || avatarImg.width || 460;
    const aH = avatarImg.naturalHeight || avatarImg.height || 460;
    const cropW = aW * 0.58;
    const cropH = aH * 0.60;
    const cropX = (aW - cropW) / 2;
    const cropY = aH * 0.04;
    ctx.drawImage(avatarImg, cropX, cropY, cropW, cropH, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(photoX, photoY, photoW, photoH);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO', centerX, photoY + photoH / 2);
  }
  ctx.restore();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.5;
  drawRoundedRectPath(ctx, photoX, photoY, photoW, photoH, photoR);
  ctx.stroke();

  // Name (Large, Bold, Sharp)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 64px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.name, centerX, cardY + 805);

  // Role Pill
  const rolePillW = 420;
  const rolePillH = 46;
  const rolePillX = centerX - rolePillW / 2;
  const rolePillY = cardY + 855;
  ctx.fillStyle = '#f0f9ff';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, rolePillX, rolePillY, rolePillW, rolePillH, 23);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0369a1';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText(profile.title, centerX, rolePillY + 23);

  // Subtitle
  ctx.fillStyle = '#64748b';
  ctx.font = '600 20px "Inter", sans-serif';
  ctx.fillText('Teknik Informatika • Universitas Riau', centerX, cardY + 940);

  // Divider
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 50, cardY + 985);
  ctx.lineTo(cardX + cardW - 50, cardY + 985);
  ctx.stroke();

  // 3 Spec Pills (NIM, Stack, Role)
  const pillsY = cardY + 1015;
  const specData = [
    { label: 'NIM', val: profile.idNumber },
    { label: 'STACK', val: 'NEXT.JS • TS • PYTHON' },
    { label: 'ROLE', val: 'FULL-STACK' },
  ];

  const specBoxW = 270;
  const specGap = 20;
  const startSpecX = centerX - (specBoxW * 3 + specGap * 2) / 2;

  specData.forEach((s, idx) => {
    const bx = startSpecX + idx * (specBoxW + specGap);
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    drawRoundedRectPath(ctx, bx, pillsY, specBoxW, 70, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText(s.label, bx + specBoxW / 2, pillsY + 22);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(s.val, bx + specBoxW / 2, pillsY + 48);
  });

  // Modern Vector Barcode
  const bcY = cardY + 1120;
  const bcW = 680;
  const bcH = 65;
  const bcX = centerX - bcW / 2;

  ctx.fillStyle = '#0f172a';
  const pattern = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2, 4, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1, 2, 3, 1, 1, 4];
  let curX = bcX;
  let pIdx = 0;
  while (curX < bcX + bcW) {
    const barW = pattern[pIdx % pattern.length] * 2.2;
    const isGap = pIdx % 2 === 1;
    if (!isGap) {
      ctx.fillRect(curX, bcY, Math.min(barW, bcX + bcW - curX), bcH);
    }
    curX += barW + 1.8;
    pIdx++;
  }

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText(`* RR - ${profile.idNumber} - 2026 - UNRI *`, centerX, bcY + bcH + 25);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('PEKANBARU, RIAU • INDONESIA • AUTHORIZED ID PASS', centerX, cardY + cardH - 35);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
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

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Magnetic Stripe across top
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(cardX, cardY + 40, cardW, 95);

  // Header
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px "Inter", sans-serif';
  ctx.fillText('DEVELOPER IDENTITY PASS', backCenter, cardY + 190);

  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('PORTFOLIO & SYSTEM CREDENTIALS', backCenter, cardY + 225);

  // QR Code
  const qrSize = 360;
  const qrX = backCenter - qrSize / 2;
  const qrY = cardY + 270;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, qrX, qrY, qrSize, qrSize, 20);
  ctx.fill();
  ctx.stroke();

  const qPad = 26;
  const qTgt = 68;
  drawQRTarget(ctx, qrX + qPad, qrY + qPad, qTgt);
  drawQRTarget(ctx, qrX + qrSize - qPad - qTgt, qrY + qPad, qTgt);
  drawQRTarget(ctx, qrX + qPad, qrY + qrSize - qPad - qTgt, qTgt);

  ctx.fillStyle = '#0f172a';
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
  ctx.fillStyle = '#0f172a';
  drawRoundedRectPath(ctx, backCenter - qLogo / 2, qrY + qrSize / 2 - qLogo / 2, qLogo, qLogo, 12);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('RR', backCenter, qrY + qrSize / 2);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 28px "Inter", sans-serif';
  ctx.fillText(profile.name, backCenter, qrY + qrSize + 50);

  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText(profile.github, backCenter, qrY + qrSize + 88);

  ctx.fillStyle = '#64748b';
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
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    drawRoundedRectPath(ctx, bx, by, bw, 42, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(bs.k, bx + 20, by + 21);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(bs.v, bx + bw - 20, by + 21);
  });

  // Signature Strip
  const sigW = 700;
  const sigH = 80;
  const sigX = backCenter - sigW / 2;
  const sigY = cardY + 950;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, sigX, sigY, sigW, sigH, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE', sigX + 20, sigY + 22);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'italic bold 28px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rizkillah Ramanda', backCenter, sigY + 54);

  // Bottom Disclaimer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '13px "Inter", sans-serif';
  ctx.fillText('This pass authenticates Rizkillah Ramanda Sinyo as a verified developer.', backCenter, cardY + 1070);
  ctx.fillText('Universitas Riau • Department of Informatics Engineering', backCenter, cardY + 1095);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  ctx.restore();
}

function drawQRTarget(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = '#0f172a';
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
