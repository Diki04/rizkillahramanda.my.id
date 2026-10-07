'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLocale } from 'next-intl';
import { mockProfile } from '@/services/data/mock-profile';
import { Sparkles, RefreshCw, Hand } from 'lucide-react';

interface ThreeLanyardProps {
  className?: string;
}

export function ThreeLanyard({ className = '' }: ThreeLanyardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const locale = useLocale();
  const isEn = locale === 'en';

  const [isInteracting, setIsInteracting] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 520;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.8);
    camera.lookAt(0, 0.2, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
    } catch {
      return;
    }

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    cyanPointLight.position.set(-3, 2, 3);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0x818cf8, 2.5, 10);
    purplePointLight.position.set(3, -1, 2.5);
    scene.add(purplePointLight);

    // --- Ambient Floating 3D Neon Orbs (Breathing Pulse) ---
    const orbCount = 38;
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const orbGeometry = new THREE.SphereGeometry(0.06, 16, 16);
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
      const scale = 0.6 + Math.random() * 1.4;
      mesh.scale.set(scale, scale, scale);

      const baseX = (Math.random() - 0.5) * 7.0;
      const baseY = (Math.random() - 0.5) * 6.5;
      const baseZ = (Math.random() - 0.5) * 4.0 - 1.0;

      mesh.position.set(baseX, baseY, baseZ);
      orbGroup.add(mesh);

      orbs.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speed: 0.8 + Math.random() * 1.4,
        amplitude: 0.15 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // --- Card Textures (Front & Back) ---
    const createCardFrontTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 1536;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // Background Dark Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(0.5, '#0e1626');
      grad.addColorStop(1, '#050811');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Subtle Cyber Grid Lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 2;
      const gridSize = 48;
      for (let x = 0; x < c.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
      }
      for (let y = 0; y < c.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
      }

      // Top Lanyard Clip Hole cutout representation
      ctx.fillStyle = '#030712';
      ctx.beginPath();
      ctx.roundRect(c.width / 2 - 80, 40, 160, 36, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Top Header Ribbon Bar
      const headerGrad = ctx.createLinearGradient(60, 110, c.width - 60, 110);
      headerGrad.addColorStop(0, '#38bdf8');
      headerGrad.addColorStop(0.5, '#818cf8');
      headerGrad.addColorStop(1, '#34d399');
      ctx.fillStyle = headerGrad;
      ctx.beginPath();
      ctx.roundRect(60, 110, c.width - 120, 8, 4);
      ctx.fill();

      // Badge ID & Status
      ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('// VERIFIED DEVELOPER', 64, 165);

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.fillText('ID: RR-2026', c.width - 64, 165);

      // Avatar Circular Frame
      const avatarX = c.width / 2;
      const avatarY = 380;
      const avatarR = 140;

      // Glow Ring
      const ringGrad = ctx.createLinearGradient(
        avatarX - avatarR,
        avatarY - avatarR,
        avatarX + avatarR,
        avatarY + avatarR
      );
      ringGrad.addColorStop(0, '#38bdf8');
      ringGrad.addColorStop(0.5, '#3b82f6');
      ringGrad.addColorStop(1, '#10b981');

      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR + 10, 0, Math.PI * 2);
      ctx.fillStyle = ringGrad;
      ctx.fill();

      // Inner Avatar background
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Draw stylized initials avatar while image loads
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 100px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('RR', avatarX, avatarY + 4);

      // Async load user avatar image onto canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = mockProfile.avatar;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          img,
          avatarX - avatarR,
          avatarY - avatarR,
          avatarR * 2,
          avatarR * 2
        );
        ctx.restore();
        texture.needsUpdate = true;
      };

      // Active Status Pill
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.beginPath();
      ctx.roundRect(c.width / 2 - 120, 560, 240, 48, 24);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Green Dot
      ctx.beginPath();
      ctx.arc(c.width / 2 - 80, 584, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ACTIVE DEVELOPER', c.width / 2 + 16, 584);

      // Name & Handle
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 58px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(mockProfile.name, c.width / 2, 680);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(`@${mockProfile.nickname} • Full-Stack Engineer`, c.width / 2, 740);

      // Organization / University
      ctx.fillStyle = '#94a3b8';
      ctx.font = '28px sans-serif';
      ctx.fillText(mockProfile.university, c.width / 2, 800);
      ctx.font = '22px sans-serif';
      ctx.fillText(mockProfile.location, c.width / 2, 835);

      // Holographic Foil Strip
      const foilY = 890;
      const foilGrad = ctx.createLinearGradient(60, foilY, c.width - 60, foilY + 80);
      foilGrad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
      foilGrad.addColorStop(0.25, 'rgba(236, 72, 153, 0.3)');
      foilGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.3)');
      foilGrad.addColorStop(0.75, 'rgba(34, 197, 94, 0.3)');
      foilGrad.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
      ctx.fillStyle = foilGrad;
      ctx.beginPath();
      ctx.roundRect(60, foilY, c.width - 120, 80, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡ NEXT.JS • TYPESCRIPT • PYTHON • ML ⚡', c.width / 2, foilY + 40);

      // Gold Smart Card IC Chip representation
      const chipX = 80;
      const chipY = 1030;
      const chipW = 140;
      const chipH = 100;
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(chipX, chipY, chipW, chipH, 12);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Chip internal lines
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(chipX + 46, chipY);
      ctx.lineTo(chipX + 46, chipY + chipH);
      ctx.moveTo(chipX + 94, chipY);
      ctx.lineTo(chipX + 94, chipY + chipH);
      ctx.moveTo(chipX, chipY + chipH / 2);
      ctx.lineTo(chipX + chipW, chipY + chipH / 2);
      ctx.stroke();

      // Barcode at bottom right
      const barX = 260;
      const barY = 1025;
      const barW = c.width - barX - 80;
      const barH = 110;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(barX, barY, barW, barH);

      // Draw barcode bars
      ctx.fillStyle = '#090d16';
      let curX = barX + 16;
      while (curX < barX + barW - 20) {
        const lineW = Math.random() > 0.45 ? 6 : 3;
        ctx.fillRect(curX, barY + 10, lineW, barH - 35);
        curX += lineW + (Math.random() > 0.5 ? 4 : 8);
      }
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#090d16';
      ctx.fillText('* RR-2026-DEV-SECURE *', barX + barW / 2, barY + barH - 10);

      // Bottom footer copyright
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL IDENTITY BADGE // UNRI INFORMATICS', c.width / 2, 1470);

      const texture = new THREE.CanvasTexture(c);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    const createCardBackTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 1536;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // Dark Back
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#090d16');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Decorative Top Pattern
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(60, 90, c.width - 120, 6);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ENGINEER PASSPORT // GITHUB STATS', c.width / 2, 160);

      // Stat Boxes
      const stats = [
        { label: 'REPOSITORIES', val: '49+' },
        { label: 'PROJECTS', val: '24+' },
        { label: 'EXPERIENCE', val: '2+ YRS' },
      ];

      stats.forEach((s, i) => {
        const boxX = 80 + i * 295;
        const boxY = 240;
        const boxW = 270;
        const boxH = 180;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 16);
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 56px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(s.val, boxX + boxW / 2, boxY + 85);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(s.label, boxX + boxW / 2, boxY + 140);
      });

      // Bio & Philosophy
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('"Crafting high-performance digital experiences', c.width / 2, 530);
      ctx.fillText('with clean architecture and deliberate motion."', c.width / 2, 580);

      // QR Code Box Placeholder
      const qrSize = 340;
      const qrX = c.width / 2 - qrSize / 2;
      const qrY = 680;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrX, qrY, qrSize, qrSize, 20);
      ctx.fill();

      // Pseudo QR Pattern
      ctx.fillStyle = '#090d16';
      const step = 20;
      for (let x = qrX + 20; x < qrX + qrSize - 20; x += step) {
        for (let y = qrY + 20; y < qrY + qrSize - 20; y += step) {
          if (Math.random() > 0.45) {
            ctx.fillRect(x, y, step - 3, step - 3);
          }
        }
      }
      // QR Corner Markers
      const drawQRCorner = (cx: number, cy: number) => {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(cx, cy, 60, 60);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx + 10, cy + 10, 40, 40);
        ctx.fillStyle = '#090d16';
        ctx.fillRect(cx + 20, cy + 20, 20, 20);
      };
      drawQRCorner(qrX + 25, qrY + 25);
      drawQRCorner(qrX + qrSize - 85, qrY + 25);
      drawQRCorner(qrX + 25, qrY + qrSize - 85);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN TO VISIT PORTFOLIO', c.width / 2, 1080);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px monospace';
      ctx.fillText('https://rizkillahramanda.my.id', c.width / 2, 1125);

      // Contact Row
      ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
      ctx.beginPath();
      ctx.roundRect(80, 1200, c.width - 160, 140, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('Email: rizkillahramanda@gmail.com', c.width / 2, 1255);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 26px monospace';
      ctx.fillText('GitHub: github.com/Diki04', c.width / 2, 1300);

      const texture = new THREE.CanvasTexture(c);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    const frontTexture = createCardFrontTexture();
    const backTexture = createCardBackTexture();

    // --- Lanyard Strap Ribbon Texture ---
    const createStrapTexture = () => {
      const c = document.createElement('canvas');
      c.width = 128;
      c.height = 1024;
      const ctx = c.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(c);

      // Deep Dark Woven Strap
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, c.width, c.height);

      // Side Neon Trim Stripes
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(0, 0, 10, c.height);
      ctx.fillRect(c.width - 10, 0, 10, c.height);

      // Subtle Woven Cross-hatch
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 0; y < c.height; y += 8) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(c.width - 10, y + 4);
        ctx.stroke();
      }

      // Vertical text repeated
      ctx.save();
      ctx.translate(c.width / 2, c.height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.font = 'bold 28px monospace';
      ctx.fillStyle = '#e2e8f0';
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

    const strapTexture = createStrapTexture();

    // --- 3D ID Badge Card Mesh ---
    const cardWidth = 2.4;
    const cardHeight = 3.6;
    const cardThickness = 0.05;
    const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.25,
      metalness: 0.15,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.3,
      metalness: 0.1,
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

    // --- Metallic Clip / Hardware ---
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      metalness: 0.95,
      roughness: 0.15,
    });

    const clipGroup = new THREE.Group();
    // Torus ring
    const ringGeo = new THREE.TorusGeometry(0.18, 0.035, 16, 32);
    const ringMesh = new THREE.Mesh(ringGeo, metalMaterial);
    ringMesh.position.set(0, cardHeight / 2 + 0.18, 0);
    clipGroup.add(ringMesh);

    // Clasp holder
    const claspGeo = new THREE.BoxGeometry(0.36, 0.16, 0.09);
    const claspMesh = new THREE.Mesh(claspGeo, metalMaterial);
    claspMesh.position.set(0, cardHeight / 2 + 0.04, 0);
    clipGroup.add(claspMesh);

    // Carabiner latch
    const latchGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.28, 16);
    const latchMesh = new THREE.Mesh(latchGeo, metalMaterial);
    latchMesh.position.set(0, cardHeight / 2 + 0.36, 0);
    clipGroup.add(latchMesh);

    cardMesh.add(clipGroup);

    // Card Master Group
    const cardContainer = new THREE.Group();
    cardContainer.add(cardMesh);
    scene.add(cardContainer);

    // --- Physics Chain for Lanyard Strap ---
    const anchorY = 3.8;
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

    // Strap Mesh (Constructed with TubeGeometry along CatmullRomCurve3)
    let strapCurve = new THREE.CatmullRomCurve3(
      particles.map((p) => p.pos),
      false,
      'chordal',
      0.4
    );

    let strapGeometry = new THREE.TubeGeometry(strapCurve, 32, 0.06, 8, false);
    const strapMaterial = new THREE.MeshStandardMaterial({
      map: strapTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const strapMesh = new THREE.Mesh(strapGeometry, strapMaterial);
    scene.add(strapMesh);

    // Top Ceiling Anchor Ring
    const topAnchorGeo = new THREE.TorusGeometry(0.22, 0.04, 16, 32);
    const topAnchorMesh = new THREE.Mesh(topAnchorGeo, metalMaterial);
    topAnchorMesh.position.copy(anchorPoint);
    topAnchorMesh.rotation.x = Math.PI / 2;
    scene.add(topAnchorMesh);

    // --- State & Interaction Variables ---
    let isDragging = false;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let planeIntersect = new THREE.Vector3();
    let dragOffset = new THREE.Vector3();

    // Card physics state
    let cardPos = new THREE.Vector3(0, 0.1, 0);
    let cardVel = new THREE.Vector3(0, 0, 0);
    let cardRotX = 0;
    let cardRotY = 0;
    let cardRotZ = 0;
    let targetRotY = 0;
    let isFlipped = false;
    let pointerDownTime = 0;
    let pointerDownPos = { x: 0, y: 0 };

    // --- Pointer Event Listeners ---
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
          target.x = THREE.MathUtils.clamp(target.x, -3.2, 3.2);
          target.y = THREE.MathUtils.clamp(target.y, -2.8, 2.5);

          // Calculate impulse velocity
          cardVel.x = (target.x - cardPos.x) * 0.45;
          cardVel.y = (target.y - cardPos.y) * 0.45;
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

        // Check if it was a quick click / tap rather than a drag
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

        if (dt < 280 && dist < 12) {
          // Flip Card 180 degrees
          isFlipped = !isFlipped;
          targetRotY = isFlipped ? Math.PI : 0;
        }
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- Animation & Physics Loop ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.033);
      const elapsedTime = clock.getElapsedTime();

      // 1. Animate Floating Neon Orbs (Breathing Pulse)
      orbs.forEach((orb) => {
        const floatY =
          Math.sin(elapsedTime * orb.speed + orb.phase) * orb.amplitude;
        const floatX =
          Math.cos(elapsedTime * (orb.speed * 0.7) + orb.phase) *
          (orb.amplitude * 0.4);
        orb.mesh.position.y = orb.baseY + floatY;
        orb.mesh.position.x = orb.baseX + floatX;

        // Subtle scale pulsation
        const pulse = 1 + Math.sin(elapsedTime * 2.2 + orb.phase) * 0.18;
        orb.mesh.scale.set(pulse, pulse, pulse);
      });

      // 2. Card Spring & Pendulum Physics
      if (!isDragging) {
        // Restoring spring toward center rest position (0, 0.15, 0)
        const restPos = new THREE.Vector3(0, 0.15, 0);
        const springForce = restPos.clone().sub(cardPos).multiplyScalar(15.0);

        // Pendulum gravity
        const gravity = new THREE.Vector3(0, -9.8, 0);

        // Subtle idle ambient sway
        const idleSway = new THREE.Vector3(
          Math.sin(elapsedTime * 1.5) * 0.08,
          Math.cos(elapsedTime * 2.0) * 0.04,
          0
        );

        cardVel.add(springForce.multiplyScalar(delta));
        cardVel.add(gravity.multiplyScalar(delta));
        cardVel.add(idleSway.multiplyScalar(delta));

        // Damping
        cardVel.multiplyScalar(0.96);
        cardPos.add(cardVel.clone().multiplyScalar(delta * 60));
      }

      // Update Card Position
      cardContainer.position.set(cardPos.x, cardPos.y, cardPos.z);

      // Card Rotations:
      // Z-tilt reacts to X-velocity and displacement
      const targetRotZ = -cardVel.x * 0.4 - (cardPos.x / 3.0) * 0.35;
      cardRotZ = THREE.MathUtils.lerp(cardRotZ, targetRotZ, 0.12);

      // X-tilt reacts to Y-velocity and idle breathing
      const targetRotX =
        cardVel.y * 0.35 + Math.sin(elapsedTime * 1.8) * 0.06;
      cardRotX = THREE.MathUtils.lerp(cardRotX, targetRotX, 0.12);

      // Y-rotation (card flip target + subtle sway)
      const swayY = Math.sin(elapsedTime * 1.2) * 0.08;
      cardRotY = THREE.MathUtils.lerp(
        cardRotY,
        targetRotY + swayY,
        0.08
      );

      cardMesh.rotation.set(cardRotX, cardRotY, cardRotZ);

      // 3. Update Verlet Physics on Lanyard Strap
      const topClipPoint = new THREE.Vector3(
        cardPos.x,
        cardPos.y + cardHeight / 2 + 0.45,
        cardPos.z
      );

      // Verlet step
      const damping = 0.93;
      for (let i = 1; i < chainSegments; i++) {
        const p = particles[i];
        const vel = p.pos.clone().sub(p.oldPos).multiplyScalar(damping);
        p.oldPos.copy(p.pos);
        p.pos.add(vel);
        // Gravity on ribbon
        p.pos.y -= 9.8 * delta * delta * 25.0;
      }

      // Pin ends
      particles[0].pos.copy(anchorPoint);
      particles[chainSegments].pos.copy(topClipPoint);

      // Relaxation constraints (5 iterations for firm yet flexible cloth ribbon)
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

      // Re-generate strap geometry smoothly
      strapCurve = new THREE.CatmullRomCurve3(
        particles.map((p) => p.pos),
        false,
        'chordal',
        0.3
      );
      strapMesh.geometry.dispose();
      strapMesh.geometry = new THREE.TubeGeometry(
        strapCurve,
        32,
        0.065,
        8,
        false
      );

      // Dynamic light tracking
      cyanPointLight.position.set(cardPos.x - 2, cardPos.y + 1, 3);
      purplePointLight.position.set(cardPos.x + 2, cardPos.y - 1, 2.5);

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Cleanup ---
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
      strapTexture.dispose();
      cardGeometry.dispose();
      strapGeometry.dispose();
      orbGeometry.dispose();
      ringGeo.dispose();
      claspGeo.dispose();
      latchGeo.dispose();
      topAnchorGeo.dispose();
      cardMaterials.forEach((m) => m.dispose());
      strapMaterial.dispose();
      metalMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[560px] flex items-center justify-center select-none ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing touch-none z-10"
      />

      {/* Interactive Tooltip & Hint Overlay */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-500 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-navy-950/85 backdrop-blur-md border border-slate-700/50 dark:border-white/10 shadow-xl ${
          isInteracting ? 'scale-95 opacity-40' : 'scale-100 opacity-90'
        }`}
      >
        <Hand className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
        <span className="text-xs font-mono text-slate-200">
          {isEn
            ? 'Drag to swing • Click to flip ID card'
            : 'Tarik untuk mengayun • Klik untuk membalik ID'}
        </span>
        <Sparkles className="w-3 h-3 text-emerald-400" />
      </div>

      {/* Decorative Corner Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-sky-500/10 dark:bg-sky-400/10 blur-[90px] pointer-events-none -z-10" />
    </div>
  );
}
