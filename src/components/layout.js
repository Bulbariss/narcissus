import PropTypes from "prop-types";
import React from "react";
import SmartOutline from "./utils/SmartOutline";

function Layout({ children }) {
  return (
    <>
      <SmartOutline />
      <main className="text-white">{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
