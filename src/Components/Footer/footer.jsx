import { useEffect, useRef, useState, useCallback } from "react";
import "./Footer.css";

/* ─── smooth lerp ─── */
const lerp = (a, b, t) => a + (b - a) * t;

export default function LucentFooter() {
  const footerRef    = useRef(null);
  const gimbalRef    = useRef(null);
  const glowRef      = useRef(null);
  const rafRef       = useRef(null);

  /* raw target */
  const targetRef = useRef({ x: 0, y: 0, dist: 0 });
  /* smoothed current */
  const currentRef = useRef({ rotX: 0, rotY: 0, tx: 0, ty: 0 });

  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  /* ── mouse move handler ── */
  const onMouseMove = useCallback((e) => {
    const footer = footerRef.current;
    if (!footer) return;

    const rect   = footer.getBoundingClientRect();
    /* Normalize -1 to +1 relative to footer center */
    const nx     = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const ny     = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    const dist   = Math.hypot(nx, ny);

    targetRef.current = { x: nx, y: ny, dist };
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  /* ── animation loop ── */
  useEffect(() => {
    const MAX_ROT_X =  14;   // degrees tilt up/down
    const MAX_ROT_Y =  22;   // degrees pan left/right
    const MAX_TX    =  28;   // px lateral drift
    const MAX_TY    =  12;   // px vertical drift
    const SPEED     =  0.055; // lerp factor — lower = more lag

    function tick() {
      const gimbal = gimbalRef.current;
      const glow   = glowRef.current;
      if (!gimbal) { rafRef.current = requestAnimationFrame(tick); return; }

      const t  = targetRef.current;
      const c  = currentRef.current;

      /* Smooth toward target */
      c.rotX = lerp(c.rotX, -t.y * MAX_ROT_X, SPEED);
      c.rotY = lerp(c.rotY,  t.x * MAX_ROT_Y, SPEED);
      c.tx   = lerp(c.tx,    t.x * MAX_TX,     SPEED);
      c.ty   = lerp(c.ty,    t.y * MAX_TY,     SPEED);

      gimbal.style.transform =
        `translate(${c.tx}px, ${c.ty}px) ` +
        `rotateX(${c.rotX}deg) ` +
        `rotateY(${c.rotY}deg)`;

      /* Glow tracks cursor */
      if (glow) {
        glow.style.transform =
          `translate(${lerp(0, t.x * 60, SPEED * 2)}px, ${lerp(0, t.y * 40, SPEED * 2)}px)`;
        glow.style.opacity = `${0.4 + t.dist * 0.25}`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── reset on mouse leave ── */
  const onMouseLeave = useCallback(() => {
    setHovered(false);
    targetRef.current = { x: 0, y: 0, dist: 0 };
  }, []);

  const onMouseEnter = useCallback(() => setHovered(true), []);

  const navLinks = [
    { label: "Portfolio",   href: "#portfolio"   },
    { label: "About",       href: "#about"        },
    { label: "Services",    href: "#services"     },
    { label: "Contact",     href: "#contact"      },
  ];

  const socials = [
    { label: "IG", href: "#" },
    { label: "YT", href: "#" },
    { label: "BE", href: "#" },
    { label: "LI", href: "#" },
  ];

  return (
    <footer
      ref={footerRef}
      className="lf-footer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* ── ambient glow that chases cursor ── */}
      <div ref={glowRef} className="lf-glow" />

      {/* ── noise grain ── */}
      <div className="lf-grain" />

      {/* ── horizontal rule ── */}
      <div className="lf-hr" />

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="lf-body">

        {/* LEFT — brand + nav */}
        <div className="lf-left">
          <div className="lf-brand">
            <span className="lf-brand__mark">LS</span>
            <div className="lf-brand__text">
              <span className="lf-brand__name">Lucent Studio</span>
              <span className="lf-brand__tagline">Light · Motion · Story</span>
            </div>
          </div>

          <nav className="lf-nav">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="lf-nav__link">
                <span className="lf-nav__num">—</span>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="lf-contact">
            <a href="mailto:hello@lucentstudio.in" className="lf-contact__email">
              hello@lucentstudio.in
            </a>
            <span className="lf-contact__loc">Jaipur, Rajasthan · India</span>
          </div>
        </div>

        {/* CENTER — gimbal hero */}
        <div className="lf-center">
          <div className={`lf-gimbal-stage ${hovered ? "lf-gimbal-stage--hovered" : ""}`}>
            {/* Lens flare ring */}
            <div className="lf-ring lf-ring--1" />
            <div className="lf-ring lf-ring--2" />

            {/* The tracking image */}
            <div ref={gimbalRef} className="lf-gimbal">
              <img
                src="/src/assets/Images/gimbal.jpg"
                alt="Camera Gimbal — Lucent Studio"
                className="lf-gimbal__img"
                draggable={false}
              />
              {/* Cinematic vignette over image */}
              <div className="lf-gimbal__vignette" />
            </div>

            {/* Custom cursor dot */}
            {hovered && (
              <div
                className="lf-cursor"
                style={{ left: cursorPos.x, top: cursorPos.y }}
              />
            )}

            {/* Hover prompt */}
            <div className={`lf-hint ${hovered ? "lf-hint--hidden" : ""}`}>
              <span>Move cursor to aim</span>
            </div>
          </div>

          <p className="lf-center__caption">
            Every frame,<br />deliberately composed.
          </p>
        </div>

        {/* RIGHT — socials + cta */}
        <div className="lf-right">
          <div className="lf-socials">
            <span className="lf-socials__label">Follow</span>
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="lf-socials__item">
                {s.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="lf-cta">
            <span className="lf-cta__text">Book a Shoot</span>
            <span className="lf-cta__arrow">↗</span>
          </a>

          <div className="lf-availability">
            <span className="lf-availability__dot" />
            <span>Available for bookings · 2025</span>
          </div>
        </div>
      </div>

      {/* ══════════════ BOTTOM BAR ══════════════ */}
      <div className="lf-bottom">
        <span className="lf-bottom__copy">
          © {new Date().getFullYear()} Lucent Studio. All rights reserved.
        </span>
        <div className="lf-bottom__divider" />
        <span className="lf-bottom__craft">
          Crafted with obsession in Jaipur
        </span>
      </div>

      {/* ── giant watermark ── */}
      <div className="lf-watermark" aria-hidden="true">LUCENT</div>
    </footer>
  );
}