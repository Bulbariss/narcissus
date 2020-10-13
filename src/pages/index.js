import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/page_pieces/Hero";
import TextBlock from "../components/TextBlock";
import Text from "../components/Text";
import { textOne } from "../components/Texts";
import Video from "../components/Video";
import ParallaxBanner from "../components/ParallaxBanner";
import useIntersect from "../components/utils/useIntersect";
import SecondScreen from "../components/page_pieces/SecondScreen";
import koshka from "../images/koshka_pink.png";
import threeL from "../images/collages/3L.jpg";
import fourL from "../images/collages/4L.jpg";
import bg from "../images/image.jpg";
import psychologist from "../images/psychologist.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function IndexPage() {
  const landscapeMediaQuery =
    typeof window !== `undefined` &&
    window.matchMedia("(orientation: landscape)");
  const [isLandscape, setIsLandscape] = useState(false);

  if (typeof window !== `undefined`) {
    landscapeMediaQuery.addListener((e) => {
      const darkModeOn = e.matches;
      setIsLandscape(darkModeOn);
    });
  }

  const [ref, entry] = useIntersect({
    threshold: 0.7,
  });

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    setIsLandscape(landscapeMediaQuery.matches);

    gsap.utils.toArray(".parallax").forEach((article, i) => {
      article.bg = article.querySelector(".parallax-bg");
      // Do the parallax effect on each article
      if (i) {
        article.bg.style.backgroundPosition = `80% ${
          Math.min(
            document.documentElement.clientHeight,
            document.documentElement.clientWidth
          ) / 2
        }px`;

        gsap.to(article.bg, {
          backgroundPosition: `80% ${
            -Math.min(
              document.documentElement.clientHeight,
              document.documentElement.clientWidth
            ) / 2
          }px`,
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
          backgroundPosition: `80% ${
            -Math.min(
              document.documentElement.clientHeight,
              document.documentElement.clientWidth
            ) / 2
          }px`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textVictimOne = `Почему важно об этом говорить? 
Я всегда думала, что это только моя проблема. И что проблема во мне. 
Я думала, что мне надо исправится, быть хорошей, что надо изменить себя и не быть собой, а быть некой «хорошей».  Я конечно молчала. Я носила этот опыт в себе и считала, что только со мной это произошло, поскольку я действительно плохая. Потом Сабрина начала рассказывать свою историю в соцсетях, мы подружились. Я читала и думала: ведь это совершенно те же фразы и действия. Я стала репостить и изучать вопрос. И многие красивые, прекрасные, талантливые люди (в основном девушки) стали писать и ей и мне, что с ними было тоже самое. После этих постов многие мои подруги расстались с довлеющими парнями, вычислив их по поведению: запрет общаться с подругами или нелицеприятные комментарии о них, эмоциональные качели восхваления и унижения, требования быть всегда женственной «принцессой», даже если вам не всегда это свойственно, возложение ответственности за события в жизни, критика всех и нетерпимость критики, отсутствие эмпатии. Я стала постить тоже свою историю, хотя долго молчала о ней из-за того, меня читала его девушка, я как бы заботилась больше о её психике, чем о своей. Но со мной это произошло не только в отношениях, но и в университете, когда я училась на режиссёра. В силу юного возраста, я просто думала, что мир таков. Но когда я поняла, что это не считается нормой, мне стало легко, от того, что я не одна,  и это просто система. Без личности, без индивидуальности. Как болезнь. Когда мы с Сабриной поняли, насколько эта тема помогает людям, то захотели создать некую инструкцию по вычислению нарцисса, как в себе, так и в других.`;

  return (
    <Layout>
      <SEO title="Главная" description="" pathname="/" />
      <Hero isLandscape={isLandscape} />
      <SecondScreen />
      <Video ref={ref} playing={entry.isIntersecting} />
      <ParallaxBanner image={fourL} />
      <TextBlock
        image={bg}
        heading="Мнение Психолога"
        text={textOne}
        name="Ирина Лернер"
        img={psychologist}
      />
      <ParallaxBanner image={threeL} />
      <Text text={textVictimOne} image={bg} />
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
