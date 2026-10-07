'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x070a12, 0); // Transparent background

    container.appendChild(renderer.domElement);

    // 2. Interactive Particles & Grid Wave
    const isMobile = width < 768;
    const particleCount = isMobile ? 120 : 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // Cyan
    const color2 = new THREE.Color(0x60a5fa); // Sky Blue
    const color3 = new THREE.Color(0x818cf8); // Indigo

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 700;
      const z = (Math.random() - 0.5) * 500;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.3;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;

      // Color variation
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.5 
        ? color1.clone().lerp(color2, mixRatio * 2) 
        : color2.clone().lerp(color3, (mixRatio - 0.5) * 2);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture Generation
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 32;
    circleCanvas.height = 32;
    const ctx = circleCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
      gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(circleCanvas);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 6 : 8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Dynamic Connections between particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const maxLineSegments = isMobile ? 80 : 180;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // 3. Mouse & Inertia Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: 0,
      worldY: 0,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.active = true;
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      // Project into world coordinates
      mouse.worldX = mouse.targetX * 350;
      mouse.worldY = mouse.targetY * 250;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // 4. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera lerp following mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 60;
      camera.position.y = mouse.y * 40;
      camera.lookAt(scene.position);

      pointCloud.rotation.y = elapsedTime * 0.02 + mouse.x * 0.1;
      pointCloud.rotation.x = mouse.y * 0.08;

      const posArray = geometry.attributes.position.array as Float32Array;

      // Update particles
      let lineIndex = 0;
      const maxDistance = isMobile ? 85 : 120;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base floating motion
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1] + Math.sin(elapsedTime * 0.8 + i) * 0.15;
        posArray[i3 + 2] += velocities[i3 + 2];

        // Bounds bounce
        if (posArray[i3] > 500 || posArray[i3] < -500) velocities[i3] *= -1;
        if (posArray[i3 + 1] > 350 || posArray[i3 + 1] < -350) velocities[i3 + 1] *= -1;
        if (posArray[i3 + 2] > 250 || posArray[i3 + 2] < -250) velocities[i3 + 2] *= -1;

        // Interactive mouse repulsion/pull
        if (mouse.active) {
          const dx = posArray[i3] - mouse.worldX;
          const dy = posArray[i3 + 1] - mouse.worldY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && dist > 0) {
            const force = (1 - dist / 180) * 1.8;
            posArray[i3] += (dx / dist) * force;
            posArray[i3 + 1] += (dy / dist) * force;
            posArray[i3 + 2] += Math.sin(dist * 0.1) * force * 1.5;
          }
        }

        // Line connections
        for (let j = i + 1; j < particleCount && lineIndex < maxLineSegments * 6; j++) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePositions[lineIndex++] = posArray[i3];
            linePositions[lineIndex++] = posArray[i3 + 1];
            linePositions[lineIndex++] = posArray[i3 + 2];

            linePositions[lineIndex++] = posArray[j3];
            linePositions[lineIndex++] = posArray[j3 + 1];
            linePositions[lineIndex++] = posArray[j3 + 2];
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      // Cleanup WebGL resources
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-75 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
