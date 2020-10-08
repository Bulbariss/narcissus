import React from "react";
// import Img from "gatsby-image";
import { ParallaxBanner as Banner } from "react-scroll-parallax";

// eslint-disable-next-line no-unused-vars
const Collage = ({ isLandscape, imageH, imageL }) => {
  return (
    <>
      <Banner
        className={`min-h-screen flex justify-center items-center`}
        Tag="section"
        alt="Обложка"
        layers={[
          {
            image:
              "https://s282vla.storage.yandex.net/rdisk/04de61df0ff03eebf3bfe4fe682767c242c8e93a57a53a215a37fc7d4712fa69/5f7b363a/kI6G64c-ZERdH-e6ttX3Ulvl8GbAoB0epg4O1m9D4HklvNaOGMceunzlxN4oRYxPmRJSKzAwdPpIwpBIFdu2-g==?uid=0&filename=002C0677-62E7-4501-B130-B17226BF2C14.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&fsize=4467287&hid=48f15e683df87bdd69e8ec6e53c91056&media_type=image&tknv=v2&etag=e8c585600ae81ec586afb95565b2e2cb&rtoken=LdTReUkyKC9U&force_default=no&ycrid=na-be3f8b7336d0f3a08581126604399448-downloader19h&ts=5b0edd02e8280&s=d8686290b87e36699764d65f21871ee5ac406cfde880381c18f395fb043e6f6a&pb=U2FsdGVkX1_xZSmbkOWdPn36Y2R69Y87Qy-U-UGmEw5vihsHzT3axVn0OMZhaB5BsRExO20r4QHUztJggItg60PlZnOj7VxAOPfgH2bTsy8",
            amount: 0.5,
          },
        ]}
        // fluid={isLandscape ? imageH : imageL}
      ></Banner>
    </>
  );
};

export default Collage;
