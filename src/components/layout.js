import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { ParallaxProvider } from "react-scroll-parallax";

// import Header from "./header";
// import Footer from "./footer";

function Layout({ children }) {
  return (
    <Fragment>
      {/* <Header /> */}
      <ParallaxProvider>
        <main className="text-white" style={{ backgroundColor: "#121212" }}>
          {children}
        </main>
      </ParallaxProvider>
      {/* <Footer /> */}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
