import { ChakraProvider, useDisclosure, Box, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Keys from "./components/Keys";
import RulesButton from "./components/RulesButton";
import RulesModal from "./components/RulesModal";
import VoteButton from "./components/VoteButton";
import VoteModal from "./components/VoteModal";
import "@fontsource/inter";


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRulesOpen, onOpen: onRulesOpen, onClose: onRulesClose } = useDisclosure();
  const { isOpen: isVoteOpen, onOpen: onVoteOpen, onClose: onVoteClose } = useDisclosure();

  // const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  return (
    // <div>
    <ChakraProvider theme={theme}>
      <Layout>
      <Wrap justify="center">
          <WrapItem>
            <Box p="2">
              <ConnectButton handleOpenModal={onOpen} />
              <AccountModal isOpen={isOpen} onClose={onClose} />
            </Box>
            </WrapItem>
            <Spacer />
            <WrapItem>
            <Box p="2">
              <RulesButton handleOpenRulesModal={onRulesOpen} />
              <RulesModal isOpen={isRulesOpen} onClose={onRulesClose} />
            </Box>
            </WrapItem> 
            <Spacer />
            <WrapItem>
            <Box p="2">
              <VoteButton handleOpenVoteModal={onVoteOpen} />
              <VoteModal isOpen={isVoteOpen} onClose={onVoteClose} />
            </Box>
            </WrapItem>          
          </Wrap>
            <Keys />
      </Layout>
    </ChakraProvider>
    // </div>
  );
}

export default App;
