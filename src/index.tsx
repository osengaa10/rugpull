import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";




// const config = {
//   readOnlyChainId: Goerli,
//   readOnlyUrls: {
//     [ChainId.Goerli]: `https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
//   },
// }

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
