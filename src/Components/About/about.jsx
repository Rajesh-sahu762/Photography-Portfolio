import React, {
  useEffect,
  useRef
} from "react";

import gsap from "gsap";

import { ScrollTrigger }
from "gsap/ScrollTrigger";

import "./about.css";

gsap.registerPlugin(
  ScrollTrigger
);

export default function AboutSection() {

  const sectionRef =
    useRef(null);

  useEffect(() => {

    const ctx =
      gsap.context(() => {

        // =====================================
        // TEXT REVEAL
        // =====================================

      gsap.fromTo(

  ".ab-heading-line",

  {

    y:120,

    opacity:0,

    filter:"blur(10px)"

  },

  {

    y:0,

    opacity:1,

    filter:"blur(0px)",

    stagger:0.18,

    ease:"power3.out",

    scrollTrigger:{

      trigger:".ab-content",

      start:"top 85%",

      end:"top 30%",

      scrub:1.2,

    }

  }

);
        // =====================================
        // PARAGRAPH
        // =====================================

        gsap.fromTo(

          ".ab-text",

          {

            y:50,

            opacity:0

          },

          {

            y:0,

            opacity:1,

            ease:"power3.out",
scrollTrigger:{

  trigger:".ab-content",

  start:"top 80%",

  end:"top 35%",

  scrub:1,

}

          }

        );

        // =====================================
        // VIDEO PARALLAX
        // =====================================

        gsap.to(

          ".ab-video-wrap",

          {

            y:-80,

            ease:"none",

            scrollTrigger:{

              trigger:".ab-section",

              start:"top bottom",

              end:"bottom top",

              scrub: 0.8,

            }

          }

        );

        // =====================================
        // FLOATING STATS
        // =====================================

        gsap.fromTo(

          ".ab-stat",

          {

            y:40,

            opacity:0

          },

          {

            y:0,

            opacity:1,

            stagger:0.15,

            ease:"power3.out",

           scrollTrigger:{

  trigger:".ab-stats",

  start:"top 90%",

  end:"top 60%",

  scrub:1,

}

          }

        );

      }, sectionRef);

    return () =>
      ctx.revert();

  }, []);

  return (

    <section
      ref={sectionRef}
      className="ab-section"
    >

      {/* =====================================
          BG GLOW
      ===================================== */}

      <div className="ab-glow" />

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="ab-container">

        {/* LEFT */}

        <div className="ab-content">

          <p className="ab-label">
            ABOUT THE VISION
          </p>

          <h2 className="ab-heading">

            <span className="ab-heading-line">
              I Create
            </span>

            <span className="ab-heading-line">
              Moments
            </span>

            <span className="ab-heading-line">
              That Feel
            </span>

            <span className="ab-heading-line accent">
              Like Films.
            </span>

          </h2>

          <p className="ab-text">

            Capturing emotion,
            atmosphere,
            and timeless visual
            stories through cinematic
            photography and films.

          </p>

          {/* STATS */}

          <div className="ab-stats">

            <div className="ab-stat">

              <h3>
                120+
              </h3>

              <p>
                Weddings
              </p>

            </div>

            <div className="ab-stat">

              <h3>
                5
              </h3>

              <p>
                Years Experience
              </p>

            </div>

            <div className="ab-stat">

              <h3>
                15
              </h3>

              <p>
                Countries Shot
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="ab-video-wrap">

          <div className="ab-video-box">

    <video

  autoPlay

  muted

  loop

  playsInline

  preload="metadata"

  disablePictureInPicture

  disableRemotePlayback

  className="ab-video"

>

  <source

    src="/src/assets/Videos/about.mp4"

    type="video/mp4"

  />

</video>

          </div>

        </div>

      </div>

    </section>

  );

}