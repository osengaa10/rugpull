import { useState, useEffect } from "react";
import { Contract } from "@ethersproject/contracts";
import { ethers } from "ethers";
import Countdown from 'react-countdown';
import Timer from "./Timer";

import { 
    Flex, 
    Text, 
    Button,
    Box,
    NumberInput,
    NumberInputField,
    Divider,
    SimpleGrid
} from "@chakra-ui/react";
import { 
    contract,
    useKeyPrice, 
    useJackpot, 
    useContractMethod,
    useGetUserKeyBalance,
    useGetUserDivBalance,
    useGetTimeLeft,
    useWinner
} from "../hooks";


export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const userKeyBalance = useGetUserKeyBalance();
    const userDivBalance = useGetUserDivBalance();
    const timeLeft = useGetTimeLeft();
    const winner = useWinner();
    const { state: purchaseKeysState, send: purchaseKeys } = useContractMethod("purchaseKeys");
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
    //     // first attempt
    // function handleUpdateDivvies() {
    //     console.log("HANDLE UPDATE DIVVIES:");
    //     let userDivvies = updateDivvies();
    //     console.log("userDivvies")
    //     console.log(userDivvies);
    // }

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
        {/* <Timer seconds={9999999} /> */}
        <Text color="white" fontSize="2xl">
            {winner}
        </Text>
        <Text color="white" fontSize="4xl">
            is winning!
        </Text>
        <Text color="white" fontSize="8xl">
            <Countdown date={Date.now() + timeLeft*1000} />
        </Text>
        <Text color="white" fontSize="6xl">
        Jackpot: {jackpot ? jackpot.toNumber() : 0}
        </Text>
        <Divider orientation="horizontal" />
        <SimpleGrid columns={3} spacing={10}>
            <Box m={4}>
                <Text color="white" fontSize="3xl">
                    Key Price: {keyPrice ? keyPrice.toNumber() : 0}
                </Text>
            </Box>
            <Box m={4}>
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
            </Box>
            <Box m={4}>
                <Button colorScheme="purple" onClick={handlePurchaseKeys}>
                    Buy {input} Keys
                </Button> 
            </Box>
            
            </SimpleGrid>
            <Divider orientation="horizontal" />
            <Box>
                <Text color="white" fontSize="4xl">
                    Key Balance: {userKeyBalance ? userKeyBalance.toString() : 0}
                </Text>
            </Box>
            
        
        {/* <Text color="white" fontSize="4xl">
        Divvies: {userDivBalance ? userDivBalance.toString() : 0}
        </Text> */}
        
        
        <Box>
            <Text color="white" fontSize="4xl">
                Divvies: {userDivBalance ? userDivBalance.toString() : 0}
            </Text>
        </Box>
        <Box>
            <Button 
            colorScheme="teal" 
            size="lg"
            onClick={handleWithdrawDivvies}>
                Claim Divvies
            </Button>
        </Box>
    </Flex>
    );
}
