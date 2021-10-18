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
  ListItem
} from "@chakra-ui/react";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function RulesModal({ isOpen, onClose }: Props) {
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
          Rules:
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
                How to win:
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
                        Be the last player to buy a key before timer ends.
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
                Buying Keys:
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
                            • 49.5% goes to the jackpot.
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
                            • 49.5% pays out as dividends proportional to amount of keys held.
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
                            • 1% goes to the winner or the developer (me),
                            depending on the vote outcome.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text
                        color="white"
                        fontSize="sm"
                        fontWeight="semibold"
                        ml="2"
                        lineHeight="1.1"
                        as="u"
                        >
                            • Key price increases after each purchase
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
                Countdown:
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
                            30 seconds gets added to the countdown for each key purchased.
                            Countdown cannot exceed 24 hours.
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
                TIPS:
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
                            • If a key purchase fails, it is likely because the key price is increasing quickly.
                            Resfresh the page and try again.
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
          <Text
            color="white"
            textAlign="left"
            fontWeight="medium"
            fontSize="md"
          >
            Please dont financially f**k yourself. This is just a game.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
