"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

//##########################################################
// all rights reserved to Techartist -- @VoXelo from codepen
// codepen link: https://codepen.io/VoXelo/pen/wBKvJxd
//##########################################################

const BlackHole = () => {
    const mountRef = useRef(null)
    const sceneRef = useRef(null)
    const rendererRef = useRef(null)
    const cameraRef = useRef(null)
    const controlsRef = useRef(null)
    const composerRef = useRef(null)
    const [showInfo, setShowInfo] = useState(true)
    const animationFrameRef = useRef()

    useEffect(() => {
        if (!mountRef.current) return

        const initScene = async () => {
            // Dynamic imports for Three.js addons
            const { OrbitControls } = await import(
                "three/examples/jsm/controls/OrbitControls.js"
            )
            const { EffectComposer } = await import(
                "three/examples/jsm/postprocessing/EffectComposer.js"
            )
            const { RenderPass } = await import(
                "three/examples/jsm/postprocessing/RenderPass.js"
            )
            const { UnrealBloomPass } = await import(
                "three/examples/jsm/postprocessing/UnrealBloomPass.js"
            )
            const { ShaderPass } = await import(
                "three/examples/jsm/postprocessing/ShaderPass.js"
            )

            // Constants
            const BLACK_HOLE_RADIUS = 1.3
            const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.2
            const DISK_OUTER_RADIUS = 8.0
            const DISK_TILT_ANGLE = Math.PI / 3.0

            // Scene setup
            const scene = new THREE.Scene()
            scene.fog = new THREE.FogExp2(0x020104, 0.025)
            sceneRef.current = scene

            const camera = new THREE.PerspectiveCamera(
                60,
                window.innerWidth / window.innerHeight,
                0.1,
                4000
            )
            camera.position.set(-6.5, 5.0, 6.5)
            cameraRef.current = camera

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                powerPreference: "high-performance"
            })
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
            renderer.outputColorSpace = THREE.SRGBColorSpace
            renderer.toneMapping = THREE.ACESFilmicToneMapping
            renderer.toneMappingExposure = 1.2
            rendererRef.current = renderer

            mountRef.current.appendChild(renderer.domElement)

            // Post-processing setup
            const composer = new EffectComposer(renderer)
            composer.addPass(new RenderPass(scene, camera))

            const bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                0.8,
                0.7,
                0.8
            )
            composer.addPass(bloomPass)

            // Gravitational lensing shader
            const lensingShader = {
                uniforms: {
                    tDiffuse: { value: null },
                    blackHoleScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
                    lensingStrength: { value: 0.12 },
                    lensingRadius: { value: 0.3 },
                    aspectRatio: { value: window.innerWidth / window.innerHeight },
                    chromaticAberration: { value: 0.005 }
                },
                vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform vec2 blackHoleScreenPos;
          uniform float lensingStrength;
          uniform float lensingRadius;
          uniform float aspectRatio;
          uniform float chromaticAberration;
          varying vec2 vUv;
          
          void main() {
            vec2 screenPos = vUv;
            vec2 toCenter = screenPos - blackHoleScreenPos;
            toCenter.x *= aspectRatio;
            float dist = length(toCenter);
            
            float distortionAmount = lensingStrength / (dist * dist + 0.003);
            distortionAmount = clamp(distortionAmount, 0.0, 0.7);
            float falloff = smoothstep(lensingRadius, lensingRadius * 0.3, dist);
            distortionAmount *= falloff;
            
            vec2 offset = normalize(toCenter) * distortionAmount;
            offset.x /= aspectRatio;
            
            vec2 distortedUvR = screenPos - offset * (1.0 + chromaticAberration);
            vec2 distortedUvG = screenPos - offset;
            vec2 distortedUvB = screenPos - offset * (1.0 - chromaticAberration);
            
            float r = texture2D(tDiffuse, distortedUvR).r;
            float g = texture2D(tDiffuse, distortedUvG).g;
            float b = texture2D(tDiffuse, distortedUvB).b;
            
            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `
            }
            const lensingPass = new ShaderPass(lensingShader)
            composer.addPass(lensingPass)
            composerRef.current = composer

            // Controls
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.035
            controls.rotateSpeed = 0.4
            controls.autoRotate = true
            controls.autoRotateSpeed = 0.5
            controls.target.set(0, 0, 0)
            controls.minDistance = 2.5
            controls.maxDistance = 100
            controls.enablePan = false
            controls.update()
            controlsRef.current = controls

            // Starfield
            const createStarfield = () => {
                const starGeometry = new THREE.BufferGeometry()
                const starCount = 150000
                const starPositions = new Float32Array(starCount * 3)
                const starColors = new Float32Array(starCount * 3)
                const starSizes = new Float32Array(starCount)
                const starTwinkle = new Float32Array(starCount)
                const starFieldRadius = 2000

                const starPalette = [
                    new THREE.Color(0x88aaff),
                    new THREE.Color(0xffaaff),
                    new THREE.Color(0xaaffff),
                    new THREE.Color(0xffddaa),
                    new THREE.Color(0xffeecc),
                    new THREE.Color(0xffffff),
                    new THREE.Color(0xff8888),
                    new THREE.Color(0x88ff88),
                    new THREE.Color(0xffff88),
                    new THREE.Color(0x88ffff)
                ]

                for (let i = 0; i < starCount; i++) {
                    const i3 = i * 3
                    const phi = Math.acos(-1 + (2 * i) / starCount)
                    const theta = Math.sqrt(starCount * Math.PI) * phi
                    const radius = Math.cbrt(Math.random()) * starFieldRadius + 100

                    starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta)
                    starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
                    starPositions[i3 + 2] = radius * Math.cos(phi)

                    const starColor = starPalette[
                        Math.floor(Math.random() * starPalette.length)
                    ].clone()
                    starColor.multiplyScalar(Math.random() * 0.7 + 0.3)
                    starColors[i3] = starColor.r
                    starColors[i3 + 1] = starColor.g
                    starColors[i3 + 2] = starColor.b

                    starSizes[i] = THREE.MathUtils.randFloat(0.6, 3.0)
                    starTwinkle[i] = Math.random() * Math.PI * 2
                }

                starGeometry.setAttribute(
                    "position",
                    new THREE.BufferAttribute(starPositions, 3)
                )
                starGeometry.setAttribute(
                    "color",
                    new THREE.BufferAttribute(starColors, 3)
                )
                starGeometry.setAttribute(
                    "size",
                    new THREE.BufferAttribute(starSizes, 1)
                )
                starGeometry.setAttribute(
                    "twinkle",
                    new THREE.BufferAttribute(starTwinkle, 1)
                )

                const starMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: 0 },
                        uPixelRatio: { value: renderer.getPixelRatio() }
                    },
                    vertexShader: `
            uniform float uTime;
            uniform float uPixelRatio;
            attribute float size;
            attribute float twinkle;
            varying vec3 vColor;
            varying float vTwinkle;
            
            void main() {
              vColor = color;
              vTwinkle = sin(uTime * 2.5 + twinkle) * 0.5 + 0.5;
              
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * uPixelRatio * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
                    fragmentShader: `
            varying vec3 vColor;
            varying float vTwinkle;
            
            void main() {
              float dist = distance(gl_PointCoord, vec2(0.5));
              if (dist > 0.5) discard;
              
              float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
              alpha *= (0.2 + vTwinkle * 0.8);
              
              gl_FragColor = vec4(vColor, alpha);
            }
          `,
                    transparent: true,
                    vertexColors: true,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                })

                return new THREE.Points(starGeometry, starMaterial)
            }

            const stars = createStarfield()
            scene.add(stars)

            // Event Horizon
            const eventHorizonGeom = new THREE.SphereGeometry(
                BLACK_HOLE_RADIUS * 1.05,
                128,
                64
            )
            const eventHorizonMat = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uCameraPosition: { value: camera.position }
                },
                vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uCameraPosition;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vec3 viewDirection = normalize(uCameraPosition - vPosition);
            float fresnel = 1.0 - abs(dot(vNormal, viewDirection));
            fresnel = pow(fresnel, 2.5);
            
            vec3 glowColor = vec3(1.0, 0.4, 0.1);
            float pulse = sin(uTime * 2.5) * 0.15 + 0.85;
            
            gl_FragColor = vec4(glowColor * fresnel * pulse, fresnel * 0.4);
          }
        `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            })

            const eventHorizon = new THREE.Mesh(eventHorizonGeom, eventHorizonMat)
            scene.add(eventHorizon)

            // Black Hole Core
            const blackHoleGeom = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, 128, 64)
            const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
            const blackHoleMesh = new THREE.Mesh(blackHoleGeom, blackHoleMat)
            blackHoleMesh.renderOrder = 0
            scene.add(blackHoleMesh)

            // Accretion Disk with advanced shader
            const diskGeometry = new THREE.RingGeometry(
                DISK_INNER_RADIUS,
                DISK_OUTER_RADIUS,
                256,
                128
            )
            const diskMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0.0 },
                    uColorHot: { value: new THREE.Color(0xffffff) },
                    uColorMid1: { value: new THREE.Color(0xff7733) },
                    uColorMid2: { value: new THREE.Color(0xff4477) },
                    uColorMid3: { value: new THREE.Color(0x7744ff) },
                    uColorOuter: { value: new THREE.Color(0x4477ff) },
                    uNoiseScale: { value: 2.5 },
                    uFlowSpeed: { value: 0.22 },
                    uDensity: { value: 1.3 }
                },
                vertexShader: `
          varying vec2 vUv;
          varying float vRadius;
          varying float vAngle;
          void main() {
            vUv = uv;
            vRadius = length(position.xy);
            vAngle = atan(position.y, position.x);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
                fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorHot;
          uniform vec3 uColorMid1;
          uniform vec3 uColorMid2;
          uniform vec3 uColorMid3;
          uniform vec3 uColorOuter;
          uniform float uNoiseScale;
          uniform float uFlowSpeed;
          uniform float uDensity;

          varying vec2 vUv;
          varying float vRadius;
          varying float vAngle;

          // Simplex noise function (shortened for brevity)
          float snoise(vec3 v) {
            // Implementation would go here - using simplified version
            return sin(v.x * 10.0 + uTime) * sin(v.y * 15.0) * sin(v.z * 8.0);
          }

          void main() {
            float normalizedRadius = smoothstep(${DISK_INNER_RADIUS.toFixed(
                    2
                )}, ${DISK_OUTER_RADIUS.toFixed(2)}, vRadius);
            
            float spiral = vAngle * 3.0 - (1.0 / (normalizedRadius + 0.1)) * 2.0;
            vec2 noiseUv = vec2(vUv.x + uTime * uFlowSpeed * (2.0 / (vRadius * 0.3 + 1.0)) + sin(spiral) * 0.1, vUv.y * 0.8 + cos(spiral) * 0.1);
            float noiseVal = (snoise(vec3(noiseUv * uNoiseScale, uTime * 0.15)) + 1.0) * 0.5;
            
            vec3 color = uColorOuter;
            color = mix(color, uColorMid3, smoothstep(0.0, 0.25, normalizedRadius));
            color = mix(color, uColorMid2, smoothstep(0.2, 0.55, normalizedRadius));
            color = mix(color, uColorMid1, smoothstep(0.5, 0.75, normalizedRadius));
            color = mix(color, uColorHot, smoothstep(0.7, 0.95, normalizedRadius));
            
            color *= (0.5 + noiseVal * 1.0);
            float brightness = pow(1.0 - normalizedRadius, 1.0) * 3.5 + 0.5;
            brightness *= (0.3 + noiseVal * 2.2);
            
            float pulse = sin(uTime * 1.8 + normalizedRadius * 12.0 + vAngle * 2.0) * 0.15 + 0.85;
            brightness *= pulse;
            
            float alpha = uDensity * (0.2 + noiseVal * 0.9);
            alpha *= smoothstep(0.0, 0.15, normalizedRadius);
            alpha *= (1.0 - smoothstep(0.85, 1.0, normalizedRadius));
            alpha = clamp(alpha, 0.0, 1.0);

            gl_FragColor = vec4(color * brightness, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            })

            const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial)
            accretionDisk.rotation.x = DISK_TILT_ANGLE
            accretionDisk.renderOrder = 1
            scene.add(accretionDisk)

            // Animation loop
            const clock = new THREE.Clock()
            const blackHoleScreenPosVec3 = new THREE.Vector3()

            const animate = () => {
                animationFrameRef.current = requestAnimationFrame(animate)
                const elapsedTime = clock.getElapsedTime()
                const deltaTime = clock.getDelta()

                // Update shader uniforms
                diskMaterial.uniforms.uTime.value = elapsedTime
                stars.material.uniforms.uTime.value = elapsedTime
                eventHorizonMat.uniforms.uTime.value = elapsedTime
                eventHorizonMat.uniforms.uCameraPosition.value.copy(camera.position)

                // Update gravitational lensing
                blackHoleScreenPosVec3.copy(blackHoleMesh.position).project(camera)
                lensingPass.uniforms.blackHoleScreenPos.value.set(
                    (blackHoleScreenPosVec3.x + 1) / 2,
                    (blackHoleScreenPosVec3.y + 1) / 2
                )

                controls.update()

                // Animate starfield and disk
                stars.rotation.y += deltaTime * 0.003
                stars.rotation.x += deltaTime * 0.001
                accretionDisk.rotation.z += deltaTime * 0.005

                composer.render(deltaTime)
            }

            animate()

            // Handle resize
            const handleResize = () => {
                const width = window.innerWidth
                const height = window.innerHeight

                camera.aspect = width / height
                camera.updateProjectionMatrix()
                renderer.setSize(width, height)
                composer.setSize(width, height)
                bloomPass.resolution.set(width, height)
                lensingPass.uniforms.aspectRatio.value = width / height
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
            }

            window.addEventListener("resize", handleResize)

            // Hide info after delay
            setTimeout(() => setShowInfo(false), 5000)

            return () => {
                window.removeEventListener("resize", handleResize)
            }
        }

        initScene()

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
            if (rendererRef.current && mountRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement)
                rendererRef.current.dispose()
            }
        }
    }, [])


    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-nebula font-inter">
            <div ref={mountRef} className="w-full h-full" />

            {/* Info Panel */}
            <div
                className={`absolute top-5 left-1/2 transform -translate-x-1/2 text-center text-[#EBEEFF] transition-opacity duration-2000 z-50 pointer-events-none ${showInfo ? "opacity-90" : "opacity-0"
                    }`}
            >
                <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-2 grad-title">
                    Welcome to Skill&Tell's Universe
                </h1>
                <p className="text-md text-[#EBEEFF]/80">You can drag and rotate</p>
            </div>



            <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center mt-6">
                <div className="mb-3 text-center">
                    <p className="text-md text-[#EBEEFF]/80 font-light">
                        Loading the cosmos...
                    </p>
                </div>

                {/*  Spinner */}
                <div className="w-8 h-8 border-2 border-[#EBEEFF]/30 border-t-[#EBEEFF] rounded-full animate-spin"></div>
            </div>


        </div>
    )
}

export default BlackHole
