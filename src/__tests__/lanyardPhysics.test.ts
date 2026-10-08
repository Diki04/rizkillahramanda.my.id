import { describe, it, expect } from 'vitest';
import * as THREE from 'three';

import { DEFAULT_BADGE_PROFILE } from '@/common/components/badgeTextureGenerator';

describe('Lanyard Physics and Verlet Ribbon stability', () => {
  it('should stably simulate pendulum release from extreme pull (x = -10) with top piercing anchor (y = 6.4, L = 5.0)', () => {
    const anchor = new THREE.Vector3(3.6, 6.4, 0); // Pierces off the upper screen edge
    const cardPos = new THREE.Vector3(-10, 0, 0); // Pulled far across to the left
    const cardVel = new THREE.Vector3(0, 0, 0);
    const restLength = 5.0;
    const stiffness = 160;
    const damping = 2.4;

    for (let f = 0; f < 180; f++) {
      const dt = 1 / 60;
      const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));
      const diff = clampPos.clone().sub(anchor);
      const dist = diff.length();

      const force = new THREE.Vector3(0, -32, 0); // gravity
      if (dist > restLength) {
        const tension = diff.normalize().multiplyScalar(-(dist - restLength) * stiffness);
        force.add(tension);
      }
      force.add(cardVel.clone().multiplyScalar(-damping));

      cardVel.add(force.multiplyScalar(dt));
      cardVel.clampLength(0, 35);
      cardPos.add(cardVel.clone().multiplyScalar(dt));

      expect(Number.isFinite(cardPos.x)).toBe(true);
      expect(Number.isFinite(cardPos.y)).toBe(true);
      expect(Number.isFinite(cardPos.z)).toBe(true);
      expect(Number.isFinite(cardVel.x)).toBe(true);
      expect(Number.isFinite(cardVel.y)).toBe(true);
    }

    // Card should have moved from -10 back towards anchor (x > -10)
    expect(cardPos.x).toBeGreaterThan(-10);
  });

  it('should maintain finite and continuous Verlet ribbon spline points with 16 segments and high anchor', () => {
    const N = 16;
    const anchor = new THREE.Vector3(3.6, 6.4, 0);
    const cardPos = new THREE.Vector3(-8, 1, 0);
    const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));

    const points = Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      return new THREE.Vector3().lerpVectors(clampPos, anchor, t);
    });

    const curve = new THREE.CatmullRomCurve3(points);
    const sampled = curve.getPoints(48);

    expect(sampled.length).toBe(49);
    sampled.forEach((pt) => {
      expect(Number.isFinite(pt.x)).toBe(true);
      expect(Number.isFinite(pt.y)).toBe(true);
      expect(Number.isFinite(pt.z)).toBe(true);
    });
  });

  it('should stably simulate floating topbar anchor mode (y = 5.0, L = 4.2)', () => {
    const anchor = new THREE.Vector3(3.2, 5.0, 0); // Behind floating topbar
    const cardPos = new THREE.Vector3(3.2, 0.8, 0); // Resting height below topbar
    const cardVel = new THREE.Vector3(2.5, 0, 0);
    const restLength = 4.2;
    const stiffness = 160;
    const damping = 2.4;

    for (let f = 0; f < 120; f++) {
      const dt = 1 / 60;
      const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));
      const diff = clampPos.clone().sub(anchor);
      const dist = diff.length();

      const force = new THREE.Vector3(0, -32, 0);
      if (dist > restLength) {
        const tension = diff.normalize().multiplyScalar(-(dist - restLength) * stiffness);
        force.add(tension);
      }
      force.add(cardVel.clone().multiplyScalar(-damping));

      cardVel.add(force.multiplyScalar(dt));
      cardVel.clampLength(0, 35);
      cardPos.add(cardVel.clone().multiplyScalar(dt));

      expect(Number.isFinite(cardPos.x)).toBe(true);
      expect(Number.isFinite(cardPos.y)).toBe(true);
      expect(Number.isFinite(cardPos.z)).toBe(true);
    }

    // Card stays stably below the anchor
    expect(cardPos.y).toBeLessThan(anchor.y);
  });

  it('should stably simulate mobile centered topbar anchor mode (x = 0, y = 4.6, L = 4.0)', () => {
    const anchor = new THREE.Vector3(0, 4.6, 0);
    const cardPos = new THREE.Vector3(0, 0.6, 0);
    const cardVel = new THREE.Vector3(0, 0, 0);
    const restLength = 4.0;
    const stiffness = 160;
    const damping = 2.4;

    for (let f = 0; f < 60; f++) {
      const dt = 1 / 60;
      const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));
      const diff = clampPos.clone().sub(anchor);
      const dist = diff.length();

      const force = new THREE.Vector3(0, -32, 0);
      if (dist > restLength) {
        const tension = diff.normalize().multiplyScalar(-(dist - restLength) * stiffness);
        force.add(tension);
      }
      force.add(cardVel.clone().multiplyScalar(-damping));

      cardVel.add(force.multiplyScalar(dt));
      cardPos.add(cardVel.clone().multiplyScalar(dt));

      expect(Number.isFinite(cardPos.x)).toBe(true);
      expect(Number.isFinite(cardPos.y)).toBe(true);
    }

    expect(Math.abs(cardPos.x)).toBeLessThan(0.01);
  });

  it('should provide complete valid badge profile fields for card personalization', () => {
    expect(DEFAULT_BADGE_PROFILE.name).toBe('RIZKILLAH RAMANDA');
    expect(DEFAULT_BADGE_PROFILE.university).toContain('UNIVERSITAS RIAU');
    expect(DEFAULT_BADGE_PROFILE.major).toContain('INFORMATIKA');
    expect(DEFAULT_BADGE_PROFILE.github).toContain('Diki04');
    expect(DEFAULT_BADGE_PROFILE.email).toContain('rizkillahramanda@gmail.com');
  });
});
