import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Web3 from "web3";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyles";
import theme from "./styles/theme";

const container = document.getElementById("root");
const root = createRoot(container!);

export const getLibrary = (provider: any): Web3 => {
  return provider;
};

root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <RecoilRoot>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </RecoilRoot>
    </Web3ReactProvider>
  </React.StrictMode>
);
