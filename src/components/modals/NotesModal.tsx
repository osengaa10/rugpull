import {
    Box,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    UnorderedList,
    ListItem,
    SimpleGrid
  } from "@chakra-ui/react";
  
  type Props = {
    isOpen: any;
    onClose: any;
  };
  
  export default function NotesModal({ isOpen, onClose }: Props) {
  //   const { account, deactivate } = useEthers();
  
  //   function handleDeactivateAccount() {
  //     deactivate();
  //     onClose();
  //   }
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent
          background="gray.900"
          border="1px"
          borderStyle="solid"
          borderColor="gray.700"
          borderRadius="3xl"
        >
          <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
            Extra Stuff:
          </ModalHeader>
          <ModalCloseButton
            color="white"
            fontSize="sm"
            _hover={{
              color: "whiteAlpha.700",
            }}
          />
          <ModalBody pt={0} px={4}>
            <Box
              borderRadius="3xl"
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.400" fontSize="sm">
                  Disclaimer:
                </Text>
              </Flex>
              <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
                <UnorderedList>
                  <ListItem>
                      <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="semibold"
                          ml="2"
                          lineHeight="1.1"
                      >
                          • There is always a risk when interacting with any smart contract.
                          So seriously, don't ape into this wallstreetbets style. Also it's your money so do
                          whatever you want. 
                      </Text>
                  </ListItem>
                  <ListItem>
                      <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="semibold"
                          ml="2"
                          mt="3"
                          lineHeight="1.1"
                      >
                          • I can't really expect anyone to believe this, but this is a fair and honest game.
                          There's no predetermined winner, hidden backdoors, pyramid-like referral scheme, or any
                          other flimflam.
                      </Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
             
            </Box>
            <Box
              borderRadius="3xl"
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.400" fontSize="sm">
                  Strategy:
                </Text>
              </Flex>
              <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
                  <UnorderedList spacing={3}>
                  <ListItem>
                    <SimpleGrid columns={2} spacing={1}>
                        <Box
                            borderRadius="3xl"
                            border="1px"
                            borderStyle="solid"
                            borderColor="gray.600"
                            px={5}
                            pt={4}
                            pb={2}
                            mb={3}
                        >
                            <Flex justifyContent="space-between" alignItems="center" mb={3}>
                                <Text color="gray.400" fontSize="sm">
                                    Jackpot (Send it):
                                </Text>
                            </Flex>
                            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
                                <UnorderedList>
                                    <ListItem>
                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                            lineHeight="1.1"
                                        >
                                            • Have your key purchase transaction ready to click "confirm" before the timer ends.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                            mt="3"
                                            lineHeight="1.1"
                                        >
                                            • Have ample gas price/limit to ensure you get you transaction included in the block.
                                        </Text>
                                    </ListItem>
                                </UnorderedList>
                            </Flex>
                        </Box>
                        <Box
                            borderRadius="3xl"
                            border="1px"
                            borderStyle="solid"
                            borderColor="gray.600"
                            px={5}
                            pt={4}
                            pb={2}
                            mb={3}
                        >
                            <Flex justifyContent="space-between" alignItems="center" mb={3}>
                                <Text color="gray.400" fontSize="sm">
                                    Divvies (The Long Game):
                                </Text>
                            </Flex>
                            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
                                <UnorderedList>
                                    <ListItem>
                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                            lineHeight="1.1"
                                        >
                                            • Buy as many keys as you can at the current price.
                                        </Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text
                                            color="white"
                                            fontSize="sm"
                                            fontWeight="semibold"
                                            mt="3"
                                            lineHeight="1.1"
                                        >
                                            • Sit back and watch the divvies grow as players
                                            scramble for the jackpot.
                                        </Text>
                                    </ListItem>
                                </UnorderedList>
                            </Flex>
                        </Box>
                    </SimpleGrid>
                          <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="semibold"
                          ml="2"
                          lineHeight="1.1"
                          >
                              • Not sure why anyone would, but you can over pay for a key.
                              Funds will be allocated per the rules.  
                          </Text>
                      </ListItem>
                      <ListItem>
                          <Text
                          color="white"
                          fontSize="sm"
                          fontWeight="semibold"
                          ml="2"
                          lineHeight="1.1"
                          >
                              • Try having multiple accounts going for the jackpot. Don't worry, you can claim your
                              dividends after the game ends. 
                          </Text>
                      </ListItem>
                  </UnorderedList>
              </Flex>
            </Box>
            {/* <Box
              borderRadius="3xl"
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.400" fontSize="sm">
                  Risks:
                </Text>
              </Flex>
              <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
                  <UnorderedList spacing={3}>
                      <ListItem>
                          <Text
                              color="white"
                              fontSize="sm"
                              fontWeight="semibold"
                              ml="2"
                              lineHeight="1.1"
                          >
                              • 
                          </Text>
                      </ListItem>
                  </UnorderedList>
              </Flex>
             
            </Box> */}
          </ModalBody>
  
          <ModalFooter
            justifyContent="end"
            background="gray.700"
            borderBottomLeftRadius="3xl"
            borderBottomRightRadius="3xl"
            p={6}
          >
            <Text
              color="white"
              textAlign="left"
              fontWeight="medium"
              fontSize="md"
            >
              May the odds be ever in your favor...
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  