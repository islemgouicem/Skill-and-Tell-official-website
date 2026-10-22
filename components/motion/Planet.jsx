"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

/*
 * A slowly rotating night-side planet rising from the bottom of the hero —
 * the old site's planet horizon, rendered in WebGL from a real map texture
 * (NASA Black Marble city lights + land mask + relief, packed into one image)
 * and recoloured in the Skill&Tell palette. Falls back to the original image
 * without WebGL.
 *
 * planet-map.webp channels: R = city lights, G = land mask, B = relief.
 */

const PLANET_VS = /* glsl */ `
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position,1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const PLANET_FS = /* glsl */ `
uniform sampler2D uMap; uniform vec3 uLight;
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  vec3 m = texture2D(uMap, vUv).rgb;
  float lights = m.r, land = m.g, relief = m.b;

  vec3 ocean = vec3(0.020, 0.004, 0.060);
  vec3 ground = mix(vec3(0.130, 0.050, 0.280), vec3(0.250, 0.110, 0.450), smoothstep(0.0, 0.6, relief) * 0.7);
  vec3 col = mix(ocean, ground, smoothstep(0.35, 0.65, land));

  // soft light from above and behind: a gentle lit band near the top
  float diff = dot(normalize(vNormalW), normalize(uLight));
  float day = smoothstep(-0.1, 0.8, diff);
  col *= 0.55 + 0.9 * day;

  // city lights: violet-white glow, warm orange where they are densest
  vec3 glow = mix(vec3(0.62, 0.42, 1.0), vec3(1.0, 0.62, 0.25), smoothstep(0.45, 0.95, lights));
  float l = smoothstep(0.03, 0.55, lights);
  col += glow * l * 1.9 * (1.0 - 0.45 * day);

  // limb darkening instead of a coloured rim, so the edge reads as a sphere
  float facing = max(dot(normalize(vNormalW), vViewDir), 0.0);
  col *= 0.45 + 0.55 * smoothstep(0.0, 0.4, facing);
  gl_FragColor = vec4(col, 1.0);
}`;

const ASPECT = 1210 / 347; // the old planet image's proportions

export default function Planet({ className = "" }) {
  const host = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      if (disposed || !host.current) return;
      const el = host.current;
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        setFallback(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      el.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });

      // Orthographic view: the canvas shows the planet's top cap, like a horizon.
      const camera = new THREE.OrthographicCamera(-ASPECT / 2, ASPECT / 2, 1, 0, 0.1, 20);
      camera.position.set(0, 0, 10);
      const scene = new THREE.Scene();
      const capTop = 0.94;
      const R = ((ASPECT / 2) ** 2 + capTop ** 2) / (2 * capTop);

      const map = await new THREE.TextureLoader().loadAsync("/images/planet-map.webp");
      if (disposed) {
        map.dispose();
        renderer.dispose();
        return;
      }
      map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      map.colorSpace = THREE.NoColorSpace;

      const material = new THREE.ShaderMaterial({
        vertexShader: PLANET_VS,
        fragmentShader: PLANET_FS,
        uniforms: { uMap: { value: map }, uLight: { value: new THREE.Vector3(-0.3, 0.55, -1.0).normalize() } },
      });
      const planet = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 96), material);
      // Tilt toward the viewer so populated latitudes pass across the horizon.
      const tilt = new THREE.Group();
      tilt.position.set(0, capTop - R, 0);
      tilt.rotation.set(1.22, 0, 0.1);
      tilt.add(planet);
      planet.rotation.y = 2.2;
      scene.add(tilt);

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        const a = w / h;
        camera.left = -a / 2;
        camera.right = a / 2;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const reduced = prefersReducedMotion();
      let raf = 0;
      let running = false;
      let last = performance.now();
      const frame = (t) => {
        const dt = Math.min(0.05, (t - last) / 1000);
        last = t;
        planet.rotation.y += dt * 0.035;
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (running || reduced) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };
      renderer.render(scene, camera);
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
      io.observe(el);
      const vis = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", vis);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", vis);
        planet.geometry.dispose();
        material.dispose();
        map.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={host} className={`relative ${className}`} style={{ aspectRatio: `${ASPECT}` }} aria-hidden="true">
      {fallback && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/purpleplanet.png" alt="" className="h-full w-full object-contain" />
      )}
    </div>
  );
}
