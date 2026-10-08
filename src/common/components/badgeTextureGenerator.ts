/**
 * badgeTextureGenerator.ts
 *
 * Ultra-high-resolution procedural Canvas texture generator for the 3D Lanyard ID Badge.
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
  title: 'SOFTWARE ENGINEER & ML',
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
  const radius = 42;

  ctx.save();

  // Clip to rounded badge
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  // Background Gradient (Midnight Obsidian with deep Cyan Glow)
  const bgGrad = ctx.createRadialGradient(
    cardX + cardW / 2,
    cardY + 380,
    80,
    cardX + cardW / 2,
    cardY + cardH / 2,
    cardH * 0.7
  );
  bgGrad.addColorStop(0, '#0c1a30');
  bgGrad.addColorStop(0.45, '#080e1c');
  bgGrad.addColorStop(1, '#04070d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Cyber Grid Pattern
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let gx = cardX; gx <= cardX + cardW; gx += gridSize) {
    ctx.beginPath();
    ctx.moveTo(gx, cardY);
    ctx.lineTo(gx, cardY + cardH);
    ctx.stroke();
  }
  for (let gy = cardY; gy <= cardY + cardH; gy += gridSize) {
    ctx.beginPath();
    ctx.moveTo(cardX, gy);
    ctx.lineTo(cardX + cardW, gy);
    ctx.stroke();
  }

  // Outer Glowing Border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 4;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  // Inner Fine Accent Border
  ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, cardX + 10, cardY + 10, cardW - 20, cardH - 20, radius - 10);
  ctx.stroke();

  // Corner Tech Brackets
  drawCornerBrackets(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 28);

  // --- HEADER SECTION (Clear of metal clamp at center X) ---
  // Left: University & Faculty
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.university, cardX + 40, cardY + 54);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText(profile.faculty, cardX + 40, cardY + 84);

  // Right: Major & Verified Pill
  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.major, cardX + cardW - 40, cardY + 54);

  // Status Pill on top-right
  const pillW = 160;
  const pillH = 28;
  const pillX = cardX + cardW - 40 - pillW;
  const pillY = cardY + 70;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, pillX, pillY, pillW, pillH, 14);
  ctx.fill();
  ctx.stroke();

  // Green status dot
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(pillX + 16, pillY + 14, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6ee7b7';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('FULL ACCESS 2026', pillX + pillW / 2 + 8, pillY + 14);

  // Header Divider
  const headerDivY = cardY + 115;
  const divGrad = ctx.createLinearGradient(cardX + 40, 0, cardX + cardW - 40, 0);
  divGrad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
  divGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.8)');
  divGrad.addColorStop(1, 'rgba(56, 189, 248, 0.1)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, headerDivY);
  ctx.lineTo(cardX + cardW - 40, headerDivY);
  ctx.stroke();

  // --- AVATAR SECTION ---
  const avatarCenterX = cardX + cardW / 2;
  const avatarCenterY = cardY + 360;
  const avatarRadius = 165;

  // Outer segmented cyber ring
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 18, 0, Math.PI * 2);
  ctx.stroke();

  // 12 Radar tick marks
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const r1 = avatarRadius + 22;
    const r2 = avatarRadius + (i % 3 === 0 ? 32 : 27);
    ctx.strokeStyle = i % 3 === 0 ? '#38bdf8' : 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = i % 3 === 0 ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(avatarCenterX + Math.cos(angle) * r1, avatarCenterY + Math.sin(angle) * r1);
    ctx.lineTo(avatarCenterX + Math.cos(angle) * r2, avatarCenterY + Math.sin(angle) * r2);
    ctx.stroke();
  }

  // Glowing cyan circular ring
  ctx.save();
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 24;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Circular clip for avatar image
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarRadius, 0, Math.PI * 2);
  ctx.clip();

  if (avatarImg) {
    // Center-crop avatar
    const aW = avatarImg.naturalWidth || avatarImg.width || 460;
    const aH = avatarImg.naturalHeight || avatarImg.height || 460;
    const aScale = Math.max((avatarRadius * 2) / aW, (avatarRadius * 2) / aH);
    const drawW = aW * aScale;
    const drawH = aH * aScale;
    const drawX = avatarCenterX - drawW / 2;
    const drawY = avatarCenterY - drawH / 2;
    ctx.drawImage(avatarImg, drawX, drawY, drawW, drawH);
  } else {
    // Dark silhouette fallback
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(avatarCenterX - avatarRadius, avatarCenterY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('AVATAR', avatarCenterX, avatarCenterY);
  }
  ctx.restore();

  // Online / Verified status badge below avatar
  const statusPillW = 240;
  const statusPillH = 34;
  const statusPillX = avatarCenterX - statusPillW / 2;
  const statusPillY = avatarCenterY + avatarRadius - 12;
  ctx.fillStyle = '#061320';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, statusPillX, statusPillY, statusPillW, statusPillH, 17);
  ctx.fill();
  ctx.stroke();

  // Glowing emerald dot
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(statusPillX + 22, statusPillY + 17, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('VERIFIED // ACTIVE', statusPillX + 38, statusPillY + 17);

  // --- NAME & TITLE SECTION ---
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Inter", "Segoe UI", sans-serif';
  ctx.fillText(profile.name, avatarCenterX, cardY + 620);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(`“${profile.nickname}”`, avatarCenterX, cardY + 665);

  // Role Banner Pill
  const roleW = 600;
  const roleH = 46;
  const roleX = avatarCenterX - roleW / 2;
  const roleY = cardY + 700;
  ctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, roleX, roleY, roleW, roleH, 23);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.fillText(profile.title, avatarCenterX, roleY + 23);

  // Divider
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, cardY + 775);
  ctx.lineTo(cardX + cardW - 40, cardY + 775);
  ctx.stroke();

  // --- IDENTITY & SMART CHIP SPECS SECTION ---
  // Left: Golden Metallic Smart Card IC Chip
  drawMetallicChip(ctx, cardX + 45, cardY + 805, 180, 140);

  // NFC Wave icon below chip
  drawNfcIcon(ctx, cardX + 135, cardY + 975);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NFC / CONTACTLESS', cardX + 135, cardY + 1010);

  // Right: Specification Grid Box
  const specBoxX = cardX + 250;
  const specBoxY = cardY + 805;
  const specBoxW = cardW - 295;
  const specBoxH = 215;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, specBoxX, specBoxY, specBoxW, specBoxH, 16);
  ctx.fill();
  ctx.stroke();

  const specRows = [
    { label: 'NIM / ID', value: profile.idNumber, color: '#f8fafc' },
    { label: 'FACULTY', value: 'ENGINEERING (FT)', color: '#38bdf8' },
    { label: 'PROGRAM', value: 'INFORMATICS S1', color: '#f8fafc' },
    { label: 'EXP LEVEL', value: '2+ YRS // 24+ PROJECTS', color: '#10b981' },
    { label: 'SYSTEM ID', value: 'AUTH-RR-2026-UNRI', color: '#f59e0b' },
  ];

  specRows.forEach((row, i) => {
    const rowY = specBoxY + 24 + i * 40;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText(row.label, specBoxX + 22, rowY);

    ctx.fillStyle = '#475569';
    ctx.fillText(':', specBoxX + 130, rowY);

    ctx.textAlign = 'left';
    ctx.fillStyle = row.color;
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(row.value, specBoxX + 148, rowY);
  });

  // --- SECURITY BARCODE & HOLOGRAM SECTION ---
  // Barcode
  const bcX = cardX + 45;
  const bcY = cardY + 1060;
  const bcW = cardW - 240;
  const bcH = 90;
  drawBarcode(ctx, bcX, bcY, bcW, bcH, `* RR-${profile.idNumber}-2026-PASS *`);

  // Hologram Security Seal on right of barcode
  const holoX = cardX + cardW - 165;
  const holoY = cardY + 1055;
  drawHologramSeal(ctx, holoX, holoY, 125, 120);

  // --- FOOTER SECTION ---
  const footerY = cardY + cardH - 55;
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 40, footerY);
  ctx.lineTo(cardX + cardW - 40, footerY);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText('UNIVERSITAS RIAU • TEKNIK INFORMATIKA • 2026', avatarCenterX, footerY + 24);

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
  const centerX = cardX + cardW / 2;

  ctx.save();

  // Clip to rounded badge
  drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, radius);
  ctx.clip();

  // Background Gradient
  const bgGrad = ctx.createRadialGradient(
    centerX,
    cardY + 450,
    100,
    centerX,
    cardY + cardH / 2,
    cardH * 0.75
  );
  bgGrad.addColorStop(0, '#0a1424');
  bgGrad.addColorStop(0.5, '#070b14');
  bgGrad.addColorStop(1, '#03050a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Subtle diagonal tech hatch pattern
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
  ctx.lineWidth = 1;
  for (let d = -cardH; d <= cardW + cardH; d += 35) {
    ctx.beginPath();
    ctx.moveTo(cardX + d, cardY);
    ctx.lineTo(cardX + d + cardH, cardY + cardH);
    ctx.stroke();
  }

  // Outer Glowing Border
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 4;
  drawRoundedRectPath(ctx, cardX + 2, cardY + 2, cardW - 4, cardH - 4, radius - 2);
  ctx.stroke();

  // Corner Tech Brackets
  drawCornerBrackets(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 28);

  // --- MAGNETIC STRIPE ACROSS UPPER SECTION ---
  const magY = cardY + 35;
  const magH = 95;
  const magGrad = ctx.createLinearGradient(0, magY, 0, magY + magH);
  magGrad.addColorStop(0, '#05070c');
  magGrad.addColorStop(0.3, '#111827');
  magGrad.addColorStop(0.7, '#070a12');
  magGrad.addColorStop(1, '#020306');
  ctx.fillStyle = magGrad;
  ctx.fillRect(cardX, magY, cardW, magH);

  // Specular sheen along magnetic stripe
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX, magY + 30);
  ctx.lineTo(cardX + cardW, magY + 30);
  ctx.stroke();

  // --- HEADER SECTION ---
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px "Inter", "Segoe UI", sans-serif';
  ctx.fillText('DEVELOPER IDENTITY PASS', centerX, cardY + 180);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.fillText('PORTFOLIO & SYSTEM CREDENTIALS', centerX, cardY + 215);

  // --- QR CODE CONTAINER & MATRIX ---
  const qrBoxSize = 340;
  const qrBoxX = centerX - qrBoxSize / 2;
  const qrBoxY = cardY + 255;
  drawCustomQRCode(ctx, qrBoxX, qrBoxY, qrBoxSize, 'https://rizkillahramanda.my.id');

  ctx.textAlign = 'center';
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('SCAN TO EXPLORE LIVE PORTFOLIO', centerX, qrBoxY + qrBoxSize + 32);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText(profile.website, centerX, qrBoxY + qrBoxSize + 56);

  // --- CONTACT & CONNECTIVITY PANEL ---
  const contactY = cardY + 740;
  const contactH = 270;
  const contactW = cardW - 70;
  const contactX = centerX - contactW / 2;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1.5;
  drawRoundedRectPath(ctx, contactX, contactY, contactW, contactH, 18);
  ctx.fill();
  ctx.stroke();

  const contacts = [
    { key: 'GITHUB', val: profile.github, color: '#f8fafc' },
    { key: 'EMAIL', val: profile.email, color: '#38bdf8' },
    { key: 'LOCATION', val: profile.location, color: '#f8fafc' },
    { key: 'STACK', val: 'Next.js 14 • TypeScript • Python • PyTorch', color: '#6ee7b7' },
    { key: 'SPECIALTY', val: 'Full-Stack Architecture & Machine Learning', color: '#f59e0b' },
  ];

  contacts.forEach((c, idx) => {
    const rowY = contactY + 30 + idx * 48;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText(c.key, contactX + 24, rowY);

    ctx.fillStyle = '#475569';
    ctx.fillText(':', contactX + 130, rowY);

    ctx.fillStyle = c.color;
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillText(c.val, contactX + 148, rowY);
  });

  // --- SIGNATURE PANEL ---
  const sigY = cardY + 1045;
  const sigW = cardW - 70;
  const sigH = 80;
  const sigX = centerX - sigW / 2;

  // Signature White/Slate Paper Strip
  ctx.fillStyle = '#e2e8f0';
  drawRoundedRectPath(ctx, sigX, sigY, sigW, sigH, 8);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE // VERIFIED', sigX + 16, sigY + 22);

  // Stylized Cursive Signature
  ctx.fillStyle = '#0f172a';
  ctx.font = 'italic bold 28px "Georgia", "Times New Roman", serif';
  ctx.textAlign = 'center';
  ctx.fillText('Rizkillah Ramanda S.', centerX, sigY + 54);

  // --- DISCLAIMER & RETURN INFO ---
  const discY = cardY + 1170;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillText(
    'This credential pass is an interactive digital badge belonging to Rizkillah Ramanda Sinyo.',
    centerX,
    discY
  );
  ctx.fillText(
    'If found, please notify via GitHub @Diki04 or email rizkillahramanda@gmail.com',
    centerX,
    discY + 24
  );

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('POWERED BY NEXT.JS • REACT THREE FIBER • WEBGL', centerX, discY + 55);

  ctx.restore();
}

/**
 * Draws an authentic golden smart card microchip with ISO 7816 contact pads.
 */
