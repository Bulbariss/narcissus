import PropTypes from "prop-types";
import React, { Fragment } from "react";
// import Header from "./header";
// import Footer from "./footer";

function Layout({ children }) {
  return (
    <Fragment>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
