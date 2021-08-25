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


export default function Token() {
    

    return (
    <Flex direction="column" align="center" mt="4">
        <Text color="white" fontSize="8xl">
        Token
        </Text>
        
    </Flex>
    );
    }
