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
    id:"01",

    title:
      "Wedding Story",

    subtitle:
      "Udaipur • India",

    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id:"02",

    title:
      "Behind The Lens",

    subtitle:
      "Tokyo Streets",

    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id:"03",

    title:
      "Studio Process",

    subtitle:
      "Late Night Editing",

    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id:"04",

    title:
      "Travel Frames",

    subtitle:
      "Captured Worldwide",

    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
  },

  {
    id:"05",

    title:
      "Emotional Moments",

    subtitle:
      "Captured Naturally",

    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop",
  },

];

export default function Journey(){

  const sectionRef =
    useRef(null);

  const cardsRef =
    useRef([]);

  useEffect(()=>{

    const ctx =
      gsap.context(()=>{

        const cardsEl =
          cardsRef.current;

        // =====================================
        // INITIAL CARD STATES
        // =====================================

        cardsEl.forEach((card,index)=>{

          if(index === 0){

            gsap.set(card,{

              y:0,

              opacity:1,

            });

          }

          else{

            gsap.set(card,{

              y:window.innerHeight,

              opacity:1,

            });

          }

        });

        // =====================================
        // MASTER TIMELINE
        // =====================================

        const tl =
          gsap.timeline({

            scrollTrigger:{

              trigger:sectionRef.current,

              start:"top top",

              end:
                `+=${cards.length * 700}`,

              pin:true,

              scrub:1,

            }

          });

        // =====================================
        // STACKED CARD ANIMATION
        // =====================================

        cardsEl.forEach((card,index)=>{

          if(index === 0)
            return;

          tl.to(

            card,

            {

              y:0,

              duration:1,

              ease:'power3.out',

            }

          );

        });

        // =====================================
        // BG TEXT PARALLAX
        // =====================================

        gsap.to(

          ".jr-bg-text",

          {

            x:-200,

            ease:'none',

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
      className="jr-section"
    >

      {/* =====================================
          BG TYPOGRAPHY
      ===================================== */}

      <div className="jr-bg-text">

        JOURNEY

      </div>

      {/* =====================================
          TOP CONTENT
      ===================================== */}

      <div className="jr-top">

        <p className="jr-label">

          FOLLOW OUR JOURNEY

        </p>

        <h2 className="jr-heading">

          Follow Our
          Journey

        </h2>

        <p className="jr-subtext">

          Behind the frames,
          stories, travel,
          emotions, and moments
          captured through
          the lens.

        </p>

      </div>

      {/* =====================================
          STACK AREA
      ===================================== */}

      <div className="jr-stack-wrap">

        <div className="jr-stack">

          {

            cards.map((item,index)=>(

              <div

                key={index}

                ref={(el)=>
                  cardsRef.current[index]
                  = el
                }

                className="jr-card"

                style={{

                zIndex:
  index + 1,

                  left:
  `${index * 55}px`,

top:
  `${index * 20}px`,

                }}

              >

                {/* IMAGE */}

                <div className="jr-image">

                  <img

                    src={item.image}

                    alt="journey"

                  />

                </div>

                {/* CONTENT */}

                <div className="jr-content">

                  <div>

                    <span>

                      {item.id}

                    </span>

                    <h3>

                      {item.title}

                    </h3>

                    <p>

                      {item.subtitle}

                    </p>

                  </div>

                  <ArrowUpRight
                    size={22}
                  />

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}