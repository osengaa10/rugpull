import { ChakraProvider, useDisclosure, Box, Spacer, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Keys from "./components/Keys";
import RulesButton from "./components/RulesButton";
import RulesModal from "./components/RulesModal";
import "@fontsource/inter";


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRulesOpen, onOpen: onRulesOpen, onClose: onRulesClose } = useDisclosure();
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
          </Wrap>
            <Keys />
      </Layout>
    </ChakraProvider>
    // </div>
  );
}

export default App;
