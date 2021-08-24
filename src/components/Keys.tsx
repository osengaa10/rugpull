import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import Countdown from 'react-countdown';
import { 
    Flex, 
    Text, 
    Button,
    Box,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react";
import { 
    contract,
    useKeyPrice, 
    useJackpot, 
    useContractMethod,
    useGetUserKeyBalance,
    useGetUserDivBalance
} from "../hooks";


export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const userKeyBalance = useGetUserKeyBalance();
    // second attempt
    const userDivBalance = useGetUserDivBalance();
    const { state: purchaseKeysState, send: purchaseKeys } = useContractMethod("purchaseKeys");
    // first attempt
    const { state: updateDivviesState, send: updateDivvies } = useContractMethod("updateDivvies");
    const { state: withdrawDivviesState, send: withdrawDivvies } = useContractMethod("withdrawDivvies");
    const { state, send: getUserKeyBalance } = useContractMethod("getUserKeyBalance");
    const [input, setInput] = useState("");

    // useEffect(() => {
    //     contract.on("keysPurchased", (_userKeyBalance, _totalKeys, _keyPrice, _divPool, _jackpot, event) => {
    //         console.log("_userKeyBalance");
    //         console.log(_userKeyBalance);
    //         setUserKeyBalance1(userKeyBalance1);
    //         console.log("_totalKeys");
    //         console.log(_totalKeys);
    //         console.log("_keyPrice");
    //         console.log(_keyPrice);
    //         event.removeListener();
    //         // The event object contains the verbatim log data, the
    //         // EventFragment and functions to fetch the block,
    //         // transaction and receipt and event functions
    //     });
    // });

    // function handleGetUserKeyBalance() {
    //     console.log("handleGetUserKeyBalance:");
    //     getUserKeyBalance();
    // }
        // first attempt
    function handleUpdateDivvies() {
        console.log("HANDLE UPDATE DIVVIES:");
        let userDivvies = updateDivvies();
        console.log("userDivvies")
        console.log(userDivvies);
    }

    function handleWithdrawDivvies() {
        console.log("HANDLE WITHDRAW DIVVIES:");
        withdrawDivvies();
        // console.log("userWithdrawDivvies");
        // console.log(userWithdrawDivvies);
    }

    // const handleUpdateDivvies = async() => {        
    //     console.log("HANDLE UPDATE DIVVIES:");
    //     await updateDivvies().then(console.log);
    //     console.log("result: ");
    //   }

    function handlePurchaseKeys() {
        const _amount = parseInt(input);
        if (_amount) {
            console.log("HANDLE PURCHASE KEYS:");
            console.log("_amount: ");
            console.log(_amount);
            console.log("keyPrice: ");
            console.log(keyPrice);
            console.log("_amount*keyPrice.toNumber(): ");
            console.log(_amount*keyPrice.toNumber());
            purchaseKeys(_amount, {
                value: _amount*keyPrice.toNumber()
            });
        }
        
    }

    function handleInput(valueAsString: string, valueAsNumber: number) {
        console.log("keyPrice: ");
        console.log(keyPrice);
        setInput(valueAsString);
    }

    return (
    <Flex direction="column" align="center" mt="4">
        <Countdown date={Date.now() + 10000} />
        <Text color="white" fontSize="8xl">
        Jackpot: {jackpot ? jackpot.toNumber() : 0}
        </Text>
        <Text color="white" fontSize="4xl">
        Key Price: {keyPrice ? keyPrice.toNumber() : 0}
        </Text>
        <Text color="white" fontSize="4xl">
        Key Balance: {userKeyBalance ? userKeyBalance.toString() : 0}
        </Text>
        <Text color="white" fontSize="4xl">
        Divvies: {userDivBalance ? userDivBalance.toString() : 0}
        </Text>
        <Button 
        colorScheme="teal" 
        size="lg"
        onClick={handleUpdateDivvies}>
        Refresh Divvies
        </Button>
        <Box mt={4}>
            <NumberInput
                mb={2}
                min={1}
                value={input}
                onChange={handleInput}
                color="white"
                clampValueOnBlur={false}
            >
                <NumberInputField />
            </NumberInput>
            <Button isFullWidth colorScheme="purple" onClick={handlePurchaseKeys}>
                Buy Keys
            </Button>
            <Button isFullWidth colorScheme="purple" onClick={handleWithdrawDivvies}>
                Withdraw Divvies!
            </Button>
      </Box>
    </Flex>
    );
    }
