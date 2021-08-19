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
} from "../hooks";


export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const userKeyBalance = useGetUserKeyBalance();
    const { state: purchaseKeysState, send: purchaseKeys } = useContractMethod("purchaseKeys");
    const { state: updateDivviesState, send: updateDivvies } = useContractMethod("updateDivvies");
    const { state, send: getUserKeyBalance } = useContractMethod("getUserKeyBalance");
    const [input, setInput] = useState("");
    const [userKeyBalance1, setUserKeyBalance1] = useState(0);

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

    function handleUpdateDivvies() {
        console.log("handleUpdateDivvies");
        updateDivvies();
    }

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
        <Button 
        colorScheme="teal" 
        size="lg"
        onClick={handleUpdateDivvies}>
        Claim Divvies
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
      </Box>
    </Flex>
    );
    }
