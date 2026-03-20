"use client";

import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
};

const PALETTE = [
  "rgba(140,177,80,0.75)",
  "rgba(140,177,80,0.75)",
  "rgba(197,225,165,0.70)",
  "rgba(200,200,200,0.60)",
  "rgba(80,80,80,0.65)",
];

const COUNT       = 14;
const MAX_SPEED   = 10;
const RESTITUTION = 0.82;
const FRICTION    = 0.999;
const MOUSE_R     = 28;

function spawnBall(W: number, H: number): Ball {
  const r = 22 + Math.random() * 42;
  return {
    x:      r + Math.random() * (W - 2 * r),
    y:      r + Math.random() * (H - 2 * r),
    vx:     (Math.random() - 0.5) * 4,
    vy:     (Math.random() - 0.5) * 4,
    radius: r,
    color:  PALETTE[Math.floor(Math.random() * PALETTE.length)],
    mass:   r * r,
  };
}

// Push overlapping balls apart (no velocity change — just separation)
function separate(balls: Ball[]) {
  for (let iter = 0; iter < 60; iter++) {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i], b = balls[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const min  = a.radius + b.radius;
        if (dist < min) {
          const push = (min - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          a.x -= nx * push; a.y -= ny * push;
          b.x += nx * push; b.y += ny * push;
        }
      }
    }
  }
}

function resolveCollision(a: Ball, b: Ball) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
  const min  = a.radius + b.radius;
  if (dist >= min) return;

  const nx = dx / dist, ny = dy / dist;
  const overlap = min - dist;
  const total   = a.mass + b.mass;

  // Separate
  a.x -= nx * overlap * (b.mass / total);
  a.y -= ny * overlap * (b.mass / total);
  b.x += nx * overlap * (a.mass / total);
  b.y += ny * overlap * (a.mass / total);

  // Elastic impulse
  const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
  const dot  = dvx * nx + dvy * ny;
  if (dot > 0) return; // already separating

  const J = (2 * dot * RESTITUTION) / total;
  a.vx += J * b.mass * nx;  a.vy += J * b.mass * ny;
  b.vx -= J * a.mass * nx;  b.vy -= J * a.mass * ny;
}

export default function BackgroundBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    let mx = -9999, my = -9999;
    let mvx = 0,    mvy = 0;

    const balls: Ball[] = Array.from({ length: COUNT }, () => spawnBall(W, H));
    separate(balls);

    const onMouseMove = (e: MouseEvent) => {
      mvx = e.clientX - mx;
      mvy = e.clientY - my;
      mx  = e.clientX;
      my  = e.clientY;
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize",    onResize);

    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      // Mouse vs balls
      const mouseSpeed = Math.sqrt(mvx * mvx + mvy * mvy);
      for (const b of balls) {
        const dx   = b.x - mx, dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const min  = b.radius + MOUSE_R;
        if (dist < min) {
          const nx = dx / dist, ny = dy / dist;
          // Separate
          b.x += nx * (min - dist);
          b.y += ny * (min - dist);
          // Transfer mouse velocity into ball
          if (mouseSpeed > 0.5) {
            const dot = mvx * nx + mvy * ny;
            if (dot < 0) {
              b.vx -= dot * nx * RESTITUTION * 1.8;
              b.vy -= dot * ny * RESTITUTION * 1.8;
            }
          }
        }
      }

      // Decay mouse velocity (so it doesn't keep applying after mouse stops)
      mvx *= 0.6;
      mvy *= 0.6;

      // Ball-ball collisions
      for (let i = 0; i < balls.length; i++)
        for (let j = i + 1; j < balls.length; j++)
          resolveCollision(balls[i], balls[j]);

      // Update + draw
      for (const b of balls) {
        // Clamp speed
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (spd > MAX_SPEED) { b.vx = (b.vx / spd) * MAX_SPEED; b.vy = (b.vy / spd) * MAX_SPEED; }

        b.x += b.vx;
        b.y += b.vy;

        // Wall bounce
        if (b.x - b.radius < 0)  { b.x = b.radius;     b.vx =  Math.abs(b.vx) * RESTITUTION; }
        if (b.x + b.radius > W)  { b.x = W - b.radius; b.vx = -Math.abs(b.vx) * RESTITUTION; }
        if (b.y - b.radius < 0)  { b.y = b.radius;     b.vy =  Math.abs(b.vy) * RESTITUTION; }
        if (b.y + b.radius > H)  { b.y = H - b.radius; b.vy = -Math.abs(b.vy) * RESTITUTION; }

        // Friction
        b.vx *= FRICTION;
        b.vy *= FRICTION;

        // Draw solid circle with subtle stroke
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.strokeStyle = b.color.replace(/[\d.]+\)$/, "0.35)");
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize",    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        0,
        pointerEvents: "none",
      }}
    />
  );
}
