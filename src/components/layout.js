import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Layout({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".parallax").forEach((article, i) => {
      article.bg = article.querySelector(".bg");
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
    <Fragment>
      <main className="text-white" style={{ backgroundColor: "#212121" }}>
        {children}
      </main>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
