import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

function NotFoundPage() {
  return (
    <Layout>
      <SEO
        title="404: Страница не найдена"
        description="Страница не найдена"
        pathname="/404"
      />
      <section className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-3xl font-bold">Страница не найдена</h1>
        <Link
          to="/"
          className="text-white bg-indigo-700 hover:bg-indigo-600 btn btn-cc btn-lg"
        >
          На главную
        </Link>
      </section>
    </Layout>
  );
}

export default NotFoundPage;
