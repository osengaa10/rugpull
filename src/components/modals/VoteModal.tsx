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
    Button,
    Spacer
  } from "@chakra-ui/react";
  import { 
    useContractMethod,
    useGiveToDeveloper,
    useGiveToJackpot
} from "../../hooks";

  type Props = {
    isOpen: any;
    onClose: any;
  };
  
  export default function VoteModal({ isOpen, onClose }: Props) {
    const giveToDeveloper = useGiveToDeveloper();
    const giveToJackpot = useGiveToJackpot();
    const { send: voteForOnePercent } = useContractMethod("voteForOnePercent");


    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent
          background="gray.900"
          border="1px"
          borderStyle="solid"
          borderColor="gray.700"
          borderRadius="3xl"
        >
          <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
            Who gets the additional 1%?
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
                  What you are voting on:
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
                         1% is being withheld until the end of the game.
                         Cast your vote below to decide where it goes. Voting
                        will cost gas to increment a counter.   
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
                  Vote Requirements:
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
                        • One vote per player.
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
                        • Player must have one or more keys.
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
                        • Votes cannot be cast after the game ends.
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
                  Current Vote:
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
                              Developer: {giveToDeveloper ? giveToDeveloper.toNumber() : 0}
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
                              Winner: {giveToJackpot ? giveToJackpot.toNumber() : 0}
                          </Text>
                      </ListItem>
                  </UnorderedList>
              </Flex>
             
            </Box>
          </ModalBody>
  
          <ModalFooter
            justifyContent="end"
            background="gray.700"
            borderBottomLeftRadius="3xl"
            borderBottomRightRadius="3xl"
            p={6}
          >
            <Button colorScheme="green" size="lg" onClick={() => voteForOnePercent(true)}>
                Developer
            </Button> 
            <Spacer />
            <Button colorScheme="red" size="lg" onClick={() => voteForOnePercent(false)}>
                Winner
            </Button> 
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  