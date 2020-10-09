import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/page_pieces/Hero";
import TextBlock from "../components/TextBlock";
import Collage from "../components/Collage";
import Video from "../components/Video";
import useIntersect from "../components/utils/useIntersect";
import SecondScreen from "../components/page_pieces/SecondScreen";
import Img from "../images/image.jpeg";
import koshka from "../images/koshka_pink.png";
import psychologist from "../images/psychologist.jpg";
import { graphql, useStaticQuery } from "gatsby";

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
    threshold: 0.5,
  });

  const images = useStaticQuery(graphql`
    query {
      threeL: file(relativePath: { eq: "collages/3L.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      fourL: file(relativePath: { eq: "collages/4L.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  useEffect(() => {
    setIsLandscape(landscapeMediaQuery.matches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const text = `Расщепление, которое можно заметить лишь только будучи внимательным к «другому». 
Зачастую мы видим их самодостаточными, уверенными в себе, с чувством собственного достоинства, яркими, сильными, талантливыми, как правило преуспевающими людьми. 
Мы восхищаемся, очаровываемся, более того, они умеют нравится и знают какие их проявления располагают к себе. 
Чаще всего они сами верят, что они такие, ведь их личность организована вокруг поддержания самоуважения. 
 
Со временем мы начинаем замечать и другую часть этого «расщепления» - надменность, высокомерие, самоуверенность, отчуждённость, эмоциональную недоступность и холодность, переоценку своих творческих способностей, осуждение других, озабоченность только собой и тем как их воспринимают. 
 
Вдруг заботливый, внимательный, обаятельный. и как нам казалось, любящий человек становится равнодушным, резким, подавляющим и даже жестоким, манипулирует, угрожает, нападает эмоционально или физически. 
 
Иногда мы решаем, что виноваты в таких переменах, что сделали «что то не так», иногда слышим прямые обвинения в этом. 
Мы решаем, что нужно стараться, и тогда «вернётся тот другой» и снова будет «нам счастье» 
Когда то так и бывает, но чаще от нас мало что зависит. 
 
Нарциссически организованные личности, глубоко внутри себя верят в то, что с ними «что то не так, что они имеют какой то изъян, из за которого их не смогут любить, и любым способом избегают разоблачения. 
Отсюда так важны внешние атрибуты «Мне нужно самое лучшее», как подтверждение собственной состоятельности. 
Им невыносимо сталкиваться со стыдом, когда «я плохой и неправильный, со мной что то не так» и страхом, что «они не подходят», проще не чувствовать ничего, потеряв связь со своими чувствами и истинными потребностями. 
Часто психика таких людей защищает их от переживания трудных чувств (стыда, вины, зависти, страха) обесцениванием других и отношений, идеализируя себя и свою грандиозность 
Это является результатом травмы развития и разочарования в отношениях с одним или обоими родителями, для которых, будучи ребёнком, такой человек не был значим сам по себе, в его детском опыте не учитывались его чувства и потребности. 
 Возможно он чувствовал себя любимым только при определённых условиях, например хорошем поведении, достижениях в учёбе или других областях жизни. 
Бессознательно мы поступаем с другими так же как когда- то поступали с нами. 
 
Важно обращать внимание на свои чувства в любых отношениях, именно они «сигналят» о том, что «что то не так». 
Страх, стыд и вина часто использовались родителями как инструмент воспитания и управления в советском и постсоветском пространстве. 
Работа с этими чувствами, исцеление травм развития, приводит к психологическому взрослению и более «здоровым отношениям» где партнёры взаимозависимы, есть эмоциональная и физическая безопасность, уважение чувств и потребностей каждого.`;
  const textVictimOne = `Почему важно об этом говорить? 
Я всегда думала, что это только моя проблема. И что проблема во мне. 
Я думала, что мне надо исправится, быть хорошей, что надо изменить себя и не быть собой, а быть некой «хорошей».  Я конечно молчала. Я носила этот опыт в себе и считала, что только со мной это произошло, поскольку я действительно плохая. Потом Сабрина начала рассказывать свою историю в соцсетях, мы подружились. Я читала и думала: ведь это совершенно те же фразы и действия. Я стала репостить и изучать вопрос. И многие красивые, прекрасные, талантливые люди (в основном девушки) стали писать и ей и мне, что с ними было тоже самое. После этих постов многие мои подруги расстались с довлеющими парнями, вычислив их по поведению: запрет общаться с подругами или нелицеприятные комментарии о них, эмоциональные качели восхваления и унижения, требования быть всегда женственной «принцессой», даже если вам не всегда это свойственно, возложение ответственности за события в жизни, критика всех и нетерпимость критики, отсутствие эмпатии. Я стала постить тоже свою историю, хотя долго молчала о ней из-за того, меня читала его девушка, я как бы заботилась больше о её психике, чем о своей. Но со мной это произошло не только в отношениях, но и в университете, когда я училась на режиссёра. В силу юного возраста, я просто думала, что мир таков. Но когда я поняла, что это не считается нормой, мне стало легко, от того, что я не одна,  и это просто система. Без личности, без индивидуальности. Как болезнь. Когда мы с Сабриной поняли, насколько эта тема помогает людям, то захотели создать некую инструкцию по вычислению нарцисса, как в себе, так и в других.`;
  return (
    <Layout>
      <SEO title="Главная" description="" pathname="/" />
      <Hero isLandscape={isLandscape} />
      <SecondScreen />

      <Video
        ref={ref}
        playing={entry.isIntersecting}
        isLandscape={isLandscape}
      />
      <Collage image={images.fourL.sharp.fluid} />
      <TextBlock
        heading="Мнение Психолога"
        text={text}
        name="Ирина Лернер"
        img={psychologist}
      />

      <Collage isLandscape={isLandscape} image={images.threeL.sharp.fluid} />
      <TextBlock
        heading="Мнение Психолога"
        text={textVictimOne}
        name="Вася Пупкин"
        img={Img}
      />
      <div className="flex flex-col items-center">
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
