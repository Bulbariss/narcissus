import React, { useState, useEffect } from "react";
// import IntersectBox from "../components/IntersectBox";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/page_pieces/Hero";
import TextBlock from "../components/TextBlock";
// import Test3 from "../components/Test2";
import CurtainsJS from "../components/Curtains";
import Text from "../components/Text";
import { textOne, textTwo, textThree, textFour } from "../components/Texts";
import Video from "../components/Video";
import useIntersect from "../components/utils/useIntersect";
import threeL from "../images/collages/3L.jpg";
import fourL from "../images/collages/4L.jpg";
import SecondScreen from "../components/page_pieces/SecondScreen";
import koshka from "../images/koshka_pink.png";
import bg from "../images/image.jpg";
import psychologist from "../images/psychologist.jpg";

function IndexPage() {
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
    <Layout>
      <SEO title="Главная" description="" pathname="/" />
      <Hero isLandscape={isLandscape} />
      <SecondScreen />
      <Video ref={ref} playing={entry.isIntersecting} />
      <CurtainsJS image={fourL} />
      {/* <Test3 image={fourL} /> */}
      <TextBlock
        image={bg}
        heading="Мнение Психолога"
        text={textOne}
        name="Ирина Лернер"
        img={psychologist}
      />
      {/* <Test3 image={threeL} /> */}
      <CurtainsJS image={threeL} />
      <Text text={textTwo} image={bg} />
      <CurtainsJS image={threeL} />
      <Text text={textThree} image={bg} />
      <CurtainsJS image={threeL} />
      <Text text={textFour} image={bg} />
      <div className="flex flex-col items-center pt-20">
        <a href="simon@koshkaneon.com" className="text-3xl bbb text-acid">
          Напишите Нам
        </a>
        <a href="https://koshkaneon.com" rel="noreferrer" target="_blank">
          <img src={koshka} alt="koshka" className="w-1/4 py-12 mx-auto" />
        </a>
      </div>
    </Layout>
  );
}

export default IndexPage;
