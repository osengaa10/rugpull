import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
//UNCOMMENT WHEN ISSUE IS PATCHED
//================================
import { useContractCall, useContractFunction } from "@usedapp/core";
//================================

import fomoOEContractAbi from "../contracts/artifacts/contracts/FomoOE.sol/FomoOE.json";
// import fomoOEContractAbi from "../abi/FomoOE.json";
import { fomoOEContractAddress } from "../contracts";
import { useEthers } from "@usedapp/core";

declare const window: any;

// const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider = new ethers.providers.Web3Provider(window.ethereum);
// console.log("provider:")
// console.log(provider)

const fomoOEContractInterface = new ethers.utils.Interface(fomoOEContractAbi.abi);
// UNCOMMENT WHEN ISSUE IS PATCHED (maybe not needed?)
//================================
export const contract = new Contract(fomoOEContractAddress, fomoOEContractInterface, provider);
//================================


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

export function useGiveToDeveloper() {
  const [giveToDeveloper]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "giveToDeveloper",
    args: [],
  }) ?? [];
  return giveToDeveloper;
}

export function useGiveToJackpot() {
  const [giveToJackpot]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "giveToJackpot",
    args: [],
  }) ?? [];
  return giveToJackpot;
}

export function useTotalKeys() {
  const [totalKeys]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "totalKeys",
    args: [],
  }) ?? [];
  return totalKeys;
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
  const { account } = useEthers();
  const divTracker: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "divTracker",
    args: [account],
  }) ?? [];
  // console.log("divTracker");
  // console.log(divTracker);
  return divTracker[0];
}
  
export function useGetUserDivBalance() {
  const { account } = useEthers();
  const userDivvies: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "updateDivvies",
    args: [account],
  }) ?? [];
  // console.log("userDivvies:");
  // console.log(userDivvies);
  return userDivvies;
}

export function useGetTimeLeft() {
  const [getTimeLeft]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "getTimeLeft",
    args: [],
  }) ?? [];
  return getTimeLeft;
}

export function useTotalTime() {
  const [totalTime]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "totalTime",
    args: [],
  }) ?? [];
  return totalTime;
}

export function useWinner() {
  const [winner]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "getWinner",
    args: [],
  }) ?? [];
  return winner;
}

export function useWhoWon() {
  const { account } = useEthers();
  const [won]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "whoWon",
    args: [account],
  }) ?? [];
  return won;
}

// // COMMENT WHEN ISSUE IS PATCHED
// //================================
//   export function useContractMethod(methodName: string) {
//     const { state, send } = useContractFunction(contract, methodName, {});
//     // console.log("{state, send}: hook");
//     // console.log({state, send});
//     return { state, send };
//   }
// //================================


// UNCOMMENT WHEN ISSUE IS PATCHED
//================================
export function useContractMethod(methodName: string) {
  const { state, send } = useContractFunction(contract, methodName, {});
  // console.log("{state, send}: hook");
  // console.log({state, send});
  return { state, send };
}
//================================