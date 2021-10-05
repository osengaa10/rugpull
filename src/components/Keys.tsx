import { useState } from "react";
import { formatEther } from "@ethersproject/units";
import { ethers } from 'ethers';
import JackpotCountdown from "./JackpotCountdown";
import { 
    Flex, 
    Text, 
    Button,
    Box,
    NumberInput,
    NumberInputField,
    Divider,
    Wrap,
    WrapItem,
    Tooltip,
    Spacer
} from "@chakra-ui/react";
// import { createBreakpoints } from "@chakra-ui/theme-tools";
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { 
    useKeyPrice, 
    useJackpot, 
    useContractMethod,
    useGetUserKeyBalance,
    useGetUserDivBalance,
} from "../hooks";


// const breakpoints = createBreakpoints({
//   sm: "30em",
//   md: "48em",
//   lg: "62em",
//   xl: "80em",
//   "2xl": "96em",
// })

export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const userKeyBalance = useGetUserKeyBalance();
    const userDivBalance = useGetUserDivBalance().toString();
    const { send: purchaseKeys } = useContractMethod("purchaseKeys");
    const { send: withdrawDivvies } = useContractMethod("withdrawDivvies");
    const [input, setInput] = useState("");

    function handleWithdrawDivvies() {
        withdrawDivvies();
    }

    function handlePurchaseKeys() {
        console.log("input")
        console.log(keyPrice)
        // const _amount = parseInt(input);
        const _amount = BigInt(input);
        const _keyPrice = BigInt(keyPrice)
        const totalPrice = _amount * _keyPrice
        console.log("totalPrice")
        console.log(totalPrice)
        const totalPriceString = totalPrice.toString()
        console.log("totalPriceString")
        console.log(totalPriceString)
        console.log(ethers.utils.parseUnits(totalPriceString, "wei"))
        if (_amount) {
            // purchaseKeys(_amount, {
            //     value: _amount*keyPrice.toNumber()
            // });
            purchaseKeys(_amount, {
                value: ethers.utils.parseUnits(totalPriceString, "wei")
            });
        }  
    }

    function handleInput(valueAsString: string) {
        // console.log("valueAsString")
        // console.log(valueAsString)
        if (valueAsString.includes(".")) {
            alert("Please input whole number")
            setInput("")
        } else {
            setInput(valueAsString)
        }
        
    }

    return (
    <Flex direction="column" align="center" mt="4">
        <Box>
            <Text component={'span'} color="white" fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
                {/* <Countdown date={Date.now() + 10000} /> */}
                <JackpotCountdown />
            </Text>
        </Box>
        <Box>
            <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
                Jackpot value: {jackpot ? parseFloat(formatEther(jackpot.toString())).toFixed(3) : 0} MATIC
            </Text>
        </Box>
        <Divider orientation="horizontal" />
        <Wrap margin="auto" justify="center">
            <WrapItem>
                <Box boxShadow="dark-lg" bgGradient="linear(to-t, #7928CA, #FF0080)" m={4} borderWidth="2px" align="center" borderRadius="lg">
                <Flex me="2" mt="2" mb="0">
                        <Spacer />
                        <Tooltip hasArrow label="After each purchase, 30 seconds gets added to the countdown per key (hard cap is 24hr)
                            and price increases by 1%." bg="gray.300" color="black">
                            <InfoOutlineIcon/>
                        </Tooltip>
                    </Flex>  
                    <Box mt={4}>
                        <Text color="white" fontSize="3xl">
                            {/* Key Price: {keyPrice ? parseFloat(formatEther(keyPrice.toNumber())).toFixed(7) : 0} */}
                            Key Price: {keyPrice ? parseFloat(formatEther(keyPrice.toString())).toFixed(5) : 0}
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
                        <Button colorScheme="purple" size="lg" onClick={handlePurchaseKeys}>
                            Buy {input} Keys
                        </Button> 
                        <Text color="white" fontSize="sm">
                            {/* Key Price: {keyPrice ? parseFloat(formatEther(keyPrice.toNumber())).toFixed(7) : 0} */}
                            Cost: {keyPrice ? parseFloat(formatEther((keyPrice*Number(input)).toString())).toFixed(5) : 0} MATIC

                        </Text>
                    </Box>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box boxShadow="dark-lg" m={4} bgGradient="linear(to-t, #7928CA, #FF0080)" borderWidth="2px" align="center" borderRadius="lg">
                    <Flex me="2" mt="2" mb="0">
                        <Spacer />
                        <Tooltip hasArrow label="more keys = more divvies" bg="gray.300" color="black">
                            <InfoOutlineIcon/>
                        </Tooltip>
                    </Flex>  
                    <Box m={4}>
                        <Text color="white" fontSize="3xl">
                            Key Balance: {userKeyBalance ? userKeyBalance.toString() : 0}
                        </Text> 
                    </Box>
                    <Box m={4}>
                        <Text color="white" fontSize="3xl">
                            Divvies: {userDivBalance ? parseFloat(formatEther(userDivBalance.toString())).toFixed(5) : 0}
                        </Text>
                    </Box>
                    <Box m={4}>
                        <Button 
                        colorScheme="purple" 
                        size="lg"
                        onClick={handleWithdrawDivvies}>
                            Claim Divvies
                        </Button>
                    </Box>
                </Box>
            </WrapItem>
        </Wrap>
    </Flex>
    
    );
}
