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


// ReactDOM.render(
//   <React.StrictMode>
//     <DAppProvider config={{}}>
//       <App />
//     </DAppProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );



// 'https://rinkeby.arbitrum.io/rpc'
// 'https://arbitrum-rinkeby.infura.io/v3/85e32b8991b84888a4f7d9e2a44a957b'

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


