module.exports = {
  siteMetadata: {
    title: `Narcissus`,
    description: `Арт-проект, в котором Koshka Neon вместе с певицей Сабриной и певицей Mirele поднимают проблему абьюзивных отношений.`,
    author: `Koshka Neon`,
    siteUrl: "https://narcissus.monster",
  },
  plugins: [
    "gatsby-plugin-eslint",
    `gatsby-plugin-react-helmet`,
    "gatsby-transformer-sharp",
    `gatsby-plugin-styled-jsx`,
    `gatsby-background-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Narcissus`,
        short_name: `Narcissus`,
        lang: `ru`,
        start_url: `/`,
        background_color: `#212112`,
        theme_color: `#cf0`,
        display: `minimal-ui`,
        icon: `./src/images/icon.png`,
        // purpose: "maskable",
      },
    },
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`),
          require("postcss-100vh-fix"),
          require(`autoprefixer`),
          require(`cssnano`),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        whitelist: ["video"],
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
        // jpegQuality: 100,
        // pngQuality: 100,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
