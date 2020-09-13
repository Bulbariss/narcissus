module.exports = {
  siteMetadata: {
    title: `Letteweb`,
    description: `Web development studio`,
    author: `Letteweb`,
    siteUrl: "https://letteweb.lv",
  },
  plugins: [
    "gatsby-plugin-eslint",
    `gatsby-plugin-react-helmet`,
    "gatsby-transformer-sharp",
    `gatsby-plugin-styled-jsx`,
    `gatsby-background-image`,
    // `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Letteweb`,
        short_name: `Letteweb`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
        icon: `./src/images/icon.png`,
        purpose: "maskable",
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require(`autoprefixer`),
          require(`cssnano`),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        whitelistPatterns: [/sym-\d?\d/g],
        purgeOnly: [`src/css/style.css`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        jpegQuality: 85,
        pngQuality: 85,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
