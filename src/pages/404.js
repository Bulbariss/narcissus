import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <section className="h-screen flex justify-center">
        <div className="self-center">
          <h1 className="text-3xl font-bold m-auto w-fit mb-4">
            Page not found
          </h1>
          <Link to="/" className="btn btn-cc btn-lg bg-indigo-700 text-white">
            Back to main page
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default NotFoundPage;
