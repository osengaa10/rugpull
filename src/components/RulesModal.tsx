import {
  Box,
  Button,
  Flex,
  Link,
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
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";

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
                            Half of each key purchase goes to the jackpot, 
                            and the other half gets divided 
                            amongst all key holders proportional to amount of keys held.
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
                            Key price increases by 1% after each purchase
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
