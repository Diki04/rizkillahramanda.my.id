'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLocale } from 'next-intl';
import { mockProfile } from '@/services/data/mock-profile';
import { Sparkles, RefreshCw, Hand, ShieldCheck } from 'lucide-react';

interface ThreeLanyardProps {
  className?: string;
}

// Function to generate flat ribbon geometry along a 3D CatmullRom curve
function createRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  segments: number,
  width: number
): THREE.BufferGeometry {
  const points = curve.getPoints(segments);
  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    tangents.push(curve.getTangent(u).normalize());
  }

  const vertices: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const p = points[i];
    const t = tangents[i];
    // Side vector: cross product of tangent and forward normal (0, 0, 1)
    const side = new THREE.Vector3().crossVectors(t, new THREE.Vector3(0, 0, 1)).normalize();
    if (side.lengthSq() < 0.001) {
      side.set(1, 0, 0);
    }
    const halfW = width * 0.5;

    // Left vertex
    vertices.push(p.x - side.x * halfW, p.y - side.y * halfW, p.z - side.z * halfW);
    uvs.push(0, (i / segments) * 4);

    // Right vertex
    vertices.push(p.x + side.x * halfW, p.y + side.y * halfW, p.z + side.z * halfW);
    uvs.push(1, (i / segments) * 4);
  }

  for (let i = 0; i < segments; i++) {
    const i2 = i * 2;
    // Front face
    indices.push(i2, i2 + 1, i2 + 2);
    indices.push(i2 + 1, i2 + 3, i2 + 2);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function ThreeLanyard({ className = '' }: ThreeLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locale = useLocale();
  const isEn = locale === 'en';

  const [isInteracting, setIsInteracting] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [flipState, setFlipState] = useState(false);

  // Trigger flip externally
  const triggerFlipRef = useRef<() => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 440;
    let height = container.clientHeight || 620;

    // --- Scene, Camera, High-Precision WebGL Renderer ---
    const scene = new THREE.Scene();

    // Camera calibrated closer for large, bold, crisp card view
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.5);
    camera.lookAt(0, -0.05, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch {
      return;
    }

    // --- Studio Lighting Setup (for Photorealistic Clearcoat Specular Highlights) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key directional studio light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 4.5, 4.5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Top rim highlight
    const topLight = new THREE.DirectionalLight(0xe0f2fe, 1.5);
    topLight.position.set(-2, 5, 2);
    scene.add(topLight);

    // Dynamic Cyan cyber glow point light
    const cyanPointLight = new THREE.PointLight(0x38bdf8, 3.8, 10);
    cyanPointLight.position.set(-2.5, 1.0, 2.8);
    scene.add(cyanPointLight);

    // Violet secondary rim light
    const violetPointLight = new THREE.PointLight(0x818cf8, 2.6, 9);
    violetPointLight.position.set(2.5, -1.2, 2.5);
    scene.add(violetPointLight);

    // --- Ambient Floating 3D Glowing Neon Orbs in Scene ---
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const orbCount = 36;
    const orbGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const orbColors = [0x38bdf8, 0x60a5fa, 0x818cf8, 0x34d399, 0x38bdf8];

    interface OrbData {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      amplitude: number;
      phase: number;
    }

    const orbs: OrbData[] = [];
    for (let i = 0; i < orbCount; i++) {
      const color = orbColors[i % orbColors.length];
      const orbMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.45,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(orbGeometry, orbMaterial);
      const scale = 0.7 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);

      const baseX = (Math.random() - 0.5) * 6.5;
      const baseY = (Math.random() - 0.5) * 6.0;
      const baseZ = (Math.random() - 0.5) * 3.5 - 0.8;

      mesh.position.set(baseX, baseY, baseZ);
      orbGroup.add(mesh);

      orbs.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speed: 0.7 + Math.random() * 1.3,
        amplitude: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- High-Resolution Crisp Textures (1200 x 1800 px) ---
    const createCardFrontTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 1800;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // 1. Deep Matte Dark Acrylic Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, c.height);
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(0.4, '#0e172a');
      bgGrad.addColorStop(1, '#050811');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Micro Cyber Grid Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 2;
      const step = 50;
      for (let x = 0; x < c.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
      }
      for (let y = 0; y < c.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
      }

      // Outer Inner Neon Border Frame
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, c.width - 72, c.height - 72);

      // Corner Tech Brackets
      const bLen = 40;
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#38bdf8';
      // Top Left
      ctx.beginPath();
      ctx.moveTo(36, 36 + bLen);
      ctx.lineTo(36, 36);
      ctx.lineTo(36 + bLen, 36);
      ctx.stroke();
      // Top Right
      ctx.beginPath();
      ctx.moveTo(c.width - 36 - bLen, 36);
      ctx.lineTo(c.width - 36, 36);
      ctx.lineTo(c.width - 36, 36 + bLen);
      ctx.stroke();
      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(36, c.height - 36 - bLen);
      ctx.lineTo(36, c.height - 36);
      ctx.lineTo(36 + bLen, c.height - 36);
      ctx.stroke();
      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(c.width - 36 - bLen, c.height - 36);
      ctx.lineTo(c.width - 36, c.height - 36);
      ctx.lineTo(c.width - 36, c.height - 36 - bLen);
      ctx.stroke();

      // Top Lanyard Clip Punch Hole with Metallic Grommet
      const slotW = 190;
      const slotH = 44;
      const slotX = c.width / 2 - slotW / 2;
      const slotY = 56;
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.roundRect(slotX, slotY, slotW, slotH, 22);
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Holographic Rainbow Header Banner
      const headerBarY = 138;
      const hGrad = ctx.createLinearGradient(70, headerBarY, c.width - 70, headerBarY);
      hGrad.addColorStop(0, '#38bdf8');
      hGrad.addColorStop(0.35, '#818cf8');
      hGrad.addColorStop(0.7, '#ec4899');
      hGrad.addColorStop(1, '#34d399');
      ctx.fillStyle = hGrad;
      ctx.beginPath();
      ctx.roundRect(70, headerBarY, c.width - 140, 10, 5);
      ctx.fill();

      // Header Labels (Large & Crisp)
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 30px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('// VERIFIED DEVELOPER PASS', 72, 196);

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('ID: RR-2026-DEV', c.width - 72, 196);

      // Large Avatar Photo with Multi-Ring Cyber Glow
      const avX = c.width / 2;
      const avY = 470;
      const avR = 175;

      // Outer Glowing Ring
      const ringGrad = ctx.createLinearGradient(
        avX - avR,
        avY - avR,
        avX + avR,
        avY + avR
      );
      ringGrad.addColorStop(0, '#38bdf8');
      ringGrad.addColorStop(0.5, '#60a5fa');
      ringGrad.addColorStop(1, '#10b981');

      ctx.beginPath();
      ctx.arc(avX, avY, avR + 12, 0, Math.PI * 2);
      ctx.fillStyle = ringGrad;
      ctx.fill();

      // Dark avatar backing
      ctx.beginPath();
      ctx.arc(avX, avY, avR, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Stylized Initial Placeholder
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 120px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RR', avX, avY + 6);

      // Load avatar image asynchronously with crossOrigin
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = mockProfile.avatar;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX, avY, avR, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, avX - avR, avY - avR, avR * 2, avR * 2);
        ctx.restore();
        texture.needsUpdate = true;
      };

      // Active Developer Badge (Glowing Emerald Pill)
      const pillW = 320;
      const pillH = 56;
      const pillY = 690;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
      ctx.beginPath();
      ctx.roundRect(c.width / 2 - pillW / 2, pillY, pillW, pillH, 28);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Blinking Indicator Dot
      ctx.beginPath();
      ctx.arc(c.width / 2 - 110, pillY + pillH / 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ACTIVE DEVELOPER', c.width / 2 + 18, pillY + pillH / 2);

      // Prominent Bold Name (Large, Crisp Display Type)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 74px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(mockProfile.name, c.width / 2, 825);

      // Role & Handle
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 38px monospace';
      ctx.fillText(`@${mockProfile.nickname} • Software Engineer`, c.width / 2, 895);

      // University & Location
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText(mockProfile.university, c.width / 2, 960);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '26px sans-serif';
      ctx.fillText('Teknik Informatika • Pekanbaru, Indonesia', c.width / 2, 1005);

      // Holographic Security Foil Strip (Iridescent Specular Bar)
      const foilY = 1070;
      const foilH = 96;
      const foilGrad = ctx.createLinearGradient(70, foilY, c.width - 70, foilY + foilH);
      foilGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      foilGrad.addColorStop(0.25, 'rgba(236, 72, 153, 0.4)');
      foilGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.4)');
      foilGrad.addColorStop(0.75, 'rgba(34, 197, 94, 0.4)');
      foilGrad.addColorStop(1, 'rgba(59, 130, 246, 0.4)');
      ctx.fillStyle = foilGrad;
      ctx.beginPath();
      ctx.roundRect(70, foilY, c.width - 140, foilH, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡ NEXT.JS • TYPESCRIPT • PYTHON • ML ⚡', c.width / 2, foilY + foilH / 2);

      // Gold Smart Card IC Microchip (Realistic SIM/Card Chip)
      const chipX = 90;
      const chipY = 1220;
      const chipW = 170;
      const chipH = 125;
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(chipX, chipY, chipW, chipH, 16);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Chip Pin Etchings
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(chipX + 55, chipY);
      ctx.lineTo(chipX + 55, chipY + chipH);
      ctx.moveTo(chipX + 115, chipY);
      ctx.lineTo(chipX + 115, chipY + chipH);
      ctx.moveTo(chipX, chipY + chipH / 2);
      ctx.lineTo(chipX + chipW, chipY + chipH / 2);
      ctx.stroke();

      // Scannable Laser Barcode (High Contrast)
      const barX = 300;
      const barY = 1215;
      const barW = c.width - barX - 90;
      const barH = 135;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(barX, barY, barW, barH);

      ctx.fillStyle = '#020617';
      let cx = barX + 20;
      while (cx < barX + barW - 25) {
        const lw = Math.random() > 0.45 ? 8 : 4;
        ctx.fillRect(cx, barY + 12, lw, barH - 45);
        cx += lw + (Math.random() > 0.5 ? 5 : 9);
      }
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#020617';
      ctx.fillText('* SECURE-ID-RR04-VERIFIED *', barX + barW / 2, barY + barH - 12);

      // Bottom Security Stamp
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL IDENTITY BADGE // UNRI INFORMATICS', c.width / 2, 1720);

      const texture = new THREE.CanvasTexture(c);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    // Back Texture (Developer Passport & GitHub Statistics)
    const createCardBackTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1200;
      c.height = 1800;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // Dark Back Acrylic
      const bgGrad = ctx.createLinearGradient(0, 0, 0, c.height);
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Frame
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(36, 36, c.width - 72, c.height - 72);

      // Top Header
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(70, 110, c.width - 140, 8);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ENGINEER PASSPORT // GITHUB STATS', c.width / 2, 190);

      // 3 Large Telemetry Metric Boxes
      const stats = [
        { label: 'REPOSITORIES', val: '49+' },
        { label: 'PROJECTS', val: '24+' },
        { label: 'EXPERIENCE', val: '2+ YRS' },
      ];

      stats.forEach((s, i) => {
        const boxX = 85 + i * 350;
        const boxY = 280;
        const boxW = 320;
        const boxH = 220;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 20);
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 68px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.val, boxX + boxW / 2, boxY + 105);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 24px monospace';
        ctx.fillText(s.label, boxX + boxW / 2, boxY + 175);
      });

      // Engineering Quote
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'italic 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('"Crafting high-performance digital systems', c.width / 2, 600);
      ctx.fillText('with clean architecture and deliberate motion."', c.width / 2, 655);

      // Large Crisp Scannable QR Code
      const qrSize = 420;
      const qrX = c.width / 2 - qrSize / 2;
      const qrY = 770;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrX, qrY, qrSize, qrSize, 24);
      ctx.fill();

      // Pseudo QR pattern generator
      ctx.fillStyle = '#020617';
      const step = 24;
      for (let x = qrX + 24; x < qrX + qrSize - 24; x += step) {
        for (let y = qrY + 24; y < qrY + qrSize - 24; y += step) {
          if (Math.random() > 0.44) {
            ctx.fillRect(x, y, step - 3, step - 3);
          }
        }
      }
      // Corner Positioning Marks
      const drawQRCorner = (cx: number, cy: number) => {
        ctx.fillStyle = '#020617';
        ctx.fillRect(cx, cy, 75, 75);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx + 12, cy + 12, 51, 51);
        ctx.fillStyle = '#020617';
        ctx.fillRect(cx + 24, cy + 24, 27, 27);
      };
      drawQRCorner(qrX + 30, qrY + 30);
      drawQRCorner(qrX + qrSize - 105, qrY + 30);
      drawQRCorner(qrX + 30, qrY + qrSize - 105);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 34px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN TO VISIT PORTFOLIO', c.width / 2, 1260);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '28px monospace';
      ctx.fillText('https://rizkillahramanda.my.id', c.width / 2, 1315);

      // Contact Info Card
      const infoY = 1400;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      ctx.beginPath();
      ctx.roundRect(85, infoY, c.width - 170, 180, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('Email: rizkillahramanda@gmail.com', c.width / 2, infoY + 68);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 30px monospace';
      ctx.fillText('GitHub: github.com/Diki04', c.width / 2, infoY + 125);

      const texture = new THREE.CanvasTexture(c);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    const frontTexture = createCardFrontTexture();
    const backTexture = createCardBackTexture();

    // --- Woven Fabric Ribbon Texture for Flat Lanyard Strap ---
    const createRibbonTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 1024;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // Deep Dark Woven Base
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, c.width, c.height);

      // Woven Twill Fabric Grain Pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      for (let y = 0; y < c.height; y += 4) {
        for (let x = 0; x < c.width; x += 8) {
          if ((x + y) % 8 === 0) {
            ctx.fillRect(x, y, 4, 2);
          }
        }
      }

      // Neon Cyan Side Border Stitching
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 0, 16, c.height);
      ctx.fillRect(c.width - 16, 0, 16, c.height);

      // Inner White Stitching Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(22, c.height);
      ctx.moveTo(c.width - 22, 0);
      ctx.lineTo(c.width - 22, c.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertical Text Printed Along Ribbon
      ctx.save();
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = 'bold 36px monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦ RIZKILLAH RAMANDA ✦ UNRI INFORMATICS ✦ FULLSTACK DEV', 0, 0);
      ctx.restore();

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 2);
      return texture;
    };

    const ribbonTexture = createRibbonTexture();

    // --- 3D ID Badge Card Mesh (MeshPhysicalMaterial with Photorealistic Clearcoat) ---
    const cardWidth = 2.6;
    const cardHeight = 3.9;
    const cardThickness = 0.06;
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);

    // Dark sleek acrylic edges
    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
    });

    // Front: Glossy Laminated Clearcoat
    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontTexture,
      roughness: 0.16,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.9,
    });

    // Back: Glossy Laminated Clearcoat
    const backMaterial = new THREE.MeshPhysicalMaterial({
      map: backTexture,
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      reflectivity: 0.85,
    });

    const cardMaterials = [
      edgeMaterial, // Right
      edgeMaterial, // Left
      edgeMaterial, // Top
      edgeMaterial, // Bottom
      frontMaterial, // Front
      backMaterial, // Back
    ];

    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterials);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;

    // --- Realistic Swivel Lobster Claw Carabiner Hardware ---
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xededed,
      metalness: 0.96,
      roughness: 0.12,
    });

    const hardwareGroup = new THREE.Group();

    // 1. Oval D-Ring holding the ribbon loop
    const dRingGeo = new THREE.TorusGeometry(0.22, 0.04, 16, 32);
    const dRingMesh = new THREE.Mesh(dRingGeo, metalMaterial);
    dRingMesh.position.set(0, cardHeight / 2 + 0.42, 0);
    hardwareGroup.add(dRingMesh);

    // 2. Swivel Barrel Connector
    const swivelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.22, 20);
    const swivelMesh = new THREE.Mesh(swivelGeo, metalMaterial);
    swivelMesh.position.set(0, cardHeight / 2 + 0.24, 0);
    hardwareGroup.add(swivelMesh);

    // 3. Lobster Claw / Snap Hook looping through card slot
    const clawGeo = new THREE.TorusGeometry(0.16, 0.038, 16, 32, Math.PI * 1.5);
    const clawMesh = new THREE.Mesh(clawGeo, metalMaterial);
    clawMesh.position.set(0, cardHeight / 2 + 0.08, 0);
    clawMesh.rotation.z = -Math.PI / 4;
    hardwareGroup.add(clawMesh);

    // 4. Clip retention sleeve
    const sleeveGeo = new THREE.BoxGeometry(0.32, 0.14, 0.1);
    const sleeveMesh = new THREE.Mesh(sleeveGeo, metalMaterial);
    sleeveMesh.position.set(0, cardHeight / 2 + 0.02, 0);
    hardwareGroup.add(sleeveMesh);

    cardMesh.add(hardwareGroup);

    // Card Master Group
    const cardContainer = new THREE.Group();
    cardContainer.add(cardMesh);
    scene.add(cardContainer);

    // --- Physics Chain for Lanyard Strap ---
    const anchorY = 3.2;
    const anchorPoint = new THREE.Vector3(0, anchorY, 0);
    const chainSegments = 10;
    const restLength = (anchorY - 0.2) / chainSegments;

    interface Particle {
      pos: THREE.Vector3;
      oldPos: THREE.Vector3;
    }

    const particles: Particle[] = [];
    for (let i = 0; i <= chainSegments; i++) {
      const t = i / chainSegments;
      const y = anchorY - t * (anchorY - 0.2);
      const pos = new THREE.Vector3(0, y, 0);
      particles.push({
        pos: pos.clone(),
        oldPos: pos.clone(),
      });
    }

    // Flat Ribbon Strap Mesh using createRibbonGeometry
    let ribbonCurve = new THREE.CatmullRomCurve3(
      particles.map((p) => p.pos),
      false,
      'chordal',
      0.35
    );

    let ribbonGeometry = createRibbonGeometry(ribbonCurve, 32, 0.34);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      map: ribbonTexture,
      roughness: 0.65,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    scene.add(ribbonMesh);

    // Ceiling Anchor Mount
    const ceilingMountGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 24);
    const ceilingMount = new THREE.Mesh(ceilingMountGeo, metalMaterial);
    ceilingMount.position.copy(anchorPoint);
    ceilingMount.rotation.x = Math.PI / 2;
    scene.add(ceilingMount);

    // --- State & Interaction Variables ---
    let isDragging = false;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let planeIntersect = new THREE.Vector3();
    let dragOffset = new THREE.Vector3();

    // Card physics state
    let cardPos = new THREE.Vector3(0, -0.05, 0);
    let cardVel = new THREE.Vector3(0, 0, 0);
    let cardRotX = 0;
    let cardRotY = 0;
    let cardRotZ = 0;
    let targetRotY = 0;
    let isFlipped = false;
    let pointerDownTime = 0;
    let pointerDownPos = { x: 0, y: 0 };

    // Function to trigger flip
    const toggleFlip = () => {
      isFlipped = !isFlipped;
      targetRotY = isFlipped ? Math.PI : 0;
      setFlipState(isFlipped);
    };
    triggerFlipRef.current = toggleFlip;

    // --- Pointer Coordinates & Raycast ---
    const getPointerCoords = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * 2 - 1,
        y: -((clientY - rect.top) / rect.height) * 2 + 1,
        screenX: clientX,
        screenY: clientY,
      };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const p = getPointerCoords(e);
      mouse.x = p.x;
      mouse.y = p.y;
      pointerDownTime = Date.now();
      pointerDownPos = { x: p.screenX, y: p.screenY };

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(cardMesh, false);

      if (intersects.length > 0) {
        isDragging = true;
        setIsInteracting(true);
        setHintVisible(false);
        dragPlane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          cardMesh.position
        );
        raycaster.ray.intersectPlane(dragPlane, planeIntersect);
        dragOffset.copy(cardPos).sub(planeIntersect);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const p = getPointerCoords(e);
      mouse.x = p.x;
      mouse.y = p.y;

      if (isDragging) {
        raycaster.setFromCamera(mouse, camera);
        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
          const target = planeIntersect.clone().add(dragOffset);
          // Clamp dragging bounds
          target.x = THREE.MathUtils.clamp(target.x, -2.6, 2.6);
          target.y = THREE.MathUtils.clamp(target.y, -2.2, 1.8);

          // Calculate impulse velocity
          cardVel.x = (target.x - cardPos.x) * 0.48;
          cardVel.y = (target.y - cardPos.y) * 0.48;
          cardPos.copy(target);
        }
      } else {
        // Hover tilt effect
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObject(cardMesh, false);
        if (hits.length > 0) {
          canvas.style.cursor = 'grab';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        isDragging = false;
        setIsInteracting(false);

        // Check if quick tap / click rather than drag
        const dt = Date.now() - pointerDownTime;
        const p =
          'changedTouches' in e
            ? {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
              }
            : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
        const dist = Math.hypot(
          p.x - pointerDownPos.x,
          p.y - pointerDownPos.y
        );

        if (dt < 280 && dist < 14) {
          toggleFlip();
        }
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- Animation & Physics Loop (60 FPS) ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.033);
      const elapsedTime = clock.getElapsedTime();

      // 1. Animate Floating Neon Orbs
      orbs.forEach((orb) => {
        const floatY =
          Math.sin(elapsedTime * orb.speed + orb.phase) * orb.amplitude;
        const floatX =
          Math.cos(elapsedTime * (orb.speed * 0.7) + orb.phase) *
          (orb.amplitude * 0.35);
        orb.mesh.position.y = orb.baseY + floatY;
        orb.mesh.position.x = orb.baseX + floatX;

        const pulse = 1 + Math.sin(elapsedTime * 2.0 + orb.phase) * 0.16;
        orb.mesh.scale.set(pulse, pulse, pulse);
      });

      // 2. Card Spring & Pendulum Physics
      if (!isDragging) {
        const restPos = new THREE.Vector3(0, -0.05, 0);
        const springForce = restPos.clone().sub(cardPos).multiplyScalar(16.0);
        const gravity = new THREE.Vector3(0, -9.8, 0);

        // Gentle idle ambient sway
        const idleSway = new THREE.Vector3(
          Math.sin(elapsedTime * 1.6) * 0.06,
          Math.cos(elapsedTime * 2.2) * 0.03,
          0
        );

        cardVel.add(springForce.multiplyScalar(delta));
        cardVel.add(gravity.multiplyScalar(delta));
        cardVel.add(idleSway.multiplyScalar(delta));

        // Natural Damping
        cardVel.multiplyScalar(0.965);
        cardPos.add(cardVel.clone().multiplyScalar(delta * 60));
      }

      // Update Card Position
      cardContainer.position.set(cardPos.x, cardPos.y, cardPos.z);

      // Card Rotations:
      // Z-tilt reacts to horizontal velocity & displacement
      const targetRotZ = -cardVel.x * 0.38 - (cardPos.x / 2.6) * 0.32;
      cardRotZ = THREE.MathUtils.lerp(cardRotZ, targetRotZ, 0.14);

      // X-tilt reacts to vertical velocity & gentle breathing
      const targetRotX =
        cardVel.y * 0.32 + Math.sin(elapsedTime * 1.8) * 0.05;
      cardRotX = THREE.MathUtils.lerp(cardRotX, targetRotX, 0.14);

      // Y-rotation (flip interpolation + idle yaw sway)
      const swayY = Math.sin(elapsedTime * 1.3) * 0.06;
      cardRotY = THREE.MathUtils.lerp(
        cardRotY,
        targetRotY + swayY,
        0.09
      );

      cardMesh.rotation.set(cardRotX, cardRotY, cardRotZ);

      // 3. Update Verlet Physics on Ribbon Strap
      const topClipPoint = new THREE.Vector3(
        cardPos.x,
        cardPos.y + cardHeight / 2 + 0.44,
        cardPos.z
      );

      const damping = 0.93;
      for (let i = 1; i < chainSegments; i++) {
        const p = particles[i];
        const vel = p.pos.clone().sub(p.oldPos).multiplyScalar(damping);
        p.oldPos.copy(p.pos);
        p.pos.add(vel);
        p.pos.y -= 9.8 * delta * delta * 24.0;
      }

      particles[0].pos.copy(anchorPoint);
      particles[chainSegments].pos.copy(topClipPoint);

      // Relaxation constraints (6 iterations for firm realistic ribbon)
      for (let iter = 0; iter < 6; iter++) {
        particles[0].pos.copy(anchorPoint);
        particles[chainSegments].pos.copy(topClipPoint);

        for (let i = 0; i < chainSegments; i++) {
          const p1 = particles[i];
          const p2 = particles[i + 1];
          const deltaVec = p2.pos.clone().sub(p1.pos);
          const dist = deltaVec.length();
          if (dist === 0) continue;

          const diff = (dist - restLength) / dist;
          const correction = deltaVec.multiplyScalar(diff * 0.5);

          if (i !== 0) {
            p1.pos.add(correction);
          }
          if (i + 1 !== chainSegments) {
            p2.pos.sub(correction);
          }
        }
      }

      // Re-generate Flat Ribbon Geometry
      ribbonCurve = new THREE.CatmullRomCurve3(
        particles.map((p) => p.pos),
        false,
        'chordal',
        0.35
      );
      ribbonMesh.geometry.dispose();
      ribbonMesh.geometry = createRibbonGeometry(ribbonCurve, 32, 0.34);

      // Dynamic Specular Light Tracking
      cyanPointLight.position.set(cardPos.x - 2.2, cardPos.y + 0.8, 2.8);
      violetPointLight.position.set(cardPos.x + 2.2, cardPos.y - 0.8, 2.4);

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Resource Disposal Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      ribbonTexture.dispose();
      cardGeometry.dispose();
      ribbonGeometry.dispose();
      orbGeometry.dispose();
      dRingGeo.dispose();
      swivelGeo.dispose();
      clawGeo.dispose();
      sleeveGeo.dispose();
      ceilingMountGeo.dispose();
      cardMaterials.forEach((m) => m.dispose());
      ribbonMaterial.dispose();
      metalMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[580px] sm:h-[620px] lg:h-[640px] flex items-center justify-center select-none ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none z-10"
      />

      {/* Floating Interactive Controls & Hint Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        <div
          className={`transition-all duration-300 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-navy-950/90 backdrop-blur-md border border-slate-700/60 dark:border-white/10 shadow-xl pointer-events-none ${
            isInteracting ? 'scale-95 opacity-40' : 'scale-100 opacity-95'
          }`}
        >
          <Hand className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-200">
            {isEn
              ? 'Drag to swing • Click to flip badge'
              : 'Tarik untuk mengayun • Klik untuk membalik'}
          </span>
          <Sparkles className="w-3 h-3 text-emerald-400" />
        </div>

        {/* Quick Flip Button */}
        <button
          onClick={() => triggerFlipRef.current()}
          className="p-1.5 rounded-full bg-white/90 dark:bg-navy-900/90 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 shadow-lg transition-colors cursor-pointer"
          title={isEn ? 'Flip Badge' : 'Balik Kartu'}
          aria-label="Flip Badge"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Ambient Radial Glow Behind Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sky-500/15 dark:bg-sky-400/15 blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
