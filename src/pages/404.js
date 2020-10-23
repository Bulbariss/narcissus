import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import parallaxOne from "../images/parallax/ParallaxOne.jpg";
// import Cur from "../components/Cur";

import WebGLPlane from "../components/WebGLPlane";

function NotFoundPage() {
  return (
    <Layout>
      <SEO
        title="404: Страница не найдена"
        description="Страница не найдена"
        pathname="/404"
      />
      <section className="flex justify-center h-screen">
        <div className="self-center">
          <h1 className="m-auto mb-4 text-3xl font-bold w-fit">
            Страница не найдена
          </h1>
          <Link to="/" className="text-white bg-indigo-700 btn btn-cc btn-lg">
            На главную
          </Link>
        </div>
      </section>
      {/* <Cur image={parallaxOne} /> */}
      <div className="w-screen h-screen"></div>
      <WebGLPlane image={parallaxOne} />
    </Layout>
  );
}

export default NotFoundPage;
