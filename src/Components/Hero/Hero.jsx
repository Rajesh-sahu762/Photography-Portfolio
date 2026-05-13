/**
 * CameraAssemblySection.jsx
 *
 * Scroll-driven cinematic camera model assembly animation
 * Three.js (R3F) + GSAP ScrollTrigger + React
 *
 * Install:
 *   npm install @react-three/fiber @react-three/drei gsap three
 *
 * Usage:
 *   import CameraAssemblySection from './CameraAssemblySection';
 *   <CameraAssemblySection />
 *
 * Model path: adjust MODEL_PATH below if your component sits
 * at a different level from src/assets/
 */

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  Suspense,
  useState,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ─── CONFIG ──────────────────────────────────────────────────────────────────

// If using Vite + src/assets, you can instead do:
//   import cameraModel from '../assets/3d-Model/cameraModel.glb';
//   and use cameraModel as MODEL_PATH
const MODEL_PATH = '/src/assets/3d-Model/cameraModel.glb';

const SCROLL_HEIGHT = '480vh'; // Total scroll distance for this section

// Scroll progress thresholds where each category card appears
const CAT_THRESHOLDS = [0.04, 0.16, 0.28, 0.40, 0.52, 0.64];

const CATEGORIES = [
  {
    id: '01',
    name: 'Cinematic',
    tagline: 'Epic stories in single frames',
    img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=440&q=80',
    accent: '#d4a843',
  },
  {
    id: '02',
    name: 'Candid',
    tagline: 'Raw emotion, unscripted truth',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=440&q=80',
    accent: '#7eb8c9',
  },
  {
    id: '03',
    name: 'Wedding',
    tagline: 'Love stories, forever preserved',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=440&q=80',
    accent: '#e8b4b8',
  },
  {
    id: '04',
    name: 'Portrait',
    tagline: 'Souls revealed through light',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=440&q=80',
    accent: '#96d496',
  },
  {
    id: '05',
    name: 'Fashion',
    tagline: 'Where art meets identity',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=440&q=80',
    accent: '#c5a8d4',
  },
  {
    id: '06',
    name: 'Events',
    tagline: 'Energy captured in time',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=440&q=80',
    accent: '#d4b8a0',
  },
];

// ─── EASING ──────────────────────────────────────────────────────────────────

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// ─── MATERIAL HELPER ─────────────────────────────────────────────────────────

function applyOpacity(mesh, opacity) {
  const mats = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];
  mats.forEach((mat) => {
    if (!mat) return;
    if (!mat.transparent) {
      mat.transparent = true;
      mat.needsUpdate = true;
    }
    mat.opacity = opacity;
  });
}

// ─── 3-D CAMERA MODEL ────────────────────────────────────────────────────────

