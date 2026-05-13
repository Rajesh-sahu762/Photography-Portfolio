import { useEffect }
from "react";

import Lenis
from "lenis";

import gsap
from "gsap";

import { ScrollTrigger }
from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

export default function SmoothScroll(){

  useEffect(()=>{

    // =====================================
    // LENIS
    // =====================================

    const lenis =
      new Lenis({

        duration:1.2,

        smoothWheel:true,

        wheelMultiplier:1,

        touchMultiplier:2,

        infinite:false,

      });

    // =====================================
    // RAF
    // =====================================

    function raf(time){

      lenis.raf(time);

      requestAnimationFrame(
        raf
      );

    }

    requestAnimationFrame(
      raf
    );

    // =====================================
    // GSAP SYNC
    // =====================================

    lenis.on(
      "scroll",
      ScrollTrigger.update
    );

    gsap.ticker.add((time)=>{

      lenis.raf(
        time * 1000
      );

    });

    gsap.ticker.lagSmoothing(0);

    // =====================================
    // CLEANUP
    // =====================================

    return ()=>{

      lenis.destroy();

    };

  },[]);

  return null;

}