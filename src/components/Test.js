import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Test = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray("article").forEach((article, i) => {
      article.bg = article.querySelector(".bg");

      // Give the backgrounds some random images
      article.bg.style.backgroundImage = `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`;

      // Do the parallax effect on each article
      if (i) {
        article.bg.style.backgroundPosition = `80% ${innerHeight / 2}px`;

        gsap.to(article.bg, {
          backgroundPosition: `80% ${-innerHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: article,
            scrub: true,
          },
        });
      }

      // the first image should be positioned against the top. Use px on the animating part to work with GSAP.
      else {
        article.bg.style.backgroundPosition = "80% 0px";

        gsap.to(article.bg, {
          backgroundPosition: `80% ${-innerHeight / 2}px`,
          ease: "none",
          scrollTrigger: {
            trigger: article,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);
  return (
    <>
      <article>
        <div className="bg"></div>
      </article>
      <article>
        <div className="bg"></div>
      </article>
      <article>
        <div className="bg"></div>
      </article>
      <article>
        <div className="bg"></div>
      </article>
      <article>
        <div className="bg"></div>
      </article>

      <style jsx>{`
        article {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
};

export default Test;
