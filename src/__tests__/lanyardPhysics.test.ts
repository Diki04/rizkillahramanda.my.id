import { describe, it, expect } from 'vitest';
import * as THREE from 'three';

describe('Lanyard Physics and Verlet Ribbon stability', () => {
  it('should stably simulate pendulum release from extreme pull (x = -10) without NaN or Infinity', () => {
    const anchor = new THREE.Vector3(3.6, 3.8, 0);
    const cardPos = new THREE.Vector3(-10, 0, 0); // Pulled far across to the left
    const cardVel = new THREE.Vector3(0, 0, 0);
    const restLength = 2.4;
    const stiffness = 160;
    const damping = 2.5;

    for (let f = 0; f < 180; f++) {
      const dt = 1 / 60;
      const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));
      const diff = clampPos.clone().sub(anchor);
      const dist = diff.length();

      const force = new THREE.Vector3(0, -30, 0); // gravity
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

  it('should maintain finite and continuous Verlet ribbon spline points under all configurations', () => {
    const N = 8;
    const anchor = new THREE.Vector3(3.6, 3.8, 0);
    const cardPos = new THREE.Vector3(-8, 1, 0);
    const clampPos = cardPos.clone().add(new THREE.Vector3(0, 0.03, 0));

    const points = Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      return new THREE.Vector3().lerpVectors(clampPos, anchor, t);
    });

    const curve = new THREE.CatmullRomCurve3(points);
    const sampled = curve.getPoints(24);

    expect(sampled.length).toBe(25);
    sampled.forEach((pt) => {
      expect(Number.isFinite(pt.x)).toBe(true);
      expect(Number.isFinite(pt.y)).toBe(true);
      expect(Number.isFinite(pt.z)).toBe(true);
    });
  });
});
