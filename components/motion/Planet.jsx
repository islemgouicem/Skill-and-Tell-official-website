"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

/*
 * A slowly rotating purple planet rising from the bottom of the hero —
 * the old site's planet horizon, rendered in WebGL so it stays crisp at any
 * size and actually turns. Falls back to the original image without WebGL.
 */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){float f=0.0;float a=0.5;for(int i=0;i<5;i++){f+=a*snoise(p);p*=2.03;a*=0.5;}return f;}
`;

const PLANET_VS = /* glsl */ `
varying vec3 vLocal; varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  vLocal = position;
  vec4 wp = modelMatrix * vec4(position,1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const PLANET_FS = /* glsl */ `
uniform vec3 uLight; uniform float uTime;
varying vec3 vLocal; varying vec3 vNormalW; varying vec3 vViewDir;
${NOISE}
void main(){
  vec3 p = normalize(vLocal);
  // continents with ragged coastlines
  float n = fbm(p*1.7) + 0.35*fbm(p*5.0 + 7.3);
  float land = smoothstep(0.05, 0.13, n);
  float detail = fbm(p*9.0 + 3.1);
  vec3 ocean = mix(vec3(0.012,0.0,0.045), vec3(0.05,0.01,0.14), 0.5 + 0.5*detail);
  vec3 ground = mix(vec3(0.10,0.03,0.26), vec3(0.26,0.10,0.55), smoothstep(-0.4,0.7,detail));
  vec3 col = mix(ocean, ground, land);

  // sun sits above and behind: a thin lit crescent, the rest is night
  float diff = dot(normalize(vNormalW), normalize(uLight));
  float day = smoothstep(-0.05, 0.55, diff);
  col *= 0.35 + 1.4*day;

  // city lights on the night side: violet-white clusters with orange cores
  float clusters = smoothstep(0.15, 0.75, snoise(p*7.0) + 0.25);
  float lights = smoothstep(0.62, 0.95, snoise(p*48.0)) * clusters;
  float glow = smoothstep(0.35, 0.9, snoise(p*20.0)) * clusters;
  vec3 cityCol = mix(vec3(0.72,0.55,1.0), vec3(1.0,0.55,0.15), smoothstep(0.75,0.95, snoise(p*31.0)));
  col += (cityCol * lights * 1.8 + vec3(0.45,0.2,0.9) * glow * 0.25) * land * (1.0 - day);

  // drifting high clouds
  float clouds = smoothstep(0.25, 0.85, fbm(vec3(p.x*3.0 + uTime*0.01, p.y*6.0, p.z*3.0)));
  col = mix(col, vec3(0.55,0.42,0.85) * (0.15 + day), clouds * 0.22);

  float rim = pow(1.0 - max(dot(normalize(vNormalW), vViewDir), 0.0), 2.4);
  col += vec3(0.62,0.31,0.95) * rim * 1.1;
  gl_FragColor = vec4(col, 1.0);
}`;

const ATMO_VS = /* glsl */ `
varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  vec4 wp = modelMatrix * vec4(position,1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const ATMO_FS = /* glsl */ `
varying vec3 vNormalW; varying vec3 vViewDir;
void main(){
  float i = pow(clamp(0.78 - dot(normalize(vNormalW), vViewDir), 0.0, 1.0), 3.2);
  vec3 c = mix(vec3(0.62,0.31,0.95), vec3(1.0,0.55,0.15), 0.18);
  gl_FragColor = vec4(c, 1.0) * i * 1.6;
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
      const capTop = 0.86;
      const R = ((ASPECT / 2) ** 2 + capTop ** 2) / (2 * capTop);
      const center = new THREE.Vector3(0, capTop - R, 0);

      const planetMat = new THREE.ShaderMaterial({
        vertexShader: PLANET_VS,
        fragmentShader: PLANET_FS,
        uniforms: { uLight: { value: new THREE.Vector3(-0.35, 1.0, -0.45).normalize() }, uTime: { value: 0 } },
      });
      const planet = new THREE.Mesh(new THREE.SphereGeometry(R, 160, 120), planetMat);
      planet.position.copy(center);
      planet.rotation.z = 0.32;

      const atmo = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.055, 96, 72),
        new THREE.ShaderMaterial({ vertexShader: ATMO_VS, fragmentShader: ATMO_FS, side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      atmo.position.copy(center);
      scene.add(atmo, planet);

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
        planet.rotation.y += dt * 0.045;
        planetMat.uniforms.uTime.value += dt;
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
        atmo.geometry.dispose();
        planetMat.dispose();
        atmo.material.dispose();
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
