import React from "react";
import BackgroundImage from "gatsby-background-image";
import { graphql, useStaticQuery } from "gatsby";

const Hero = ({ isLandscape }) => {
  const images = useStaticQuery(graphql`
    fragment regularImage on File {
      sharp: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    query {
      Test: file(relativePath: { eq: "hero.jpg" }) {
        ...regularImage
      }
      Test2: file(relativePath: { eq: "hero2.jpg" }) {
        ...regularImage
      }
    }
  `);

  return (
    <>
      <BackgroundImage
        className="min-h-screen flex justify-center items-center"
        Tag="section"
        alt="Обложка"
        fluid={isLandscape ? images.Test.sharp.fluid : images.Test2.sharp.fluid}
        fadeIn="soft"
      >
        <div className="absolute h-screen w-screen opacity-25 bg-black"></div>
        <div className="flex flex-col text-white z-10 max-w-2xl px-4 md:px-0">
          <h1 className="H1 text-5xl md:text-6xl md:text-center font-extrabold leading-none uppercase">
            narcissus
          </h1>
          <p className="P text-white text-xl font-base md:text-center">
            An art project of Koshka Neon with singers Sabrina and Mirele is
            aimed to raise awareness of abusive relationships.
          </p>
        </div>
      </BackgroundImage>
    </>
  );
};

export default Hero;
