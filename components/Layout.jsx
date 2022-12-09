import React from "react";
import Navbar from "./Navbar";
import { GlobalStyle } from "../styles/estilosGlobales";
import styled from "styled-components";
const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
