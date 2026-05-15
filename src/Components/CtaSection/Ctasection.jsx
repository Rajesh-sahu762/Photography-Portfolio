'use client';

import React,
{
  useEffect,
  useRef
}
from "react";

import gsap
from "gsap";

import {
  ScrollTrigger
}
from "gsap/ScrollTrigger";

import {
  ArrowUpRight
}
from "lucide-react";

import "./CtaSection.css";

gsap.registerPlugin(
  ScrollTrigger
);

export default function CtaSection(){

  const sectionRef =
    useRef(null);

  const headingRef =
    useRef([]);

  const cardRef =
    useRef(null);

  useEffect(()=>{

    const ctx =
      gsap.context(()=>{

        // =====================================
        // HEADING REVEAL
        // =====================================

        gsap.from(

          headingRef.current,

          {

            y:120,

            opacity:0,

            filter:"blur(10px)",

            stagger:0.12,

            duration:1.2,

            ease:"power3.out",

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top 70%",

            }

          }

        );

        // =====================================
        // GLASS CARD
        // =====================================

        gsap.from(

          cardRef.current,

          {

            y:80,

            opacity:0,

            rotateX:10,

            duration:1.2,

            ease:"power3.out",

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top 70%",

            }

          }

        );

        // =====================================
        // BACKGROUND TYPOGRAPHY
        // =====================================

        gsap.to(

          ".cta-bg-text",

          {

            x:-220,

            ease:"none",

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top bottom",

              end:"bottom top",

              scrub:true,

            }

          }

        );

        // =====================================
        // GLOW ORBS
        // =====================================

        gsap.to(

          ".cta-orb-1",

          {

            y:-120,

            scale:1.2,

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top bottom",

              end:"bottom top",

              scrub:true,

            }

          }

        );

        gsap.to(

          ".cta-orb-2",

          {

            y:120,

            scale:1.15,

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top bottom",

              end:"bottom top",

              scrub:true,

            }

          }

        );

      },sectionRef);

    return ()=>ctx.revert();

  },[]);

  return(

    <section
      ref={sectionRef}
      className="cta-section"
    >

      {/* =====================================
          BACKGROUND TYPOGRAPHY
      ===================================== */}

      <div className="cta-bg-text">

        CREATE

      </div>

      {/* =====================================
          GLOW ORBS
      ===================================== */}

      <div className="cta-orb cta-orb-1"></div>

      <div className="cta-orb cta-orb-2"></div>

      {/* =====================================
          MAIN WRAPPER
      ===================================== */}

      <div className="cta-wrapper">

        {/* =====================================
            LEFT CONTENT
        ===================================== */}

        <div className="cta-left">

          <p className="cta-label">

            AVAILABLE WORLDWIDE

          </p>

          <h2 className="cta-heading">

            <span
              ref={(el)=>
                headingRef.current[0]
                = el
              }
            >
              LET’S
            </span>

            <span
              ref={(el)=>
                headingRef.current[1]
                = el
              }
            >
              CREATE
            </span>

            <span
              ref={(el)=>
                headingRef.current[2]
                = el
              }
            >
              MAGIC
            </span>

            <span
              ref={(el)=>
                headingRef.current[3]
                = el
              }
            >
              TOGETHER
            </span>

          </h2>

        </div>

        {/* =====================================
            RIGHT CARD
        ===================================== */}

        <div
          ref={cardRef}
          className="cta-card"
        >

          <p className="cta-card-text">

            Every frame tells
            a story.
            Let’s craft
            something timeless,
            emotional,
            and unforgettable
            together.

          </p>

          <div className="cta-buttons">

            <button className="cta-btn-primary">

              BOOK SESSION

            </button>

            <button className="cta-btn-secondary">

              VIEW PORTFOLIO

              <ArrowUpRight
                size={18}
              />

            </button>

          </div>

          <div className="cta-footer">

            <span>

              2026 BOOKINGS OPEN

            </span>

            <span>

              WORLDWIDE PROJECTS

            </span>

          </div>

        </div>

      </div>

    </section>

  );

}