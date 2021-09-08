import { ChakraProvider, useDisclosure, Box, Spacer, Flex } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import Keys from "./components/Keys";
import Token from "./components/Token";
import RulesButton from "./components/RulesButton";
import RulesModal from "./components/RulesModal";
import "@fontsource/inter";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRulesOpen, onOpen: onRulesOpen, onClose: onRulesClose } = useDisclosure();
  // const { isOpen: isConnectOpen, onOpen: onConnectOpen, onClose: onConnectClose } = useDisclosure();
  return (
    <div>
    <Router>
    <ChakraProvider theme={theme}>
      <Layout>
        <Switch>
          <Route exact path="/">
          <Flex>
            <Box p="2">
              <ConnectButton handleOpenModal={onOpen} />
              <AccountModal isOpen={isOpen} onClose={onClose} />
            </Box>
            <Spacer />
            <Box p="2">
              <RulesButton handleOpenRulesModal={onRulesOpen} />
              <RulesModal isOpen={isRulesOpen} onClose={onRulesClose} />
            </Box>
          </Flex>
            <Keys />
          </Route>
          {/* <Route path="/token">
            <Token />
          </Route> */}
        </Switch>
      </Layout>
        
    </ChakraProvider>
    </Router>
    </div>
  );
}

export default App;
