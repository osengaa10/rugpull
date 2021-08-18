import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractCall, useContractFunction } from "@usedapp/core";
import fomoOEContractAbi from "../abi/FomoOE.json";
import { fomoOEContractAddress } from "../contracts"

const fomoOEContractInterface = new ethers.utils.Interface(fomoOEContractAbi);
const contract = new Contract(fomoOEContractAddress, fomoOEContractInterface);


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
  const [userKeyBalance]: any = useContractCall({
    abi: fomoOEContractInterface,
    address: fomoOEContractAddress,
    method: "getUserKeyBalance",
    args: [],
  }) ?? [];
  console.log("userKeyBalance");
  console.log(userKeyBalance);
  return userKeyBalance;
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

export function usePurchaseKeys() {
  const { state, send } = useContractFunction(contract, "getUserKeyBalance", {});
  return { state, send };
}