import { useEffect, useState } from "react";
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
    Spacer,
    useToast
} from "@chakra-ui/react";
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { 
    useKeyPrice, 
    useJackpot, 
    useContractMethod,
    useGetUserKeyBalance,
    useGetUserDivBalance,
    useTotalKeys,
    contract
} from "../hooks";


export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const totalKeys = useTotalKeys();
    const userKeyBalance = useGetUserKeyBalance();
    const userDivBalance = useGetUserDivBalance().toString();
    const { send: purchaseKeys } = useContractMethod("purchaseKeys");
    const { send: withdrawDivvies } = useContractMethod("withdrawDivvies");
    const [input, setInput] = useState("");
    const [toastPlayer, setToastPlayer] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const toast = useToast();
    

    contract.on('keysPurchased', (_amount, _winning) => {
        setToastPlayer(String(_winning));
        setToastMessage(_amount.toString());
    });
    if (contract.listenerCount('keysPurchased' ) > 4) {
        contract.removeAllListeners('keysPurchased' ) 
    }

    useEffect(() => {
        if (toastMessage !== "") {
            // console.log("toastMessage: ", toastMessage);
            // console.log("toastPlayer: ", toastPlayer)
            toast({
                position: "top-right",
                title: toastPlayer,
                description: "bought " + toastMessage + " keys!",
                status: 'success',
                duration: 9000,
                isClosable: true
            });
        }
        // contract.removeAllListeners('keysPurchased' )   
    }, [toastMessage, toastPlayer])


    function handleWithdrawDivvies() {
        withdrawDivvies();
    }

    function handlePurchaseKeys() {
        const _amount = BigInt(input);
        const _keyPrice = BigInt(keyPrice)+BigInt(1)
        const totalPrice = _amount * _keyPrice
        const totalPriceString = totalPrice.toString()
        if (_amount) {
            purchaseKeys(_amount, {
                value: ethers.utils.parseUnits(totalPriceString, "wei")
            });
        }  
    }

    function handleInput(valueAsString: string) {
        if (valueAsString.includes(".")) {
            alert("Please input whole number")
            setInput("")
        } else {
            setInput(valueAsString)
        }
        
    }

    return (
    <Flex direction="column" align="center" mt="4" >
        <Box>
            <Text component={'span'} color="white" fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
                {/* <Countdown date={Date.now() + 10000} /> */}
                <JackpotCountdown />
            </Text>
        </Box>
        <Box>
            <Text color="white" fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
                Jackpot: {jackpot ? parseFloat(formatEther(jackpot.toString())).toFixed(3) : 0} MATIC
            </Text>
        </Box>
        <Divider orientation="horizontal" />
        <Wrap margin="auto" justify="center">
            <WrapItem>
                <Box boxShadow="dark-lg" bgGradient="linear(to-t, #7928CA, #FF0080)" m={4} borderWidth="2px" align="center" borderRadius="lg">
                <Flex me="2" mt="2" mb="0">
                        <Spacer />
                        <Tooltip hasArrow label="After each purchase, key price increases and 30 seconds gets added to the countdown PER key (hard cap is 24hr)." 
                            bg="gray.300" color="black">
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
                            Your Keys: {userKeyBalance ? userKeyBalance.toString() : 0}
                        </Text> 
                    </Box>
                    <Box m={4}>
                        <Text color="white" fontSize="3xl">
                            Divvies: {userDivBalance ? parseFloat(formatEther(userDivBalance.toString())).toFixed(5) : 0} MATIC
                        </Text>
                    </Box>
                    <Box m={4}>
                        <Button 
                        colorScheme="purple" 
                        size="lg"
                        onClick={handleWithdrawDivvies}>
                            Claim Divvies
                        </Button>
                        <Text color="white" fontSize="sm">
                            {/* Key Price: {keyPrice ? parseFloat(formatEther(keyPrice.toNumber())).toFixed(7) : 0} */}
                            Total Keys: {totalKeys ? totalKeys.toString() : 0} 
                        </Text>
                    </Box>
                </Box>
            </WrapItem>
        </Wrap>
        <Text color="white" fontSize={{ base: "14px", md: "24px", lg: "24px" }}>
            <a href="https://rugpull.rip">Rugpull Frontend 1</a>
        </Text>
        <Text color="white" fontSize={{ base: "14px", md: "24px", lg: "24px" }}>
            <a href="https://morning-thunder-5650.on.fleek.co/">Rugpull Frontend 2</a>
        </Text>
        <Text color="white" fontSize={{ base: "14px", md: "24px", lg: "24px" }}>
            <a href="https://discord.gg/FXTxJqvnnJ">Discord</a>
        </Text>
    </Flex>
    
    );
}