function drawMetallicChip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();

  // Gold metallic base gradient
  const goldGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  goldGrad.addColorStop(0, '#fef08a');
  goldGrad.addColorStop(0.25, '#f59e0b');
  goldGrad.addColorStop(0.5, '#fbbf24');
  goldGrad.addColorStop(0.75, '#b45309');
  goldGrad.addColorStop(1, '#d97706');

  ctx.fillStyle = goldGrad;
  drawRoundedRectPath(ctx, x, y, w, h, 14);
  ctx.fill();

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Internal circuit contact pads (ISO 7816 pattern)
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;

  // Center vertical divide
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y + 15);
  ctx.lineTo(x + w / 2, y + h - 15);
  ctx.stroke();

  // Horizontal divides
  const y1 = y + h * 0.35;
  const y2 = y + h * 0.65;
  ctx.beginPath();
  ctx.moveTo(x + 10, y1);
  ctx.lineTo(x + w - 10, y1);
  ctx.moveTo(x + 10, y2);
  ctx.lineTo(x + w - 10, y2);
  ctx.stroke();

  // Center core pad
  const centerPadW = w * 0.36;
  const centerPadH = h * 0.36;
  ctx.fillStyle = '#fef08a';
  drawRoundedRectPath(
    ctx,
    x + (w - centerPadW) / 2,
    y + (h - centerPadH) / 2,
    centerPadW,
    centerPadH,
    6
  );
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws a realistic Code 128 style vector barcode.
 */
