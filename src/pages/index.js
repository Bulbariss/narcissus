import React, { useState, useEffect } from "react";

// Components
// import Footer from "../components/Footer";
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
import { CurtainsProvider } from "../components/curtainsStore";
import WebGLCanvas from "../components/WebGLCanvas";
import WebGLPlane from "../components/WebGLPlaneTest";

// Images
import parallaxOne from "../images/parallax/ParallaxOne.jpg";
import parallaxTwo from "../images/parallax/ParallaxTwo.jpg";
import parallaxThree from "../images/parallax/ParallaxThree.jpg";
import parallaxFour from "../images/parallax/ParallaxFour.jpg";
import psychologist from "../images/psychologist.jpg";
// import koshka from "../images/koshka_pink.png";

function IndexPage() {
  const images = useStaticQuery(graphql`
    fragment regularImage on File {
      sharp: childImageSharp {
        fluid {
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
    setIsLandscape(ori.matches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurtainsProvider>
      <Layout>
        <SEO title="Главная" description="" pathname="/" />
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
        {/* <div className="flex flex-col items-center py-20">
        <a href="simon@koshkaneon.com" className="text-3xl bbb text-acid">
          Напишите Нам
        </a>
        <a href="https://koshkaneon.com" rel="noreferrer" target="_blank">
          <img
            src={koshka}
            alt="Koshka Neon Logo"
            className="w-1/4 h-auto py-12 mx-auto"
            loading="lazy"
          />
        </a>
      </div>
      <Footer /> */}
        <WebGLCanvas />
      </Layout>
    </CurtainsProvider>
  );
}

export default IndexPage;
