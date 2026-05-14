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

import "./Journey.css";

gsap.registerPlugin(
  ScrollTrigger
);

const cards = [

  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",

    title:
      "Wedding Stories",

    type:
      "Cinematic Frames",

    rotate:
      -6,

    speed:
      -120,
  },

  {
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400&auto=format&fit=crop",

    title:
      "Travel Moments",

    type:
      "Behind The Lens",

    rotate:
      5,

    speed:
      -180,
  },

  {
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",

    title:
      "Studio Process",

    type:
      "Creative Workflow",

    rotate:
      -4,

    speed:
      -150,
  },

  {
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop",

    title:
      "Emotional Frames",

    type:
      "Captured Naturally",

    rotate:
      7,

    speed:
      -220,
  },

  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",

    title:
      "Worldwide Stories",

    type:
      "Travel Diaries",

    rotate:
      -8,

    speed:
      -170,
  },

];

export default function Journey(){

  const sectionRef =
    useRef(null);

  useEffect(()=>{

    const ctx =
      gsap.context(()=>{

        // =====================================
        // CARD PARALLAX
        // =====================================

        gsap.utils
          .toArray(".jr-card")
          .forEach((card)=>{

            const speed =
              Number(
                card.dataset.speed
              );

            gsap.to(

              card,

              {

                y:speed,

                ease:'none',

                scrollTrigger:{

                  trigger:sectionRef.current,

                  start:"top bottom",

                  end:"bottom top",

                  scrub:true,

                }

              }

            );

          });

        // =====================================
        // BG TEXT
        // =====================================

        gsap.to(

          ".jr-bg-text",

          {

            x:-300,

            ease:'none',

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top bottom",

              end:"bottom top",

              scrub:true,

            }

          }

        );

        // =====================================
        // HEADING REVEAL
        // =====================================

        gsap.fromTo(

          ".jr-reveal",

          {

            y:100,

            opacity:0,

            filter:'blur(10px)',

          },

          {

            y:0,

            opacity:1,

            filter:'blur(0px)',

            stagger:0.15,

            duration:1.3,

            ease:'power4.out',

            scrollTrigger:{

              trigger:".jr-top",

              start:"top 80%",

            }

          }

        );

      },sectionRef);

    return ()=>ctx.revert();

  },[]);

  return(

    <section
      ref={sectionRef}
      className="jr-section"
    >

      {/* =====================================
          BACKGROUND TYPOGRAPHY
      ===================================== */}

      <div className="jr-bg-text">

        JOURNEY

      </div>

      {/* =====================================
          GLOW
      ===================================== */}

      <div className="jr-glow" />

      {/* =====================================
          TOP
      ===================================== */}

      <div className="jr-top">

        <p className="jr-label jr-reveal">

          FOLLOW OUR JOURNEY

        </p>

        <h2 className="jr-heading jr-reveal">

          Follow Our Journey

        </h2>

        <p className="jr-subtext jr-reveal">

          Behind the frames,
          stories, travel,
          emotions,
          and moments in motion.

        </p>

        {/* STATUS */}

        <div className="jr-status jr-reveal">

          <span />

          Capturing stories worldwide

        </div>

      </div>

      {/* =====================================
          FLOATING WALL
      ===================================== */}

      <div className="jr-wall">

        {

          cards.map((item,index)=>(

            <div

              key={index}

              className={`jr-card card-${index}`}

              data-speed={item.speed}

              style={{

                rotate:
                  `${item.rotate}deg`

              }}

            >

              {/* IMAGE */}

              <div className="jr-image">

                <img

                  src={item.image}

                  alt="journey"

                />

              </div>

              {/* OVERLAY */}

              <div className="jr-overlay">

                <div>

                  <p>

                    {item.type}

                  </p>

                  <h3>

                    {item.title}

                  </h3>

                </div>

                <ArrowUpRight
                  size={22}
                />

              </div>

            </div>

          ))

        }

      </div>

    </section>

  );

}