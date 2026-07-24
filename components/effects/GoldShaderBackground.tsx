"use client";

import { useEffect, useRef } from "react";

const VERTEX_SRC = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    float t = u_time * 0.2;

    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    float wave = sin(p.x * 2.0 + t) * 0.5 + sin(p.y * 3.0 - t * 1.5) * 0.5;
    wave += sin((p.x + p.y) * 4.0 + t * 0.8) * 0.3;
    wave += sin(length(p - (mouse * 2.0 - 1.0)) * 5.0 - t * 2.0) * 0.15;

    vec3 baseGold = vec3(0.83, 0.68, 0.21);
    vec3 deepGold = vec3(0.3, 0.2, 0.05);
    vec3 highlightGold = vec3(1.0, 0.9, 0.6);

    float detail = smoothstep(-1.0, 1.0, wave);
    vec3 color = mix(deepGold, baseGold, detail);
    color = mix(color, highlightGold, pow(detail, 4.0) * 0.5);

    float vignette = 1.0 - length(p * 0.5);
    color *= smoothstep(0.0, 1.0, vignette);

    gl_FragColor = vec4(color * 0.6, 1.0);
}
`;

/**
 * The "liquid gold" hero background — a mouse-reactive WebGL fragment shader
 * from the original Stitch design system, wrapped for React. Renders a static
 * gradient fallback when WebGL is unavailable or reduced motion is requested.
 */
export default function GoldShaderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SRC));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse in pixel coords matching u_resolution (ShaderToy convention), lerped for weight.
    const target = { x: width * 0.5, y: height * 0.5 };
    const mouse = { ...target };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) * dpr;
      target.y = (rect.height - (e.clientY - rect.top)) * dpr;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let running = true;
    const start = performance.now();
    const frame = (now: number) => {
      if (!running) return;
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uResolution, width, height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    // Only render while on screen.
    const io = new IntersectionObserver((entries) => {
      const onScreen = entries[0].isIntersecting;
      if (onScreen && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!onScreen) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(90%_70%_at_50%_30%,#1a1409_0%,#0a0805_50%,#050505_100%)] ${className}`}
    />
  );
}
