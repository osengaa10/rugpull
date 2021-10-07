import { ChakraProvider, useDisclosure, Box, Spacer, Wrap, WrapItem } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/modals/ConnectButton";
import AccountModal from "./components/modals/AccountModal";
import Keys from "./components/Keys";
import RulesButton from "./components/modals/RulesButton";
import RulesModal from "./components/modals/RulesModal";
import VoteButton from "./components/modals/VoteButton";
import VoteModal from "./components/modals/VoteModal";
import NotesModal from "./components/modals/NotesModal";
import NotesButton from "./components/modals/NotesButton";
import "@fontsource/inter";


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRulesOpen, onOpen: onRulesOpen, onClose: onRulesClose } = useDisclosure();
  const { isOpen: isVoteOpen, onOpen: onVoteOpen, onClose: onVoteClose } = useDisclosure();
  const { isOpen: isNotesOpen, onOpen: onNotesOpen, onClose: onNotesClose } = useDisclosure();

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
            <Spacer />
            <WrapItem>
            <Box p="2">
              <NotesButton handleOpenNotesModal={onNotesOpen} />
              <NotesModal isOpen={isNotesOpen} onClose={onNotesClose} />
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
