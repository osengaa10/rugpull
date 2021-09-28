import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";





// ReactDOM.render(
//   <React.StrictMode>
//     <DAppProvider config={{}}>
//       <App />
//     </DAppProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{readOnlyChainId: 421611,
  multicallAddresses: {
    421611: '0xd130B43062D875a4B7aF3f8fc036Bc6e9D3E1B3E',
  }, 
  readOnlyUrls: {
    421611: 'https://arbitrum-rinkeby.infura.io/v3/85e32b8991b84888a4f7d9e2a44a957b',
  },
  supportedChains: [
    421611,

  ]}}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
