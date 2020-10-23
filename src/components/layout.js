import PropTypes from "prop-types";
import React from "react";
import SmartOutline from "./utils/SmartOutline";
import { CurtainsProvider } from "../components/curtainsStore";
import WebGLCanvas from "../components/WebGLCanvas";

function Layout({ children }) {
  return (
    <CurtainsProvider>
      <SmartOutline />
      <main className="text-white">{children}</main>
      <WebGLCanvas />
    </CurtainsProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
