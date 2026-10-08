/* eslint-disable react/no-unknown-property */
'use client';

import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useSpringJoint,
  useSphericalJoint,
} from '@react-three/rapier';
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
  gravity = [0, -38, 0],
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
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              anchorPosition={anchorPosition}
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
    </div>
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
  anchorPosition?: [number, number, number];
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = '/lanyard.png',
  lanyardWidth = 1.15,
  anchorPosition,
}: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  // Responsive anchor: On desktop, hang on right side (x ~ 3.6); on mobile, center (x = 0)
  const anchor = useMemo(() => {
    if (anchorPosition) {
      return new THREE.Vector3(...anchorPosition);
    }
    return new THREE.Vector3(isMobile ? 0 : 3.6, isMobile ? 3.2 : 3.8, 0);
  }, [anchorPosition, isMobile]);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const clampLocal = useMemo(() => new THREE.Vector3(0, 1.45, 0), []);
  const clampWorld = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

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

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(anchor.x, anchor.y - 3.5 + 1.45, 0),
        new THREE.Vector3(anchor.x, anchor.y - 2.1, 0),
        new THREE.Vector3(anchor.x, anchor.y - 1.4, 0),
        new THREE.Vector3(anchor.x, anchor.y, 0),
      ])
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // Soft spring joints: Provides smooth elasticity without oscillatory constraint jitter
  useSpringJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.75, 260, 14]);
  useSpringJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.75, 260, 14]);
  useSpringJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.75, 260, 14]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
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
    // 1. Drag handling with accurate z=0 plane projection
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();

      // Intersect ray with z = 0 plane to strictly lock the card to the 2D interaction plane
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

      card.current?.setNextKinematicTranslation({
        x: nextX,
        y: nextY,
        z: 0,
      });

      // Smoothly distribute intermediate joints along the line between anchor and card clamp
      // This completely eliminates joint tension spikes and high-frequency jitter during drag
      if (fixed.current) {
        const anchorPos = fixed.current.translation();
        const clampX = nextX;
        const clampY = nextY + 1.45;
        const dx = clampX - anchorPos.x;
        const dy = clampY - anchorPos.y;

        j1.current?.setTranslation({ x: anchorPos.x + dx * 0.28, y: anchorPos.y + dy * 0.28, z: 0 }, true);
        j1.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
        j2.current?.setTranslation({ x: anchorPos.x + dx * 0.56, y: anchorPos.y + dy * 0.56, z: 0 }, true);
        j2.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
        j3.current?.setTranslation({ x: anchorPos.x + dx * 0.84, y: anchorPos.y + dy * 0.84, z: 0 }, true);
        j3.current?.setLinvel({ x: 0, y: 0, z: 0 }, true);
      }

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
    }

    // 2. Strap mesh spline & Physics updates
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      // Exact world coordinates of card clamp
      clampWorld
        .copy(clampLocal)
        .applyQuaternion(card.current.rotation())
        .add(card.current.translation());

      // Smoothly lerp intermediate joint points
      [j1, j2, j3].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.05,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(clampWorld);
      curve.points[1].copy(j3.current.lerped);
      curve.points[2].copy(j2.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 18 : 36));
      }

      // Restoring torque around Y so badge faces the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        {
          x: ang.x,
          y: ang.y - rot.y * 0.25,
          z: ang.z,
        },
        true
      );
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // Initialize with initial points to prevent empty buffer geometry
  const initialPoints = useMemo(() => curve.getPoints(isMobile ? 18 : 36), [curve, isMobile]);

  return (
    <>
      <group>
        <RigidBody
          ref={fixed}
          position={[anchor.x, anchor.y, anchor.z]}
          {...segmentProps}
          type="fixed"
        />
        <RigidBody
          ref={j1}
          position={[anchor.x, anchor.y - 0.7, 0]}
          {...segmentProps}
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          ref={j2}
          position={[anchor.x, anchor.y - 1.4, 0]}
          {...segmentProps}
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          ref={j3}
          position={[anchor.x, anchor.y - 2.1, 0]}
          {...segmentProps}
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[anchor.x, anchor.y - 3.5, 0]}
          {...segmentProps}
          angularDamping={2.5}
          linearDamping={2.5}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.stopPropagation();
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.stopPropagation();
              e.target.setPointerCapture(e.pointerId);
              vec.set(e.point.x, e.point.y, 0);
              drag(vec.sub(card.current.translation()));
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