function CameraModel({ scrollProgress }) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef();
  const partsRef = useRef([]); // animation data per mesh
  const centerRef = useRef(new THREE.Vector3());
  const prevScrollRef = useRef(0);

  useEffect(() => {
    if (!groupRef.current) return;
    partsRef.current = [];

    // ── Hide Object_6 (and all its children) ──────────────────────────
    const obj6 = scene.getObjectByName('Object_6');
    if (obj6) {
      obj6.visible = false;
      obj6.traverse((c) => {
        c.visible = false;
      });
    }

    // ── Centre group on bounding box ──────────────────────────────────
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    centerRef.current.copy(center);

    // spread radius = 1.8× the largest model dimension
    const spread = Math.max(size.x, size.y, size.z) * 1.8;

    // ── Collect visible meshes (skip Object_6 descendants) ────────────
    const meshes = [];
    scene.traverse((child) => {
      if (!child.isMesh) return;

      // skip if Object_6 ancestor
      let anc = child.parent;
      while (anc) {
        if (anc.name === 'Object_6') return;
        anc = anc.parent;
      }
      meshes.push(child);
    });

    // ── Assign exploded positions & rotations ─────────────────────────
    meshes.forEach((mesh, i) => {
      const angle = (i / meshes.length) * Math.PI * 2;
      // vary radius so parts aren't perfectly uniform
      const r = spread * (0.75 + (i % 4) * 0.18);
      const yOff = (((i % 5) - 2) / 2) * spread * 0.45;

      const origPos = mesh.position.clone();
      const origRot = {
        x: mesh.rotation.x,
        y: mesh.rotation.y,
        z: mesh.rotation.z,
      };

      const explodedOffset = new THREE.Vector3(
        Math.cos(angle) * r,
        yOff,
        Math.sin(angle) * r * 0.55 - spread * 0.25
      );

      // seeded random-ish rotation for each part
      const seed = i * 2.39996; // golden angle seed
      const explodedRot = {
        x: Math.sin(seed) * Math.PI * 0.55,
        y: Math.cos(seed * 1.3) * Math.PI * 0.7,
        z: Math.sin(seed * 0.7) * Math.PI * 0.35,
      };

      // initialise to exploded state
      mesh.position.copy(origPos).add(explodedOffset);
      mesh.rotation.set(
        origRot.x + explodedRot.x,
        origRot.y + explodedRot.y,
        origRot.z + explodedRot.z
      );
      applyOpacity(mesh, 0);

      partsRef.current.push({
        mesh,
        origPos,
        origRot,
        explodedOffset,
        explodedRot,
      });
    });

    // offset group so model is centred in canvas
  groupRef.current.position.set(

  -center.x + 2.9,

  -center.y + 0.5,

  -center.z

);
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current || partsRef.current.length === 0) return;

    const p = scrollProgress.current;
    prevScrollRef.current = p;

    // ── Phase timings ────────────────────────────────────────────────
    // 0.00 – 0.72 → assembly
    // 0.72 – 0.82 → assembled + showcase spin
    // 0.82 – 0.94 → scale-down (model shrinks)
    // 0.94 – 1.00 → exit / skew (handled in CSS)

    const assemblyRaw = Math.min(p / 0.72, 1);
    const assemblyT = easeInOutCubic(assemblyRaw);

    const shrinkRaw = Math.max(0, Math.min((p - 0.82) / 0.12, 1));
    const shrinkT = easeOutQuart(shrinkRaw);

    const exitRaw = Math.max(0, Math.min((p - 0.94) / 0.06, 1));

  // =========================================
// CONTROLLED ROTATION
// =========================================

// 0 → 0.72
// smooth assembly rotation

const assembleRotation =

  assemblyT * Math.PI * 0.35;

// 0.72 → 0.82
// cinematic showcase rotation

const showcaseP =

  Math.max(
    0,
    Math.min(
      (p - 0.72) / 0.10,
      1
    )
  );

const showcaseRotation =

  showcaseP * Math.PI * 0.22;

// FINAL ROTATION

groupRef.current.rotation.y =

  assembleRotation +

  showcaseRotation;

    // Scale: 1.0 → 0.78 during shrink, tiny nudge on exit
    const scale = 1.0 - shrinkT * 0.22 - exitRaw * 0.06;
    groupRef.current.scale.setScalar(scale);

    // Y offset: sink slightly as it shrinks
    groupRef.current.position.y =
      -centerRef.current.y - shrinkT * 0.35;

    // ── Per-part animation ───────────────────────────────────────────
    const total = partsRef.current.length;

    partsRef.current.forEach(
      ({ mesh, origPos, origRot, explodedOffset, explodedRot }, i) => {
        // Stagger: later parts arrive slightly after earlier ones
        const staggerDelay = (i / total) * 0.10; // 0 → 0.10
        const partRaw = Math.max(
          0,
          Math.min((assemblyT - staggerDelay) / (1 - staggerDelay), 1)
        );
        const partT = easeInOutCubic(partRaw);

        // Position lerp: exploded → original
        mesh.position.x = origPos.x + explodedOffset.x * (1 - partT);
        mesh.position.y = origPos.y + explodedOffset.y * (1 - partT);
        mesh.position.z = origPos.z + explodedOffset.z * (1 - partT);

        // Rotation lerp: exploded → original
        mesh.rotation.x = origRot.x + explodedRot.x * (1 - partT);
        mesh.rotation.y = origRot.y + explodedRot.y * (1 - partT);
        mesh.rotation.z = origRot.z + explodedRot.z * (1 - partT);

        // Opacity: each part fades in as it assembles
        applyOpacity(mesh, Math.min(partT * 2.0, 1));
      }
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// Loading placeholder while GLB downloads
function ModelFallback() {
  const meshRef = useRef();
  useFrame((_, d) => {
    if (meshRef.current) meshRef.current.rotation.y += d * 0.8;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.6, 0.4, 0.3]} />
      <meshBasicMaterial color="#d4a843" wireframe />
    </mesh>
  );
}

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  visible,
  active
}) {

  const ref = useRef(null);

  useEffect(() => {

    if (!ref.current)
      return;

    gsap.to(

      ref.current,

      {

        opacity:
          visible ? 1 : 0,

        x:
          visible ? 0 : -36,

        y:
          visible ? 0 : 8,

        duration:0.65,

        ease:"power3.out",

      }

    );

  }, [visible]);

  return (

    <div

      ref={ref}

      style={{

        opacity:0,

        display:'flex',

        alignItems:'center',

        gap:'14px',

        padding:'11px 0',

        borderBottom:
          '1px solid rgba(255,255,255,0.055)',

        position:'relative',

        cursor:'pointer',

        transition:
          'padding-left 0.3s',

        paddingLeft:
          active ? '6px' : '0px',

        willChange:
          'transform, opacity',

      }}

    >

      {/* ACTIVE INDICATOR */}

      {

        active && (

          <div

            style={{

              position:'absolute',

              left:0,

              top:'50%',

              transform:
                'translateY(-50%)',

              width:'2px',

              height:'70%',

              background:
                `linear-gradient(to bottom, ${cat.accent}, ${cat.accent}44)`,

              borderRadius:'1px',

            }}

          />

        )

      }

      {/* SERIAL */}

      <span

        style={{

          fontFamily: 'var(--font-heading)',

          fontSize:'10.5px',

          letterSpacing:'0.18em',

          color:cat.accent,

          opacity:
            active ? 1 : 0.6,

          minWidth:'20px',

          transition:
            'opacity 0.3s',

        }}

      >

        {cat.id}

      </span>

      {/* THUMBNAIL */}

      <div

        style={{

          width:
            active ? '58px' : '46px',

          height:
            active ? '42px' : '34px',

          borderRadius:'3px',

          overflow:'hidden',

          flexShrink:0,

          border:
            `1px solid ${active ? cat.accent + '88' : cat.accent + '33'}`,

          transition:
            'width 0.35s, height 0.35s, border-color 0.35s',

        }}

      >

        <img

          src={cat.img}

          alt={cat.name}

          style={{

            width:'100%',

            height:'100%',

            objectFit:'cover'

          }}

        />

      </div>

      {/* TEXT */}

      <div style={{ flex:1 }}>

        <div

          style={{

         fontFamily: 'var(--font-heading)',

            fontSize:
              active ? '24px' : '21px',

            fontWeight:
              active ? 600 : 400,

            color:
              active

                ? '#f5f0e8'

                : 'rgba(240,236,228,0.7)',

            lineHeight:1,

            letterSpacing:'-0.01em',

            transition:
              'font-size 0.3s, color 0.3s, font-weight 0.3s',

          }}

        >

          {cat.name}

        </div>

        <div

          style={{

           fontFamily: 'var(--font-ui)',

            fontSize:'12px',

            color:

              active

                ? 'rgba(240,236,228,0.55)'

                : 'rgba(240,236,228,0.3)',

            marginTop:'2px',

            letterSpacing:'0.015em',

            fontStyle:'italic',

            transition:'color 0.3s',

          }}

        >

          {cat.tagline}

        </div>

      </div>

    </div>

  );

}
// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export default function CameraAssemblySection() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const heroTextRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const scrollProgress = useRef(0);

  const [catState, setCatState] = useState({
    visible: Array(CATEGORIES.length).fill(false),
    activeIndex: -1,
  });
  const catStateRef = useRef({ visible: Array(CATEGORIES.length).fill(false), activeIndex: -1 });


  useLayoutEffect(() => {

  if (!heroTextRef.current)
    return;

  gsap.fromTo(

    heroTextRef.current.children,

    {

      y:120,

      opacity:0,

      filter:'blur(10px)',

    },

    {

      y:0,

      opacity:1,

      filter:'blur(0px)',

      duration:1.8,

      stagger:0.16,

      ease:'power4.out',

    }

  );

}, []);


  // Inject Google Fonts once
  useEffect(() => {
    if (document.querySelector('#cam-fonts')) return;
    const link = document.createElement('link');
    link.id = 'cam-fonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        scrollProgress.current = p;

        // ── Category visibility & active tracking ──────────────────
        const newVisible = catStateRef.current.visible.slice();
        let changed = false;
        CAT_THRESHOLDS.forEach((thresh, i) => {
          const show = p >= thresh;
          if (newVisible[i] !== show) {
            newVisible[i] = show;
            changed = true;
          }
        });

        // Active = the last visible category (steps forward with scroll)
        const activeIndex = CAT_THRESHOLDS.reduce(
          (acc, thresh, i) => (p >= thresh ? i : acc),
          -1
        );

        if (changed || activeIndex !== catStateRef.current.activeIndex) {
          catStateRef.current = { visible: newVisible, activeIndex };
          setCatState({ visible: [...newVisible], activeIndex });
        }

        // ── Canvas skew (phase 3: 0.93 → 1.0) ─────────────────────
        const skewP = Math.max(0, Math.min((p - 0.93) / 0.07, 1));
        const skewDeg = easeOutQuart(skewP) * 5;
        if (canvasWrapRef.current) {
          canvasWrapRef.current.style.transform = `skewY(${-skewDeg}deg)`;
        }

        // ── Left panel fade-out (0.87 → 1.0) ───────────────────────
        const fadeP = Math.max(0, Math.min((p - 0.87) / 0.10, 1));
        if (leftRef.current) {
          leftRef.current.style.opacity = String(1 - fadeP * 0.72);
          leftRef.current.style.transform = `translateX(${-fadeP * 18}px)`;
        }
      },
    });

    return () => st.kill();
  }, []);

  const { visible, activeIndex } = catState;

  return (
    <>
      {/* ── Styles ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

        .cas-wrap { position: relative; background: #06050c; }

        .cas-sticky {
          position: sticky;
          top: 30px;
          height: 100vh;
          display: flex;
          overflow: hidden;
          background: #06050c;
          isolation: isolate;
        }

        /* Film-grain overlay */
        .cas-sticky::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 20;
          mix-blend-mode: overlay;
        }

        .cas-left {
          width: 44%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 5vw 0 6vw;
          position: relative;
          z-index: 2;
          will-change: opacity, transform;
        }

        .cas-right {
          width: 56%;
          height: 100%;
          position: relative;
          will-change: transform;
          transform-origin: center center;
        }

        /* Side vignette */
        .cas-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 90% at 60% 50%, transparent 35%, #06050c 100%),
            linear-gradient(to left, transparent 85%, #06050c 100%);
          pointer-events: none;
          z-index: 2;
        }

        .cas-canvas-inner {
          width: 100%;
          height: 100%;
        }

        /* Animated gold lens flare */
        .cas-flare {
          position: absolute;
          top: 22%;
          right: 18%;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,168,67,0.13) 0%, transparent 68%);
          pointer-events: none;
          z-index: 3;
          animation: flarePulse 4.5s ease-in-out infinite;
        }
        .cas-flare2 {
          position: absolute;
          bottom: 28%;
          right: 8%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(126,184,201,0.1) 0%, transparent 68%);
          pointer-events: none;
          z-index: 3;
          animation: flarePulse 6s ease-in-out infinite reverse;
        }
        @keyframes flarePulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        /* Scroll hint pulse */
        .cas-scroll-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d4a843;
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        /* Horizontal rule accent */
        .cas-rule {
          width: 52px;
          height: 1px;
          background: linear-gradient(to right, #d4a843, transparent);
          margin-bottom: 30px;
        }

        /* Next section */
        .cas-next {
          background: linear-gradient(180deg, #06050c 0%, #0a0914 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .cas-next::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 100%,
            rgba(212,168,67,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* ── Scroll container ───────────────────────────────────────── */}
      <div ref={containerRef} className="cas-wrap" style={{ height: SCROLL_HEIGHT }}>

        {/* Sticky viewport */}
        <div className="cas-sticky">

          {/* ── LEFT — Categories ──────────────────────────────────── */}
          <div ref={leftRef} className="cas-left">
            <div ref={heroTextRef}>

            {/* Eyebrow */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#d4a843',
                marginBottom: '16px',
                opacity: 0.85,
              }}
            >
              Photography Studio
            </div>

            {/* Headline */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(42px, 1.4vw, 70px)',
                fontWeight: 300,
                color: '#f0ece4',
                lineHeight: 0.9,
                letterSpacing: '-0.025em',
                marginBottom: '12px',
              }}
            >
              Craft &amp;{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 600,
                  color: '#d4a843',
                }}
              >
                Capture
              </em>
            </div>

            {/* Sub-headline */}
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '14.5px',
                color: 'rgba(240,236,228,0.4)',
                lineHeight: 1.65,
                fontStyle: 'italic',
                maxWidth: '280px',
                marginBottom: '32px',
              }}
            >
              Every moment deserves to be seen through an extraordinary lens.
            </div>

            <div className="cas-rule" />

            {/* Category cards */}
            <div>
              {CATEGORIES.map((cat, i) => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  visible={visible[i]}
                  active={activeIndex === i}
                />
              ))}
            </div>
