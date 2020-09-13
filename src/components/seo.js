import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";
import image from "../images/cardImg.png";

function SEO({ description, lang, meta, keywords, title, pathname }) {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const metaImage = image ? `${site.siteMetadata.siteUrl}${image}` : null;
  const metaDescription = description || site.siteMetadata.description;
  const metaUrl = `${site.siteMetadata.siteUrl}${pathname}`;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:url`,
          content: metaUrl,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },

        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          metaImage
            ? [
                {
                  name: `twitter:image`,
                  content: metaImage,
                },
                {
                  property: `og:image`,
                  content: metaImage,
                },
                {
                  property: `og:image:alt`,
                  content: title,
                },
                {
                  property: "og:image:width",
                  content: "1200px",
                },
                {
                  property: "og:image:height",
                  content: "627px",
                },
                {
                  name: `twitter:card`,
                  content: "summary",
                },
              ]
            : [
                {
                  name: `twitter:card`,
                  content: `summary`,
                },
              ]
        )
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;
