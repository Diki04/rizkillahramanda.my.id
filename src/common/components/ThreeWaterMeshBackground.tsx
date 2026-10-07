'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/common/contexts/ThemeContext';

/**
 * Pilihan 2: Three.js Interactive 3D Water Surface Wave Mesh
 * Uses WebGL vertex displacement with dynamic mouse ripple tracking.
 */
export function ThreeWaterMeshBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, -18, 22);
    camera.lookAt(0, 2, 0);

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const isDark = theme === 'dark';
    const ambientLight = new THREE.AmbientLight(isDark ? 0x0f172a : 0xe2e8f0, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, 2.5);
    dirLight.position.set(10, 20, 25);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(isDark ? 0x06b6d4 : 0x0ea5e9, 2, 60);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // Plane Geometry for Water Surface
    const segmentsX = 48;
    const segmentsY = 36;
    const geometry = new THREE.PlaneGeometry(60, 42, segmentsX, segmentsY);
    const originalPositions = Float32Array.from(geometry.attributes.position.array);

    // Wireframe + Solid overlay material
    const material = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0369a1 : 0x38bdf8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.6,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Point light follows mouse
      pointLight.position.x = currentMouseX * 25;
      pointLight.position.y = currentMouseY * 18;

      // Displace vertices to create fluid water waves
      const positions = geometry.attributes.position;
      const count = positions.count;

      for (let i = 0; i < count; i++) {
        const u = originalPositions[i * 3];
        const v = originalPositions[i * 3 + 1];

        // Primary rolling wave
        const wave1 = Math.sin(u * 0.25 + elapsedTime * 1.4) * 0.9;
        // Secondary cross swell
        const wave2 = Math.cos(v * 0.3 + elapsedTime * 1.1) * 0.7;
        // Diagonal interference
        const wave3 = Math.sin((u + v) * 0.18 + elapsedTime * 1.8) * 0.5;

        // Mouse ripple displacement
        const dx = u - currentMouseX * 25;
        const dy = v - currentMouseY * 18;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseRipple = Math.exp(-distToMouse * 0.15) * Math.sin(distToMouse * 1.2 - elapsedTime * 4) * 2.5;

        positions.setZ(i, wave1 + wave2 + wave3 + mouseRipple);
      }

      positions.needsUpdate = true;
      geometry.computeVertexNormals();

      // Gentle camera sway
      camera.position.x = currentMouseX * 2;
      camera.position.y = -18 + currentMouseY * 1.5;
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-50 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