function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  codeText: string
) {
  ctx.save();

  // White/Light background plate
  ctx.fillStyle = '#f8fafc';
  drawRoundedRectPath(ctx, x, y, w, h, 8);
  ctx.fill();

  // Barcode stripes pattern
  ctx.fillStyle = '#090d16';
  const barY = y + 10;
  const barH = h - 34;
  let curX = x + 16;
  const maxX = x + w - 16;

  // Pseudo-deterministic bar pattern
  const pattern = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2, 4, 2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 2, 1, 2, 3, 1, 1, 4];
  let pIdx = 0;

  while (curX < maxX - 10) {
    const barWidth = pattern[pIdx % pattern.length] * 1.8;
    const isGap = pIdx % 2 === 1;
    if (!isGap) {
      ctx.fillRect(curX, barY, Math.min(barWidth, maxX - curX), barH);
    }
    curX += barWidth + 1.2;
    pIdx++;
  }

  // Label text under barcode
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(codeText, x + w / 2, y + h - 8);

  ctx.restore();
}

/**
 * Draws an iridescent holographic security seal.
 */
function drawHologramSeal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();

  // Rainbow holographic gradient
  const holoGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  holoGrad.addColorStop(0, '#38bdf8');
  holoGrad.addColorStop(0.2, '#818cf8');
  holoGrad.addColorStop(0.4, '#c084fc');
  holoGrad.addColorStop(0.6, '#f472b6');
  holoGrad.addColorStop(0.8, '#34d399');
  holoGrad.addColorStop(1, '#38bdf8');

  ctx.fillStyle = holoGrad;
  drawRoundedRectPath(ctx, x, y, w, h, 12);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hologram text & eagle/shield icon
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 13px "Inter", sans-serif';
  ctx.fillText('ORIGINAL', x + w / 2, y + 36);

  ctx.font = 'bold 22px sans-serif';
  ctx.fillText('✦ 🛡 ✦', x + w / 2, y + 68);

  ctx.font = '800 11px "JetBrains Mono", monospace';
  ctx.fillText('VALID PASS', x + w / 2, y + 96);

  ctx.restore();
}

