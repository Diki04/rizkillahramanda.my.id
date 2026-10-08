/* eslint-disable react/no-unknown-property */
'use client';

import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  anchorPosition?: [number, number, number];
  className?: string;
}

export default function Lanyard({
  position = [0, 0, 20],
  fov = 24,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = '/lanyard.png',
  lanyardWidth = 1.15,
  anchorPosition,
  className = '',
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative z-0 w-full h-full min-h-[500px] flex justify-center items-center select-none ${className}`}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        className="w-full h-full pointer-events-auto"
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <PhysicsLanyard
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            anchorPosition={anchorPosition}
          />
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
    </div>
  );
}

interface PhysicsLanyardProps {
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  anchorPosition?: [number, number, number];
}

const ROPE_SEGMENTS = 10;

function PhysicsLanyard({
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = '/lanyard.png',
  lanyardWidth = 1.15,
  anchorPosition,
}: PhysicsLanyardProps) {
  const band = useRef<any>(null);
  const cardGroup = useRef<THREE.Group>(null);

  // Responsive anchor: Desktop hangs on the right (x ~ 3.6), mobile centers (x = 0)
  const anchor = useMemo(() => {
    if (anchorPosition) {
      return new THREE.Vector3(...anchorPosition);
    }
    return new THREE.Vector3(isMobile ? 0 : 3.6, isMobile ? 3.2 : 3.8, 0);
  }, [anchorPosition, isMobile]);

  // Card physics state (position, velocity, rotation, angular velocity)
  const cardPos = useRef(new THREE.Vector3(anchor.x, anchor.y - 3.4, 0));
  const cardVel = useRef(new THREE.Vector3(0, 0, 0));
  const cardRot = useRef(new THREE.Euler(0, 0, 0));
  const cardAngVel = useRef(new THREE.Vector3(0, 0, 0));

  // Verlet rope points
  const ropePoints = useRef<THREE.Vector3[]>(
    Array.from({ length: ROPE_SEGMENTS }, (_, i) => {
      const t = i / (ROPE_SEGMENTS - 1);
      return new THREE.Vector3().lerpVectors(
        new THREE.Vector3(anchor.x, anchor.y - 3.4 + 1.45, 0),
        anchor,
        t
      );
    })
  );
  const prevRopePoints = useRef<THREE.Vector3[]>(
    ropePoints.current.map((p) => p.clone())
  );

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const clampWorld = useMemo(() => new THREE.Vector3(), []);

  const { nodes, materials } = useGLTF('/card.glb') as any;
  const texture = useTexture(lanyardImage || '/lanyard.png');
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite custom front/back images into card texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap) return null;
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

  const [curve] = useState(() => new THREE.CatmullRomCurve3(ropePoints.current));

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033); // Clamp dt to prevent large frame jumps

    // 1. DRAGGING MODE: Full-screen unbounded dragging
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();

      // Intersect ray with z = 0 plane strictly
      if (Math.abs(dir.z) > 0.0001) {
        const t = -state.camera.position.z / dir.z;
        targetPos.set(
          state.camera.position.x + t * dir.x,
          state.camera.position.y + t * dir.y,
          0
        );
      }

      const nextX = targetPos.x - dragged.x;
      const nextY = targetPos.y - dragged.y;

      // Track smooth velocity for release momentum
      const vx = (nextX - cardPos.current.x) / dt;
      const vy = (nextY - cardPos.current.y) / dt;
      cardVel.current.set(
        THREE.MathUtils.lerp(cardVel.current.x, vx, 0.4),
        THREE.MathUtils.lerp(cardVel.current.y, vy, 0.4),
        0
      );

      cardPos.current.x = nextX;
      cardPos.current.y = nextY;
      cardPos.current.z = 0;

      // Dynamic tilt while dragging
      const targetRotZ = THREE.MathUtils.clamp(-cardVel.current.x * 0.035, -0.6, 0.6);
      const targetRotY = THREE.MathUtils.clamp(cardVel.current.x * 0.02, -0.4, 0.4);
      cardRot.current.z = THREE.MathUtils.lerp(cardRot.current.z, targetRotZ, dt * 15);
      cardRot.current.y = THREE.MathUtils.lerp(cardRot.current.y, targetRotY, dt * 15);
      cardRot.current.x = THREE.MathUtils.lerp(cardRot.current.x, 0, dt * 10);
    } else {
      // 2. FREE SWINGING / PENDULUM MODE
      const clampPos = cardPos.current.clone().add(new THREE.Vector3(0, 1.45, 0));
      const diff = clampPos.sub(anchor);
      const dist = diff.length();
      const restLength = 2.3;
      const stiffness = 160;
      const damping = 2.4;

      // Gravity force
      const force = new THREE.Vector3(0, -32, 0);

      // Elastic tether constraint pulling towards anchor
      if (dist > restLength) {
        const tension = diff.normalize().multiplyScalar(-(dist - restLength) * stiffness);
        force.add(tension);
      }

      // Air resistance
      force.add(cardVel.current.clone().multiplyScalar(-damping));

      // Sumbu Z constraint (gently restoring card to z = 0 plane)
      force.z += -cardPos.current.z * 25 - cardVel.current.z * 6;

      // Velocity integration
      cardVel.current.add(force.multiplyScalar(dt));
      cardVel.current.clampLength(0, 32);

      // Position integration
      cardPos.current.add(cardVel.current.clone().multiplyScalar(dt));

      // Rotational pendulum dynamics: Card naturally aligns with tether direction
      const tetherDir = cardPos.current.clone().add(new THREE.Vector3(0, 1.45, 0)).sub(anchor);
      const targetAngleZ = Math.atan2(tetherDir.x, -tetherDir.y) * 0.85;

      cardRot.current.z = THREE.MathUtils.lerp(cardRot.current.z, targetAngleZ, dt * 12);
      // Restoring torque around Y & X so badge faces front
      cardRot.current.y = THREE.MathUtils.lerp(cardRot.current.y, 0, dt * 3.5);
      cardRot.current.x = THREE.MathUtils.lerp(cardRot.current.x, 0, dt * 6);
    }

    // Apply translation & rotation to 3D Card group
    if (cardGroup.current) {
      cardGroup.current.position.copy(cardPos.current);
      cardGroup.current.rotation.copy(cardRot.current);
    }

    // 3. VERLET RIBBON STRAP SIMULATION (100% Stable, never glitches, never disappears)
    clampWorld
      .set(0, 1.45, 0)
      .applyEuler(cardRot.current)
      .add(cardPos.current);

    const pts = ropePoints.current;
    const prevPts = prevRopePoints.current;
    const totalDist = clampWorld.distanceTo(anchor);
    const segLength = Math.max(0.1, totalDist / (ROPE_SEGMENTS - 1));

    // Anchor & clamp end-pinning
    pts[0].copy(clampWorld);
    pts[ROPE_SEGMENTS - 1].copy(anchor);

    // Verlet integration for intermediate rope nodes
    for (let i = 1; i < ROPE_SEGMENTS - 1; i++) {
      const cur = pts[i];
      const prev = prevPts[i];
      const temp = cur.clone();
      const vel = cur.clone().sub(prev).multiplyScalar(0.92);

      // Gravity sag on rope
      cur.add(vel).add(new THREE.Vector3(0, -9.8 * dt * dt, 0));
      prev.copy(temp);
    }

    // Distance relaxation iterations (Unconditionally stable)
    for (let iter = 0; iter < 4; iter++) {
      pts[0].copy(clampWorld);
      pts[ROPE_SEGMENTS - 1].copy(anchor);

      for (let i = 0; i < ROPE_SEGMENTS - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const deltaVec = p2.clone().sub(p1);
        const curDist = deltaVec.length();

        if (curDist > 0.0001 && curDist > segLength) {
          const diff = (curDist - segLength) / curDist;
          const correction = deltaVec.multiplyScalar(diff * 0.5);
          if (i > 0) p1.add(correction);
          if (i + 1 < ROPE_SEGMENTS - 1) p2.sub(correction);
        }
      }
    }

    // Update CatmullRomCurve with safe points
    for (let i = 0; i < ROPE_SEGMENTS; i++) {
      if (Number.isFinite(pts[i].x) && Number.isFinite(pts[i].y) && Number.isFinite(pts[i].z)) {
        curve.points[i].copy(pts[i]);
      }
    }

    if (band.current?.geometry) {
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 18 : 36));
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const initialPoints = useMemo(() => curve.getPoints(isMobile ? 18 : 36), [curve, isMobile]);

  return (
    <>
      {/* 3D Card Model Group */}
      <group
        ref={cardGroup}
        position={[anchor.x, anchor.y - 3.4, 0]}
        scale={2.25}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerUp={(e: any) => {
          e.stopPropagation();
          e.target.releasePointerCapture(e.pointerId);
          setDragged(false);
        }}
        onPointerDown={(e: any) => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          vec.set(e.point.x, e.point.y, 0);
          setDragged(vec.sub(cardPos.current));
        }}
      >
        <group position={[0, -1.2, -0.05]}>
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
      </group>

      {/* 3D Lanyard Ribbon Mesh */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry points={initialPoints} />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1920, 1080]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload('/card.glb');
