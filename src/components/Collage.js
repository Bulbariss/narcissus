import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";

const Collage = ({ isLandscape }) => {
  const images = useStaticQuery(graphql`
    fragment regularImage on File {
      sharp: childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    query {
      Test: file(relativePath: { eq: "col.jpg" }) {
        ...regularImage
      }
      Test2: file(relativePath: { eq: "hero2.jpg" }) {
        ...regularImage
      }
    }
  `);

  return (
    <>
      <Img
        className="min-h-screen flex justify-center items-center"
        Tag="section"
        alt="Обложка"
        fluid={isLandscape ? images.Test.sharp.fluid : images.Test2.sharp.fluid}
      ></Img>
    </>
  );
};

export default Collage;
