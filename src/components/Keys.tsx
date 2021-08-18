import { useState } from "react";
import { 
    Flex, 
    Text, 
    Button,
    Box,
    NumberInput,
    NumberInputField
} from "@chakra-ui/react";
import { 
    useKeyPrice, 
    useJackpot, 
    useContractMethod,
    useGetUserKeyBalance 
} from "../hooks";


export default function Keys() {
    const keyPrice = useKeyPrice();
    const jackpot = useJackpot();
    const userKeyBalance = useGetUserKeyBalance();
    const { state: purchaseKeysState, send: purchaseKeys } = useContractMethod("purchaseKeys");
    const { state, send: getUserKeyBalance } = useContractMethod("getUserKeyBalance");
    const [input, setInput] = useState("");


    function handleGetUserKeyBalance() {
        console.log("handleGetUserKeyBalance:");
        getUserKeyBalance();
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
        <Text color="white" fontSize="8xl">
        Jackpot: {jackpot ? jackpot.toNumber() : 0}
        </Text>
        <Text color="white" fontSize="4xl">
        Key Price: {keyPrice ? keyPrice.toNumber() : 0}
        </Text>
        <Text color="white" fontSize="4xl">
        KeyBalance: {userKeyBalance ? userKeyBalance.toNumber() : 0}
        </Text>
        <Button 
        colorScheme="teal" 
        size="lg"
        onClick={handleGetUserKeyBalance}>
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
