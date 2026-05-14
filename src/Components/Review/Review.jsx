'use client';

import React,
{
  useEffect,
  useRef,
  useState
}
from "react";

import gsap
from "gsap";

import {
  ScrollTrigger
}
from "gsap/ScrollTrigger";

import {
  Star,
  Quote
}
from "lucide-react";

import "./Review.css";

gsap.registerPlugin(
  ScrollTrigger
);

const reviews = [

  {
    id:"01",

    review:
      "We forgot the camera was even there. Everything felt natural and emotional.",

    name:
      "Aarav & Kiara",

    role:
      "Wedding Story",

    location:
      "Udaipur, India",

    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop",

    color:"#4f76a8"
  },

  {
    id:"02",

    review:
      "These frames feel more valuable every single year we look back at them.",

    name:
      "Rohan Mehta",

    role:
      "Destination Wedding",

    location:
      "Jaipur, India",

    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",

    color:"#1d7a43"
  },

  {
    id:"03",

    review:
      "The entire experience felt cinematic, elegant, and deeply personal.",

    name:
      "Sophia Carter",

    role:
      "Fashion Campaign",

    location:
      "Paris, France",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop",

    color:"#262626"
  },

  {
    id:"04",

    review:
      "He captured emotions we didn’t even realize we were feeling that day.",

    name:
      "Ananya & Veer",

    role:
      "Luxury Wedding",

    location:
      "Goa, India",

    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop",

    color:"#7046b3"
  },

  {
    id:"05",

    review:
      "Every single frame looked timeless and filled with atmosphere.",

    name:
      "Daniel Carter",

    role:
      "Commercial Shoot",

    location:
      "London, UK",

    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",

    color:"#924343"
  },

  {
    id:"06",

    review:
      "These photos still give us goosebumps every time we revisit them.",

    name:
      "Olivia & Liam",

    role:
      "Engagement Story",

    location:
      "New York, USA",

    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1400&auto=format&fit=crop",

    color:"#2c5d87"
  },

];

export default function Reviews(){

  const sectionRef =
    useRef(null);

  const [active,
    setActive] =
      useState(0);

  // =====================================
  // SCROLL LOGIC
  // =====================================

  useEffect(()=>{

    const ctx =
      gsap.context(()=>{

        ScrollTrigger.create({

          trigger:sectionRef.current,

          start:"top top",

          end:"+=4500",

          pin:true,

          scrub:1,

          onUpdate:(self)=>{

            const progress =
              self.progress;

            const index =
              Math.min(

                reviews.length - 1,

                Math.floor(
                  progress * reviews.length
                )

              );

            setActive(index);

          }

        });

        // BG TEXT

        gsap.to(

          ".rv-bg-text",

          {

            x:-220,

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

  // =====================================
  // STACKED
  // =====================================

  const current =
    reviews[active];

  const prev1 =
    active > 0
      ? reviews[active - 1]
      : null;

  const prev2 =
    active > 1
      ? reviews[active - 2]
      : null;

  return(

    <section
      ref={sectionRef}
      className="rv-section"
    >

      {/* =====================================
          BACKGROUND TYPOGRAPHY
      ===================================== */}

      <div className="rv-bg-text">

        REVIEWS

      </div>

      {/* =====================================
          GLOW
      ===================================== */}

      <div className="rv-glow" />

      {/* =====================================
          CONTAINER
      ===================================== */}

      <div className="rv-container">

        {/* =====================================
            LEFT
        ===================================== */}

        <div className="rv-left">

          <p className="rv-label">

            REVIEWS

          </p>

          <h2 className="rv-heading">

            Reviews

          </h2>

          <p className="rv-subtext">

            Stories and moments
            shared by people
            behind the lens.

          </p>

          {/* PROGRESS */}

          <div className="rv-progress-wrap">

            <span>

              {current.id}
            </span>

            <div className="rv-progress">

              {

                reviews.map((_,index)=>(

                  <div

                    key={index}

                    className={`rv-line ${
                      active === index
                      ? 'active'
                      : ''
                    }`}

                  />

                ))

              }

            </div>

            <span>

              06

            </span>

          </div>

        </div>

        {/* =====================================
            RIGHT
        ===================================== */}

        <div className="rv-right">

          <div className="rv-stack">

            {/* BACK CARD 2 */}

            {

              prev2 && (

                <div

                  className="rv-card rv-back second"

                  style={{
                    background:
                      prev2.color
                  }}

                />

              )

            }

            {/* BACK CARD 1 */}

            {

              prev1 && (

                <div

                  className="rv-card rv-back first"

                  style={{
                    background:
                      prev1.color
                  }}

                />

              )

            }

            {/* ACTIVE CARD */}

            <div

              className="rv-card rv-active"

              style={{
                background:
                  current.color
              }}

            >

              {/* TOP */}

              <div className="rv-top">

                <Quote
                  size={62}
                  strokeWidth={2.5}
                />

                <div className="rv-stars">

                  {

                    [1,2,3,4,5]
                      .map((i)=>(

                      <Star

                        key={i}

                        size={16}

                        fill="#ffbf36"

                        stroke="#ffbf36"

                      />

                    ))

                  }

                </div>

              </div>

              {/* REVIEW */}

              <p className="rv-review">

                {
                  current.review
                }

              </p>

              {/* DIVIDER */}

              <div className="rv-divider" />

              {/* USER */}

              <div className="rv-user">

                {/* LEFT */}

                <div className="rv-user-left">

                  <div className="rv-avatar">

                    <img

                      src={
                        current.image
                      }

                      alt=""

                    />

                  </div>

                  <div>

                    <h3>

                      {
                        current.name
                      }

                    </h3>

                    <span>

                      {
                        current.role
                      }

                    </span>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="rv-location">

                  {
                    current.location
                  }

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}