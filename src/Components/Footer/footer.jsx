import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants for buttery smooth entry without scroll-lag
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--color-bg)', 
        fontFamily: 'var(--font-body)'
      }}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-8 px-6 md:px-16"
    >
      
      {/* 1. THE BRIDGE: Perfect transition from light theme to dark studio */}
      <div 
        style={{ 
          background: 'linear-gradient(to bottom, var(--color-bg) 0%, var(--color-bg-secondary) 20%, #0a0a0a 60%, #050505 100%)' 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 2. ZERO-LAG VIDEO BACKGROUND & OVERLAYS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
        <video
          src="/src/assets/Videos/footer-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-75 brightness-[0.7] contrast-[1.15] transform-gpu"
        />

        {/* Studio Vignette Overlay for Premium Contrast */}
        <div 
          style={{ 
            background: 'linear-gradient(to top, #050505 25%, rgba(10, 10, 10, 0.4) 75%, transparent 100%)' 
          }}
          className="absolute inset-0"
        />
        
        {/* DSLR Camera Grid Tech Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 3. UPPER CONTENT: INTERACTIVE EDITORIAL GRID */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-8 w-full mt-12 text-[#ECE9E2]"
      >
        
        {/* Left Side: Brand Vision */}
        <motion.div variants={fadeInUp} className="md:col-span-6 flex flex-col justify-between gap-12">
          <div className="space-y-4">
            <span 
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-accent-soft)' }}
              className="text-[11px] uppercase tracking-[0.4em] block"
            >
              // LUXURY VISUAL STUDIO
            </span>
            <p className="text-xl md:text-2xl font-light text-[var(--color-bg-secondary)] max-w-md leading-relaxed">
              Capturing high-end perspectives. Elevating digital experiences through premium cinematic storytelling.
            </p>
          </div>
          
          {/* Tech Camera UI Details */}
          <div 
            style={{ fontFamily: 'var(--font-ui)' }} 
            className="hidden md:flex gap-8 text-[#727272] text-[10px] tracking-[0.3em] uppercase border-l border-white/10 pl-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> LIVE
            </div>
            <div>FPS / 24.00</div>
            <div>ISO / 320</div>
          </div>
        </motion.div>

        {/* Right Side: Clean Micro-interactive Links */}
        <motion.div variants={fadeInUp} className="md:col-span-4 md:col-start-9 flex flex-col gap-6 md:items-end">
          <div className="w-full md:max-w-[240px] flex flex-col gap-4">
            <span 
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-accent)' }}
              className="text-[11px] uppercase tracking-[0.4em] font-semibold"
            >
              NAVIGATION
            </span>
            <nav 
              style={{ fontFamily: 'var(--font-ui)' }} 
              className="flex flex-col gap-1 text-lg font-medium tracking-wider"
            >
              {['INDEX', 'PORTFOLIO', 'ABOUT STUDIO', 'INQUIRE'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-white text-[var(--color-bg-secondary)] transition-colors duration-300 py-2 border-b border-white/5 flex justify-between items-center group"
                >
                  <span>{item}</span>
                  <span className="text-[var(--color-accent)] opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. LOWER CONTENT: THE MAJESTIC BRAND LOGO (LUCENT STUDIO) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full flex flex-col gap-4 mt-auto pt-16 text-[#ECE9E2]"
      >
        
        {/* Massive Brand Title */}
        <div className="w-full overflow-hidden select-none pointer-events-none pb-2">
          <h1 
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-display-xl)',
              lineHeight: 0.8
            }}
            className="w-full tracking-tighter uppercase font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ECE9E2] via-[#ECE9E2]/50 to-transparent"
          >
            LUCENT
          </h1>
          <p 
            style={{ fontFamily: 'var(--font-ui)', color: 'var(--color-accent)' }}
            className="text-sm md:text-base tracking-[0.6em] uppercase mt-2 font-medium ml-2"
          >
            STUDIO
          </p>
        </div>

        {/* Copyright and Socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[#727272] text-[10px] tracking-[0.2em] uppercase gap-4 border-t border-white/10 pt-6 mt-4">
          <div className="flex gap-8 font-medium">
            <a href="#" className="hover:text-[var(--color-accent-soft)] transition-colors duration-300">TWITTER</a>
            <a href="#" className="hover:text-[var(--color-accent-soft)] transition-colors duration-300">INSTAGRAM</a>
            <a href="#" className="hover:text-[var(--color-accent-soft)] transition-colors duration-300">LINKEDIN</a>
          </div>
          <div className="opacity-80">
            © {new Date().getFullYear()} LUCENT STUDIO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </motion.div>

    </footer>
  );
};

export default Footer;