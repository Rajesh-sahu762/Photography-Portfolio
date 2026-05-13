'use client'

import { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'WORK', href: '#' },
  { name: 'PORTFOLIO', href: '#' },
  { name: 'ABOUT', href: '#' },
  { name: 'SERVICES', href: '#' },
  { name: 'CONTACT', href: '#' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navbarRef = useRef(null)

const logoRef = useRef(null)

const linksRef = useRef([])

const buttonRef = useRef(null)

useLayoutEffect(() => {

  const tl = gsap.timeline();

  // =====================================
  // NAVBAR FADE
  // =====================================

  tl.fromTo(

    navbarRef.current,

    {

      y:-40,

      opacity:0,

    },

    {

      y:0,

      opacity:1,

      duration:1,

      ease:'power3.out',

    }

  );

  // =====================================
  // LOGO
  // =====================================

  tl.fromTo(

    logoRef.current,

    {

      y:40,

      opacity:0,

      filter:'blur(10px)',

    },

    {

      y:0,

      opacity:1,

      filter:'blur(0px)',

      duration:1.2,

      ease:'power4.out',

    },

    '-=0.5'

  );

  // =====================================
  // NAV LINKS
  // =====================================

  tl.fromTo(

    linksRef.current,

    {

      y:30,

      opacity:0,

      filter:'blur(6px)',

    },

    {

      y:0,

      opacity:1,

      filter:'blur(0px)',

      stagger:0.08,

      duration:1,

      ease:'power3.out',

    },

    '-=0.8'

  );

  // =====================================
  // BUTTON
  // =====================================

  tl.fromTo(

    buttonRef.current,

    {

      y:30,

      opacity:0,

      scale:0.95,

    },

    {

      y:0,

      opacity:1,

      scale:1,

      duration:1,

      ease:'power3.out',

    },

    '-=0.7'

  );

}, [])

  return (
   <header className="fixed top-0 left-0 w-full z-[9999] h-[70px]">
      <nav  
        ref={navbarRef}
        aria-label="Global" 
        // Desktop fix: items-center aur justify-between ko refine kiya hai
        className="
mx-auto
flex
h-full
items-center
justify-between
px-8 lg:px-20
bg-black/40
backdrop-blur-xl
border-b
border-white/10
shadow-lg
relative
z-[9999]
"
      >
        {/* LOGO: Left aligned aur proper spacing */}
        <div className="flex lg:flex-1">
          <a href="#"  ref={logoRef} className="text-xl md:text-2xl font-bold tracking-[0.15em] text-[var(--color-accent)] whitespace-nowrap" style={{ fontFamily: 'var(--font-heading)' }}>
            LUCENT STUDIO
          </a>
        </div>

        {/* Mobile Menu Button (Tab/Mobile only) */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-text)]"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-7" />
          </button>
        </div>

        {/* Desktop Navigation: Properly centered using flex gap */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8 xl:gap-x-12">
          {navigation.map((item, index) => (
            <a
             ref={(el) => (linksRef.current[index] = el)}
              key={item.name}
              href={item.href}
              className="text-[0.65rem] xl:text-[0.75rem] font-bold tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-all duration-300"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Button: Right aligned */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
          ref={buttonRef}
            href="#"
            className="px-5 py-2 text-[0.65rem] xl:text-[0.75rem] font-bold tracking-[0.15em] text-white bg-black hover:bg-[var(--color-accent)] transition-all duration-300"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            BOOK SESSION
          </a>
        </div>
      </nav>

      {/* Mobile Menu (Isme koi change nahi hai, styling fix hai) */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--color-bg)] p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>LUCENT STUDIO</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-[var(--color-text)]"
            >
              <XMarkIcon aria-hidden="true" className="size-7" />
            </button>
          </div>
          <div className="mt-8 flow-root">
            <div className="space-y-4">
              {navigation.map((item, index) => (
                <a
                 ref={(el) => (linksRef.current[index] = el)}
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium tracking-widest text-[var(--color-text)]"
                  style={{ fontFamily: 'var(--font-ui)' }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}