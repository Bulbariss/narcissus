import React, { useState, useEffect } from "react";

// Components
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/page_pieces/Hero";
import TextBlock from "../components/TextBlock";
import Text from "../components/Text";
import TextLast from "../components/TextLast";
import { textOne, textTwo, textThree, textFour } from "../components/Texts";
import Video from "../components/Video";
import useIntersect from "../components/utils/useIntersect";
import SecondScreen from "../components/page_pieces/SecondScreen";
import { graphql, useStaticQuery } from "gatsby";
import WebGLPlane from "../components/WebGLPlaneBBB";
import InitCurtains from "../components/InitCurtains";
import iosInnerHeight from "ios-inner-height";

// Images
import parallaxOne from "../images/parallax/ParallaxOne.jpg";
import parallaxTwo from "../images/parallax/ParallaxTwo.jpg";
import parallaxThree from "../images/parallax/ParallaxThree.jpg";
import parallaxFour from "../images/parallax/ParallaxFour.jpg";
import psychologist from "../images/psychologist.jpg";

function IndexPage() {
  const images = useStaticQuery(graphql`
    fragment regularImage on File {
      childImageSharp {
        fluid(maxWidth: 2000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    query {
      bgOne: file(relativePath: { eq: "backgrounds/TextBlockOne.jpg" }) {
        ...regularImage
      }
      bgTwo: file(relativePath: { eq: "backgrounds/TextBlockTwo.jpg" }) {
        ...regularImage
      }
      bgThree: file(relativePath: { eq: "backgrounds/TextBlockThree.jpg" }) {
        ...regularImage
      }
      bgFour: file(relativePath: { eq: "backgrounds/TextBlockFour.jpg" }) {
        ...regularImage
      }
      videoCover: file(relativePath: { eq: "col.jpg" }) {
        ...regularImage
      }
    }
  `);

  const [isLandscape, setIsLandscape] = useState(false);
  const ori =
    typeof window !== `undefined` &&
    window.matchMedia("(orientation: landscape)");

  if (typeof window !== `undefined`) {
    ori.addListener((e) => {
      const darkModeOn = e.matches;
      setIsLandscape(darkModeOn);
    });
  }

  const [ref, entry] = useIntersect({
    threshold: 0.7,
  });

  useEffect(() => {
    document
      .querySelector("body")
      .style.setProperty("--height", iosInnerHeight() + "px");
    setIsLandscape(ori.matches);
    setTimeout(() => {
      InitCurtains();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <SEO
        title="Главная"
        description="Арт-проект, в котором Koshka Neon вместе с певицей Сабриной и певицей Mirele поднимают проблему абьюзивных отношений."
        pathname="/"
      />
      <div
        id="canvas"
        className="fixed top-0 left-0 right-0 z-10 w-screen true-height"
      />
      <Hero isLandscape={isLandscape} />
      <SecondScreen />
      <Video
        ref={ref}
        playing={entry.isIntersecting}
        image={images.bgOne.sharp.fluid}
      />
      <WebGLPlane image={parallaxOne} />
      <TextBlock
        image={images.bgOne.sharp.fluid}
        heading="Мнение Психолога"
        text={textOne}
        name="Ирина Лернер"
        img={psychologist}
      />
      <WebGLPlane image={parallaxTwo} />
      <Text text={textTwo} image={images.bgTwo.sharp.fluid} />
      <WebGLPlane image={parallaxThree} />
      <Text text={textThree} image={images.bgThree.sharp.fluid} />
      <WebGLPlane image={parallaxFour} />
      <TextLast text={textFour} image={images.bgFour.sharp.fluid} />
    </Layout>
  );
}

export default IndexPage;
