import PropTypes from "prop-types";
import React, { Fragment } from "react";

function Layout({ children }) {
  return (
    <Fragment>
      <main className="text-white">{children}</main>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
