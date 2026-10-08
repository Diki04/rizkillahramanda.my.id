/* eslint-disable react/no-unknown-property */
'use client';

import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { mockProfile } from '@/services/data/mock-profile';
import { useLocale } from 'next-intl';
import { Hand, Sparkles } from 'lucide-react';
import { ThreeLanyard } from './ThreeLanyard';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

class LanyardErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.warn('ReactBits Lanyard encountered an error, falling back to ThreeLanyard:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface ReactBitsLanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardGlbUrl?: string;
  className?: string;
}

export function ReactBitsLanyard({
  position = [0, 0, 15],
  gravity = [0, -38, 0],
  fov = 22,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = '/lanyard.png',
  lanyardWidth = 1.3,
  cardGlbUrl = '/card.glb',
  className = '',
}: ReactBitsLanyardProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [isMobile, setIsMobile] = useState(false);
  const [generatedFront, setGeneratedFront] = useState<string | null>(frontImage);
  const [generatedBack, setGeneratedBack] = useState<string | null>(backImage);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically generate high-res personalized badge faces for Rizkillah Ramanda
  useEffect(() => {
    if (frontImage) {
      setGeneratedFront(frontImage);
      return;
    }

    const c = document.createElement('canvas');
    c.width = 1000;
    c.height = 1510;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const renderFront = (avatarImg?: HTMLImageElement) => {
      // Dark cyber background
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#090e1a');
      grad.addColorStop(0.5, '#0e172a');
      grad.addColorStop(1, '#030712');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);

      // Micro grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.lineWidth = 2;
      for (let x = 0; x < c.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
      }
      for (let y = 0; y < c.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
      }

      // Neon outer frame
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, c.width - 60, c.height - 60);

      // Top Header bar
      const hGrad = ctx.createLinearGradient(60, 60, c.width - 60, 60);
      hGrad.addColorStop(0, '#38bdf8');
      hGrad.addColorStop(0.5, '#818cf8');
      hGrad.addColorStop(1, '#34d399');
      ctx.fillStyle = hGrad;
      ctx.fillRect(60, 60, c.width - 120, 10);

      // Subheader text
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('// VERIFIED DEVELOPER', 64, 115);

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('ID: RR-2026', c.width - 64, 115);

      // Avatar circle
      const avX = c.width / 2;
      const avY = 350;
      const avR = 160;

      // Glowing outer ring
      const ringGrad = ctx.createLinearGradient(avX - avR, avY - avR, avX + avR, avY + avR);
      ringGrad.addColorStop(0, '#38bdf8');
      ringGrad.addColorStop(0.5, '#3b82f6');
      ringGrad.addColorStop(1, '#10b981');
      ctx.beginPath();
      ctx.arc(avX, avY, avR + 10, 0, Math.PI * 2);
      ctx.fillStyle = ringGrad;
      ctx.fill();

      // Avatar backing
      ctx.beginPath();
      ctx.arc(avX, avY, avR, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      if (avatarImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX, avY, avR, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(avatarImg, avX - avR, avY - avR, avR * 2, avR * 2);
        ctx.restore();
      } else {
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 100px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('RR', avX, avY);
      }

      // Active Status Pill
      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.beginPath();
      ctx.roundRect(c.width / 2 - 140, 550, 280, 50, 25);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c.width / 2 - 95, 575, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ACTIVE DEVELOPER', c.width / 2 + 15, 575);

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(mockProfile.name, c.width / 2, 675);

      // Handle & Title
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 34px monospace';
      ctx.fillText(`@${mockProfile.nickname} • Software Engineer`, c.width / 2, 735);

      // University
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(mockProfile.university, c.width / 2, 790);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px sans-serif';
      ctx.fillText('Teknik Informatika • Pekanbaru, Indonesia', c.width / 2, 830);

      // Security Holographic Strip
      const foilY = 880;
      const foilH = 80;
      const fGrad = ctx.createLinearGradient(60, foilY, c.width - 60, foilY + foilH);
      fGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      fGrad.addColorStop(0.25, 'rgba(236, 72, 153, 0.45)');
      fGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.45)');
      fGrad.addColorStop(0.75, 'rgba(34, 197, 94, 0.45)');
      fGrad.addColorStop(1, 'rgba(59, 130, 246, 0.45)');
      ctx.fillStyle = fGrad;
      ctx.beginPath();
      ctx.roundRect(60, foilY, c.width - 120, foilH, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚡ NEXT.JS • TYPESCRIPT • PYTHON • ML ⚡', c.width / 2, foilY + foilH / 2);

      // Gold IC Microchip
      const chipX = 75;
      const chipY = 1010;
      const chipW = 150;
      const chipH = 110;
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.roundRect(chipX, chipY, chipW, chipH, 14);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Chip Pin Etchings
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(chipX + 50, chipY);
      ctx.lineTo(chipX + 50, chipY + chipH);
      ctx.moveTo(chipX + 100, chipY);
      ctx.lineTo(chipX + 100, chipY + chipH);
      ctx.moveTo(chipX, chipY + chipH / 2);
      ctx.lineTo(chipX + chipW, chipY + chipH / 2);
      ctx.stroke();

      // Scannable Barcode
      const barX = 265;
      const barY = 1005;
      const barW = c.width - barX - 75;
      const barH = 120;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(barX, barY, barW, barH);

      ctx.fillStyle = '#020617';
      let bx = barX + 18;
      while (bx < barX + barW - 22) {
        const lw = Math.random() > 0.45 ? 7 : 3.5;
        ctx.fillRect(bx, barY + 10, lw, barH - 40);
        bx += lw + (Math.random() > 0.5 ? 4 : 8);
      }
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#020617';
      ctx.fillText('* SECURE-ID-RR04-VERIFIED *', barX + barW / 2, barY + barH - 10);

      // Bottom stamp
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL IDENTITY BADGE // UNRI INFORMATICS', c.width / 2, 1440);

      setGeneratedFront(c.toDataURL());
    };

    // First render placeholder
    renderFront();

    // Async load avatar
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = mockProfile.avatar;
    img.onload = () => renderFront(img);
  }, [frontImage]);

  // Generate Back badge
  useEffect(() => {
    if (backImage) {
      setGeneratedBack(backImage);
      return;
    }

    const c = document.createElement('canvas');
    c.width = 1000;
    c.height = 1510;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    // Dark Back
    const bgGrad = ctx.createLinearGradient(0, 0, 0, c.height);
    bgGrad.addColorStop(0, '#090e1a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, c.width - 60, c.height - 60);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(60, 60, c.width - 120, 8);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('ENGINEER PASSPORT // GITHUB STATS', c.width / 2, 130);

    // 3 Stat Boxes
    const stats = [
      { label: 'REPOSITORIES', val: '49+' },
      { label: 'PROJECTS', val: '24+' },
      { label: 'EXPERIENCE', val: '2+ YRS' },
    ];

    stats.forEach((s, i) => {
      const boxX = 65 + i * 295;
      const boxY = 200;
      const boxW = 280;
      const boxH = 190;

      ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 18);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 58px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.val, boxX + boxW / 2, boxY + 90);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(s.label, boxX + boxW / 2, boxY + 150);
    });

    // Statement
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'italic 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('"Crafting high-performance digital systems', c.width / 2, 480);
    ctx.fillText('with clean architecture and deliberate motion."', c.width / 2, 530);

    // Big Crisp QR Code Box
    const qrSize = 380;
    const qrX = c.width / 2 - qrSize / 2;
    const qrY = 620;

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(qrX, qrY, qrSize, qrSize, 20);
    ctx.fill();

    ctx.fillStyle = '#020617';
    const step = 22;
    for (let x = qrX + 22; x < qrX + qrSize - 22; x += step) {
      for (let y = qrY + 22; y < qrY + qrSize - 22; y += step) {
        if (Math.random() > 0.44) {
          ctx.fillRect(x, y, step - 3, step - 3);
        }
      }
    }
    const drawQRCorner = (cx: number, cy: number) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(cx, cy, 65, 65);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 10, cy + 10, 45, 45);
      ctx.fillStyle = '#020617';
      ctx.fillRect(cx + 20, cy + 20, 25, 25);
    };
    drawQRCorner(qrX + 25, qrY + 25);
    drawQRCorner(qrX + qrSize - 90, qrY + 25);
    drawQRCorner(qrX + 25, qrY + qrSize - 90);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 30px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCAN TO VISIT PORTFOLIO', c.width / 2, 1070);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '24px monospace';
    ctx.fillText('https://rizkillahramanda.my.id', c.width / 2, 1115);

    // Contact Box
    const infoY = 1180;
    ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
    ctx.beginPath();
    ctx.roundRect(65, infoY, c.width - 130, 160, 18);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Email: rizkillahramanda@gmail.com', c.width / 2, infoY + 60);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px monospace';
    ctx.fillText('GitHub: github.com/Diki04', c.width / 2, infoY + 115);

    setGeneratedBack(c.toDataURL());
  }, [backImage]);

  return (
    <LanyardErrorBoundary fallback={<ThreeLanyard className={className} />}>
      <div
        className={`relative z-0 w-full h-[580px] sm:h-[620px] lg:h-[650px] flex justify-center items-center select-none ${className}`}
      >
        <Canvas
          camera={{ position, fov }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ alpha: transparent, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          }}
        >
          <ambientLight intensity={Math.PI * 1.2} />
          <Suspense fallback={null}>
            <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band
                isMobile={isMobile}
                frontImage={generatedFront}
                backImage={generatedBack}
                imageFit={imageFit}
                lanyardImage={lanyardImage}
                lanyardWidth={lanyardWidth}
                cardGlbUrl={cardGlbUrl}
                onDragChange={setIsInteracting}
              />
            </Physics>
            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Suspense>
        </Canvas>

        {/* Floating Interactive Badge Hint */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 dark:bg-zinc-950/90 backdrop-blur-md border border-slate-700/60 dark:border-white/10 shadow-xl ${
            isInteracting ? 'scale-95 opacity-40' : 'scale-100 opacity-95'
          }`}
        >
          <Hand className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-xs font-mono text-slate-200">
            {isEn
              ? 'Drag to swing ID badge • React Bits'
              : 'Tarik untuk mengayun ID Card • React Bits'}
          </span>
          <Sparkles className="w-3 h-3 text-white/80" />
        </div>

        {/* Ambient Radial Glow Behind Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/10 dark:bg-white/[0.08] blur-[100px] pointer-events-none -z-10" />
      </div>
    </LanyardErrorBoundary>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardGlbUrl?: string;
  onDragChange?: (dragging: boolean) => void;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = '/lanyard.png',
  lanyardWidth = 1.3,
  cardGlbUrl = '/card.glb',
  onDragChange,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGlbUrl) as any;
  const texture = useTexture(lanyardImage || '/lanyard.png');
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite custom front/back artwork onto card model atlas
  const cardMap = useMemo(() => {
    if (!materials?.base?.map) return null;
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;
    const W = baseImg.width || 2048;
    const H = baseImg.height || 2048;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    // Draw original base atlas
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: HTMLImageElement, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials?.base?.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z,
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.current.copy(card.current.angvel());
      rot.current.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.current.x,
        y: ang.current.y - rot.current.y * 0.25,
        z: ang.current.z,
      });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
              onDragChange?.(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.current.copy(card.current.translation()))
              );
              onDragChange?.(true);
            }}
          >
            {nodes?.card && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap || materials?.base?.map}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            {nodes?.clip && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal}
                material-roughness={0.3}
              />
            )}
            {nodes?.clamp && (
              <mesh
                geometry={nodes.clamp.geometry}
                material={materials?.metal}
              />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

// Preload 3D model
useGLTF.preload('/card.glb');
