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
import threeL from "../images/collages/3L.jpg";
import koshka from "../images/koshka_pink.png";
import fourL from "../images/collages/4L.jpg";
import bg from "../images/image.jpg";
import psychologist from "../images/psychologist.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    setTimeout(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray(".parallax").forEach((article) => {
        article.bg = article.querySelector(".parallax-bg");
        // Do the parallax effect on each article
        // article.bg.style.backgroundPosition = `50% -${
        //   window.innerHeight / 2
        // }px`;
        // article.bg.style.transform = `translateY(-${window.innerHeight / 2}px)`;
        article.style.height = window.innerHeight + "px";
        article.bg.style.transform = `matrix(1, 0, 0, 1, 0, -${
          window.innerHeight / 2
        })`;
        gsap.to(article, {
          height: window.innerHeight + "px",
        }),
          gsap.to(article.bg, {
            // backgroundPosition: `50% ${window.innerHeight / 2}px`,
            // translateY: `${window.innerHeight / 2}px`,
            transform: `matrix(1, 0, 0, 1, 0, ${window.innerHeight / 2})`,
            ease: "none",
            scrollTrigger: {
              trigger: article,
              scrub: true,
            },
          });
      });
    }, 200);
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