</div>
            {/* Scroll hint */}
            <div
              style={{
                position: 'absolute',
                bottom: '32px',
                left: '6vw',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(240,236,228,0.28)',
                textTransform: 'uppercase',
              }}
            >
              <div className="cas-scroll-dot" />
              Scroll to assemble
            </div>
          </div>

          {/* ── RIGHT — 3-D Canvas ─────────────────────────────────── */}
          <div ref={canvasWrapRef} className="cas-right">
            <div className="cas-flare" />
            <div className="cas-flare2" />

            <Canvas
              className="cas-canvas-inner"
              camera={{ position: [0, 0.2, 5.8], fov: 38 }}
              gl={{
                antialias: true,
                alpha: false,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.1,
              }}
            >
              {/* Background */}
              <color attach="background" args={['#06050c']} />

              {/* Cinematic lighting rig */}
              <ambientLight intensity={0.12} color="#1a1530" />

              {/* Key light — warm top-right */}
              <directionalLight
                position={[3.5, 5, 2.5]}
                intensity={2.0}
                color="#ffe6c0"
              />

              {/* Fill light — cool left */}
              <directionalLight
                position={[-3, 1.5, -1.5]}
                intensity={0.55}
                color="#3060a8"
              />

              {/* Rim / separation light — back top */}
              <directionalLight
                position={[0, 3, -4]}
                intensity={0.8}
                color="#ffffff"
              />

              {/* Gold accent under-light */}
              <pointLight
                position={[0, -1.5, 1.5]}
                intensity={0.45}
                color="#d4a843"
                distance={8}
              />

              <Suspense fallback={<ModelFallback />}>
                <Environment preset="city" />
                <CameraModel scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

        </div>
      </div>

      {/* ── NEXT SECTION ────────────────────────────────────────────── */}
      <div className="cas-next">
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#d4a843',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(64px, 9vw, 130px)',
              fontWeight: 300,
              color: '#f0ece4',
              lineHeight: 0.85,
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            The
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 600, color: '#d4a843' }}>
              Portfolio
            </em>
          </h2>
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, #d4a843, transparent)',
              margin: '32px auto 0',
            }}
          />
        </div>
      </div>
    </>
  );
}

// Preload GLB
useGLTF.preload(MODEL_PATH);