/**
 * Draws procedural stylized QR code with corner alignment squares and tech pattern.
 */
function drawCustomQRCode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  url: string
) {
  ctx.save();

  // White base plate
  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x, y, size, size, 16);
  ctx.fill();

  // Corner positioning targets
  const pad = 24;
  const targetSize = 64;
  drawQRCorner(ctx, x + pad, y + pad, targetSize);
  drawQRCorner(ctx, x + size - pad - targetSize, y + pad, targetSize);
  drawQRCorner(ctx, x + pad, y + size - pad - targetSize, targetSize);

  // Procedural QR Data Matrix Dots
  ctx.fillStyle = '#0a0f1d';
  const dotSize = 8;
  const startX = x + pad;
  const startY = y + pad;
  const maxW = size - pad * 2;

  // Hash-based deterministic modules
  let hash = 2166136261;
  for (let i = 0; i < url.length; i++) {
    hash ^= url.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < maxW; r += dotSize * 1.5) {
    for (let c = 0; c < maxW; c += dotSize * 1.5) {
      // Avoid corner targets
      const inTopLeft = r < targetSize + 12 && c < targetSize + 12;
      const inTopRight = r < targetSize + 12 && c > maxW - targetSize - 12;
      const inBottomLeft = r > maxW - targetSize - 12 && c < targetSize + 12;
      if (inTopLeft || inTopRight || inBottomLeft) continue;

      // Seeded pseudorandom dot
      const val = (Math.sin((r + startX) * 12.9898 + (c + startY) * 78.233 + hash) * 43758.5453) % 1;
      if (Math.abs(val) > 0.45) {
        ctx.fillRect(startX + c, startY + r, dotSize, dotSize);
      }
    }
  }

  // Cyan Center Badge inside QR
  const centerW = 56;
  const centerH = 56;
  const cx = x + size / 2 - centerW / 2;
  const cy = y + size / 2 - centerH / 2;
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  drawRoundedRectPath(ctx, cx, cy, centerW, centerH, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RR', x + size / 2, y + size / 2 + 7);

  ctx.restore();
}

function drawQRCorner(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  // Outer black square
  ctx.fillStyle = '#0a0f1d';
  drawRoundedRectPath(ctx, x, y, s, s, 10);
  ctx.fill();

  // Inner white square
  ctx.fillStyle = '#ffffff';
  drawRoundedRectPath(ctx, x + 10, y + 10, s - 20, s - 20, 6);
  ctx.fill();

  // Center black core
  ctx.fillStyle = '#0a0f1d';
  drawRoundedRectPath(ctx, x + 20, y + 20, s - 40, s - 40, 4);
  ctx.fill();
}

function drawNfcIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx - 10, cy, 14, -Math.PI / 3, Math.PI / 3);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx - 10, cy, 22, -Math.PI / 3, Math.PI / 3);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx - 10, cy, 30, -Math.PI / 3, Math.PI / 3);
  ctx.stroke();
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number
) {
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;

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
