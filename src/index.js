import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
export const server = `https://api.coingecko.com/api/v3`;
//export const server =  `http://www.pricetree.com/dev/api.ashx?pricetreeId=11072&apikey=7770AD31-382F-4D32-8C36-3743C0271699`;
