import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import fomoOEContractAbi from "../abi/FomoOE.json";
import { fomoOEContractAddress } from "../contracts"
import { useEthers } from "@usedapp/core";

declare const window: any;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const fomoOEContractInterface = new ethers.utils.Interface(fomoOEContractAbi);
export const contract = new Contract(fomoOEContractAddress, fomoOEContractInterface, provider);

// declare const account: any;
// export function useGetAccount() {
//   const { activateBrowserWallet, account } = useEthers();
//   activateBrowserWallet();
//   console.log("{ activateBrowserWallet, account }");
//   console.log(account);
//   return account
// }

// Access the auto-generated getter function created by solidity for a variable.
export function useKeyPrice() {
  const [keyPrice]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "keyPrice",
    args: [],
  }) ?? [];
  return keyPrice;
}

export function useJackpot() {
  const [jackpot]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "jackpot",
    args: [],
  }) ?? [];
  return jackpot;
}

export function useGetUserKeyBalance() {
  const { activateBrowserWallet, account } = useEthers();
  const divTracker: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "divTracker",
    args: [account],
  }) ?? [];
  console.log("divTracker");
  console.log(divTracker);
  return divTracker[0];
}

// export function useGetUserKeyBalance() {
//   const { state, send } = useContractFunction(contract, "getUserKeyBalance", {});
//   return { state, send };
// }

export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, {});
  console.log("{state, send}: hook");
  console.log({state, send});
  return { state, send };
}

// export function useContractMethodEvent(methodName: string) {
//   const { state, send } = useContractFunction(contract, methodName, {});
//   console.log("{state, send}: hook");
//   console.log({state, send});
//   return { state, send, event };
// }

// export function usePurchaseKeys() {
//   const { state, send } = useContractFunction(contract, "getUserKeyBalance", {});
//   return { state, send, event };
// }