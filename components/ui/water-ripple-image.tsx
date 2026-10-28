"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Pointer = { x: number; y: number; active: boolean };
type Props = { src: string; pointer: RefObject<Pointer> };

const VERTEX = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_image;
uniform float u_time;
uniform float u_aspect;
uniform float u_image_aspect;
uniform float u_hover;
uniform vec2 u_pointer;
void main() {
  vec2 delta = (v_uv - u_pointer) * vec2(u_aspect, 1.0);
  float distance = length(delta);
  float ripple = sin(distance * 38.0 - u_time * 4.0) * exp(-distance * 6.0) * u_hover;
  vec2 uv = v_uv;
  uv += normalize(delta + vec2(0.0001)) * ripple * 0.012;
  uv += vec2(sin(uv.y * 25.0 + u_time), cos(uv.x * 20.0 + u_time * 0.7)) * 0.002;
  vec2 cover = uv - 0.5;
  if (u_aspect > u_image_aspect) cover.y *= u_image_aspect / u_aspect;
  else cover.x *= u_aspect / u_image_aspect;
  cover.y = -cover.y;
  vec3 color = texture2D(u_image, clamp(cover + 0.5, 0.001, 0.999)).rgb;
  float caustic = pow(0.5 + 0.5 * sin(uv.x * 30.0 + sin(uv.y * 22.0 + u_time) * 2.0), 8.0);
  color += vec3(0.05, 0.10, 0.12) * caustic * (0.25 + u_hover * 0.35);
  gl_FragColor = vec4(color, 1.0);
}`;

export function WaterRippleImage({ src, pointer }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setAnimate(!preference.matches);
    change();
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    const box = wrapper.current;
    const surface = canvas.current;
    if (!box || !surface || !animate) return;
    const gl = surface.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;
    const shaders: WebGLShader[] = [];
    let frame: number | null = null;
    let alive = true;
    let visible = false;
    let loaded = false;
    let last = 0;
    let clock = 0;
    let intensity = 0;
    let draws = 0;
    let pointerTop = 0.3;
    let pointerHeight = 0.7;
    const image = new window.Image();
    let observer: IntersectionObserver | null = null;
    let resizer: ResizeObserver | null = null;

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      last = 0;
    }
    function release() {
      alive = false;
      stop();
      image.onload = null;
      image.onerror = null;
      observer?.disconnect();
      resizer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      surface?.removeEventListener("webglcontextlost", lost);
      if (texture) gl?.deleteTexture(texture);
      if (buffer) gl?.deleteBuffer(buffer);
      if (program) gl?.deleteProgram(program);
      shaders.forEach(shader => gl?.deleteShader(shader));
      if (box) box.dataset.webgl = "fallback";
    }
    function lost() {
      loaded = false;
      stop();
      if (box) box.dataset.webgl = "fallback";
    }
    function sync() {
      if (alive && loaded && visible && !document.hidden && !gl?.isContextLost()) {
        if (frame === null) frame = requestAnimationFrame(draw);
      } else stop();
    }

    let timeLocation: WebGLUniformLocation | null = null;
    let hoverLocation: WebGLUniformLocation | null = null;
    let pointerLocation: WebGLUniformLocation | null = null;

    function draw(time: number) {
      frame = null;
      if (!gl || !surface || !alive || !loaded || !visible || document.hidden) return;
      if (last && time - last < 32) { frame = requestAnimationFrame(draw); return; }
      const delta = last ? Math.min(50, time - last) : 16;
      last = time;
      clock += delta / 1000;
      intensity += ((pointer.current.active ? 1 : 0) - intensity) * (1 - Math.exp(-delta / 140));
      gl.uniform1f(timeLocation, clock);
      gl.uniform1f(hoverLocation, intensity);
      const localY = Math.max(0, Math.min(1, (pointer.current.y / 100 - pointerTop) / pointerHeight));
      gl.uniform2f(pointerLocation, pointer.current.x / 100, 1 - localY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      box!.dataset.webgl = "ready";
      surface.dataset.frames = String(++draws);
      frame = requestAnimationFrame(draw);
    }

    try {
      for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
        const shader = gl.createShader(type);
        if (!shader) throw new Error("shader");
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("shader compilation");
      }
      program = gl.createProgram();
      if (!program) throw new Error("program");
      shaders.forEach(shader => gl.attachShader(program!, shader));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("program link");
      gl.useProgram(program);
      buffer = gl.createBuffer();
      texture = gl.createTexture();
      if (!buffer || !texture) throw new Error("allocation");
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
      timeLocation = gl.getUniformLocation(program, "u_time");
      hoverLocation = gl.getUniformLocation(program, "u_hover");
      pointerLocation = gl.getUniformLocation(program, "u_pointer");

      const resize = () => {
        const rect = box.getBoundingClientRect();
        const parent = box.parentElement?.getBoundingClientRect();
        if (parent && parent.height > 0) {
          pointerTop = (rect.top - parent.top) / parent.height;
          pointerHeight = Math.max(0.01, rect.height / parent.height);
        }
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        surface.width = Math.max(1, Math.round(rect.width * dpr));
        surface.height = Math.max(1, Math.round(rect.height * dpr));
        gl.viewport(0, 0, surface.width, surface.height);
        gl.uniform1f(gl.getUniformLocation(program!, "u_aspect"), surface.width / surface.height);
      };
      resizer = new ResizeObserver(resize);
      resizer.observe(box);
      resize();

      image.onload = () => {
        if (!alive || gl.isContextLost()) return;
        try {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
          gl.uniform1f(gl.getUniformLocation(program!, "u_image_aspect"), image.naturalWidth / image.naturalHeight);
          loaded = true;
          sync();
        } catch { lost(); }
      };
      image.onerror = lost;
      observer = new IntersectionObserver(([entry]) => {
        if (!alive) return;
        visible = entry.isIntersecting;
        if (visible && !image.src) image.src = src;
        sync();
      }, { threshold: 0.05 });
      observer.observe(box);
      document.addEventListener("visibilitychange", sync);
      surface.addEventListener("webglcontextlost", lost);
    } catch {
      release();
    }
    return release;
  }, [animate, src, pointer]);

  return <div ref={wrapper} className="water-ripple" aria-hidden="true" data-webgl="fallback" style={{ backgroundImage: `url("${src}")` }}><canvas ref={canvas} /></div>;
}
